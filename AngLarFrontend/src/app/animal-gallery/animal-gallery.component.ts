import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animal-gallery',
  templateUrl: './animal-gallery.component.html',
  styleUrls: ['./animal-gallery.component.css']
})
export class AnimalGalleryComponent implements OnInit {

  dogImages: string[] = [];
  catImages: string[] = [];

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.loadDogImages();
    this.loadCatImages();
  }

  loadDogImages(): void {this.animalService.getDogImages().subscribe(response =>
     {
      console.log('Dog Images:', response);
      this.dogImages = response.message; // API válaszból a képek URL-jeit kapjuk
    });
  }

  loadCatImages(): void {
    this.animalService.getCatImages().subscribe(response => {
      console.log('Cat Images:', response);
      this.catImages = response.map((cat: any) => cat.url); // Macska képek URL-jei
    });
  }

}
