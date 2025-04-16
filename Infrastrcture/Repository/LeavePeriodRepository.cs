using Domain.Agregates;
using Domain.Interfaces;
using Domain.ValueObjects;

namespace Infrastrcture.Repository
{
    public class LeavePeriodRepository : ILeavePeriodRepository
    {
        private List<LeavePeriodDTO> _data = [];

        public void AddLeavePeriod(LeavePeriod leavePeriod)
        {
            _data.Add(leavePeriod.ToDTO());
        }

        public LeavePeriodDTO? GetLeavePeriod(string employeeId)
        {
            return _data.FirstOrDefault(x => x.EmployeeId == employeeId);
        }

        public List<LeavePeriodDTO> GetAllLeavePeriods()
        {
            return _data;
        }

        public void UpdateLeavePeriod(LeavePeriod leavePeriod)
        {
            var dto = leavePeriod.ToDTO();
            _data.Remove(dto);
            _data.Add(dto);
        }
    }
}
