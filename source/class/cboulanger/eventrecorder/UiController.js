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
 * The UI Controller for the recorder
 * @asset(cboulanger/eventrecorder/*)
 */
qx.Class.define("cboulanger.eventrecorder.UiController", {
  extend : qx.ui.window.Window,

  statics: {
    LOCAL_STORAGE_KEY: "cboulanger.eventrecorder.UiController.script"
  },

  properties: {
    /**
     * The recorder instance
     */
    recorder: {
      check: "cboulanger.eventrecorder.Recorder",
      event: "changeRecorder",
      nullable: true
    },

    /**
     * The player instance
     */
    player: {
      check: "cboulanger.eventrecorder.player.Abstract",
      event: "changePlayer",
      nullable: true
    },

    /**
     * The recorded script
     */
    script: {
      check: "String",
      nullable: true,
      event: "changeScript"
    }
  },

  /**
   * Constructor
   */
  construct: function(caption="Event Recorder") {
    this.base(arguments);

    // workaround until icon theme can be mixed into application theme
    const aliasMgr = qx.util.AliasManager.getInstance();
    const existingAliases = aliasMgr.getAliases();
    const newAliases = {
      "eventrecorder.icon.record":  "cboulanger/eventrecorder/media-record.png",
      "eventrecorder.icon.start":   "cboulanger/eventrecorder/media-playback-start.png",
      "eventrecorder.icon.pause":   "cboulanger/eventrecorder/media-playback-pause.png",
      "eventrecorder.icon.stop":    "cboulanger/eventrecorder/media-playback-stop.png",
      "eventrecorder.icon.export":  "cboulanger/eventrecorder/document-save.png"
    };
    for (let [alias, base] of Object.entries(newAliases)) {
      if (!existingAliases[alias]) {
        aliasMgr.add(alias, base);
      }
    }

    this.set({
      caption,
      modal: false,
      showMinimize: false,
      showMaximize: false,
      height: 90,
      layout: new qx.ui.layout.HBox(5)
    });

    const recorder = new cboulanger.eventrecorder.Recorder();
    this.setRecorder(recorder);

    // do not record events for this widget
    const objectId = this.toHashCode();
    this.setQxObjectId(objectId);
    recorder.excludeIds(objectId);

    // caption
    this.bind("recorder.running", this, "caption", {
      converter: v => v ? "Recording ..." : caption
    });
    this.bind("player.running", this, "caption", {
      converter: v => v ? "Replaying ..." : caption
    });

    // record button
    let recordButton = new qx.ui.form.ToggleButton();
    recordButton.setIcon("eventrecorder.icon.record");
    recordButton.addListener("changeValue", this._toggleRecord, this);
    recorder.bind("running", recordButton, "value");
    // disable recording during playback
    this.bind("player.running", recordButton, "enabled");
    this.add(recordButton);


    // ADD PAUSE BUTTON

    // stop button
    let stopButton = new qx.ui.form.Button();
    stopButton.set({
      enabled: false,
      icon: "eventrecorder.icon.stop",
      toolTipText: "Stop recording"
    });
    const stopButtonState = () => {
      stopButton.setEnabled(
        recorder.isRunning() || (Boolean(this.getPlayer()) && this.getPlayer().isRunning())
      );
    };
    recorder.addListener("changeRunning", stopButtonState);
    stopButton.addListener("execute", this._stop, this);
    this.add(stopButton);

    // replay
    let replayButton = new qx.ui.form.ToggleButton();
    replayButton.addListener("changeValue", this._toggleReplay, this);
    replayButton.set({
      enabled: false,
      icon:"eventrecorder.icon.start",
      toolTipText: "Replay script"
    });
    // show replay button only if player is attached
    this.bind("player", replayButton, "visibility", {
      converter: v => v ? "visible" : "excluded"
    });
    // enable replay button only if we have a script
    this.bind("script", replayButton, "enabled", {
      converter: v => Boolean(v)
    });
    this.add(replayButton);

    // export button
    let exportButton = new qx.ui.form.Button();
    exportButton.set({
      enabled: false,
      icon:"eventrecorder.icon.export",
      toolTipText: "Export script"
    });
    exportButton.addListener("execute", this._export, this);
    // enable export button only if we have a script
    this.bind("script", exportButton, "enabled", {
      converter: v => Boolean(v)
    });
    this.add(exportButton);

    // add events for new players
    this.addListener("changePlayer", e => {
      if (e.getData()) {
        this.getPlayer().addListener("changeRunning", stopButtonState);
      }
    });
  },


  /**
   * The methods and simple properties of this class
   */
  members:
  {
    _getStoredScript() {
      return qx.bom.storage.Web.getLocal().getItem(cboulanger.eventrecorder.UiController.LOCAL_STORAGE_KEY);
    },

    _storeScript() {
      qx.bom.storage.Web.getLocal().setItem(cboulanger.eventrecorder.UiController.LOCAL_STORAGE_KEY, this.getScript());
    },

    _hasStoredScript() {
      return Boolean(this._getStoredScript());
    },

    /**
     * Event handler
     * @param e
     */
    _toggleRecord(e) {
      if (e.getData()) {
        // start
        if (this.getRecorder().isPaused()) {
          this.getRecorder().resume();
        } else {
          this.getRecorder().start();
        }
      } else {
        // pause
        this.getRecorder().pause();
      }
    },

    _stop() {
      if (this.getRecorder().isRunning()) {
        this.getRecorder().stop();
        this.setScript(this.getRecorder().getScript());
      }
      if (this.getPlayer().isRunning()) {
        this.getPlayer().stop();
      }
    },

    _toggleReplay(e) {
      if (e.getData()) {
        // start
        if (this.getScript()) {
          // reload
          this._storeScript();
          window.location.reload();
        }
      } else {
        // unpress button
        // todo: pause replay
      }
    },

    _export() {
      function download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
      download("eventrecorder.txt", this.getRecorder().getScript());
    }
  },

  /**
   * Will be called after class has been loaded, before application startup
   */
  defer: function() {
    if (!qx.core.Environment.get("module.objectid") || !qx.core.Environment.get("eventrecorder.enabled")) {
     return;
    }

    qx.bom.Lifecycle.onReady(() => {
      // show controller
      let controller = new cboulanger.eventrecorder.UiController();
      qx.core.Init.getApplication().getRoot().add(controller, {top:0, right:10});
      controller.show();

      // replay
      let storedScript = qx.bom.storage.Web.getLocal().getItem(cboulanger.eventrecorder.UiController.LOCAL_STORAGE_KEY);
      if (storedScript && storedScript.length) {
        cboulanger.eventrecorder.ObjectIdGenerator.getInstance().addListenerOnce("done", async () => {
          // add a player
          let player = new cboulanger.eventrecorder.player.Qooxdoo();
          controller.setPlayer(player);
          try {
            await player.replay(storedScript);
          } catch (e) {
            qx.core.Init.getApplication().error(e);
          }
          qx.bom.storage.Web.getLocal().removeItem(cboulanger.eventrecorder.UiController.LOCAL_STORAGE_KEY);
        });
      }
    });
  }
});
