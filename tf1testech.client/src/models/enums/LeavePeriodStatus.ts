export enum LeavePeriodStatus
{
    AwaitingResponse = 0,
    Approuved = 1,
    Rejected = 2
}

export const LeavePeriodStatusLabelMapping: Map<LeavePeriodStatus, string> = new Map<LeavePeriodStatus, string>([
    [LeavePeriodStatus.AwaitingResponse, "En attente de réponse"],
    [LeavePeriodStatus.Approuved, "Approuvée"],
    [LeavePeriodStatus.Rejected, "Rejetée"],
]);

export const LeavePeriodStatusLabelMappingManagerDecision: Map<LeavePeriodStatus, string> = new Map<LeavePeriodStatus, string>([
    [LeavePeriodStatus.Approuved, "Approuvée"],
    [LeavePeriodStatus.Rejected, "Rejetée"],
]);