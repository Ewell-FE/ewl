import java from 'js-to-java';

export interface IMessageHeader {
  datatype?: string;
  uuheader?: string;
  params?: string;
  i18n?: string;
}

export class MessageHeader {
  constructor(params: IMessageHeader) {
    this.datatype = params.datatype;
    this.uuheader = params.uuheader;
    this.params = params.params;
    this.i18n = params.i18n;
  }

  datatype?: string;
  uuheader?: string;
  params?: string;
  i18n?: string;

  __fields2java() {
    return {
      $class: 'co.faao.plugin.transmission.request.MessageHeader',
      $: {
        datatype: java.String(this.datatype),
        uuheader: java.String(this.uuheader),
        params: java.String(this.params),
        i18n: java.String(this.i18n),
      },
    };
  }
}

//generate by interpret-cli dubbo2.js
