using Domain.Entities;
using Domain.Entities.Enums;

namespace Domain.ValueObjects
{
    public record LeavePeriodDemandDTO(string Comment,
        string ManagerComment,
        DateTime StartDate,
        DateTime EndDate,
        LeavePeriodType Type,
        LeavePeriodStatus Status)
    {
        public LeavePeriodDemand ToDomain()
        {
            return new LeavePeriodDemand(Status) 
            {
                Comment = Comment,
                ManagerComment = ManagerComment,
                StartDate = StartDate,
                EndDate = EndDate,
                Type = Type,
            };
        }
    }
}
