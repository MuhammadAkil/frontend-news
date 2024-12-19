import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements AfterViewInit, OnDestroy {
  blogData = {
    title: 'Armed Forces Hospital in the South organizes a workshop to improve nursing quality',
    subtitle: 'A brief subtitle about the blog post.',
    imageUrl: 'assets/image.png',
    content:
      'The Southern Armed Forces Hospital Administration, represented by the Nursing Department, organized a workshop entitled (Improving Nursing Quality Using NDNQI Indicators), under the patronage and attendance of His Excellency Major General Doctor Mohammed bin Saeed Al-Qahtani, Director of the Hospital, and with the participation of 60 representatives from the hospitals of the General Administration of Health Services at the Ministry of Defense.',
  };

  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth() + 1;
  currentDay: number = this.currentDate.getDate();
  weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentWeekName: string = this.weekDays[this.currentDate.getDay()];
  fullFormattedDate: string = `${this.currentYear}-${this.formatDate(this.currentMonth)}-${this.formatDate(this.currentDay)}`;

  @ViewChild('emblaViewport') emblaViewport!: ElementRef;
  @ViewChild('emblaViewport2') emblaViewport2!: ElementRef;
  emblaCarousel!: EmblaCarouselType;
  emblaCarousel2!: EmblaCarouselType;
  intervalId: any;

  ngAfterViewInit(): void {
    this.emblaCarousel = EmblaCarousel(this.emblaViewport.nativeElement, {});
    this.emblaCarousel2 = EmblaCarousel(this.emblaViewport2.nativeElement, {});

    // Sync the carousels using selectedScrollSnap
    this.emblaCarousel.on('select', () => {
      const selectedIndex = this.emblaCarousel.selectedScrollSnap();
      this.emblaCarousel2.scrollTo(selectedIndex);
    });

    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  goToPrevSlide(): void {
    this.emblaCarousel.scrollPrev();
    this.emblaCarousel2.scrollPrev();
  }

  goToNextSlide(): void {
    this.emblaCarousel.scrollNext();
    this.emblaCarousel2.scrollNext();
  }

  startAutoScroll(): void {
    this.intervalId = setInterval(() => {
      this.emblaCarousel.scrollNext();
      this.emblaCarousel2.scrollNext();
    }, 4000);
  }

  stopAutoScroll(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private formatDate(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
