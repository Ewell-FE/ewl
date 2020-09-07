export default {
    /**
     * dubbo的默认调用超时时间,单位是秒
     */
    dubboInvokeTimeout: 5,

    /**
     * 默认socket池数量, 默认为1
     * 借助node的非阻塞的特性1个socket长连接已经非常高效
     */
    dubboSocketPool: 1,
};
