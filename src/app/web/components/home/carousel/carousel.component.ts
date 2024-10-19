import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface CarouselItem {
  image: string;
  label: string;
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
export class CarouselComponent {
  currentIndex = 0;  // Índice del slide actual
  slides: CarouselItem[] = [
    {
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg',
      label: 'First slide label',
      description: 'Some representative placeholder content for the first slide.'
    },
    {
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg',
      label: 'Second slide label',
      description: 'Some representative placeholder content for the second slide.'
    },
    {
      image: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg',
      label: 'Third slide label',
      description: 'Some representative placeholder content for the third slide.'
    }
  ];

  // Cambia al siguiente slide
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  // Cambia al slide anterior
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  // Ir a un slide específico
  goToSlide(index: number) {
    this.currentIndex = index;
  }
}