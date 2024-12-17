import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/SharedService';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  newsList: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'image', 'date', 'actions'];
  rows: any[] = [];
  news = {
    id: 0,
    title: '',
    image: '',
    content: '',
    date: new Date().toISOString(),
    create_By: 1, 
    amend_By: 1,  
    status: 1,   
  };

  constructor(private sharedService: SharedService) { }
  ngOnInit(): void {
    this.fetchNewsList();
  }
  fetchNewsList(): void {
    this.sharedService.getNewsList().subscribe((data) => {
      this.rows = data;
    });
  }

  createNews(): void {
    const newNews = {
      ...this.news,
      create_By: 1, 
    };

    this.sharedService.createNews(newNews).subscribe(() => {
      this.fetchNewsList();
      this.resetForm();
    });
  }
  updateNews(row: any): void {
    const updatedNews = {
      title: row.title,
      image: row.image,
      content: 'Updated content', 
      date: new Date().toISOString(),
      amend_By: 2, 
      status: 1,  
    };

    this.sharedService.updateNews(row.id, updatedNews).subscribe(() => {
      this.fetchNewsList();
    });
  }

  resetForm(): void {
    this.news = {
      id: 0,
      title: '',
      image: '',
      content: '',
      date: new Date().toISOString(),
      create_By: 1,
      amend_By: 1,
      status: 1,
    };
  }
}
