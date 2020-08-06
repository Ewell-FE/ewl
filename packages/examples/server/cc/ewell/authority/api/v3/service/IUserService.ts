import {MessageHeader} from './../../../../../../co/faao/plugin/transmission/request/MessageHeader';
import {MessageResult} from './../../../../../../co/faao/plugin/transmission/response/MessageResult';
import {argumentMap} from 'interpret-util';
import {TDubboCallResult, DirectlyDubbo} from 'dubbo2-ts';

export interface IIUserService {
    loginVerification(
        MessageHeader0: MessageHeader
    ): TDubboCallResult<MessageResult>;

    authLogin(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    addUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    batchAuthUserRole(
        MessageHeader0: MessageHeader
    ): TDubboCallResult<MessageResult>;

    authUserRole(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    getUserRoleRel(
        MessageHeader0: MessageHeader
    ): TDubboCallResult<MessageResult>;

    login(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    changePWD(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    getUserByStaffCode(
        MessageHeader0: MessageHeader
    ): TDubboCallResult<MessageResult>;

    checkUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    modifyUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    authLoginVerification(
        MessageHeader0: MessageHeader
    ): TDubboCallResult<MessageResult>;

    searchUserList(
        MessageHeader0: MessageHeader
    ): TDubboCallResult<MessageResult>;

    loginOut(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    enableUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    setPWD(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;

    updateUserExtend(
        MessageHeader0: MessageHeader
    ): TDubboCallResult<MessageResult>;
}

export const IUserServiceWrapper = {
    loginVerification: argumentMap,
    authLogin: argumentMap,
    addUser: argumentMap,
    batchAuthUserRole: argumentMap,
    authUserRole: argumentMap,
    getUserRoleRel: argumentMap,
    login: argumentMap,
    changePWD: argumentMap,
    getUserByStaffCode: argumentMap,
    checkUser: argumentMap,
    modifyUser: argumentMap,
    authLoginVerification: argumentMap,
    searchUserList: argumentMap,
    loginOut: argumentMap,
    enableUser: argumentMap,
    setPWD: argumentMap,
    updateUserExtend: argumentMap
};

export function IUserService(dubbo: DirectlyDubbo): IIUserService {
    return dubbo.proxyService<IIUserService>({
        dubboInterface: 'cc.ewell.authority.api.v3.service.IUserService',
        methods: IUserServiceWrapper
    });
}

//generate by interpret-cli dubbo2.js
