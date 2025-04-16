using Domain.Entities;
using Domain.Entities.Enums;

namespace Domain.ValueObjects
{
    public record LeavePeriodUpdateDTO(string employeeId, string ManagerComment, LeavePeriodStatus status);
}
