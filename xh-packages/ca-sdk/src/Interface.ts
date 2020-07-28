export interface IOptions {
    requestType: string,
    type: string,  //后端默认为1 ，免密则通过 2: 获取二维码进行扫码
    signType: string;
    staffCode: string;
    businContent: string;
}

/**
 * @description ca-sdk client interface
 */
export interface IBase {
    /**
     * @description 验证是否扫码成功
     */
    getSignTxt(url: string, bizSn: string, reslove)

    /**
     * @description 尝试免密验证, 获取二维码
     */
    signTxt(url: string, option: IOptions, obj?: any): Promise<string>;
}
