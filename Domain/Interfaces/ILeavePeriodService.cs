using Domain.Agregates;
using Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ILeavePeriodService
    {
        public LeavePeriodDTO GetLeavePeriod(LeavePeriodDTO leavePeriod);

        public LeavePeriodDTO CreateLeavePeriod(LeavePeriodCreationDTO leavePeriodCreation);

        public LeavePeriodDTO UpdateLeavePeriod(LeavePeriodUpdateDTO leavePeriodUpdateDTO);
        
        public IEnumerable<LeavePeriodDTO> GetAllLeavePeriods();
    }
}
