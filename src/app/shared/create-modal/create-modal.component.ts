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
  };

  imageBase64: string | null = null;

  constructor(private sharedService: SharedService) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.imageBase64) {
      this.formData.image = this.imageBase64;
    }
    this.formData.create_By = 1; 

    console.log('Form submitted:', this.formData);
    this.sharedService.createNews(this.formData).subscribe(
      (response) => {
        alert('Created successfully!');
        this.formSubmit.emit(this.formData); 
        this.close();
      },
      (error) => {
        alert('Failed to create news');
      }
    );
  }

  close(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }

  onCancel(): void {
    console.log('Form canceled');
    this.close();
  }
}
