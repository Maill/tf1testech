import { Component, inject } from '@angular/core';
import LeavePeriodDTO from '../../../models/LeavePeriodDTO';
import { LeavePeriodService } from '../../services/leave-period.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-leaveperiod',
  standalone: false,
  templateUrl: './leaveperiod.component.html',
  styleUrl: './leaveperiod.component.css',
})
export class LeaveperiodComponent {
  private leavePeriodService : LeavePeriodService = inject(LeavePeriodService);
  public leavePeriod?: LeavePeriodDTO;
  public getDone : boolean = false;
  public showCreateForm = false;
  public showDetails = false;
  public errorMessage : string = "";

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

  async poolingLeavePeriod(){
    try {
      this.leavePeriod = await this.leavePeriodService.getLeavePeriod(this.leavePeriod!.employeeId);
    } catch(error) {
      const httpError = error as HttpErrorResponse;
      this.errorMessage = `[HTTP ERROR][${httpError.status}] - ${httpError.error}`;
    }
  }
}
