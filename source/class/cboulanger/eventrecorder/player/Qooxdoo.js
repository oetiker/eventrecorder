/* ************************************************************************

  UI Event Recorder

  Copyright:
    2018 Christian Boulanger

  License:
    MIT license
    See the LICENSE file in the project's top-level directory for details.

  Authors: Christian Boulanger


************************************************************************ */

/**
 * This is a qooxdoo class
 */
qx.Class.define("cboulanger.eventrecorder.player.Qooxdoo", {

  extend : cboulanger.eventrecorder.player.Abstract,

  members :
  {
    /**
     * Replays the given script of intermediate code
     * @param script {String} The script to replay
     * @return {Promise} Promise which resolves when the script has been replayed, or
     * rejects with an error
     */
    async replay(script) {
      for (let line of script.split(/\n/)) {
        eval(this.generateReplayCode(line));
        await new Promise(resolve => qx.event.Timer.once(resolve, null, this.getDelay()));
      }
    },

    /**
     * Translates the intermediate code into javascript code
     * @param script
     * @return {string} Javasc
     */
    translate(script) {
      return script.split(/\n/).map(line => this.generateReplayCode(line)).join("\n");
    },

    /**
     * Given an async piece of code which checks for a condition or an application state,
     * return code that checks for this condition, throwing an error if the
     * condition hasn't been fulfilled within the set timeout.
     * @param condition
     */
    __waitFor(condition) {
      return `await cboulanger.eventrecorder.player.Abstract.waitForCondition(()=>{${condition}},${this.getInterval()},${this.getTimeout()},condition);`;
    },

    /**
     * Given a line of intermediate code, return a line of javascript code that
     * can replay the corresponding user action.
     * @param code {String} A line of intermediate code
     * @return {String} A line of javascript code
     */
    generateReplayCode(code) {
      let [command, id, data] = code.split(/ /);
      switch (command) {
        /**
         * execute <id>
         */
        case "execute":
          return `qx.core.Id.getQxObject("${id}").fireEvent('execute');`;
        /**
         * check-(dis)appear <id>
         */
        case "check-appear":
        case "check-disappear":
          return this.__waitFor(`${command==="check-appear"?"":"!"} qx.core.Id.getQxObject("${id}").isVisible()`);
        /**
         * set-value <id> <json value>
         */
        case "set-value":
          return [`qx.core.Id.getQxObject("${id}").setValue(${data});`];
        /**
         * (open|close)-tree-node-treevirtual <id> <node id>
         * (qx.ui.treevirtual.TreeVirtual)
         */
        case "open-tree-node-treevirtual":
        case "close-tree-node-treevirtual": {
          let type = command.startsWith("open") ? "open" : "close";
          return [`let t = qx.core.Id.getQxObject("${id}"); t.${type}Node(t.getLookupTable().getItem(${data}));`];
        }
        /**
         * set-selection <id> <id of selected object>
         */
        case "set-selection":
          return [`qx.core.Id.getQxObject("${id}").setSelection([qx.core.Id.getQxObject("${data}")]);`];
        /**
         * set-model-selection <id> <array of integer ids>
         */
        case "set-model-selection":
          return [`let o = qx.core.Id.getQxObject("${id}"); o.setSelection(new qx.data.Array(${data}.map(i => o.getModel().getItem(i))));`];
        /**
         * set-from-selectables <id> <index>
         */
        case "set-from-selectables":
          return [`let o = qx.core.Id.getQxObject("${id}"); o.setSelection([o.getSelectables()[${data}]]);`];
        /**
         * reset-table-selection <id>
         * set-table-selection <id> <array of row ids>
         * (qx.ui.table.Table)
         */
        case "reset-table-selection":
          return [`qx.core.Id.getQxObject("${id}").resetSelection();`];
        case "set-table-selection":
          return [`qx.core.Id.getQxObject("${id}").addSelectionInterval(${data};`];
        /**
         * set-row-selection <id> <row index>
         * (qx.ui.virtual.selection.Row)
         */
        case "set-row-selection":
          return [`qx.core.Id.getQxObject("${id}").selectItem(${data});`];
        /**
         * Unknown command
         */
        default:
          throw new Error(`Invalid command: ${code}`);
      }
    }
  }
});
