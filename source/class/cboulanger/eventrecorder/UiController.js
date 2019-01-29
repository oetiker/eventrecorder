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
 * @asset(qx/icon/${qx.icontheme}/icon/32/actions/media-record.png)
 * @asset(qx/icon/${qx.icontheme}/icon/32/actions/media-playback-start.png)
 * @asset(qx/icon/${qx.icontheme}/icon/32/actions/media-playback-pause.png)
 * @asset(qx/icon/${qx.icontheme}/icon/32/actions/media-playback-stop.png)
 */
qx.Class.define("cboulanger.eventrecorder.UiController", {
  extend : qx.ui.window.Window,

  statics: {
    LOCAL_STORAGE_KEY: "cboulanger.eventrecorder.UiController.script"
  },

  properties: {
    player: {
      check: "cboulanger.eventrecorder.player.Abstract",
      nullable: true
    }
  },

  /**
   * Constructor
   */
  construct: function(caption="Event Recorder") {
    this.base(arguments);
    this.set({
      caption,
      modal: false,
      showMinimize: false,
      showMaximize: false,
      layout: new qx.ui.layout.HBox(5)
    });

    this._recorder = new cboulanger.eventrecorder.Recorder();

    // do not record events for this widget
    const objectId = this.toHashCode();
    this.setQxObjectId(objectId);
    this._recorder.excludeIds(objectId);

    let startButton = new qx.ui.form.ToggleButton();
    startButton.setIcon("icon/32/actions/media-record.png");
    startButton.addListener("changeValue", this.toggle, this);
    this._startButton = startButton;
    this.add(startButton);

    let stopButton = new qx.ui.form.Button();
    stopButton.setIcon("icon/32/actions/media-playback-stop.png");
    stopButton.set({enabled:false});
    stopButton.addListener("execute", this.stop, this);
    this._stopButton = stopButton;
    this.add(stopButton);

    let replayButton = new qx.ui.form.Button();
    replayButton.setIcon("icon/32/actions/media-playback-start.png");
    replayButton.set({enabled:false});
    replayButton.addListener("execute", this.replay, this);
    this._replayButton = replayButton;
    this.add(replayButton);

    let exportButton = new qx.ui.form.Button();
    exportButton.setIcon("icon/32/actions/media-playback-start.png");
    exportButton.set({enabled:false});
    exportButton.addListener("execute", this.export, this);
    this._exportButton = exportButton;
    this.add(exportButton);
  },


  /**
   * The methods and simple properties of this class
   */
  members:
  {
    _recorder: null,
    _startButton: null,
    _stopButton: null,
    _replayButton: null,
    _exportButton: null,

    toggle(e) {
      this._replayButton.setEnabled(false);
      this._exportButton.setEnabled(false);
      if (e.getData()) {
        if (this._recorder.isPaused()) {
          this._recorder.resume();
        } else {
          this._recorder.start();
        }
        this._startButton.setIcon("icon/32/actions/media-record.png");
        this._stopButton.setEnabled(true);
      } else {
        this._recorder.pause();
        this._startButton.s.setIcon("icon/32/actions/media-playback-pause.png");
      }
    },

    stop() {
      this._startButton.set({
        enabled: true,
        value: false,
        label: "Start"
      });
      this._stopButton.setEnabled(false);
      this._exportButton.setEnabled(true);
      this._replayButton.setEnabled(Boolean(this.getPlayer()));
      this._recorder.stop();
    },

    replay() {
      let confirmed = confirm("This will reload the application and replay the event log");
      if (confirmed) {
        qx.bom.storage.Web.getLocal().setItem(cboulanger.eventrecorder.UiController.LOCAL_STORAGE_KEY, this._recorder.getScript());
        window.location.reload();
      }
    },

    export() {
      function download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
      download("eventrecorder.txt", this._recorder.getScript());
    }
  },

  /**
   * Will be called after class has been loaded, before application startup
   */
  defer: function() {
    if (!qx.core.Environment.get("module.objectid") || !qx.core.Environment.get("eventrecorder.enabled")) {
      return;
    }
    return;
    let controller = new cboulanger.eventrecorder.UiController();
    controller.setPlayer(new cboulanger.eventrecorder.player.Qooxdoo());
    qx.core.Init.getApplication().getRoot().add(controller, {top:0, right:0});
    controller.show();
  }
});
