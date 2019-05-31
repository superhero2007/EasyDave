import {ToastrService} from 'ngx-toastr';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {fromEvent, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {SubscriptionStorage} from '../../subscriptionStorage/subscription-storage';
import {OverlayLoaderService} from '../../services/overlay-loader.service';
import {LocalStorageService} from '../../services/local-storage.service';

export interface SentMessageData {
  destination_addr: string;
  id: number;
  request_id: number;
  sequence: number[];
  short_message: string;
  source_addr: string;
  timestamp: string;
}

@Component({
  selector: 'app-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss']
})
export class TableBaseComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('tableSearch') tableSearch: ElementRef;

  displayedColumns: string[];

  dataSource: MatTableDataSource<any>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  subs = new SubscriptionStorage();

  method;
  context;
  totalPages = 1;

  filterValue = '';
  filtersBody: any = {
    filter: {
      isActual: true,
      search: null
    }
  };

  constructor(
    protected translateService: TranslateService,
    protected overlayLoaderService: OverlayLoaderService,
    protected dialog: MatDialog,
    protected toastr: ToastrService,
    protected localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
  }

  initTable(method, context, key) {

    this.method = method;
    this.context = context;

    const date = new Date().getTime();
    const dayInMills = 1000 * 60 * 60 * 24;


    this.filtersBody.filter.dateFrom = new Date(new Date(date - (dayInMills * 7)).setHours(0, 0, 0, 0));
    this.filtersBody.filter.dateTill = new Date(new Date().setHours(0, 0, 0, 0));

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.subs['tableChange'] = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap((event) => {
          this.isLoadingResults = true;
          this.overlayLoaderService.changeSpinnerState(true);
          return method.call(context, this.getParams(), this.filtersBody);
        }),
        map((response: any) => {
          const data = response.Response;
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = 'count' in data ? data.count : data.Count;
          return data[key];
        }),
        catchError((err) => {
          this.overlayLoaderService.changeSpinnerState(false);
          // this.toastr.error(this.translateService.instant('errorMessages.error'));
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          this.resultsLength = 0;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.totalPages = Math.ceil(this.resultsLength / this.paginator.pageSize);
        if (!data) {
          data = [];
        }
        this.dataSource = new MatTableDataSource<any>(data.splice(0, 30));
      });

    if (this.tableSearch) {
      this.subs['search'] = fromEvent(this.tableSearch.nativeElement, 'input').pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe((event: any) => {
        if (this.paginator && this.paginator.pageIndex !== 0) {
          this.paginator.firstPage();
        } else if (this.paginator && this.paginator.pageIndex === 0) {
          this.paginator._changePageSize(this.paginator.pageSize);
        }
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getParams() {
    return new HttpParams()
      .set('page', (this.paginator.pageIndex * (this.paginator.pageSize ? this.paginator.pageSize : 0)).toString())
      .set('limit', this.paginator.pageSize ? this.paginator.pageSize.toString() : '10')
      .set('order_by', (this.sort.direction !== 'asc' ? '' : '-') + (this.sort.active ? this.sort.active : 'id'));
  }

  openModal(data) {
    /*console.log(data);
    const dialogRef = this.dialog.open(SmsDetailsComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });*/
  }

  isEven(number) {
    return number % 2 === 0;
  }
  applyFilters(filters) {
    this.filtersBody.filter = filters;
    if (this.paginator && this.paginator.pageIndex !== 0) {
      this.paginator.firstPage();
    } else if (this.paginator && this.paginator.pageIndex === 0) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }
  setPage(newPage) {
    this.paginator.pageIndex = newPage;
    this.paginator.page.emit(newPage);
  }
  dateToLocale(date) {
    return new Date(date).toLocaleDateString(this.translateService.currentLang);
  }
}
