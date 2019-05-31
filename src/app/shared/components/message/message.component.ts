import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils';

@Component({
  selector: 'bbs-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() text: string;
  @Input() type: string;
  @Input() mod: string;
  @Input() params: any;

  loading$: any;

  timeOut: any;

  constructor(
    private utilsService: UtilsService,
  ) {
    if (this.timeOut) {
      this.timeOut = null;
    }
  }

  ngOnInit() {
    const vm = this;
    if (vm.params && vm.params.type && vm.params.type === 'sessionRenew' && vm.params.timeRemaining) {
      vm.utilsService.sessionTimeOutTimer = setTimeout(function () {
      }, vm.params.timeRemaining);
    }
    if (vm.params && vm.params.type && vm.params.type === 'temporary' && vm.params.timeRemaining) {
      vm.timeOut = setTimeout(function () {
      }, vm.params.timeRemaining);
    }
  }

  paramsAction(actionName: string) {
    switch (actionName) {
      case 'sessionRenew': {
      }
    }
  }

}
