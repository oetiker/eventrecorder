/** <h3> Event recorder API Documentation </h3>
 *
 * See documentation in the readme.
 *
 * This library uses the following environment variables:
 *
 * <table>
 *   <tr>
 *     <td>"module.objectId": {Boolean}</td>
 *     <td>Must be true, otherwise the recorder cannot function</td>
 *   </tr>
 *   <tr>
 *     <td>"eventrecorder.enabled": {Boolean}</td>
 *     <td>Simple switch to dis-/enable the recorder</td>
 *   </tr>
 *   <tr>
 *     <td>"eventrecorder.hidden": {Boolean}</td>
 *     <td>Whether the controller is hidden. False by default</td>
 *   </tr>
 *   <tr>
 *     <td>"eventrecorder.mode": {String}</td>
 *     <td>Either "test" or "presentation" (See {@link cboulanger.eventrecorder.player.Abstract#mode}. Defaults to "presentation"</td></tr>
 *   <tr>
 *     <td>"eventrecorder.showProgress": {Boolean}</td>
 *     <td>If true, show a progress indicator</td>
 *   </tr>
 *   <tr>
 *     <td>"eventrecorder.gistId": {String}</td>
 *     <td>If given, load the script published at https://gist.github.com with this id.r</td>
 *   </tr>
 *   <tr>
 *     <td>"eventrecorder.autoplay": {Boolean}</td>
 *     <td>If true, start any preloaded script.</td>
 *   </tr>
 *   <tr>
 *     <td>"eventrecorder.scriptable": {Boolean}</td>
 *     <td>Whether the UI events of the recorder itself should be recorded</td>
 *   </tr>
 * </table>
 *
 */
