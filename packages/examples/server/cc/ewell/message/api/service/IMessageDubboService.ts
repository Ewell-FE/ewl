import {MessageHeader} from './../../../../../co/faao/plugin/transmission/request/MessageHeader';
import {MessageResult} from './../../../../../co/faao/plugin/transmission/response/MessageResult';
import {argumentMap} from 'interpret-util';
import {TDubboCallResult, DirectlyDubbo} from 'dubbo2-ts';

export interface IIMessageDubboService {
  messageTemplateStateChange(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  collectMessage(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  deleteDraftMessage(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  getReceiveMessageList(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  revokeMessage(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
  sendMessage(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
  getMessageByMsgId(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  deleteMessage(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
  getTemplateType(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  cancleCollectMessage(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  markMessageReaded(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  addMessageTemplate(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  sendDraftMessage(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  sendSms(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
  recoverMessage(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  getTypeMessageTemplate(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  getFirstCatgListNurse(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  getMessageStatusByMsgIds(
    MessageHeader0: MessageHeader,
  ): string;
  getSendMessageList(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  getMessageTemplateById(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  editMessageTemplate(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
  claimMessage(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
  editMessageByMsgId(
    MessageHeader0: MessageHeader,
  ): TDubboCallResult<MessageResult>;
}

export const IMessageDubboServiceWrapper = {
  messageTemplateStateChange: argumentMap,
  collectMessage: argumentMap,
  deleteDraftMessage: argumentMap,
  getReceiveMessageList: argumentMap,
  revokeMessage: argumentMap,
  sendMessage: argumentMap,
  getMessageByMsgId: argumentMap,
  deleteMessage: argumentMap,
  getTemplateType: argumentMap,
  cancleCollectMessage: argumentMap,
  markMessageReaded: argumentMap,
  addMessageTemplate: argumentMap,
  sendDraftMessage: argumentMap,
  sendSms: argumentMap,
  recoverMessage: argumentMap,
  getTypeMessageTemplate: argumentMap,
  getFirstCatgListNurse: argumentMap,
  getMessageStatusByMsgIds: argumentMap,
  getSendMessageList: argumentMap,
  getMessageTemplateById: argumentMap,
  editMessageTemplate: argumentMap,
  claimMessage: argumentMap,
  editMessageByMsgId: argumentMap,
};

export function IMessageDubboService(dubbo: DirectlyDubbo): IIMessageDubboService {
  return dubbo.proxyService<IIMessageDubboService>({
    dubboInterface: 'cc.ewell.message.api.service.IMessageDubboService',
    version: '1.0.0',
    methods: IMessageDubboServiceWrapper,
  });
}

//generate by interpret-cli dubbo2.js
