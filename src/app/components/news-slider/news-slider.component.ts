import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-news-slider',
  templateUrl: './news-slider.component.html',
  styleUrls: ['./news-slider.component.scss'],
})
export class NewsSliderComponent implements AfterViewInit {
  newsCards = [
    {
      imageSrc: 'assets/flag.png',
      title: 'The Title of the News Card in two Lines',
      description:
        'Here you can include a brief description of the headline in four lines. Here you can include a brief description of the headline in four lines.',
    },
    {
      imageSrc: 'assets/flag.png',
      title: 'The Title of the News Card in two Lines',
      description:
        'Here you can include a brief description of the headline in four lines. Here you can include a brief description of the headline in four lines.',
    },
    {
      imageSrc: 'assets/flag.png',
      title: 'The Title of the News Card in two Lines',
      description:
        'Here you can include a brief description of the headline in four lines. Here you can include a brief description of the headline in four lines.',
    },
    {
      imageSrc: 'assets/flag.png',
      title: 'The Title of the News Card in two Lines',
      description:
        'Here you can include a brief description of the headline in four lines. Here you can include a brief description of the headline in four lines.',
    },
    {
      imageSrc: 'assets/flag.png',
      title: 'The Title of the News Card in two Lines',
      description:
        'Here you can include a brief description of the headline in four lines. Here you can include a brief description of the headline in four lines.',
    },
  ];

  currentIndex = 0;
  disablePrev = true;
  disableNext = false;

  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef;

  ngAfterViewInit() {
    this.updateButtonStates();
  }

  nextSlide() {
    const sliderWrapper = this.sliderWrapper?.nativeElement;
    const slideWidth = sliderWrapper.offsetWidth;

    sliderWrapper.scrollBy({ left: slideWidth, behavior: 'smooth' });
    this.currentIndex = Math.min(
      this.currentIndex + 1,
      this.newsCards.length - 1
    );

    setTimeout(() => this.updateButtonStates(), 300); // Allow scroll animation to complete
  }

  prevSlide() {
    const sliderWrapper = this.sliderWrapper?.nativeElement;
    const slideWidth = sliderWrapper.offsetWidth;

    sliderWrapper.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    this.currentIndex = Math.max(this.currentIndex - 1, 0);

    setTimeout(() => this.updateButtonStates(), 300); // Allow scroll animation to complete
  }

  setSlide(index: number) {
    const sliderWrapper = this.sliderWrapper?.nativeElement;
    const slideWidth = sliderWrapper.offsetWidth;

    sliderWrapper.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    this.currentIndex = index;

    setTimeout(() => this.updateButtonStates(), 300); // Allow scroll animation to complete
  }

  updateButtonStates() {
    const sliderWrapper = this.sliderWrapper?.nativeElement;
    this.disablePrev = sliderWrapper.scrollLeft === 0;
    this.disableNext =
      sliderWrapper.scrollLeft + sliderWrapper.offsetWidth >=
      sliderWrapper.scrollWidth;
  }
}
