import { LeavePeriodStatus } from "./enums/LeavePeriodStatus";

class LeavePeriodUpdateDTO {
    employeeId : string;
    managerComment : string;
    status : LeavePeriodStatus;

    constructor(employeeId : string, managerComment : string, status: LeavePeriodStatus){
        this.employeeId = employeeId;
        this.managerComment = managerComment;
        this.status = status;
    }
}

export default LeavePeriodUpdateDTO;