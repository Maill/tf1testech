import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import LeavePeriodDTO from '../../../../models/LeavePeriodDTO';
import { LeavePeriodStatus, LeavePeriodStatusLabelMappingManagerDecision } from '../../../../models/enums/LeavePeriodStatus';
import { FormControl, FormGroup } from '@angular/forms';
import LeavePeriodUpdateDTO from '../../../../models/LeavePeriodUpdateDTO';
import { LeavePeriodService } from '../../../services/leave-period.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-decisionform',
  standalone: false,
  templateUrl: './decisionform.component.html',
  styleUrl: './decisionform.component.css'
})
export class DecisionformComponent {
  @Input() public leavePeriods!: Promise<LeavePeriodDTO[]>;
  @Output() public refreshData: EventEmitter<void> = new EventEmitter<void>();
  @Output() public setErrorMessage: EventEmitter<string> = new EventEmitter<string>();
  private leavePeriodService: LeavePeriodService = inject(LeavePeriodService);
  public leavePeriodStatusLabelMappingManagerDecision = LeavePeriodStatusLabelMappingManagerDecision;
  public managerDecisionForm: FormGroup = this.resetManagerDecisionForm();
  public formSubmitted = false;

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
      this.setErrorMessage.emit(`[HTTP ERROR][${httpError.status}] - ${httpError.error}`);
    }
    this.refreshData.emit();

    this.formSubmitted = false;
  }
}
