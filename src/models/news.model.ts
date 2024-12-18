export class NewsModel {
    constructor(
      public id: number,
      public title: string,
      public content: string,
      public image: string,
      public date: Date,
    ) {}
}
  
export class NewModel {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public image: string,
    public date: Date,
    public create_By: number,
    public news_Images: string[]
  ) { }
}