import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  host: {
    class: 'flex flex-col flex-none gap-4'
  }
})
export class NewsComponent {
  currentIndex = 0;
  disablePrev = true;
  disableNext = false;

  newsCards = [
    {
      id: 1, // Add an ID for each news item
      imageSrc: 'assets/image.png',
      title: 'The Title of the News Card in two Lines',
      description: 'Here you can include a brief description of the headline in four lines.',
    },
    {
      id: 2,
      imageSrc: 'assets/image.png',
      title: 'Another News Card Title',
      description: 'Here you can include a brief description of the headline in four lines.',
    },
    {
      id: 3,
      imageSrc: 'assets/image.png',
      title: 'Another News Card Title',
      description: 'Here you can include a brief description of the headline in four lines.',
    },
  ];




  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.updateButtonStates();
  }

  nextSlide() {
    const sliderWrapper = this.sliderWrapper?.nativeElement;
    const slideWidth = sliderWrapper.offsetWidth;

    sliderWrapper.scrollBy({ left: slideWidth, behavior: 'smooth' });
    this.currentIndex = Math.min(this.currentIndex + 1, this.newsCards.length - 1);

    setTimeout(() => this.updateButtonStates(), 300); // Allow scroll animation to complete
  }

  prevSlide() {
    const sliderWrapper = this.sliderWrapper?.nativeElement;
    const slideWidth = sliderWrapper.offsetWidth;

    sliderWrapper.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    this.currentIndex = Math.max(this.currentIndex - 1, 0);

    setTimeout(() => this.updateButtonStates(), 300); // Allow scroll animation to complete
  }

  updateButtonStates() {
    const sliderWrapper = this.sliderWrapper?.nativeElement;
    this.disablePrev = sliderWrapper.scrollLeft === 0;
    this.disableNext = sliderWrapper.scrollLeft + sliderWrapper.offsetWidth >= sliderWrapper.scrollWidth;
  }

  // Navigate to the news detail page with the ID of the clicked card
  navigateToDetails(newsId: number) {
    this.router.navigate([`/news-details/${newsId}`]);
  }
}

