import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FeatherModule} from "angular-feather";
import {TableListComponent} from "../../../../shared/components/table-list/table-list.component";
import {HEADERS, STATUSES} from "./data.metadata";
import {environment} from "../../../../../environments/environment";
import {
  AbstractTableListComponent
} from "../../../../shared/components/abstract-components/abstract-table-list.component";
import { HttpClient } from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {AsyncPipe, DatePipe, NgClass, NgOptimizedImage, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ImageSecurePipe} from "../../../../shared/pipes/image-secure.pipe";
import {InputDatetimeComponent} from "../../../../shared/components/input-datetime/input-datetime.component";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-releases-catalog-page',
  standalone: true,
  imports: [
    FeatherModule,
    TableListComponent,
    NgClass,
    RouterLink,
    ImageSecurePipe,
    AsyncPipe,
    NgOptimizedImage,
    DatePipe,
    InputDatetimeComponent,
    FormsModule,
    SlicePipe
  ],
  templateUrl: './releases-page.component.html',
  styleUrl: './releases-page.component.scss'
})
export class ReleasesPageComponent extends AbstractTableListComponent implements OnInit {
  active: number = 1;
  countRelease: any = {
    releases: 0,
    draft: 0,
    needFix: 0
  };
  statuses = STATUSES;
  customFilter = {
    addedDate: null,
    releaseDate: null,
    status: []
  }
  defaultImage = '';

  constructor(
    http: HttpClient,
    cdr: ChangeDetectorRef,
  ) {
    super(http, cdr)
    this.headers = HEADERS;
    this.url = `${environment.apiUrl}/app/albumreleases/pageable`;
  }

  override ngOnInit() {
    super.ngOnInit();

    lastValueFrom(this.http.get(`${environment.apiUrl}/app/albumreleases/count`,
      { params: {status: 'draft'}}))
      .then(r => {
        this.countRelease.draft = r;
      });
    lastValueFrom(this.http.get(`${environment.apiUrl}/app/albumreleases/count`,
      { params: {status: 'rejected,changes_needed'}}))
      .then(r => {
        this.countRelease.needFix = r;
      });
  }

  override async getData(event: any): Promise<void> {
    super.getData(event).then(() => {
      this.countRelease.releases = this.totalElements;
      this.data.forEach((item) => {
        item['imgError'] = false;
      });
    });
  }

  getStatusLabel(value: string): string {
    switch (value) {
      case 'RELEASED':
        return 'Released';
      case 'CHANGES_NEEDED':
        return 'Changes Needed';
      case 'PENDING_TAKE_DOWN':
        return 'Pending Takedown';
      case 'DRAFT':
        return 'Draft';
      case 'PENDING':
        return 'Pending';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      case 'TAKEN_DOWN':
        return 'Taken Down';
    }
    return '';
  }

  toStep(index: number) {
    if (this.active != index) {
      this.active = index;
      switch (index) {
        case 1:
          delete this.queryFilter['status'];
          break;
        case 2:
          this.queryFilter['status'] = 'draft';
          break;
        case 3:
          this.queryFilter['status'] = 'rejected,changes_needed';
          break;
      }
      this.getData({offset: 1}).then();
    }
  }

  override filterChange(event: any) {
    super.filterChange({offset: 1, filter: {
        addedDate: this.customFilter.addedDate,
        releaseDate: this.customFilter.releaseDate,
        status: this.customFilter.status.join(',')
      }});
  }
}
