import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {
  items: CarouselItem[] = [
    { image: 'assets/images/carousel/carousel-1.png', title: 'Design Slider', description: 'Lorem ipsum dolor sit amet.' },
    { image: 'assets/images/carousel/carousel-2.png', title: 'Design Slider', description: 'Lorem ipsum dolor sit amet.' },
    { image: 'assets/images/carousel/carousel-3.PNG', title: 'Design Slider', description: 'Lorem ipsum dolor sit amet.' },
    { image: 'assets/images/carousel/carousel-4.PNG', title: 'Design Slider', description: 'Lorem ipsum dolor sit amet.' },
  ];

  currentIndex = 0;
  transform = 'translateX(0%)';
  timeWidth = '100%';

  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.startAutoSlide();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateTransform();
    this.resetTimer();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateTransform();
    this.resetTimer();
  }

  updateTransform() {
    this.transform = `translateX(-${this.currentIndex * 100}%)`;
    this.timeWidth = '100%';
    
    setTimeout(() => {
      this.timeWidth = '0%';
    }, 0);
    
    setTimeout(() => {
      this.startAutoSlide();
    }, 3000);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => this.next(), 7000);
    this.timeWidth = '100%';
    
    setTimeout(() => {
      this.timeWidth = '0%';
    }, 0);
    
    clearInterval(this.intervalId);
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }
}