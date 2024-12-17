import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsModel } from 'src/models/news.model';
import { SharedService } from 'src/services/SharedService';

@Component({
  selector: 'app-root',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  newsList: NewsModel[] = [];

  displayedColumns: string[] = ['id', 'title', 'image', 'date', 'actions'];
  rows = [
    { id: 1, title: '', image: '', date: new Date() },
    { id: 2, title: '', image: '', date: new Date() },
    { id: 3, title: '', image: '', date: new Date() },
    { id: 4, title: '', image: '', date: new Date() },
  ];



  editRow(row: any) {
    console.log('Editing row:', row);
  }

  showDetails() {
    console.log('Showing details for all rows:', this.rows);
  }

  constructor(private sharedService: SharedService) { }
  
  ngOnInit(): void {
    this.fetchNewsList();
  }

   // Fetch the list of news
   fetchNewsList(): void {
    this.sharedService.getNewsList().subscribe(data => {
      this.newsList = data;  
    });

  }
}
