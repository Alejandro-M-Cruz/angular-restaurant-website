import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-file-input',
  templateUrl: './image-file-input.component.html',
  styleUrls: ['./image-file-input.component.css']
})
export class ImageFileInputComponent {
  @Input() imageName?: string
  imageFile?: File | null
  @Output() imageFileChanged = new EventEmitter<File | null>()
  @ViewChild('fileInput') fileInput!: ElementRef

  onImageFileInputChanged(file: File | null) {
    this.imageFile = file
    this.imageName = file?.name
    this.imageFileChanged.emit(file)
  }

  discardSelectedImage() {
    this.fileInput.nativeElement.value = ''
    this.imageFile = null
    this.imageName = ''
    this.imageFileChanged.emit(null)
  }
}
