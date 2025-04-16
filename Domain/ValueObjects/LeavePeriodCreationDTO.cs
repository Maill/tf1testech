using Domain.Agregates;
using Domain.Entities;
using Domain.Entities.Enums;

namespace Domain.ValueObjects
{
    public record LeavePeriodCreationDTO(
        string EmployeeId,
        string Comment,
        DateTime StartDate,
        DateTime EndDate,
        LeavePeriodType Type)
    {
        public LeavePeriod ToDomain()
        {
            return new LeavePeriod()
            {
                Employee = new Employee(EmployeeId),
                LeavePeriodDemand = new LeavePeriodDemand()
                {
                    Comment = Comment,
                    StartDate = StartDate,
                    EndDate = EndDate,
                    Type = Type
                }
            };
        }
    }
}
