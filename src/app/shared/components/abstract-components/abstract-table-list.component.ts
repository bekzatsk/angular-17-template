import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IPageContent} from '../../interfaces/page-content.metadata';
import {Header} from '../../interfaces/table.metadata';
import {IMAGE_SRC} from '../../data/file-path';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {UtilService} from "../../services/util.service";

@Component({
  standalone: true,
  template: ''
})
export class AbstractTableListComponent implements OnInit {
  pageIndex = 1;
  loading = false;
  data: any[] = [];
  totalElements = 0;
  pageSize = 20;
  totalPages = 1;
  url = '';
  headers: Header[] = [];
  imageURL = IMAGE_SRC;
  queryFilter: any = {};

  constructor(
    protected http: HttpClient,
    protected cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getData({offset: 1}).then();
  }

  async getData(event: any) {
    this.pageIndex = event?.offset ?? 1;
    this.loading = true;
    if (this.url) {
      this.data = [];
      const result: IPageContent = await lastValueFrom(this.http.get<IPageContent>(`${this.url}`,
        {
          params: {
              page: this.pageIndex,
              size: this.pageSize,
              ...event?.filter
          }
        })
      )
      this.data = result.content;
      this.totalElements = result.totalElements;
      this.totalPages = result.totalPages;
    }
    this.loading = false;
  }

  pageChange(event: any) {
      this.getData({offset: event}).then();
  }

  filterChange(event: any) {
      this.getData({offset: event?.offset ?? 1, filter: {...UtilService.removeNullFromObject(this.queryFilter), ...event?.filter}}).then();
  }

  searchData(text: string) {
      text ? this.queryFilter['s'] = text : delete this.queryFilter['s'];
      this.getData({offset: 1}).then();
  }
}
