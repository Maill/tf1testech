import { inject, Injectable } from '@angular/core';
import LeavePeriodDTO from '../../models/LeavePeriodDTO';
import LeavePeriodCreationDTO from '../../models/LeavePeriodCreationDTO';
import LeavePeriodUpdateDTO from '../../models/LeavePeriodUpdateDTO';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavePeriodService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiRoute: string = "/leaveperiod";

  async getLeavePeriod(employeeId: string) : Promise<LeavePeriodDTO> {
    return await lastValueFrom(this.httpClient.get<LeavePeriodDTO>(`${this.apiRoute}/${employeeId}`));
  }

  async getAllLeavePeriods() : Promise<LeavePeriodDTO[]> {
    return await lastValueFrom(this.httpClient.get<LeavePeriodDTO[]>(`${this.apiRoute}/all`));
  }

  async createLeavePeriod(leavePeriodCreation: LeavePeriodCreationDTO) : Promise<LeavePeriodDTO> {
    return await lastValueFrom(this.httpClient.post<LeavePeriodDTO>(this.apiRoute, leavePeriodCreation));
  }

  async updateLeavePeriod(leavePeriodUpdate: LeavePeriodUpdateDTO) : Promise<void> {
    return await lastValueFrom(this.httpClient.patch<void>(this.apiRoute, leavePeriodUpdate));
  }
}
