import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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
  displayedColumns: string[] = ['id', 'title', 'content', 'image', 'date', 'actions'];
  editingRow: NewsModel | null = null;
  searchTerm: string = '';
  isModalVisible: boolean = false;
  modalNews: NewsModel = new NewsModel(0, '', '', '', new Date());

  constructor(private sharedService: SharedService, private router: Router) { }


  ngOnInit(): void {
    this.fetchNewsList();

    // remove this line when you integrate the backend
    this.newsList = [
      new NewsModel(1, 'Breaking News 1', 'Content for news 1', 'assets/image.png', new Date()),
      new NewsModel(2, 'Breaking News 2', 'Content for news 2', 'assets/image.png', new Date()),
      new NewsModel(3, 'Breaking News 3', 'Content for news 3', 'assets/image.png', new Date()),
      new NewsModel(4, 'Breaking News 4', 'Content for news 4', 'assets/image.png', new Date()),
    ];

    // remove this line when you integrate the backend
    this.filteredNewsList = [...this.newsList];

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
      news.content.toLowerCase().includes(lowerCaseTerm)
    );
  }
  editRow(row: NewsModel): void {
    this.modalNews = { ...row }; 
    this.isModalVisible = true;
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
  openModal(): void {
    this.modalNews = new NewsModel(0, '', '', '', new Date()); 
    this.isModalVisible = true;
  }
  closeModal(): void {
    this.isModalVisible = false;
  }
  handleFormSubmit(newNews: NewsModel): void {
    if (newNews.id) {
      this.sharedService.updateNews(newNews.id, newNews).subscribe(() => {
        this.fetchNewsList();
        this.closeModal();
        console.log('News updated successfully');
      });
    } else {
      this.sharedService.createNews(newNews).subscribe(() => {
        this.fetchNewsList();
        this.closeModal();
        console.log('News created successfully');
      });
    }
  }
  navigateToDetails(newsId: number) {
    this.router.navigate([`/news-details/${newsId}`]);
  }
}
