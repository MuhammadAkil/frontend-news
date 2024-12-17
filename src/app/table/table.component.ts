import { Component, OnInit } from '@angular/core';
import { NewsModel } from 'src/models/news.model';
import { SharedService } from 'src/services/SharedService';

@Component({
  selector: 'app-root',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  newsList: NewsModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'image', 'date', 'actions'];
  editingRow: NewsModel | null = null;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchNewsList();
  }

  fetchNewsList(): void {
    this.sharedService.getNewsList().subscribe((data) => {
      this.newsList = data;
    });
  }

  editRow(row: NewsModel): void {
    this.editingRow = { ...row };
  }

  saveRow(row: NewsModel): void {
    this.sharedService.updateNews(row.id, row).subscribe(() => {
      this.fetchNewsList();
      this.editingRow = null;
      console.log('News updated successfully');
    });
  }

  cancelEdit(): void {
    this.editingRow = null;
  }
}
