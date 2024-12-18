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
  displayedColumns: string[] = ['id', 'title', 'content', 'image', 'date', 'actions'];
  editingRow: NewsModel | null = null;
  searchTerm: string = '';
  isModalVisible: boolean = false;
  modalNews: NewsModel = new NewsModel(0, '', '', '', new Date());

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchNewsList();
  }

  // Fetch the news list
  fetchNewsList(): void {
    this.sharedService.getNewsList().subscribe((data) => {
      this.newsList = data;
      this.filteredNewsList = data;
    });
  }

  // Apply filter based on search term
  applyFilter(): void {
    const lowerCaseTerm = this.searchTerm.toLowerCase();
    this.filteredNewsList = this.newsList.filter((news) =>
      news.title.toLowerCase().includes(lowerCaseTerm) ||
      news.content.toLowerCase().includes(lowerCaseTerm)
    );
  }

  // Set the news item for editing
  editRow(row: NewsModel): void {
    this.modalNews = { ...row }; // Set the modal news to the selected row for editing
    this.isModalVisible = true;
  }

  // Save the updated news
  saveRow(row: NewsModel): void {
    this.sharedService.updateNews(row.id, row).subscribe(() => {
      this.fetchNewsList();
      this.editingRow = null;
      console.log('News updated successfully');
    });
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingRow = null;
  }

  // Open the modal to create new news
  openModal(): void {
    this.modalNews = new NewsModel(0, '', '', '', new Date()); // Clear the form for creating new news
    this.isModalVisible = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalVisible = false;
  }

  // Handle form submit (create or update news)
  handleFormSubmit(newNews: NewsModel): void {
    if (newNews.id) {
      // Update existing news
      this.sharedService.updateNews(newNews.id, newNews).subscribe(() => {
        this.fetchNewsList();
        this.closeModal();
        console.log('News updated successfully');
      });
    } else {
      // Create new news
      this.sharedService.createNews(newNews).subscribe(() => {
        this.fetchNewsList();
        this.closeModal();
        console.log('News created successfully');
      });
    }
  }
}
