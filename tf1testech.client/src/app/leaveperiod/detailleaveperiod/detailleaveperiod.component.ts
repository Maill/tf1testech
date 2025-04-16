import { Component, EventEmitter, Input, Output } from '@angular/core';
import LeavePeriodDTO from '../../../models/LeavePeriodDTO';
import { LeavePeriodTypeLabelMapping } from '../../../models/enums/LeavePeriodType';

@Component({
  selector: 'app-detailleaveperiod',
  standalone: false,
  templateUrl: './detailleaveperiod.component.html',
  styleUrl: './detailleaveperiod.component.css'
})
export class DetailleaveperiodComponent {
  @Input() public leavePeriod: LeavePeriodDTO | undefined = undefined;
  @Output() public back : EventEmitter<void> = new EventEmitter<void>();
  public leavePeriodTypeLabelMapping = LeavePeriodTypeLabelMapping;

  public getStartDate() : Date {
    return new Date(this.leavePeriod!.leavePeriodDemand.startDate)
  }

  public getEndDate() : Date {
      return new Date(this.leavePeriod!.leavePeriodDemand.endDate);
  }

  backButton() {
    this.back.emit();
  }
}
