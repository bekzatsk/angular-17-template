import {Component, forwardRef, inject, Input, OnChanges, OnInit, output, SimpleChanges} from '@angular/core';
import {IconsModule} from "../../modules/icons.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {IMAGE_SRC, UPLOAD_IMAGE_URL, UPLOAD_URL} from "../../data/file-path";
import {NgClass, NgStyle} from "@angular/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {finalize, Observable, Subscription, tap} from "rxjs";
import {FileUploadData} from "./data.metadata";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [
    IconsModule,
    DragDropModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }
  ],
})
export class FileUploaderComponent implements ControlValueAccessor, OnInit, OnChanges {
  private http = inject(HttpClient);
  private modalService = inject(NgbModal);
  @Input('value') valueInner: any[] = [];
  @Input() title: string | null = null;
  @Input() type: 'image' | 'audio' | 'file' = 'file';
  @Input() helpText: string | null = null;
  @Input() accept: string | null = null;
  @Input() multiple = false;
  @Input() maxLimit: number | null = null; // count files
  @Input() isShort = false;
  change = output<any | any[]>();
  removeIndex = output<number>();
  icons = {
    image: 'image',
    audio: 'music',
    file: 'upload-cloud'
  }
  imageURL = IMAGE_SRC;
  deletingFile: number | null = null;

  uploadFiles: FileUploadData[] = []
  uploadURL: string = '';
  uploadProgress?: number | null;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      if (changes) {
        if (this.type) {
          this.uploadURL = this.type === 'image' ? UPLOAD_IMAGE_URL : UPLOAD_URL;
        }
      }
    });
  }

  isEmpty(): boolean {
    return this.uploadFiles.length === 0;
  }

  onChange = (value: any[]) => {
  };

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  writeValue(value: any[]): void {
    if (value !== this.valueInner) {
      this.valueInner = value;
      // this.reCollectQueue(value);
    }
  }

  // get value
  get value() {
    return this.valueInner;
  }

  // set value
  set value(value: any[]) {
    this.writeValue(value);
    this.onChange(value);
    this.change.emit(value);
  }

  uploadFile(event: any) {
    let index = this.multiple ? this.uploadFiles.length : 0;
    const maxLimit = this.maxLimit ? this.maxLimit - index : event.target.files.length;
    Array.from(event.target.files).slice(0, maxLimit).forEach(item => {
      this.uploadFiles.push({
        file: item as File,
        isUploading: false,
        isUploaded: false,
        isSuccess: false,
        isReady: false,
        isError: false,
        isCancel: false,
        progress: null,
        nameWithoutExtension: null
      });
    });
    while (this.uploadFiles.length > index) {
      const uFile = this.uploadFiles[index];
      const reader = new FileReader();
      reader.readAsDataURL(uFile.file);
      reader.onload = () => {
        uFile.data64 = reader.result as string;
      };
      if (uFile.file) {
        this.uploadFileXHR(uFile, this.uploadURL).subscribe(
          (progress: number) => {
            uFile.progress = progress;
          },
          error => {
            uFile.isError = true;
            uFile.isUploaded = false;
            uFile.isUploading = false;
            uFile.isSuccess = false;
          },
          () => {
            uFile.isUploaded = true;
            uFile.isUploading = false;
            uFile.isSuccess = true;
          }
        );
      }
      index++;
      if (!this.multiple) break;
    }
  }

  cancelUpload(index: number) {
    if (this.uploadFiles.length > index && this.uploadFiles[index].uploadSub != null)
      this.uploadFiles[index].uploadSub!!.unsubscribe();
    this.reset(index);
  }

  reset(index: number) {
    // this.uploadFiles.forEach(item => {
    //   item.progress = null;
    // })
    console.log(index, 'reset')
    this.uploadFiles[index].uploadSub = null;
  }

  uploadFileXHR(file: FileUploadData, url: string): Observable<number> {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file.file);

      xhr.upload.onprogress = (event) => {
        file.isUploading = true;
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          observer.next(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          observer.complete();
        } else {
          observer.error(`Failed to upload file. Status: ${xhr.status}`);
        }
      };

      xhr.onerror = () => {
        observer.error('An error occurred while uploading the file.');
      };

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

  openModalContent(longContent: any, deletingFile: number, size = 'md') {
    this.modalService.open(longContent, { scrollable: true, size: size, centered: false });
    this.deletingFile = deletingFile;
  }

  removeFile(index: number | null) {
    if (index === null) return;
    this.uploadFiles.splice(index, 1);
    this.deletingFile = null;
    this.removeIndex.emit(index);
    this.modalService.dismissAll();
  }

}
