import { LoginCredentials } from '../../utils/soap/Client/Client.interfaces';
import File from '../File/File';
import { DocumentFile } from './Document.interface';
import { DocumentFileXMLObject, DocumentXMLObject } from './Document.xml';

/**
 * Document
 * @class
 * @constructor
 * @extends {File<DocumentFile[]>}
 */
export default class Document extends File<DocumentFile[]> {
  /**
   * The properties of the file
   * @public
   * @readonly
   */
  public readonly file: {
    name: string;
    date: Date;
    type: string;
  };

  /**
   * The comment included in the document
   * @public
   * @readonly
   */
  public readonly comment: string;
  protected parseXMLObject(xmlObject: DocumentFileXMLObject) {
    return xmlObject.StudentAttachedDocumentData[0].DocumentDatas[0].DocumentData.map((document) => ({
      file: {
        name: document['@_FileName'][0],
        type: document['@_DocType'][0],
        date: new Date(document['@_DocDate'][0]),
      },
      category: document['@_Category'][0],
      notes: document['@_Notes'][0],
      base64: document.Base64Code[0],
    }));
  }
  public constructor(
    xmlObj: DocumentXMLObject['StudentDocuments'][0]['StudentDocumentDatas'][0]['StudentDocumentData'][0],
    credentials: LoginCredentials
  ) {
    super(credentials, xmlObj['@_DocumentGU'][0], 'GetContentOfAttachedDoc');
    this.file = {
      name: xmlObj['@_DocumentFileName'][0],
      type: xmlObj['@_DocumentType'][0],
      date: new Date(xmlObj['@_DocumentDate'][0]),
    };
    this.comment = xmlObj['@_DocumentComment'][0];
  }
}
