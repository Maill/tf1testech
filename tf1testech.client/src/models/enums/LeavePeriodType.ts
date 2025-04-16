export enum LeavePeriodType
{
    Vacation = 0,
    Sick = 1,
    Maternity = 2,
    Other = 3,
}

export const LeavePeriodTypeLabelMapping: Map<LeavePeriodType, string> = new Map<LeavePeriodType, string>([
    [LeavePeriodType.Vacation, "Vacances"],
    [LeavePeriodType.Sick, "Congés maladie"],
    [LeavePeriodType.Maternity, "Congés maternité"],
    [LeavePeriodType.Other, "Autre"],
]);