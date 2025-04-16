import { LeavePeriodStatus } from "./enums/LeavePeriodStatus";
import { LeavePeriodType } from "./enums/LeavePeriodType";

class LeavePeriodDemandDTO {
    comment: string;
    managerComment: string;
    startDate: string;
    endDate: string;
    type: LeavePeriodType;
    status: LeavePeriodStatus;

    constructor(comment: string, managerComment:string, startDate: string, endDate: string, type: LeavePeriodType, status: LeavePeriodStatus){
        this.comment = comment;
        this.managerComment = managerComment;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
        this.status = status;
    }
}

export default LeavePeriodDemandDTO;