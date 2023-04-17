import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-image-file-input',
  templateUrl: './image-file-input.component.html',
  styleUrls: ['./image-file-input.component.css']
})
export class ImageFileInputComponent {
  @Output() imageFile = new EventEmitter<File | null>()
  imageName = ''

  onImageFileChanged(imageFile: File | null) {
    this.imageFile.emit(imageFile)
    this.imageName = imageFile?.name ?? ''
  }

  discardSelectedImage() {
    this.imageFile.emit(null)
    this.imageName = ''
  }
}
