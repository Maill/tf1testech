using Domain.Entities.Enums;
using Domain.Exceptions;
using Domain.ValueObjects;

namespace Domain.Entities
{
    public class LeavePeriodDemand
    {
        public string Comment { get; set; } = "";

        public string ManagerComment { get; set; } = "";

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public LeavePeriodType Type { get; init; }

        public LeavePeriodStatus Status { get; private set; } = LeavePeriodStatus.AwaitingResponse;

        public LeavePeriodDemand(LeavePeriodStatus status)
        {
            Status = status;
        }
        public LeavePeriodDemand()
        {
            
        }

        public void ValidateLeavePeriodDates()
        {
            if (StartDate > EndDate)
                throw new LeavePeriodInvalidDatesException();
        }

        public void UpdateStatus(LeavePeriodStatus newStatus) {
            switch(Status)
            {
                case LeavePeriodStatus.AwaitingResponse:
                    Status = newStatus;
                    break;
                case LeavePeriodStatus.Approuved:
                case LeavePeriodStatus.Rejected:
                    throw new LeavePeriodIllegalStatusChangeException();
            }
        }

        public LeavePeriodDemandDTO ToDTO() => new(
                Comment, 
                ManagerComment, 
                StartDate, 
                EndDate, 
                Type, 
                Status
            );
    }
}
