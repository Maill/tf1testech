using Domain.Agregates;
using Domain.Entities;
using Domain.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ValueObjects
{
    public record LeavePeriodDTO(
        string EmployeeId,
        LeavePeriodDemandDTO? LeavePeriodDemand
        )
    {
        public LeavePeriod ToDomain()
        {
            return new LeavePeriod()
            {
                Employee = new Employee(EmployeeId),
                LeavePeriodDemand = LeavePeriodDemand?.ToDomain(),
            };
        }
    }
}
    