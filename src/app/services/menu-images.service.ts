import {Injectable, OnInit} from '@angular/core';
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class MenuImagesService implements OnInit {
  imageUrls: string[] = []

  constructor(private readonly storage: Storage) {}

  async ngOnInit() {
    await this.getImages()
  }

  async getImages() {
    const imagesRef = ref(this.storage, 'menu_images')
    const imagesList = await listAll(imagesRef)
    this.imageUrls = []
    for (const imageRef of imagesList.items) {
      const imageUrl = await getDownloadURL(imageRef)
      this.imageUrls.push(imageUrl)
    }
  }
}
