(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../File/File"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../File/File"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.File);
    global.Document = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _File) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _File = _interopRequireDefault(_File);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  class Document extends _File.default {
    parseXMLObject(xmlObject) {
      var _a = xmlObject.StudentAttachedDocumentData[0].DocumentDatas[0].DocumentData;

      var _f = document => {
        return {
          file: {
            name: document['@_FileName'][0],
            type: document['@_DocType'][0],
            date: new Date(document['@_DocDate'][0])
          },
          category: document['@_Category'][0],
          notes: document['@_Notes'][0],
          base64: document.Base64Code[0]
        };
      };

      var _r = [];

      for (var _i = 0; _i < _a.length; _i++) {
        _r.push(_f(_a[_i], _i, _a));
      }

      return _r;
    }

    constructor(xmlObj, credentials) {
      super(credentials, xmlObj['@_DocumentGU'][0], 'GetContentOfAttachedDoc');
      /**
       * The properties of the file
       * @public
       * @readonly
       * @property {string} name The name of the file
       * @property {string} type The file type
       * @property {Date} date The date the file was created
       */

      this.file = {
        name: xmlObj['@_DocumentFileName'][0],
        type: xmlObj['@_DocumentType'][0],
        date: new Date(xmlObj['@_DocumentDate'][0])
      };
      /**
       * The comment included in the document
       * @public
       * @readonly
       * @type {string}
       */

      this.comment = xmlObj['@_DocumentComment'][0];
    }

  }

  _exports.default = Document;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TdHVkZW50VnVlL0RvY3VtZW50L0RvY3VtZW50LnRzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiRmlsZSIsInBhcnNlWE1MT2JqZWN0IiwieG1sT2JqZWN0IiwiU3R1ZGVudEF0dGFjaGVkRG9jdW1lbnREYXRhIiwiRG9jdW1lbnREYXRhcyIsIkRvY3VtZW50RGF0YSIsImRvY3VtZW50IiwiZmlsZSIsIm5hbWUiLCJ0eXBlIiwiZGF0ZSIsIkRhdGUiLCJjYXRlZ29yeSIsIm5vdGVzIiwiYmFzZTY0IiwiQmFzZTY0Q29kZSIsImNvbnN0cnVjdG9yIiwieG1sT2JqIiwiY3JlZGVudGlhbHMiLCJjb21tZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtlLFFBQU1BLFFBQU4sU0FBdUJDLGFBQXZCLENBQTRDO0FBUS9DQyxJQUFBQSxjQUFjLENBQUNDLFNBQUQsRUFBbUM7QUFBQSxlQUNsREEsU0FBUyxDQUFDQywyQkFBVixDQUFzQyxDQUF0QyxFQUF5Q0MsYUFBekMsQ0FBdUQsQ0FBdkQsRUFBMERDLFlBRFI7O0FBQUEsZUFDMEJDLFFBQUQ7QUFBQSxlQUFlO0FBQy9GQyxVQUFBQSxJQUFJLEVBQUU7QUFDSkMsWUFBQUEsSUFBSSxFQUFFRixRQUFRLENBQUMsWUFBRCxDQUFSLENBQXVCLENBQXZCLENBREY7QUFFSkcsWUFBQUEsSUFBSSxFQUFFSCxRQUFRLENBQUMsV0FBRCxDQUFSLENBQXNCLENBQXRCLENBRkY7QUFHSkksWUFBQUEsSUFBSSxFQUFFLElBQUlDLElBQUosQ0FBU0wsUUFBUSxDQUFDLFdBQUQsQ0FBUixDQUFzQixDQUF0QixDQUFUO0FBSEYsV0FEeUY7QUFNL0ZNLFVBQUFBLFFBQVEsRUFBRU4sUUFBUSxDQUFDLFlBQUQsQ0FBUixDQUF1QixDQUF2QixDQU5xRjtBQU8vRk8sVUFBQUEsS0FBSyxFQUFFUCxRQUFRLENBQUMsU0FBRCxDQUFSLENBQW9CLENBQXBCLENBUHdGO0FBUS9GUSxVQUFBQSxNQUFNLEVBQUVSLFFBQVEsQ0FBQ1MsVUFBVCxDQUFvQixDQUFwQjtBQVJ1RixTQUFmO0FBQUEsT0FEekI7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUN6RDtBQVVEOztBQUNNQyxJQUFBQSxXQUFXLENBQ2hCQyxNQURnQixFQUVoQkMsV0FGZ0IsRUFHaEI7QUFDQSxZQUFNQSxXQUFOLEVBQW1CRCxNQUFNLENBQUMsY0FBRCxDQUFOLENBQXVCLENBQXZCLENBQW5CLEVBQThDLHlCQUE5QztBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksV0FBS1YsSUFBTCxHQUFZO0FBQ1ZDLFFBQUFBLElBQUksRUFBRVMsTUFBTSxDQUFDLG9CQUFELENBQU4sQ0FBNkIsQ0FBN0IsQ0FESTtBQUVWUixRQUFBQSxJQUFJLEVBQUVRLE1BQU0sQ0FBQyxnQkFBRCxDQUFOLENBQXlCLENBQXpCLENBRkk7QUFHVlAsUUFBQUEsSUFBSSxFQUFFLElBQUlDLElBQUosQ0FBU00sTUFBTSxDQUFDLGdCQUFELENBQU4sQ0FBeUIsQ0FBekIsQ0FBVDtBQUhJLE9BQVo7QUFNQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksV0FBS0UsT0FBTCxHQUFlRixNQUFNLENBQUMsbUJBQUQsQ0FBTixDQUE0QixDQUE1QixDQUFmO0FBQ0Q7O0FBL0N3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2luQ3JlZGVudGlhbHMgfSBmcm9tICcuLi8uLi91dGlscy9zb2FwL0NsaWVudC9DbGllbnQuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBGaWxlIGZyb20gJy4uL0ZpbGUvRmlsZSc7XHJcbmltcG9ydCB7IERvY3VtZW50RmlsZSB9IGZyb20gJy4vRG9jdW1lbnQuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IERvY3VtZW50RmlsZVhNTE9iamVjdCwgRG9jdW1lbnRYTUxPYmplY3QgfSBmcm9tICcuL0RvY3VtZW50LnhtbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEZpbGU8RG9jdW1lbnRGaWxlW10+IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgZmlsZToge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGF0ZTogRGF0ZTtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICB9O1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgY29tbWVudDogc3RyaW5nO1xyXG4gIHByb3RlY3RlZCBwYXJzZVhNTE9iamVjdCh4bWxPYmplY3Q6IERvY3VtZW50RmlsZVhNTE9iamVjdCkge1xyXG4gICAgcmV0dXJuIHhtbE9iamVjdC5TdHVkZW50QXR0YWNoZWREb2N1bWVudERhdGFbMF0uRG9jdW1lbnREYXRhc1swXS5Eb2N1bWVudERhdGEubWFwKChkb2N1bWVudCkgPT4gKHtcclxuICAgICAgZmlsZToge1xyXG4gICAgICAgIG5hbWU6IGRvY3VtZW50WydAX0ZpbGVOYW1lJ11bMF0sXHJcbiAgICAgICAgdHlwZTogZG9jdW1lbnRbJ0BfRG9jVHlwZSddWzBdLFxyXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKGRvY3VtZW50WydAX0RvY0RhdGUnXVswXSksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhdGVnb3J5OiBkb2N1bWVudFsnQF9DYXRlZ29yeSddWzBdLFxyXG4gICAgICBub3RlczogZG9jdW1lbnRbJ0BfTm90ZXMnXVswXSxcclxuICAgICAgYmFzZTY0OiBkb2N1bWVudC5CYXNlNjRDb2RlWzBdLFxyXG4gICAgfSkpO1xyXG4gIH1cclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICB4bWxPYmo6IERvY3VtZW50WE1MT2JqZWN0WydTdHVkZW50RG9jdW1lbnRzJ11bMF1bJ1N0dWRlbnREb2N1bWVudERhdGFzJ11bMF1bJ1N0dWRlbnREb2N1bWVudERhdGEnXVswXSxcclxuICAgIGNyZWRlbnRpYWxzOiBMb2dpbkNyZWRlbnRpYWxzXHJcbiAgKSB7XHJcbiAgICBzdXBlcihjcmVkZW50aWFscywgeG1sT2JqWydAX0RvY3VtZW50R1UnXVswXSwgJ0dldENvbnRlbnRPZkF0dGFjaGVkRG9jJyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcHJvcGVydGllcyBvZiB0aGUgZmlsZVxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZmlsZVxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHR5cGUgVGhlIGZpbGUgdHlwZVxyXG4gICAgICogQHByb3BlcnR5IHtEYXRlfSBkYXRlIFRoZSBkYXRlIHRoZSBmaWxlIHdhcyBjcmVhdGVkXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZmlsZSA9IHtcclxuICAgICAgbmFtZTogeG1sT2JqWydAX0RvY3VtZW50RmlsZU5hbWUnXVswXSxcclxuICAgICAgdHlwZTogeG1sT2JqWydAX0RvY3VtZW50VHlwZSddWzBdLFxyXG4gICAgICBkYXRlOiBuZXcgRGF0ZSh4bWxPYmpbJ0BfRG9jdW1lbnREYXRlJ11bMF0pLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb21tZW50IGluY2x1ZGVkIGluIHRoZSBkb2N1bWVudFxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbW1lbnQgPSB4bWxPYmpbJ0BfRG9jdW1lbnRDb21tZW50J11bMF07XHJcbiAgfVxyXG59XHJcbiJdfQ==