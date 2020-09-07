import {MessageHeader} from './../../../../../co/faao/plugin/transmission/request/MessageHeader';
import {MessageResult} from './../../../../../co/faao/plugin/transmission/response/MessageResult';
import {argumentMap} from 'interpret-util';
import {TDubboCallResult, DirectlyDubbo} from 'dubbo2-ts';


export interface IIUserService {
    configTempUserTime(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    configUserLanguages(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    getWorkFlowUserList(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    addUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    searchSimpleUserList(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    authUserRole(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    exportImportTempUserTemplate(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    login(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    changePWD(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    getUserByStaffCode(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    modifyUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    getMailList(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    updateUserExtend(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    getMouldArea(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    getResourceUserList(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    loginVerification(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    authLogin(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    getUserDetailByArea(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    batchAuthUserRole(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    getUserByStaffCodeList(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    getUserRoleRel(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    batchAuthUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    checkSMS(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    loginTokenVerification(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    getUserDetailByStaffCode(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    checkUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    authLoginVerification(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    batchSetPWD(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    searchUserList(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    sendSMS(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    getCaSign(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    loginOut(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    enableUser(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    singleLogin(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    setPWD(MessageHeader0: MessageHeader): TDubboCallResult<MessageResult>;
    shxhSecuritylogin(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
    getWorkFlowUserDetail(
        MessageHeader0: MessageHeader,
    ): TDubboCallResult<MessageResult>;
}

export const IUserServiceWrapper = {
    configTempUserTime: argumentMap,
    configUserLanguages: argumentMap,
    getWorkFlowUserList: argumentMap,
    addUser: argumentMap,
    searchSimpleUserList: argumentMap,
    authUserRole: argumentMap,
    exportImportTempUserTemplate: argumentMap,
    login: argumentMap,
    changePWD: argumentMap,
    getUserByStaffCode: argumentMap,
    modifyUser: argumentMap,
    getMailList: argumentMap,
    updateUserExtend: argumentMap,
    getMouldArea: argumentMap,
    getResourceUserList: argumentMap,
    loginVerification: argumentMap,
    authLogin: argumentMap,
    getUserDetailByArea: argumentMap,
    batchAuthUserRole: argumentMap,
    getUserByStaffCodeList: argumentMap,
    getUserRoleRel: argumentMap,
    batchAuthUser: argumentMap,
    checkSMS: argumentMap,
    loginTokenVerification: argumentMap,
    getUserDetailByStaffCode: argumentMap,
    checkUser: argumentMap,
    authLoginVerification: argumentMap,
    batchSetPWD: argumentMap,
    searchUserList: argumentMap,
    sendSMS: argumentMap,
    getCaSign: argumentMap,
    loginOut: argumentMap,
    enableUser: argumentMap,
    singleLogin: argumentMap,
    setPWD: argumentMap,
    shxhSecuritylogin: argumentMap,
    getWorkFlowUserDetail: argumentMap,
};

export function IUserService(dubbo: DirectlyDubbo): IIUserService {
    return dubbo.proxyService<IIUserService>({
        dubboInterface: 'cc.ewell.authority.api.v3.service.IUserService',
        version: '3.0.0',
        methods: IUserServiceWrapper,
    });
}

//generate by interpret-cli dubbo2.js
