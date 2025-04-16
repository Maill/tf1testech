import LeavePeriodDemandDTO from "./LeavePeriodDemandDTO";

class LeavePeriodDTO {
    employeeId: string;
    leavePeriodDemand: LeavePeriodDemandDTO;

    constructor(employeeId: string, leavePeriodDemandDTO: LeavePeriodDemandDTO){
        this.employeeId = employeeId;
        this.leavePeriodDemand = leavePeriodDemandDTO;
    }
}

export default LeavePeriodDTO;