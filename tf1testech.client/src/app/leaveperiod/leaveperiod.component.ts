import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import LeavePeriodDTO from '../../models/LeavePeriodDTO';

@Component({
  selector: 'app-leaveperiod',
  standalone: false,
  templateUrl: './leaveperiod.component.html',
  styleUrl: './leaveperiod.component.css',
})
export class LeaveperiodComponent {
  public leavePeriod: LeavePeriodDTO | undefined = undefined;
  public getDone : boolean = false;
  public showCreateForm = false;
  public showDetails = false;

  getInitialLeavePeriod(event : LeavePeriodDTO) {
    this.leavePeriod = event;
    this.getDone = true;
    if(this.leavePeriod.leavePeriodDemand === null){
      this.showCreateForm = true;
    }
    else{
      this.showDetails = true;
    }
  }

  updateLeavePeriod(event : LeavePeriodDTO) {
    this.leavePeriod = event;
    this.showCreateForm = false;
    this.showDetails = true;
  }

  resetComponent() {
    this.showDetails = false;
    this.showCreateForm = false;
    this.getDone = false;
    this.leavePeriod = undefined;
  }
}
