import { LoginCredentials } from '../../utils/soap/Client/Client.interfaces';
import soap from '../../utils/soap/soap';
import Attachment from '../Attachment/Attachment';
import { MessageXMLObject } from './Message.xml';
import Icon from '../Icon/Icon';
/**
 * Message class
 * This is only returned as an array in `Client.messages()` method
 * @constructor
 * @extends {soap.Client}
 */
export default class Message extends soap.Client {
    private readonly hostUrl;
    readonly icon: Icon;
    readonly id: string;
    readonly beginDate: Date;
    readonly type: string;
    readonly htmlContent: string;
    private read;
    private deletable;
    readonly from: {
        name: string;
        staffGu: string;
        email: string;
        smMsgPersonGu: string;
    };
    readonly module: string;
    readonly subject: {
        html: string;
        raw: string;
    };
    readonly attachments: Attachment[];
    constructor(xmlObject: MessageXMLObject['PXPMessagesData'][0]['MessageListings'][0]['MessageListing'][0], credentials: LoginCredentials, hostUrl: string);
    /**
     * Check if a message has been read
     * @returns {boolean} Returns a boolean declaring whether or not the message has been previously read
     */
    isRead(): boolean;
    /**
     * Check if a message is deletable
     * @returns {boolean} Returns a boolean declaring whether or not the message is deletable
     */
    isDeletable(): boolean;
    private setRead;
    private setDeletable;
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
    markAsRead(): Promise<true>;
}
