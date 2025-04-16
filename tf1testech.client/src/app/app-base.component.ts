import { Component } from "@angular/core";

@Component({
  selector: 'app-base',
  templateUrl: './app-base.component.html',
  standalone: false,
})
export class AppBaseComponent {
  public showLeavePeriodForm : boolean = true;
  public showManagerForm : boolean = false;

  showLeavePeriodFormButton(){
    this.showLeavePeriodForm = true;
    this.showManagerForm = false;
  }

  showManagerFormButton(){
    this.showLeavePeriodForm = false;
    this.showManagerForm = true;
  }
}