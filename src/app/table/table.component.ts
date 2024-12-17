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
  filteredNewsList: NewsModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'image', 'date', 'actions'];
  editingRow: NewsModel | null = null;
  searchTerm: string = ''; 

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchNewsList();
  }

  fetchNewsList(): void {
    this.sharedService.getNewsList().subscribe((data) => {
      this.newsList = data;
      this.filteredNewsList = data;
    });
  }

  applyFilter(): void {
    const lowerCaseTerm = this.searchTerm.toLowerCase();
    this.filteredNewsList = this.newsList.filter((news) =>
      news.title.toLowerCase().includes(lowerCaseTerm) ||
      news.image.toLowerCase().includes(lowerCaseTerm)
    );
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
