import {AfterContentChecked, AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {keys} from 'lodash';
import {SubscriptionStorage} from '../../subscriptionStorage/subscription-storage';

@Component({
  selector: 'bbs-custom-paginator-container',
  templateUrl: './custom-paginator-container.component.html',
  styleUrls: ['./custom-paginator-container.component.scss']
})
export class CustomPaginatorContainerComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() paginator: MatPaginator;
  @Output() choosePage = new EventEmitter<number>();
  pagesNumbers;

  subs = new SubscriptionStorage();

  constructor() {
  }

  ngOnInit() {
    this.pagesNumbers = Array.from(Array(10).keys());
    this.subs['page'] = this.paginator.page.subscribe((event) => {
      if (keys(event).length) {
        this.selectPage(event.pageIndex, true);
      }
    });
  }

  selectPage(selectedPage, preventEmitting?) {
    if (selectedPage < 6) {
      this.pagesNumbers.length = 0;
      for (let number = 0; number < 10; number++) {
        this.pagesNumbers.push(number);
      }
    } else {
      this.pagesNumbers.length = 0;
      for (let number = selectedPage - 5; number < selectedPage + 5; number++) {
        if (number > this.paginator.getNumberOfPages() - 1) {
          break;
        }
        this.pagesNumbers.push(number);
      }
      if (this.pagesNumbers.length < 10) {
        this.fillArray();
      }
    }
    if (this.currentPage !== selectedPage) {
      this.currentPage = selectedPage;
      if (!preventEmitting) {
        this.choosePage.emit(this.currentPage);
      }
    }
  }

  fillArray() {
    if (this.pagesNumbers[0] === 0) {
      return;
    } else {
      const delta = 10 - this.pagesNumbers.length;
      const begining = this.pagesNumbers[0] - delta;
      const additionalArr = [];
      for (let i = 0; i < delta - 1; i++) {
        additionalArr.push(begining + i + 1);
      }
      this.pagesNumbers = [...additionalArr, ...this.pagesNumbers];
    }
  }

  getPagesNumbers() {
    if (isNaN(this.totalPages)) {
      return [0];
    }
    if (this.totalPages < 10) {
      this.selectPage(this.currentPage, true);
      return this.pagesNumbers.slice(0, this.totalPages);
    } else {
      return this.pagesNumbers;
    }
  }

}
