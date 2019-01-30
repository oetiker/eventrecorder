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
      check: "Number",
      init: 500
    },

    canReplay: {
      check: "Boolean",
      nullable: false,
      init: false,
      event: "changeCanReplay"
    }
  },

  /**
   * The methods and simple properties of this class
   */
  members :
  {

    /**
     * Replays the given script of intermediate code
     * @param script {String} The script to replay
     * @return {Promise} Promise which resolves when the script has been replayed, or
     * rejects with an error
     * @todo implement pausing
     */
    async replay(script) {
      this.setRunning(true);
      for (let line of script.split(/\n/)) {
        eval(this.generateReplayCode(line));
        await new Promise(resolve => qx.event.Timer.once(resolve, null, this.getDelay()));
      }
      this.setRunning(false);
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
    generateWaitForCode(condition) {
      return `await cboulanger.eventrecorder.player.Abstract.waitForCondition(()=>{${condition}},${this.getInterval()},${this.getTimeout()},condition);`;
    },

    /**
     * Given a line of intermediate code, return a line of javascript code that
     * can replay the corresponding user action.
     * @param code {String} A line of intermediate code
     * @return {String} A line of javascript code
     */
    generateReplayCode(code) {
      throw new Error("Method generateReplayCode() must be implemented by subclass");
    }
  }
});
