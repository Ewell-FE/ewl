import java from 'js-to-java';

export interface IPageHeader {
  pageNumber?: string;
  datatype?: string;
  pageSize?: string;
  uuheader?: string;
  params?: string;
  i18n?: string;
}

export class PageHeader {
  constructor(params: IPageHeader) {
    this.pageNumber = params.pageNumber;
    this.datatype = params.datatype;
    this.pageSize = params.pageSize;
    this.uuheader = params.uuheader;
    this.params = params.params;
    this.i18n = params.i18n;
  }

  pageNumber?: string;
  datatype?: string;
  pageSize?: string;
  uuheader?: string;
  params?: string;
  i18n?: string;

  __fields2java() {
    return {
      $class: 'co.faao.plugin.page.PageHeader',
      $: {
        pageNumber: java.String(this.pageNumber),
        datatype: java.String(this.datatype),
        pageSize: java.String(this.pageSize),
        uuheader: java.String(this.uuheader),
        params: java.String(this.params),
        i18n: java.String(this.i18n),
      },
    };
  }
}

//generate by interpret-cli dubbo2.js
