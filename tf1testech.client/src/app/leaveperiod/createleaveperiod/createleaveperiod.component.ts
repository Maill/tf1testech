import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LeavePeriodType, LeavePeriodTypeLabelMapping } from '../../../models/enums/LeavePeriodType';
import LeavePeriodDTO from '../../../models/LeavePeriodDTO';
import LeavePeriodCreationDTO from '../../../models/LeavePeriodCreationDTO';
import { LeavePeriodService } from '../../services/leave-period.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createleaveperiod',
  standalone: false,
  templateUrl: './createleaveperiod.component.html',
  styleUrl: './createleaveperiod.component.css'
})
export class CreateleaveperiodComponent {
  @Input() public leavePeriod: LeavePeriodDTO | undefined = undefined;
  @Output() updateLeavePeriod : EventEmitter<LeavePeriodDTO> = new EventEmitter<LeavePeriodDTO>();
  @Output() public back : EventEmitter<void> = new EventEmitter<void>();
  private leavePeriodService : LeavePeriodService = inject(LeavePeriodService);
  public leavePeriodCreationForm : FormGroup;
  private leavePeriodCreation : LeavePeriodCreationDTO | undefined = undefined;
  public leavePeriodTypeLabelMapping = LeavePeriodTypeLabelMapping;
  public minStartDate : string = this.addDaysToCurrentDateAndFormatForInput(0);
  public minEndDate : string = this.addDaysToCurrentDateAndFormatForInput(1);
  public formSubmitted : boolean = false;
  public errorMessage : string = "";

  constructor() {
    this.leavePeriodCreationForm = new FormGroup({
      comment: new FormControl(''),
      startDate: new FormControl(this.minStartDate),
      endDate: new FormControl(this.minEndDate),
      type: new FormControl(LeavePeriodType.Vacation)
    }, [Validators.required, this.dateRangeValidator]);
  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const startDate = this.leavePeriodCreationForm && this.leavePeriodCreationForm.get("startDate")!.value;
    const endDate = this.leavePeriodCreationForm && this.leavePeriodCreationForm.get("endDate")!.value;
    if (startDate && endDate) {
      invalid = new Date(startDate).valueOf() >= new Date(endDate).valueOf();
    }
    return invalid ? { invalidRange: { from: startDate, to: endDate } } : null;
  };

  async createLeavePeriod(){
    this.formSubmitted = true;
    this.leavePeriodCreation = new LeavePeriodCreationDTO(
      this.leavePeriod!.employeeId, 
      this.leavePeriodCreationForm.get('comment')!.value,
      this.leavePeriodCreationForm.get('startDate')!.value,
      this.leavePeriodCreationForm.get('endDate')!.value,
      Number.parseInt(this.leavePeriodCreationForm.get('type')!.value) as LeavePeriodType,
    );

    try {
      this.updateLeavePeriod.emit(await this.leavePeriodService.createLeavePeriod(this.leavePeriodCreation));
    } catch(error) {
      console.log(error);
      const httpError = error as HttpErrorResponse;
      this.errorMessage = `[HTTP ERROR][${httpError.status}] - ${httpError.error}`;
    }
    
    this.formSubmitted = false;
  }

  private addDaysToCurrentDateAndFormatForInput(days: number) : string {
    const currentDate = new Date();
    const dateWithAddedDays = new Date(currentDate.setDate(currentDate.getDate() + days)).toISOString().split('T')[0];
    const dateTime = new Date().toLocaleTimeString().slice(0, 5); //Ignoring seconds and above.
    return `${dateWithAddedDays}T${dateTime}`;
  }

  backButton() {
    this.back.emit();
  }
}
