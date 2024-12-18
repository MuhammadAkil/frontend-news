import { Component } from '@angular/core';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent {
  // Blog data
  blogData = {
    title: 'Armed Forces Hospital in the South organizes a workshop to improve nursing quality',
    subtitle: 'A brief subtitle about the blog post.',
    imageUrl: 'assets/image.png',
    content: 'The Southern Armed Forces Hospital Administration, represented by the Nursing Department, organized a workshop entitled (Improving Nursing Quality Using NDNQI Indicators), under the patronage and attendance of His Excellency Major General Doctor Mohammed bin Saeed Al-Qahtani, Director of the Hospital, and with the participation of 60 representatives from the hospitals of the General Administration of Health Services at the Ministry of Defense.'
  };

  currentDate: Date = new Date();

  currentYear: number = this.currentDate.getFullYear();

  currentMonth: number = this.currentDate.getMonth() + 1;

  currentDay: number = this.currentDate.getDate();

  weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  currentWeekName: string = this.weekDays[this.currentDate.getDay()];

  fullFormattedDate: string = `${this.currentYear}-${this.formatDate(this.currentMonth)}-${this.formatDate(this.currentDay)}`;

  private formatDate(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
