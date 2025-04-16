using Domain.Exceptions;
using Domain.Interfaces;
using Domain.ValueObjects;

namespace Application.Services
{
    public class LeavePeriodService(ILeavePeriodRepository leavePeriodRepository) : ILeavePeriodService
    {
        private readonly ILeavePeriodRepository _leavePeriodRepository = leavePeriodRepository;

        public LeavePeriodDTO CreateLeavePeriod(LeavePeriodCreationDTO leavePeriodCreationDto)
        {
            if (_leavePeriodRepository.GetLeavePeriod(leavePeriodCreationDto.EmployeeId) is not null)
                throw new LeavePeriodAlreadyExistsException();

            var leavePeriod = leavePeriodCreationDto.ToDomain();
            leavePeriod.LeavePeriodDemand!.ValidateLeavePeriodDates();

            _leavePeriodRepository.AddLeavePeriod(leavePeriod);
            return leavePeriod.ToDTO();
        }

        public LeavePeriodDTO GetLeavePeriod(LeavePeriodDTO leavePeriodDto)
        {
            return _leavePeriodRepository.GetLeavePeriod(leavePeriodDto.EmployeeId) ?? leavePeriodDto;
        }

        public LeavePeriodDTO UpdateLeavePeriod(LeavePeriodUpdateDTO leavePeriodUpdateDTO)
        {
            var leavePeriod = _leavePeriodRepository.GetLeavePeriod(leavePeriodUpdateDTO.employeeId)?.ToDomain()
                ?? throw new LeavePeriodDoesntExistsException();
            leavePeriod!.LeavePeriodDemand!.ManagerComment = leavePeriodUpdateDTO.ManagerComment;
            leavePeriod.LeavePeriodDemand.UpdateStatus(leavePeriodUpdateDTO.status);
            _leavePeriodRepository.UpdateLeavePeriod(leavePeriod);
            return leavePeriod.ToDTO();
        }

        public IEnumerable<LeavePeriodDTO> GetAllLeavePeriods()
        {
            return _leavePeriodRepository.GetAllLeavePeriods();
        }
    }
}
