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
            return _data.FirstOrDefault(lp => lp.EmployeeId == employeeId);
        }

        public List<LeavePeriodDTO> GetAllLeavePeriods()
        {
            return _data;
        }

        public void UpdateLeavePeriod(LeavePeriod leavePeriod)
        {
            var dto = leavePeriod.ToDTO();
            _data.RemoveAll(lp => lp.EmployeeId == dto.EmployeeId);
            _data.Add(dto);
        }
    }
}
