import debug from 'debug';

const log = debug('dubbo:dubbo-setting');

export interface IDubboSetting {
    serviceName: string;
    service?: Object;
    group?: string;
    version?: string;
    timeout?: number;
}

interface IRule {
    condition: RegExp;
    dubboSetting: IDubboSetting;
}

export class setting {
    private _rules: Array<IRule> = new Array();
    private _cache: Map<string, IDubboSetting> = new Map();

    match(arg: RegExp, dubboSetting?: IDubboSetting) {
        if (!dubboSetting.serviceName) {
            throw new Error('Please specify serviceName in dubboSetting');
        }
        this._rules.push({
            condition: arg,
            dubboSetting
        });
        return this;
    }

    //获取所有 dubboSetting 配置
    getAllDubboSetting() {
        return this._rules;
    }

    //根据服务名获取dubboSetting
    getDubboSettingByName(serviceName) {
        let dubboSetting = this._rules.find(function(item) {
            return item.dubboSetting.serviceName === serviceName;
        });
        if (!dubboSetting) {
            throw new Error('未找到相关服务!');
        }
        return dubboSetting;
    }

    getDubboSetting(dubboInterface) {
        let matchedRule = null;
        for (let rule of this._rules) {
            if (rule.condition.test(dubboInterface)) {
                matchedRule = rule;
                break;
            }
        }
        if (matchedRule) {
            log(
                '%s =match=> rule %s result=> %j',
                dubboInterface,
                matchedRule.condition,
                matchedRule.dubboSetting
            );
            this._cache.set(dubboInterface, matchedRule.dubboSetting);
            return matchedRule.dubboSetting;
        }
        return null;
    }

}

export default new setting();