import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

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
export class CarouselComponent implements OnInit, OnDestroy {
  currentSlide: number = 0;
  slideTime: number = 5; // Segundos
  slideInterval: any; // Variable para almacenar el intervalo

  // Tamaño de cada slide debe ser ser de 1320 x 583 px

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

  ngOnInit() {
    this.startSlideShow(); // Inicia el carrusel al cargar el componente
  }

  ngOnDestroy() {
    this.stopSlideShow(); // Detiene el carrusel al destruir el componente
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideTime * 1000);
  }

  stopSlideShow() {
    clearInterval(this.slideInterval); // Limpia el intervalo
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}