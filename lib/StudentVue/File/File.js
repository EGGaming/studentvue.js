(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../utils/soap/soap"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../utils/soap/soap"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.soap);
    global.File = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _soap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _soap = _interopRequireDefault(_soap);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * File class
   * @abstract
   * @extends {soap.Client}
   * @constructor
   */
  class File extends _soap.default.Client {
    constructor(credentials, documentGu, methodName) {
      super(credentials);
      /**
       * The DocumentGU of the file so that it can be fetched from synergy servers
       * This value is important for `File.get()` method. You cannot fetch the file without it
       * @public
       * @readonly
       * @type {string}
       */

      this.documentGu = documentGu;
      /**
       * Synergy servers have different methods for retrieving files. For example,
       *
       * To retrieve a document, there is a specific method for it: `GetContentOfAttachedDoc`
       *
       * To retrieve a report card, there is a specific method for it: `GetReportCardDocumentData`
       *
       * Therefore, methodName must be defined to get retrieve the file data. See how methodName is implemented
       * in `Document.ts` and `ReportCard.ts`
       * @private
       * @readonly
       * @type {string}
       */

      this.methodName = methodName;
    }
    /**
     * Parse the XML object to translate it into an ordinary object. This method must be written for every class that extends Document (which gets the file from synergy servers using a POST fetch request)
     * @param {unknown} xmlObject The XML Object passed after parsing
     * @protected
     * @returns {T} Returns a reformatted XML object to make it easier for code
     * @description
     * ```js
     * const xmlObject = await super.processRequest({...}); // { "@_Attribute": [{ "@_Nested": [{...}, {...}]}]}
     * parseXMLObject(xmlObject); // { attribute: { nested: [{...}, {...}] } }
     *
     * ```
     */


    /**
     * Retrieve the file from synergy servers. After retrieving the xmlObject, this method calls parseXMLObject which must be defined to parse the xmlObject into a readable, typesafe object.
     * @public
     * @returns {Promise<T>} Returns a base64 object
     * @description
     * ```js
     * const base64 = await document.get(); // { attribute: { nested: {...} }, base64: "base64 code" }
     * ```
     */
    get() {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: this.methodName,
          paramStr: {
            childIntId: 0,
            DocumentGU: this.documentGu
          }
        }).then(base64Data => {
          res(this.parseXMLObject(base64Data));
        }).catch(rej);
      });
    }

  }

  _exports.default = File;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TdHVkZW50VnVlL0ZpbGUvRmlsZS50cyJdLCJuYW1lcyI6WyJGaWxlIiwic29hcCIsIkNsaWVudCIsImNvbnN0cnVjdG9yIiwiY3JlZGVudGlhbHMiLCJkb2N1bWVudEd1IiwibWV0aG9kTmFtZSIsImdldCIsIlByb21pc2UiLCJyZXMiLCJyZWoiLCJwcm9jZXNzUmVxdWVzdCIsInBhcmFtU3RyIiwiY2hpbGRJbnRJZCIsIkRvY3VtZW50R1UiLCJ0aGVuIiwiYmFzZTY0RGF0YSIsInBhcnNlWE1MT2JqZWN0IiwiY2F0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsUUFBZUEsSUFBZixTQUErQkMsY0FBS0MsTUFBcEMsQ0FBMkM7QUFLakRDLElBQUFBLFdBQVcsQ0FBQ0MsV0FBRCxFQUFnQ0MsVUFBaEMsRUFBb0RDLFVBQXBELEVBQXdFO0FBQ3hGLFlBQU1GLFdBQU47QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDSSxXQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLFdBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNTQyxJQUFBQSxHQUFHLEdBQWU7QUFDdkIsYUFBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFDL0IsY0FDR0MsY0FESCxDQUMyQztBQUN2Q0wsVUFBQUEsVUFBVSxFQUFFLEtBQUtBLFVBRHNCO0FBRXZDTSxVQUFBQSxRQUFRLEVBQUU7QUFBRUMsWUFBQUEsVUFBVSxFQUFFLENBQWQ7QUFBaUJDLFlBQUFBLFVBQVUsRUFBRSxLQUFLVDtBQUFsQztBQUY2QixTQUQzQyxFQUtHVSxJQUxILENBS1NDLFVBQUQsSUFBZ0I7QUFDcEJQLFVBQUFBLEdBQUcsQ0FBQyxLQUFLUSxjQUFMLENBQW9CRCxVQUFwQixDQUFELENBQUg7QUFDRCxTQVBILEVBUUdFLEtBUkgsQ0FRU1IsR0FSVDtBQVNELE9BVk0sQ0FBUDtBQVdEOztBQXBFdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpbkNyZWRlbnRpYWxzIH0gZnJvbSAnLi4vLi4vdXRpbHMvc29hcC9DbGllbnQvQ2xpZW50LmludGVyZmFjZXMnO1xyXG5pbXBvcnQgc29hcCBmcm9tICcuLi8uLi91dGlscy9zb2FwL3NvYXAnO1xyXG5cclxuLyoqXHJcbiAqIEZpbGUgY2xhc3NcclxuICogQGFic3RyYWN0XHJcbiAqIEBleHRlbmRzIHtzb2FwLkNsaWVudH1cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBGaWxlPFQ+IGV4dGVuZHMgc29hcC5DbGllbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBkb2N1bWVudEd1OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgbWV0aG9kTmFtZTogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoY3JlZGVudGlhbHM6IExvZ2luQ3JlZGVudGlhbHMsIGRvY3VtZW50R3U6IHN0cmluZywgbWV0aG9kTmFtZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlcihjcmVkZW50aWFscyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgRG9jdW1lbnRHVSBvZiB0aGUgZmlsZSBzbyB0aGF0IGl0IGNhbiBiZSBmZXRjaGVkIGZyb20gc3luZXJneSBzZXJ2ZXJzXHJcbiAgICAgKiBUaGlzIHZhbHVlIGlzIGltcG9ydGFudCBmb3IgYEZpbGUuZ2V0KClgIG1ldGhvZC4gWW91IGNhbm5vdCBmZXRjaCB0aGUgZmlsZSB3aXRob3V0IGl0XHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZG9jdW1lbnRHdSA9IGRvY3VtZW50R3U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTeW5lcmd5IHNlcnZlcnMgaGF2ZSBkaWZmZXJlbnQgbWV0aG9kcyBmb3IgcmV0cmlldmluZyBmaWxlcy4gRm9yIGV4YW1wbGUsXHJcbiAgICAgKlxyXG4gICAgICogVG8gcmV0cmlldmUgYSBkb2N1bWVudCwgdGhlcmUgaXMgYSBzcGVjaWZpYyBtZXRob2QgZm9yIGl0OiBgR2V0Q29udGVudE9mQXR0YWNoZWREb2NgXHJcbiAgICAgKlxyXG4gICAgICogVG8gcmV0cmlldmUgYSByZXBvcnQgY2FyZCwgdGhlcmUgaXMgYSBzcGVjaWZpYyBtZXRob2QgZm9yIGl0OiBgR2V0UmVwb3J0Q2FyZERvY3VtZW50RGF0YWBcclxuICAgICAqXHJcbiAgICAgKiBUaGVyZWZvcmUsIG1ldGhvZE5hbWUgbXVzdCBiZSBkZWZpbmVkIHRvIGdldCByZXRyaWV2ZSB0aGUgZmlsZSBkYXRhLiBTZWUgaG93IG1ldGhvZE5hbWUgaXMgaW1wbGVtZW50ZWRcclxuICAgICAqIGluIGBEb2N1bWVudC50c2AgYW5kIGBSZXBvcnRDYXJkLnRzYFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy5tZXRob2ROYW1lID0gbWV0aG9kTmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnNlIHRoZSBYTUwgb2JqZWN0IHRvIHRyYW5zbGF0ZSBpdCBpbnRvIGFuIG9yZGluYXJ5IG9iamVjdC4gVGhpcyBtZXRob2QgbXVzdCBiZSB3cml0dGVuIGZvciBldmVyeSBjbGFzcyB0aGF0IGV4dGVuZHMgRG9jdW1lbnQgKHdoaWNoIGdldHMgdGhlIGZpbGUgZnJvbSBzeW5lcmd5IHNlcnZlcnMgdXNpbmcgYSBQT1NUIGZldGNoIHJlcXVlc3QpXHJcbiAgICogQHBhcmFtIHt1bmtub3dufSB4bWxPYmplY3QgVGhlIFhNTCBPYmplY3QgcGFzc2VkIGFmdGVyIHBhcnNpbmdcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICogQHJldHVybnMge1R9IFJldHVybnMgYSByZWZvcm1hdHRlZCBYTUwgb2JqZWN0IHRvIG1ha2UgaXQgZWFzaWVyIGZvciBjb2RlXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogYGBganNcclxuICAgKiBjb25zdCB4bWxPYmplY3QgPSBhd2FpdCBzdXBlci5wcm9jZXNzUmVxdWVzdCh7Li4ufSk7IC8vIHsgXCJAX0F0dHJpYnV0ZVwiOiBbeyBcIkBfTmVzdGVkXCI6IFt7Li4ufSwgey4uLn1dfV19XHJcbiAgICogcGFyc2VYTUxPYmplY3QoeG1sT2JqZWN0KTsgLy8geyBhdHRyaWJ1dGU6IHsgbmVzdGVkOiBbey4uLn0sIHsuLi59XSB9IH1cclxuICAgKlxyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBwYXJzZVhNTE9iamVjdCh4bWxPYmplY3Q6IHVua25vd24pOiBUO1xyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWV2ZSB0aGUgZmlsZSBmcm9tIHN5bmVyZ3kgc2VydmVycy4gQWZ0ZXIgcmV0cmlldmluZyB0aGUgeG1sT2JqZWN0LCB0aGlzIG1ldGhvZCBjYWxscyBwYXJzZVhNTE9iamVjdCB3aGljaCBtdXN0IGJlIGRlZmluZWQgdG8gcGFyc2UgdGhlIHhtbE9iamVjdCBpbnRvIGEgcmVhZGFibGUsIHR5cGVzYWZlIG9iamVjdC5cclxuICAgKiBAcHVibGljXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8VD59IFJldHVybnMgYSBiYXNlNjQgb2JqZWN0XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogYGBganNcclxuICAgKiBjb25zdCBiYXNlNjQgPSBhd2FpdCBkb2N1bWVudC5nZXQoKTsgLy8geyBhdHRyaWJ1dGU6IHsgbmVzdGVkOiB7Li4ufSB9LCBiYXNlNjQ6IFwiYmFzZTY0IGNvZGVcIiB9XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgcHVibGljIGdldCgpOiBQcm9taXNlPFQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgc3VwZXJcclxuICAgICAgICAucHJvY2Vzc1JlcXVlc3Q8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KHtcclxuICAgICAgICAgIG1ldGhvZE5hbWU6IHRoaXMubWV0aG9kTmFtZSxcclxuICAgICAgICAgIHBhcmFtU3RyOiB7IGNoaWxkSW50SWQ6IDAsIERvY3VtZW50R1U6IHRoaXMuZG9jdW1lbnRHdSB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGJhc2U2NERhdGEpID0+IHtcclxuICAgICAgICAgIHJlcyh0aGlzLnBhcnNlWE1MT2JqZWN0KGJhc2U2NERhdGEpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChyZWopO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==