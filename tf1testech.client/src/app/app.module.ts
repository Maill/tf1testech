import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LeaveperiodComponent } from './leaveperiod/leaveperiod.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppBaseComponent } from './app-base.component';
import { CreateleaveperiodComponent } from './leaveperiod/createleaveperiod/createleaveperiod.component';
import { DetailleaveperiodComponent } from './leaveperiod/detailleaveperiod/detailleaveperiod.component';
import { GetleaveperiodComponent } from './leaveperiod/getleaveperiod/getleaveperiod.component';
import { ManagerComponent } from './manager/manager.component';

@NgModule({
  declarations: [
    AppBaseComponent,
    LeaveperiodComponent,
    CreateleaveperiodComponent,
    DetailleaveperiodComponent,
    GetleaveperiodComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppBaseComponent]
})
export class AppModule { }
