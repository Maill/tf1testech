using Domain.Entities;
using Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Agregates
{
    public class LeavePeriod
    {
        public required Employee Employee { get; set; }

        public LeavePeriodDemand? LeavePeriodDemand { get; set; }

        public LeavePeriodDTO ToDTO()
        {
            return new LeavePeriodDTO(Employee.Id, LeavePeriodDemand?.ToDTO());
        }
    }
}
