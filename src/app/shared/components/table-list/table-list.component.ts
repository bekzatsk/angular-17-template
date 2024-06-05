import {
  Component,
  ContentChild,
  ElementRef,
  inject,
  Input,
  OnDestroy, output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {StyleWrapperService} from '../../services/style-wrapper.service';
import {Header} from "../../interfaces/table.metadata";
import {JsonPipe, NgClass, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbOffcanvas, NgbPagination, NgbPaginationNext, NgbPaginationPrevious} from "@ng-bootstrap/ng-bootstrap";
import {NgScrollbar} from "ngx-scrollbar";
import {IconsModule} from "../../modules/icons.module";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgbPagination,
    NgbPaginationPrevious,
    NgbPaginationNext,
    IconsModule,
    JsonPipe,
    NgTemplateOutlet,
    NgScrollbar,
  ],
  styleUrls: ['./table-list.component.scss']
})

export class TableListComponent implements OnDestroy {
  @ContentChild('customRowRef') customRowRef?: TemplateRef<any>;
  @ContentChild('leftFilterRef') leftFilterRef?: TemplateRef<any>;
  @ContentChild('filterModalRef') filterModalRef?: TemplateRef<any>;
  @ViewChild('search') searchElement!: ElementRef;
  @Input() headers: Header[] = [];
  @Input() data: any[] = [];
  @Input() isLoading = true;
  @Input() totalElements = 0;
  @Input() pageSize = 0;
  @Input() pageIndex = 0;
  changePage = output<string>();
  changeFilter = output<string>();
  searchEvent = output<string>();
  private offCanvasService = inject(NgbOffcanvas);

  searching = false;
  filterIsOpen = false;
  searchText: string = '';

  constructor(private styleWrapper: StyleWrapperService) {}

  ngOnDestroy() {
    this.styleWrapper.typeWrapper(null);
  }

  onFocusingSearch() {
    this.searching = true;
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    },0);
  }

  onSearching(event: string) {
    this.searchEvent.emit(this.searchText);
  }

  pageChange(event: any) {
    this.changePage.emit(event);
  }

  filterChange(event: any) {
    this.changeFilter.emit(event);
  }

  openFilter(content: any) {
    this.styleWrapper.typeWrapper({zIndex: 9});
    this.filterIsOpen = true;
    this.offCanvasService.open(content, { position: 'end' });
  }

  closeFilter(content: any) {
    this.filterIsOpen = false;
    this.offCanvasService.dismiss(content);
  }

}
