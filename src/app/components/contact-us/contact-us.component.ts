import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  subject: string = '';
  description: string = '';

  sendMessage() {
    console.log('Subject:', this.subject);
    console.log('Description:', this.description);
    alert('Message sent successfully!');
  }
}
