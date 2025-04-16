import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import LeavePeriodDTO from '../../../models/LeavePeriodDTO';
import { LeavePeriodService } from '../../services/leave-period.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-getleaveperiod',
  standalone: false,
  templateUrl: './getleaveperiod.component.html',
  styleUrl: './getleaveperiod.component.css'
})
export class GetleaveperiodComponent {
  private leavePeriodService: LeavePeriodService = inject(LeavePeriodService);
  public employeeIdForm : FormGroup;
  @Output() public getInitialLeavePeriod : EventEmitter<LeavePeriodDTO> = new EventEmitter<LeavePeriodDTO>();
  public errorMessage : string = "";

  constructor() {
    this.employeeIdForm = new FormGroup({
      employeeId: new FormControl('')
    });
  }

  async getLeavePeriod(){
    try{
      this.getInitialLeavePeriod.emit(await this.leavePeriodService.getLeavePeriod(this.employeeIdForm.get('employeeId')!.value));
    } catch(error) {
      const httpError = error as HttpErrorResponse;
      this.errorMessage = `[HTTP ERROR][${httpError.status}] - ${httpError.error}`;
    }
  }
}
