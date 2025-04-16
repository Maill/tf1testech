import { Component, inject } from '@angular/core';
import { LeavePeriodService } from '../services/leave-period.service';
import LeavePeriodDTO from '../../models/LeavePeriodDTO';
import { LeavePeriodTypeLabelMapping } from '../../models/enums/LeavePeriodType';
import { LeavePeriodStatus, LeavePeriodStatusLabelMapping, LeavePeriodStatusLabelMappingManagerDecision } from '../../models/enums/LeavePeriodStatus';
import { FormControl, FormGroup } from '@angular/forms';
import LeavePeriodUpdateDTO from '../../models/LeavePeriodUpdateDTO';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manager',
  standalone: false,
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  private leavePeriodService: LeavePeriodService = inject(LeavePeriodService);
  public leavePeriods: Promise<LeavePeriodDTO[]> = this.leavePeriodService.getAllLeavePeriods();
  public leavePeriodTypeLabelMapping = LeavePeriodTypeLabelMapping;
  public leavePeriodStatusLabelMapping = LeavePeriodStatusLabelMapping;
  public leavePeriodStatusLabelMappingManagerDecision = LeavePeriodStatusLabelMappingManagerDecision;
  public managerDecisionForm: FormGroup = this.resetManagerDecisionForm();
  public formSubmitted = false;
  public errorMessage : string = "";

  public getDate(date: string) : Date {
    return new Date(date)
  }

  resetManagerDecisionForm() : FormGroup {
    return new FormGroup({
      employeeId: new FormControl(''),
      status: new FormControl(LeavePeriodStatus.Approuved),
      managerComment: new FormControl('')
    });
  }

  async updateLeavePeriod(){
    this.formSubmitted = true;

    const updateLeavePeriod = new LeavePeriodUpdateDTO(
      this.managerDecisionForm.get('employeeId')!.value,
      this.managerDecisionForm.get('managerComment')!.value,
      Number.parseInt(this.managerDecisionForm.get('status')!.value) as LeavePeriodStatus,
    );
    this.managerDecisionForm = this.resetManagerDecisionForm();

    try {
      await this.leavePeriodService.updateLeavePeriod(updateLeavePeriod);
    } catch(error) {
      const httpError = error as HttpErrorResponse;
      this.errorMessage = `[HTTP ERROR][${httpError.status}] - ${httpError.error}`;
    }
    this.leavePeriods = this.leavePeriodService.getAllLeavePeriods();

    this.formSubmitted = false;
  }
}
