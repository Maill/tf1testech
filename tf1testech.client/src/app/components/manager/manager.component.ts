import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import LeavePeriodDTO from '../../../models/LeavePeriodDTO';
import { LeavePeriodService } from '../../services/leave-period.service';

@Component({
  selector: 'app-manager',
  standalone: false,
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  private leavePeriodService: LeavePeriodService = inject(LeavePeriodService);
  public leavePeriods: Promise<LeavePeriodDTO[]> = this.leavePeriodService.getAllLeavePeriods();
  public errorMessage : string = "";

  refreshData(){
    try {
      this.leavePeriods = this.leavePeriodService.getAllLeavePeriods();
    } catch(error) {
      const httpError = error as HttpErrorResponse;
      this.errorMessage = `[HTTP ERROR][${httpError.status}] - ${httpError.error}`;
    }
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
