import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from 'src/services/SharedService';
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent {
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();
  formData = {
    title: '',
    image: '',
    date: new Date(),
    content: '',
    create_By: 0,
    news_Images: [] as string[],
  };

  imageBase64: string | null = null;
  imagePreviews: string[] = [];

  constructor(private sharedService: SharedService) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.convertToBase64(input.files[0], true);
    }
  }
  onMultipleFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
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

  close(): void {
    this.resetForm();
    this.isVisible = false;
    this.closeModal.emit();
  }
  resetForm(): void {
    this.formData = {
      title: '',
      image: '',
      date: new Date(),
      content: '',
      create_By: 0,
      news_Images: [],
    };
    this.imageBase64 = null;
    this.imagePreviews = [];
  }
}
