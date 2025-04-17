import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppBaseComponent } from './app-base.component';
import { LeaveperiodComponent } from './components/leaveperiod/leaveperiod.component';
import { CreateleaveperiodComponent } from './components/leaveperiod/createleaveperiod/createleaveperiod.component';
import { DetailleaveperiodComponent } from './components/leaveperiod/detailleaveperiod/detailleaveperiod.component';
import { GetleaveperiodComponent } from './components/leaveperiod/getleaveperiod/getleaveperiod.component';
import { ManagerComponent } from './components/manager/manager.component';
import { DecisionformComponent } from './components/manager/decisionform/decisionform.component';
import { DemandssummaryComponent } from './components/manager/demandssummary/demandssummary.component';

@NgModule({
  declarations: [
    AppBaseComponent,
    LeaveperiodComponent,
    CreateleaveperiodComponent,
    DetailleaveperiodComponent,
    GetleaveperiodComponent,
    ManagerComponent,
    DecisionformComponent,
    DemandssummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppBaseComponent]
})
export class AppModule { }
