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
 * The base class of all player types
 * @require(qx.bom.Element)
 */
qx.Class.define("cboulanger.eventrecorder.player.Abstract", {
  extend : qx.core.Object,
  include : [cboulanger.eventrecorder.MHelperMethods],

  statics: {
    /**
     * Runs the given function in the interval until it returns true or the
     * given timeout is reached. Returns a promise that will resolve once the
     * function returns true or rejects if the timeout is reached.
     * @param fn {Function} Condition function
     * @param interval {Number} The interval in which to run the function. Defaults to 100 ms.
     * @param timeout {Number} The timeout in milliseconds. Defaults to 10 seconds
     * @param timeoutMsg {String|undefined} An optional addition to the timeout error message
     * @return {Promise}
     */
    waitForCondition: function(fn, interval=100, timeout=10000, timeoutMsg) {
      return new Promise(((resolve, reject) => {
        let intervalId = setInterval(() => {
          if (fn()) {
            clearInterval(intervalId);
            resolve();
          }
        }, interval);
        setTimeout(() => {
          clearInterval(intervalId);
          reject(new Error(`Timeout of ${timeout} ms has been reached${timeoutMsg?": "+timeoutMsg:""}`));
        }, timeout);
      }));
    }
  },

  properties: {
    /**
     * The timeout in milliseconds
     */
    timeout: {
      check: "Number",
      init: 10000
    },

    /**
     * The interval between checks if waiting for a condition to fulfil
     */
    interval: {
      check: "Number",
      init: 1000
    },

    /**
     * The delay between events
     */
    delay: {
      check: "number",
      init: 500
    }
  },

  /**
   * The methods and simple properties of this class
   */
  members :
  {

    /**
     * Given an array of script lines, return a piece of code that can be
     * pasted into a test suite.
     * @param {String[]} lines Array of script lines
     * @return {String}
     */
    generateScript(lines) {
      throw new Error("Method generateScript() must be implemented by subclass.");
    },

    /**
     * If the recorder is able to replay the generated script, override this
     * method and return true
     * @return {boolean}
     */
    canReplay() {
      return false;
    },

    /**
     * Implement in subclass if the recorder can replay the given script
     * @param script {Array} The script to replay, as an array of self-contained lines
     * @param delay {Number} The delay in miliseconds, defaults to 500
     * @return {Promise} Promise which resolves when the script has been replayed, or
     * rejects with an error
     */
    async replay(script, delay=500) {
      if (!this.canReplay()) {
        throw new Error("This recorder cannot replay the event log");
      }
      throw new Error("Method replay() must be implemented by subclass");
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
      // replay
      let storedScript = qx.bom.storage.Web.getLocal().getItem(cboulanger.eventrecorder.UiController.LOCAL_STORAGE_KEY);
      if (storedScript && storedScript.length) {
        cboulanger.eventrecorder.ObjectIdGenerator.getInstance().addListenerOnce("done", async () => {
          /*eslint no-alert: "off"*/
          let confirm = window.confirm("Press OK to start replay");
          if (confirm) {
            try {
              await (new cboulanger.eventrecorder.player.Qooxdoo()).replay(storedScript);
            } catch (e) {
              qx.core.Init.getApplication().error(e);
            }
          }
          qx.bom.storage.Web.getLocal().removeItem(cboulanger.eventrecorder.UiController.LOCAL_STORAGE_KEY);
        });
      }
    });
  }
});
