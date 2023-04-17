import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-file-input',
  templateUrl: './image-file-input.component.html',
  styleUrls: ['./image-file-input.component.css']
})
export class ImageFileInputComponent implements OnInit {
  @Input() initialImageName?: string
  imageName: string = ''
  imageFile: File | null = null
  @Output() imageFileChanged = new EventEmitter<File | null>()
  @ViewChild('fileInput') fileInput!: ElementRef

  ngOnInit() {
    this.imageName = this.initialImageName ?? ''
  }

  onImageFileInputChanged(file: File | null) {
    this.imageFile = file
    this.imageName = file?.name ?? ''
    this.imageFileChanged.emit(file)
  }

  discardSelectedImage() {
    this.fileInput.nativeElement.value = ''
    this.imageFile = null
    this.imageName = ''
    this.imageFileChanged.emit(null)
  }
}
