import java from 'js-to-java';

export interface IMessageResult {
  error?: string;
  message?: string;
  object?: Object;
  status?: number;
}

export class MessageResult {
  constructor(params: IMessageResult) {
    this.error = params.error;
    this.message = params.message;
    this.object = params.object;
    this.status = params.status;
  }

  error?: string;
  message?: string;
  object?: Object;
  status?: number;

  __fields2java() {
    return {
      $class: 'co.faao.plugin.transmission.response.MessageResult',
      $: {
        error: java.String(this.error),
        message: java.String(this.message),
        object:
          this.object && this.object['__fields2java']
            ? this.object['__fields2java']()
            : this.object,
        status: java.Integer(this.status),
      },
    };
  }
}

//generate by interpret-cli dubbo2.js
