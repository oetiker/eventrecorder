function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cboulanger.eventrecorder.player.Qooxdoo": {
        "require": true
      },
      "cboulanger.eventrecorder.IPlayer": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("cboulanger.eventrecorder.player.Testcafe", {

    extend: cboulanger.eventrecorder.player.Qooxdoo,

    implement: [cboulanger.eventrecorder.IPlayer],

    properties: {
      /**
       * @inheritDoc
       */
      canExportExecutableCode: {
        refine: true,
        init: true
      }
    },

    members: {

      /**
       * overridden to disallow presentation mode
       * @param value
       * @param old
       * @private
       */
      _applyMode: function _applyMode(value, old) {
        if (value === "presentation") {
          this.warn("Presentation mode is not supported, switching to test mode");
          this.setMode("test");
        }
      },


      /**
       * Returns the file extension of the downloaded file in the target language
       * @return {string}
       */
      getExportFileExtension: function getExportFileExtension() {
        return "js";
      },


      /**
       * Translates the intermediate code into the target language
       * @param script
       * @return {string} executable code
       */
      translate: function translate(script) {
        var lines = this._translate(script).split(/\n/);
        return ["fixture `Test suite title`", "  .page `" + window.location.href + "`;", "", "test('Test description', async t => {"].concat(_toConsumableArray(lines.map(function (line) {
          return "  " + line;
        })), ["});"]).join("\n");
      },


      /**
       * @inheritDoc
       */
      _generateUtilityFunctionsCode: function _generateUtilityFunctionsCode(script) {
        return cboulanger.eventrecorder.player.Testcafe.prototype._generateUtilityFunctionsCode.base.call(this, script).map(function (line) {
          return "await t.eval(() => {" + line + "});";
        });
      },


      /**
       * Translates a line of intermediate script code to testcafé code
       * @param line
       * @return {*|var}
       * @private
       */
      _translateLine: function _translateLine(line) {
        var code = cboulanger.eventrecorder.player.Testcafe.prototype._translateLine.base.call(this, line);
        if (code && !code.startsWith("await t.") && !code.startsWith("//")) {
          code = code.endsWith(";") || code.endsWith("}") ? "await t.eval(()=>{" + code + "});" : "await t.eval(()=>" + code + ");";
        }
        return code;
      },


      /*
      ============================================================================
         COMMANDS
      ============================================================================
      */

      /**
       * Generates code that causes the given delay (in milliseconds).
       * The delay is capped by the {@link #cboulanger.eventrecorder.player.Abstract#maxDelay} property
       * and will only be caused in presentation mode
       * @param delayInMs {Number}
       * @return {string}
       */
      cmd_delay: function cmd_delay(delayInMs) {
        delayInMs = Math.min(delayInMs, this.getMaxDelay());
        return this.getMode() === "presentation" && delayInMs > 0 ? "await t.wait(" + delayInMs + ");" : "";
      },


      /**
       * Generates code that waits the given time in milliseconds, regardless of player mode
       * @param timeInMs {Number}
       * @return {string}
       */
      cmd_wait: function cmd_wait(timeInMs) {
        return "await t.wait(" + timeInMs + ");";
      }
    }
  });
  cboulanger.eventrecorder.player.Testcafe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Testcafe.js.map?dt=1552484218399