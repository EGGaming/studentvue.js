(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../utils/soap/soap", "../Attachment/Attachment", "../Icon/Icon"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../utils/soap/soap"), require("../Attachment/Attachment"), require("../Icon/Icon"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.soap, global.Attachment, global.Icon);
    global.Message = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _soap, _Attachment, _Icon) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _soap = _interopRequireDefault(_soap);
  _Attachment = _interopRequireDefault(_Attachment);
  _Icon = _interopRequireDefault(_Icon);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * Message class
   * This is only returned as an array in `Client.messages()` method
   * @constructor
   * @extends {soap.Client}
   */
  class Message extends _soap.default.Client {
    constructor(xmlObject, credentials, hostUrl) {
      super(credentials);
      /**
       * The URL to create POST fetch requests to synergy servers
       * @type {string}
       * @private
       * @readonly
       */

      this.hostUrl = hostUrl;
      /**
       * The message icon
       * @type {Icon}
       * @public
       * @readonly
       */

      this.icon = new _Icon.default(xmlObject['@_IconURL'][0], this.hostUrl);
      /**
       * The ID of the message
       * @type {string}
       * @public
       * @readonly
       */

      this.id = xmlObject['@_ID'][0];
      /**
       * The type of the message
       * @type {string}
       * @public
       * @readonly
       */

      this.type = xmlObject['@_Type'][0];
      /**
       * The date when the message was first posted
       * @type {Date}
       * @public
       * @readonly
       */

      this.beginDate = new Date(xmlObject['@_BeginDate'][0]);
      /**
       * The HTML content of the message
       * @type {string}
       * @public
       * @readonly
       */

      this.htmlContent = unescape(xmlObject['@_Content'][0]);
      /**
       * Whether the message has been read or not
       * @type {boolean}
       * @private
       */

      this.read = JSON.parse(xmlObject['@_Read'][0]);
      /**
       * Whether the message is deletable or not
       * @type {boolean}
       * @private
       */

      this.deletable = JSON.parse(xmlObject['@_Deletable'][0]);
      /**
       * The sender of the message
       * @public
       * @readonly
       * @type {object}
       * @property {string} name - The name of the sender
       * @property {string} staffGu - the staffGu of the sender
       * @property {string} email - The email of the sender
       * @property {string} smMsgPersonGu - The smMsgPersonGu of the sender. Don't know if this property has a real usage or not
       */

      this.from = {
        name: xmlObject['@_From'][0],
        staffGu: xmlObject['@_StaffGU'][0],
        smMsgPersonGu: xmlObject['@_SMMsgPersonGU'][0],
        email: xmlObject['@_Email'][0]
      };
      /**
       * The module of the sender
       * @type {string}
       * @public
       * @readonly
       */

      this.module = xmlObject['@_Module'][0];
      /**
       * The subject of the message
       * @public
       * @readonly
       * @type {object}
       * @property {string} html - The subject of the message with HTML
       * @property {string} raw - The subject of the message without HTML and formatting
       */

      this.subject = {
        html: xmlObject['@_Subject'][0],
        raw: xmlObject['@_SubjectNoHTML'][0]
      };
      /**
       * The attachments included in the message, if there are any.
       * @type {Attachment[]}
       * @public
       * @readonly
       */

      this.attachments = typeof xmlObject.AttachmentDatas[0] !== 'string' ? xmlObject.AttachmentDatas[0].AttachmentData.map(data => {
        return new _Attachment.default(data['@_AttachmentName'][0], data['@_SmAttachmentGU'][0], credentials);
      }) : [];
    }
    /**
     * Check if a message has been read
     * @returns {boolean} Returns a boolean declaring whether or not the message has been previously read
     */


    isRead() {
      return this.read;
    }
    /**
     * Check if a message is deletable
     * @returns {boolean} Returns a boolean declaring whether or not the message is deletable
     */


    isDeletable() {
      return this.deletable;
    }

    setRead(read) {
      this.read = read;
    }

    setDeletable(deletable) {
      this.deletable = deletable;
    }
    /**
     * Marks the message as read
     * @returns {true} Returns true to show that it has been marked as read
     * @description
     * ```js
     * const messages = await client.messages();
     * messages.every((msg) => msg.isRead()) // -> false
     * messages.forEach(async (msg) => !msg.isRead() && await msg.markAsRead());
     * messages.every((msg) => msg.isRead()) // -> true
     * const refetchedMessages = await client.messages(); // See if it updated on the server
     * messages.every((msg) => msg.isRead()) // -> true
     * ```
     * @description
     * ```tsx
     * // In a React project...
     * import React from 'react';
     *
     * const Message = (props) => {
     *  const { message } = props;
     *
     *  async function handleOnClick() {
     *    await message.markAsRead();
     *  }
     *
     *  return (
     *    <button onClick={handleOnClick} style={{ color: message.isRead() ? undefined : 'red' }}>
     *      <p>{message.subject.raw}</p>
     *    </button>
     *  )
     * }
     *
     * export default Message;
     * ```
     */


    markAsRead() {
      return new Promise((res, rej) => {
        if (this.read) {
          return res(true);
        }

        super.processRequest({
          methodName: 'UpdatePXPMessage',
          paramStr: {
            childIntId: 0,
            MessageListing: {
              '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              '@_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
              '@_ID': this.id,
              '@_Type': this.type,
              '@_MarkAsRead': 'true'
            }
          }
        }).then(() => {
          this.setRead(true);
          res(true);
        }).catch(rej);
      });
    }

  }

  _exports.default = Message;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TdHVkZW50VnVlL01lc3NhZ2UvTWVzc2FnZS50cyJdLCJuYW1lcyI6WyJNZXNzYWdlIiwic29hcCIsIkNsaWVudCIsImNvbnN0cnVjdG9yIiwieG1sT2JqZWN0IiwiY3JlZGVudGlhbHMiLCJob3N0VXJsIiwiaWNvbiIsIkljb24iLCJpZCIsInR5cGUiLCJiZWdpbkRhdGUiLCJEYXRlIiwiaHRtbENvbnRlbnQiLCJ1bmVzY2FwZSIsInJlYWQiLCJKU09OIiwicGFyc2UiLCJkZWxldGFibGUiLCJmcm9tIiwibmFtZSIsInN0YWZmR3UiLCJzbU1zZ1BlcnNvbkd1IiwiZW1haWwiLCJtb2R1bGUiLCJzdWJqZWN0IiwiaHRtbCIsInJhdyIsImF0dGFjaG1lbnRzIiwiQXR0YWNobWVudERhdGFzIiwiQXR0YWNobWVudERhdGEiLCJtYXAiLCJkYXRhIiwiQXR0YWNobWVudCIsImlzUmVhZCIsImlzRGVsZXRhYmxlIiwic2V0UmVhZCIsInNldERlbGV0YWJsZSIsIm1hcmtBc1JlYWQiLCJQcm9taXNlIiwicmVzIiwicmVqIiwicHJvY2Vzc1JlcXVlc3QiLCJtZXRob2ROYW1lIiwicGFyYW1TdHIiLCJjaGlsZEludElkIiwiTWVzc2FnZUxpc3RpbmciLCJ0aGVuIiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxRQUFNQSxPQUFOLFNBQXNCQyxjQUFLQyxNQUEzQixDQUFrQztBQWlDL0NDLElBQUFBLFdBQVcsQ0FDVEMsU0FEUyxFQUVUQyxXQUZTLEVBR1RDLE9BSFMsRUFJVDtBQUNBLFlBQU1ELFdBQU47QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksV0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLFdBQUtDLElBQUwsR0FBWSxJQUFJQyxhQUFKLENBQVNKLFNBQVMsQ0FB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SUFBRCxFQUFnQjtBQUM3QixXQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDRDs7QUFFT3NCLElBQUFBLFlBQVksQ0FBQ25CLFNBQUQsRUFBcUI7QUFDdkMsV0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDU29CLElBQUFBLFVBQVUsR0FBa0I7QUFDakMsYUFBTyxJQUFJQyxPQUFKLENBQWtCLENBQUNDLEdBQUQsRUFBTUMsR0FBTixLQUFjO0FBQ3JDLFlBQUksS0FBSzFCLElBQVQ7QUFBZSxpQkFBT3lCLEdBQUcsQ0FBQyxJQUFELENBQVY7QUFBZjs7QUFDQSxjQUNHRSxjQURILENBQ2tCO0FBQ2RDLFVBQUFBLFVBQVUsRUFBRSxrQkFERTtBQUVkQyxVQUFBQSxRQUFRLEVBQUU7QUFDUkMsWUFBQUEsVUFBVSxFQUFFLENBREo7QUFFUkMsWUFBQUEsY0FBYyxFQUFFO0FBQ2QsNkJBQWUsMkNBREQ7QUFFZCw2QkFBZSxrQ0FGRDtBQUdkLHNCQUFRLEtBQUtyQyxFQUhDO0FBSWQsd0JBQVUsS0FBS0MsSUFKRDtBQUtkLDhCQUFnQjtBQUxGO0FBRlI7QUFGSSxTQURsQixFQWNHcUMsSUFkSCxDQWNRLE1BQU07QUFDVixlQUFLWCxPQUFMLENBQWEsSUFBYjtBQUNBSSxVQUFBQSxHQUFHLENBQUMsSUFBRCxDQUFIO0FBQ0QsU0FqQkgsRUFrQkdRLEtBbEJILENBa0JTUCxHQWxCVDtBQW1CRCxPQXJCTSxDQUFQO0FBc0JEOztBQS9OOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpbkNyZWRlbnRpYWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvc29hcC9DbGllbnQvQ2xpZW50LmludGVyZmFjZXMnO1xyXG5pbXBvcnQgc29hcCBmcm9tICcuLi8uLi91dGlscy9zb2FwL3NvYXAnO1xyXG5pbXBvcnQgQXR0YWNobWVudCBmcm9tICcuLi9BdHRhY2htZW50L0F0dGFjaG1lbnQnO1xyXG5pbXBvcnQgeyBNZXNzYWdlWE1MT2JqZWN0IH0gZnJvbSAnLi9NZXNzYWdlLnhtbCc7XHJcbmltcG9ydCBJY29uIGZyb20gJy4uL0ljb24vSWNvbic7XHJcblxyXG4vKipcclxuICogTWVzc2FnZSBjbGFzc1xyXG4gKiBUaGlzIGlzIG9ubHkgcmV0dXJuZWQgYXMgYW4gYXJyYXkgaW4gYENsaWVudC5tZXNzYWdlcygpYCBtZXRob2RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBleHRlbmRzIHtzb2FwLkNsaWVudH1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBzb2FwLkNsaWVudCB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBob3N0VXJsOiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBpY29uOiBJY29uO1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IGJlZ2luRGF0ZTogRGF0ZTtcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IGh0bWxDb250ZW50OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZDogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSBkZWxldGFibGU6IGJvb2xlYW47XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBmcm9tOiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzdGFmZkd1OiBzdHJpbmc7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgc21Nc2dQZXJzb25HdTogc3RyaW5nO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBtb2R1bGU6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IHN1YmplY3Q6IHtcclxuICAgIGh0bWw6IHN0cmluZztcclxuICAgIHJhdzogc3RyaW5nO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBhdHRhY2htZW50czogQXR0YWNobWVudFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHhtbE9iamVjdDogTWVzc2FnZVhNTE9iamVjdFsnUFhQTWVzc2FnZXNEYXRhJ11bMF1bJ01lc3NhZ2VMaXN0aW5ncyddWzBdWydNZXNzYWdlTGlzdGluZyddWzBdLFxyXG4gICAgY3JlZGVudGlhbHM6IExvZ2luQ3JlZGVudGlhbHMsXHJcbiAgICBob3N0VXJsOiBzdHJpbmdcclxuICApIHtcclxuICAgIHN1cGVyKGNyZWRlbnRpYWxzKTtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIFVSTCB0byBjcmVhdGUgUE9TVCBmZXRjaCByZXF1ZXN0cyB0byBzeW5lcmd5IHNlcnZlcnNcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaG9zdFVybCA9IGhvc3RVcmw7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtZXNzYWdlIGljb25cclxuICAgICAqIEB0eXBlIHtJY29ufVxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaWNvbiA9IG5ldyBJY29uKHhtbE9iamVjdFsnQF9JY29uVVJMJ11bMF0sIHRoaXMuaG9zdFVybCk7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBJRCBvZiB0aGUgbWVzc2FnZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aGlzLmlkID0geG1sT2JqZWN0WydAX0lEJ11bMF07XHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBtZXNzYWdlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZSA9IHhtbE9iamVjdFsnQF9UeXBlJ11bMF07XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkYXRlIHdoZW4gdGhlIG1lc3NhZ2Ugd2FzIGZpcnN0IHBvc3RlZFxyXG4gICAgICogQHR5cGUge0RhdGV9XHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdGhpcy5iZWdpbkRhdGUgPSBuZXcgRGF0ZSh4bWxPYmplY3RbJ0BfQmVnaW5EYXRlJ11bMF0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgSFRNTCBjb250ZW50IG9mIHRoZSBtZXNzYWdlXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaHRtbENvbnRlbnQgPSB1bmVzY2FwZSh4bWxPYmplY3RbJ0BfQ29udGVudCddWzBdKTtcclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGUgbWVzc2FnZSBoYXMgYmVlbiByZWFkIG9yIG5vdFxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlYWQgPSBKU09OLnBhcnNlKHhtbE9iamVjdFsnQF9SZWFkJ11bMF0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBtZXNzYWdlIGlzIGRlbGV0YWJsZSBvciBub3RcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5kZWxldGFibGUgPSBKU09OLnBhcnNlKHhtbE9iamVjdFsnQF9EZWxldGFibGUnXVswXSk7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2VcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNlbmRlclxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHN0YWZmR3UgLSB0aGUgc3RhZmZHdSBvZiB0aGUgc2VuZGVyXHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gZW1haWwgLSBUaGUgZW1haWwgb2YgdGhlIHNlbmRlclxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHNtTXNnUGVyc29uR3UgLSBUaGUgc21Nc2dQZXJzb25HdSBvZiB0aGUgc2VuZGVyLiBEb24ndCBrbm93IGlmIHRoaXMgcHJvcGVydHkgaGFzIGEgcmVhbCB1c2FnZSBvciBub3RcclxuICAgICAqL1xyXG4gICAgdGhpcy5mcm9tID0ge1xyXG4gICAgICBuYW1lOiB4bWxPYmplY3RbJ0BfRnJvbSddWzBdLFxyXG4gICAgICBzdGFmZkd1OiB4bWxPYmplY3RbJ0BfU3RhZmZHVSddWzBdLFxyXG4gICAgICBzbU1zZ1BlcnNvbkd1OiB4bWxPYmplY3RbJ0BfU01Nc2dQZXJzb25HVSddWzBdLFxyXG4gICAgICBlbWFpbDogeG1sT2JqZWN0WydAX0VtYWlsJ11bMF0sXHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbW9kdWxlIG9mIHRoZSBzZW5kZXJcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdGhpcy5tb2R1bGUgPSB4bWxPYmplY3RbJ0BfTW9kdWxlJ11bMF07XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdWJqZWN0IG9mIHRoZSBtZXNzYWdlXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gaHRtbCAtIFRoZSBzdWJqZWN0IG9mIHRoZSBtZXNzYWdlIHdpdGggSFRNTFxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHJhdyAtIFRoZSBzdWJqZWN0IG9mIHRoZSBtZXNzYWdlIHdpdGhvdXQgSFRNTCBhbmQgZm9ybWF0dGluZ1xyXG4gICAgICovXHJcbiAgICB0aGlzLnN1YmplY3QgPSB7XHJcbiAgICAgIGh0bWw6IHhtbE9iamVjdFsnQF9TdWJqZWN0J11bMF0sXHJcbiAgICAgIHJhdzogeG1sT2JqZWN0WydAX1N1YmplY3ROb0hUTUwnXVswXSxcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhdHRhY2htZW50cyBpbmNsdWRlZCBpbiB0aGUgbWVzc2FnZSwgaWYgdGhlcmUgYXJlIGFueS5cclxuICAgICAqIEB0eXBlIHtBdHRhY2htZW50W119XHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdGhpcy5hdHRhY2htZW50cyA9XHJcbiAgICAgIHR5cGVvZiB4bWxPYmplY3QuQXR0YWNobWVudERhdGFzWzBdICE9PSAnc3RyaW5nJ1xyXG4gICAgICAgID8geG1sT2JqZWN0LkF0dGFjaG1lbnREYXRhc1swXS5BdHRhY2htZW50RGF0YS5tYXAoXHJcbiAgICAgICAgICAgIChkYXRhKSA9PiBuZXcgQXR0YWNobWVudChkYXRhWydAX0F0dGFjaG1lbnROYW1lJ11bMF0sIGRhdGFbJ0BfU21BdHRhY2htZW50R1UnXVswXSwgY3JlZGVudGlhbHMpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgOiBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgbWVzc2FnZSBoYXMgYmVlbiByZWFkXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYSBib29sZWFuIGRlY2xhcmluZyB3aGV0aGVyIG9yIG5vdCB0aGUgbWVzc2FnZSBoYXMgYmVlbiBwcmV2aW91c2x5IHJlYWRcclxuICAgKi9cclxuICBwdWJsaWMgaXNSZWFkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVhZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgbWVzc2FnZSBpcyBkZWxldGFibGVcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBhIGJvb2xlYW4gZGVjbGFyaW5nIHdoZXRoZXIgb3Igbm90IHRoZSBtZXNzYWdlIGlzIGRlbGV0YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBpc0RlbGV0YWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0YWJsZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0UmVhZChyZWFkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnJlYWQgPSByZWFkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXREZWxldGFibGUoZGVsZXRhYmxlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRlbGV0YWJsZSA9IGRlbGV0YWJsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcmtzIHRoZSBtZXNzYWdlIGFzIHJlYWRcclxuICAgKiBAcmV0dXJucyB7dHJ1ZX0gUmV0dXJucyB0cnVlIHRvIHNob3cgdGhhdCBpdCBoYXMgYmVlbiBtYXJrZWQgYXMgcmVhZFxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGBgYGpzXHJcbiAgICogY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBjbGllbnQubWVzc2FnZXMoKTtcclxuICAgKiBtZXNzYWdlcy5ldmVyeSgobXNnKSA9PiBtc2cuaXNSZWFkKCkpIC8vIC0+IGZhbHNlXHJcbiAgICogbWVzc2FnZXMuZm9yRWFjaChhc3luYyAobXNnKSA9PiAhbXNnLmlzUmVhZCgpICYmIGF3YWl0IG1zZy5tYXJrQXNSZWFkKCkpO1xyXG4gICAqIG1lc3NhZ2VzLmV2ZXJ5KChtc2cpID0+IG1zZy5pc1JlYWQoKSkgLy8gLT4gdHJ1ZVxyXG4gICAqIGNvbnN0IHJlZmV0Y2hlZE1lc3NhZ2VzID0gYXdhaXQgY2xpZW50Lm1lc3NhZ2VzKCk7IC8vIFNlZSBpZiBpdCB1cGRhdGVkIG9uIHRoZSBzZXJ2ZXJcclxuICAgKiBtZXNzYWdlcy5ldmVyeSgobXNnKSA9PiBtc2cuaXNSZWFkKCkpIC8vIC0+IHRydWVcclxuICAgKiBgYGBcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBgYGB0c3hcclxuICAgKiAvLyBJbiBhIFJlYWN0IHByb2plY3QuLi5cclxuICAgKiBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG4gICAqXHJcbiAgICogY29uc3QgTWVzc2FnZSA9IChwcm9wcykgPT4ge1xyXG4gICAqICBjb25zdCB7IG1lc3NhZ2UgfSA9IHByb3BzO1xyXG4gICAqXHJcbiAgICogIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZU9uQ2xpY2soKSB7XHJcbiAgICogICAgYXdhaXQgbWVzc2FnZS5tYXJrQXNSZWFkKCk7XHJcbiAgICogIH1cclxuICAgKlxyXG4gICAqICByZXR1cm4gKFxyXG4gICAqICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlT25DbGlja30gc3R5bGU9e3sgY29sb3I6IG1lc3NhZ2UuaXNSZWFkKCkgPyB1bmRlZmluZWQgOiAncmVkJyB9fT5cclxuICAgKiAgICAgIDxwPnttZXNzYWdlLnN1YmplY3QucmF3fTwvcD5cclxuICAgKiAgICA8L2J1dHRvbj5cclxuICAgKiAgKVxyXG4gICAqIH1cclxuICAgKlxyXG4gICAqIGV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgcHVibGljIG1hcmtBc1JlYWQoKTogUHJvbWlzZTx0cnVlPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dHJ1ZT4oKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnJlYWQpIHJldHVybiByZXModHJ1ZSk7XHJcbiAgICAgIHN1cGVyXHJcbiAgICAgICAgLnByb2Nlc3NSZXF1ZXN0KHtcclxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdVcGRhdGVQWFBNZXNzYWdlJyxcclxuICAgICAgICAgIHBhcmFtU3RyOiB7XHJcbiAgICAgICAgICAgIGNoaWxkSW50SWQ6IDAsXHJcbiAgICAgICAgICAgIE1lc3NhZ2VMaXN0aW5nOiB7XHJcbiAgICAgICAgICAgICAgJ0BfeG1sbnM6eHNpJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlJyxcclxuICAgICAgICAgICAgICAnQF94bWxuczp4c2QnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEnLFxyXG4gICAgICAgICAgICAgICdAX0lEJzogdGhpcy5pZCxcclxuICAgICAgICAgICAgICAnQF9UeXBlJzogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICAgICdAX01hcmtBc1JlYWQnOiAndHJ1ZScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXRSZWFkKHRydWUpO1xyXG4gICAgICAgICAgcmVzKHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKHJlaik7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19