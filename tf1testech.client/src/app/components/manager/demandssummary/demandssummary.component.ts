import { Component, Input } from '@angular/core';
import LeavePeriodDTO from '../../../../models/LeavePeriodDTO';
import { LeavePeriodTypeLabelMapping } from '../../../../models/enums/LeavePeriodType';
import { LeavePeriodStatusLabelMapping } from '../../../../models/enums/LeavePeriodStatus';

@Component({
  selector: 'app-demandssummary',
  standalone: false,
  templateUrl: './demandssummary.component.html',
  styleUrl: './demandssummary.component.css'
})
export class DemandssummaryComponent {
  @Input() public leavePeriods!: Promise<LeavePeriodDTO[]>;
  public leavePeriodTypeLabelMapping = LeavePeriodTypeLabelMapping;
  public leavePeriodStatusLabelMapping = LeavePeriodStatusLabelMapping;

  public getDate(date: string) : Date {
    return new Date(date)
  }
}
