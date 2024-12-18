import { Component } from '@angular/core';
import { SharedService } from 'src/services/SharedService';
@Component({
  selector: 'app-new-create',
  templateUrl: './new-create.component.html',
  styleUrls: ['./new-create.component.scss'],
})
export class NewCreateComponent {
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
  onSubmit() {
    if (this.imageBase64 != null && this.imageBase64 != "") {
      this.formData.image = this.imageBase64;
    }
    this.formData.create_By = 1;
    console.log('Form submitted:', this.formData); 
    this.sharedService.createNews(this.formData).subscribe(
      (response) => {
        alert("created successfully!")
      },
      (error) => {
        alert("Failed to create news")
      }
    );
  }
  onCancel() {
    console.log('Form canceled');
  }
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageBase64 = reader.result as string;  
    };
    reader.readAsDataURL(file); 
  }
}
