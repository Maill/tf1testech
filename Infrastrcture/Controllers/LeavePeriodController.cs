using Domain.Exceptions;
using Domain.Interfaces;
using Domain.ValueObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Infrastrcture.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LeavePeriodController(ILeavePeriodService leavePeriodService) : ControllerBase
    {
        private readonly ILeavePeriodService _leavePeriodService = leavePeriodService;

        [HttpGet("{employeeId}")]
        public IActionResult GetByEmployeeId(string employeeId)
        {
            return Ok(_leavePeriodService.GetLeavePeriod(new LeavePeriodDTO(employeeId, null)));
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_leavePeriodService.GetAllLeavePeriods());
        }

        [HttpPost]
        public IActionResult Create(LeavePeriodCreationDTO leavePeriodCreationDTO)
        {
            try
            {
                return Ok(_leavePeriodService.CreateLeavePeriod(leavePeriodCreationDTO));
            }
            catch (LeavePeriodInvalidDatesException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (LeavePeriodAlreadyExistsException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch]
        public IActionResult Update(LeavePeriodUpdateDTO leavePeriodUpdateDTO)
        {
            try
            {
                return Ok(_leavePeriodService.UpdateLeavePeriod(leavePeriodUpdateDTO));
            }
            catch (LeavePeriodIllegalStatusChangeException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (LeavePeriodDoesntExistsException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
