import {Injectable} from '@angular/core';
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {BehaviorSubject, Observable, tap} from "rxjs";

const MENU_IMAGES_STORAGE = 'menu_images'

@Injectable({
  providedIn: 'root'
})
export class MenuImagesService {

  constructor(private readonly storage: Storage) {
  }

  getImageNameFromUrl(url: string): string {
    return ref(this.storage, url).name
  }

  async uploadImage(imageFile: File): Promise<string | null> {
    const imageRef = ref(this.storage, `${MENU_IMAGES_STORAGE}/${imageFile.name}`)
    try {
      const snapshot = await uploadBytes(imageRef, imageFile)
      return getDownloadURL(snapshot.ref)
    } catch (e: any) {
      console.error(e)
      throw new Error(e)
    }
  }
}
