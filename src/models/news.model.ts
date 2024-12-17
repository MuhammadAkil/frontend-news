export class NewsModel {
    constructor(
      public id: number,
      public title: string,
      public image: string,
      public content: string,
      public date: string
    ) {}
  }