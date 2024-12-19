import { Component, EventEmitter, Input, Output, OnChanges,OnInit } from '@angular/core';
import { SharedService } from 'src/services/SharedService';
import { NewModel } from 'src/models/news.model';
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnChanges {
  currentDate!: string;
  @Input() isVisible = false;
  @Input() news: NewModel = new NewModel(0, '', '', '', new Date(), 0, []);
  @Output() closeModal = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<NewModel>();
  formData: NewModel = new NewModel(0, '', '', '', new Date(), 0, []);
  imageBase64: string | null = null;
  imagePreviews: string[] = [];
  constructor(private sharedService: SharedService) { }
  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }
  ngOnChanges(): void {
    if (this.news.id) {
      this.formData = { ...this.news };
    } else {
      this.resetForm();
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.convertToBase64(input.files[0], true);
    }
  }
  onMultipleFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      if (!this.formData.news_Images) {
        this.formData.news_Images = [];
      }
      Array.from(input.files).forEach((file) => this.convertToBase64(file, false));
    }
  }
  convertToBase64(file: File, isSingle: boolean): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (isSingle) {
        this.imageBase64 = result;
        this.formData.image = result;
      } else {
        this.imagePreviews.push(result);
        this.formData.news_Images.push(result);
      }
    };
    reader.readAsDataURL(file);
  }
  onSubmit(): void {
    if (this.imageBase64) {
      this.formData.image = this.imageBase64;
    }
    this.formData.create_By = 1; 
    if (this.news.id) {
      this.sharedService.updateNews(this.news.id, this.formData).subscribe(
        () => {
          alert('Updated successfully!');
          this.formSubmit.emit(this.formData);
          this.close();
        },
        (error) => {
          alert('Failed to update news. Please try again.');
        }
      );
    } else {
      this.sharedService.createNews(this.formData).subscribe(
        () => {
          alert('Created successfully!');
          this.formSubmit.emit(this.formData);
          this.close();
        },
        (error) => {
          alert('Failed to create news. Please try again.');
        }
      );
    }
  }
  close(): void {
    this.resetForm();
    this.isVisible = false;
    this.closeModal.emit();
  }
  resetForm(): void {
    this.formData = new NewModel(0, '', '', '', new Date(), 0, []);
    this.imageBase64 = null;
    this.imagePreviews = [];
  }
}
