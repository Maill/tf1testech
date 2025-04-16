import { LeavePeriodType } from "./enums/LeavePeriodType";

class LeavePeriodCreationDTO {
    employeeId: string;
    comment: string;
    private startDate: string;
    private endDate : string;
    type: LeavePeriodType;

    constructor(employeeId: string, comment: string, startDate: string, endDate: string, type: LeavePeriodType){
        this.employeeId = employeeId;
        this.comment = comment;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
    }
}

export default LeavePeriodCreationDTO;