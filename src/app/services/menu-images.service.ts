import {Injectable} from '@angular/core';
import {getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class MenuImagesService {
  private readonly menuImagesStorage = 'menu_images'

  constructor(private readonly storage: Storage, private readonly domSanitizer: DomSanitizer) {}

  getNotYetUploadedImageUrl(imageFile: File): string {
    const url = URL.createObjectURL(imageFile)
    return this.domSanitizer.bypassSecurityTrustUrl(url) as string
  }

  revokeImageUrl(imageUrl: string) {
    URL.revokeObjectURL(imageUrl)
  }

  getImageNameFromUrl(url: string): string {
    return ref(this.storage, url).name
  }

  async uploadImage(imageFile: File): Promise<string> {
    const imageRef = ref(this.storage, `${this.menuImagesStorage}/${imageFile.name}`)
    try {
      const snapshot = await uploadBytes(imageRef, imageFile)
      return getDownloadURL(snapshot.ref)
    } catch (e: any) {
      console.error(e)
      throw new Error(e)
    }
  }
}
