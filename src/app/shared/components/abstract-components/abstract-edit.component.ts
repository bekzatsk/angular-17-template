import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
// import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {IMAGE_SRC} from '../../data/file-path';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Component({
  standalone: true,
  template: ''
})
export class AbstractEditComponent implements OnInit {
  protected fb: FormBuilder = inject(FormBuilder);
  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected http: HttpClient = inject(HttpClient);
  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected router: Router = inject(Router);

  id?: string;
  isNew = true;
  isLoading = true;
  getRecordUrl = '';
  postRecordUrl = '';
  putRecordUrl = '';
  isEmpty = false;
  datePipe = new DatePipe('ru');
  isSubmit = false;
  isSubmitting = false;
  canAdd = true;
  imageURL = IMAGE_SRC;
  loadedRequest: any = {
      record: false
  }

  async ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.isNew = false;
      this.loadedRequest.record = false;
      this.id = this.route.snapshot.params['id']
      await this.getRecord(this.id!);
    } else {
      this.isNew = true;
      // this.isLoading = UtilService.requestLoaded(this.loadedRequest, 'record');
    }
  }

  set loadedReq(value: any) {
      this.loadedRequest = {record: false, ...value};
  }

async getRecord(recordId: string): Promise<void> {
  const record = await lastValueFrom(this.http.get(`${this.getRecordUrl}/${recordId}`));
  if (record) {
    this.prepareRecordData(record);
  } else {
    this.isEmpty = true;
  }
  this.checkLoading('record');
}

  prepareRecordData(record: any) {
  // for (const key of Object.keys(record)) {
  //     if (this.newGroupForm.contains(key) && record[key]) {
  //         this.gnf[key]?.setValue(record[key]);
  //     }
  // }
  }

  checkLoading(type: string) {
  // this.isLoading = UtilService.requestLoaded(this.loadedRequest, type);
  }

  async save() {
    if (!this.isSubmitting) {
      this.isSubmitting = true;
      const value = this.prepareSaveData();
      if (this.isNew) {
        this.http.post(this.postRecordUrl, value)
          .subscribe({
            next: (data: any) => {
              // this.toastr.success('Success save');
              this.isSubmitting = false;
              this.afterSave(data);
            },
            error: error => {
              // this.toastr.error('Something went wrong please try again!');
              console.error(error);
              this.isSubmitting = false;
              this.afterSaveError();
            }
          });
      } else {
        this.http.put(this.putRecordUrl, value)
          .subscribe({
            next: (data: any) => {
              // this.toastr.success('Success save');
              this.isSubmitting = false;
              this.afterSave(data);
            },
            error: error => {
              // this.toastr.error('Something went wrong please try again!');
              console.error(error);
              this.isSubmitting = false;
              this.afterSaveError();
            }
          });
      }
    }
  }

  prepareSaveData(): any | any[] {
      return {};
  }

  afterSave(value: any | any[]) {
      // Action after save
  }

  afterSaveError(value: any | any[] = null) {
      // Action error after save
  }
}
