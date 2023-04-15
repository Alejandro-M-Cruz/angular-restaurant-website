import {Injectable} from '@angular/core';
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {BehaviorSubject, Observable, tap} from "rxjs";

const MENU_ITEMS_STORAGE = 'menu_items'

@Injectable({
  providedIn: 'root'
})
export class MenuImagesService {
  private readonly imageUrls$ = new BehaviorSubject<string[]>([])

  constructor(private readonly storage: Storage) {
    this.loadImages()
  }

  loadImages() {
    listAll(ref(this.storage, MENU_ITEMS_STORAGE)).then(imagesList => {
      Promise.all(imagesList.items.map(imageRef => getDownloadURL(imageRef)))
        .then(urls => this.imageUrls$.next(urls))
    })
  }

  getImageUrls(): Observable<string[]> {
    return this.imageUrls$.asObservable()
  }

  async uploadImage(imageFile: File): Promise<string | null> {
    const imageRef = ref(this.storage, `${MENU_ITEMS_STORAGE}/${imageFile.name}`)
    try {
      const snapshot = await uploadBytes(imageRef, imageFile)
      console.log(snapshot.ref.fullPath)
      const downloadUrl = await getDownloadURL(snapshot.ref)
      console.log(downloadUrl)
      this.imageUrls$.pipe(tap(urls => urls.push(downloadUrl)))
      return downloadUrl
    } catch (e: any) {
      console.error(e)
      throw new Error(e)
    }
  }
}
