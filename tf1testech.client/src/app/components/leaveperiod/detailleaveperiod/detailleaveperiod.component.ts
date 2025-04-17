import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import LeavePeriodDTO from '../../../../models/LeavePeriodDTO';
import { LeavePeriodTypeLabelMapping } from '../../../../models/enums/LeavePeriodType';

@Component({
  selector: 'app-detailleaveperiod',
  standalone: false,
  templateUrl: './detailleaveperiod.component.html',
  styleUrl: './detailleaveperiod.component.css'
})
export class DetailleaveperiodComponent implements OnDestroy {
  @Input() public leavePeriod!: LeavePeriodDTO;
  @Output() public back : EventEmitter<void> = new EventEmitter<void>();
  @Output() public pollingDataEvent : EventEmitter<void> = new EventEmitter<void>();
  private poolingEvent = setInterval(
    () => { 
      this.leavePeriod!.leavePeriodDemand!.status === 0 
        ? this.pollingDataEvent.emit() 
        : clearInterval(this.poolingEvent) 
  }, 1000);
  public leavePeriodTypeLabelMapping = LeavePeriodTypeLabelMapping;

  public getStartDate() : Date {
    return new Date(this.leavePeriod!.leavePeriodDemand!.startDate);
  }

  public getEndDate() : Date {
      return new Date(this.leavePeriod!.leavePeriodDemand!.endDate);
  }

  backButton() {
    this.back.emit();
  }

  ngOnDestroy(): void {
    clearInterval(this.poolingEvent) 
  }
}
