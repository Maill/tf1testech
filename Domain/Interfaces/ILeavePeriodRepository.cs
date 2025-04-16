using Domain.Agregates;
using Domain.ValueObjects;

namespace Domain.Interfaces
{
    public interface ILeavePeriodRepository
    {
        public LeavePeriodDTO? GetLeavePeriod(string employeeId);

        public List<LeavePeriodDTO> GetAllLeavePeriods();

        public void UpdateLeavePeriod(LeavePeriod leavePeriod);

        public void AddLeavePeriod(LeavePeriod leavePeriod);
    }
}
