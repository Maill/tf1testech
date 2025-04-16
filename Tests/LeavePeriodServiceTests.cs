using Application.Services;
using Domain.Agregates;
using Domain.Entities;
using Domain.Entities.Enums;
using Domain.Exceptions;
using Domain.ValueObjects;
using Infrastrcture.Repository;

namespace Tests
{
    public class LeavePeriodServiceTests
    {
        [Fact]
        public void ShouldGetEmptyLeavePeriodForEmployee()
        {
            //Arrange
            var repository = new LeavePeriodRepository();
            var service = new LeavePeriodService(repository);
            var leavePeriodDto = new LeavePeriodDTO("test", null);

            //Act
            var response = service.GetLeavePeriod(leavePeriodDto);

            //Assert
            Assert.Equal(response, leavePeriodDto);
        }

        [Fact]
        public void ShouldGetCurrentLeavePeriodDemandForEmployee()
        {
            //Arrange
            var repository = new LeavePeriodRepository();
            var service = new LeavePeriodService(repository);
            var leavePeriodDto = new LeavePeriodDTO("test", null);
            var expectedLeavePeriod = new LeavePeriod()
            {
                Employee = new Employee("test"),
                LeavePeriodDemand = new LeavePeriodDemand()
                {
                    Comment = "This is a comment",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(1),
                    Type = LeavePeriodType.Vacation
                }
            };

            //Act
            repository.AddLeavePeriod(expectedLeavePeriod);
            var response = service.GetLeavePeriod(leavePeriodDto);

            //Assert
            Assert.Equal(response, expectedLeavePeriod.ToDTO());
        }

        [Fact]
        public void ShouldCreateLeavePeriodForEmployee()
        {
            //Arrange
            var startDate = DateTime.Now;
            var endDate = DateTime.Now.AddDays(11);

            var repository = new LeavePeriodRepository();
            var service = new LeavePeriodService(repository);
            var leavePeriodCreationDto = new LeavePeriodCreationDTO(
                "test",
                "This is a comment",
                startDate,
                endDate,
                LeavePeriodType.Sick
            );
            var expectedLeavePeriod = new LeavePeriod()
            {
                Employee = new Employee("test"),
                LeavePeriodDemand = new LeavePeriodDemand()
                {
                    Comment = "This is a comment",
                    StartDate = startDate,
                    EndDate = endDate,
                    Type = LeavePeriodType.Sick
                }
            };

            //Act
            var response = service.CreateLeavePeriod(leavePeriodCreationDto);

            //Assert
            Assert.Equal(response, expectedLeavePeriod.ToDTO());
        }

        [Fact]
        public void ShouldNotCreateLeavePeriodForEmployeeDueToInvalidDates()
        {
            //Arrange
            var repository = new LeavePeriodRepository();
            var service = new LeavePeriodService(repository);
            var leavePeriodCreationDto = new LeavePeriodCreationDTO(
                "test",
                "This is a comment",
                DateTime.Now.AddDays(1),
                DateTime.Now,
                LeavePeriodType.Sick
            );

            //Act
            var exception = Record.Exception(() => service.CreateLeavePeriod(leavePeriodCreationDto));

            //Assert
            Assert.NotNull(exception);
            Assert.IsType<LeavePeriodInvalidDatesException>(exception);
        }

        [Fact]
        public void ShouldNotCreateBecauseLeavePeriodAlreadyExists()
        {
            //Arrange
            var startDate = DateTime.Now;
            var endDate = DateTime.Now.AddDays(11);

            var repository = new LeavePeriodRepository();
            var service = new LeavePeriodService(repository);
            var leavePeriodCreationDto = new LeavePeriodCreationDTO(
                "test",
                "This is a comment",
                startDate,
                endDate,
                LeavePeriodType.Sick
            );
            repository.AddLeavePeriod(leavePeriodCreationDto.ToDomain());
            var expectedLeavePeriod = new LeavePeriod()
            {
                Employee = new Employee("test"),
                LeavePeriodDemand = new LeavePeriodDemand()
                {
                    Comment = "This is a comment",
                    StartDate = startDate,
                    EndDate = endDate,
                    Type = LeavePeriodType.Sick
                }
            };

            //Act
            var exception = Record.Exception(() => service.CreateLeavePeriod(leavePeriodCreationDto));

            //Assert
            Assert.NotNull(exception);
            Assert.IsType<LeavePeriodAlreadyExistsException>(exception);
        }

        [Fact]
        public void ShouldUpdateLeavePeriodForEmployee()
        {
            //Arrange
            var startDate = DateTime.Now;
            var endDate = DateTime.Now.AddDays(11);

            var repository = new LeavePeriodRepository();
            var service = new LeavePeriodService(repository);
            var leavePeriodUpdateDto = new LeavePeriodUpdateDTO(
                "test",
                "This is a manager's comment",
                LeavePeriodStatus.Approuved
            );
            var actualLeavePeriod = new LeavePeriod()
            {
                Employee = new Employee("test"),
                LeavePeriodDemand = new LeavePeriodDemand()
                {
                    Comment = "This is a comment",
                    StartDate = startDate,
                    EndDate = endDate,
                    Type = LeavePeriodType.Sick
                }
            };
            repository.AddLeavePeriod(actualLeavePeriod);

            var expectedLeavePeriod = new LeavePeriod()
            {
                Employee = new Employee("test"),
                LeavePeriodDemand = new LeavePeriodDemand(LeavePeriodStatus.Approuved)
                {
                    Comment = "This is a comment",
                    ManagerComment = "This is a manager's comment",
                    StartDate = startDate,
                    EndDate = endDate,
                    Type= LeavePeriodType.Sick
                }
            };

            //Act
            var response = service.UpdateLeavePeriod(leavePeriodUpdateDto);

            //Assert
            Assert.Equal(response, expectedLeavePeriod.ToDTO());
        }

        [Fact]
        public void ShouldNotUpdateLeavePeriodForEmployeeDueToIllegalStatusChange()
        {
            //Arrange
            var startDate = DateTime.Now;
            var endDate = DateTime.Now.AddDays(11);

            var repository = new LeavePeriodRepository();
            var service = new LeavePeriodService(repository);
            var leavePeriodUpdateDto = new LeavePeriodUpdateDTO(
                "test",
                "This is a manager's comment",
                LeavePeriodStatus.Approuved
            );
            var actualLeavePeriod = new LeavePeriod()
            {
                Employee = new Employee("test"),
                LeavePeriodDemand = new LeavePeriodDemand(LeavePeriodStatus.Rejected)
                {
                    Comment = "This is a comment",
                    ManagerComment = "Already done",
                    StartDate = startDate,
                    EndDate = endDate,
                    Type= LeavePeriodType.Sick
                }
            };
            repository.AddLeavePeriod(actualLeavePeriod);

            var expectedLeavePeriod = new LeavePeriod()
            {
                Employee = new Employee("test"),
                LeavePeriodDemand = new LeavePeriodDemand(LeavePeriodStatus.AwaitingResponse)
                {
                    Comment = "This is a comment",
                    ManagerComment = "This is a manager's comment",
                    StartDate = startDate,
                    EndDate = endDate,
                    Type= LeavePeriodType.Sick
                }
            };

            //Act
            var exception = Record.Exception(() => service.UpdateLeavePeriod(leavePeriodUpdateDto));

            //Assert
            Assert.NotNull(exception);
            Assert.IsType<LeavePeriodIllegalStatusChangeException>(exception);
        }

        [Fact]
        public void ShouldNotUpdateIfLeavePeriodDoesntExists()
        {
            //Arrange
            var startDate = DateTime.Now;
            var endDate = DateTime.Now.AddDays(11);

            var repository = new LeavePeriodRepository();
            var service = new LeavePeriodService(repository);
            var leavePeriodUpdateDto = new LeavePeriodUpdateDTO(
                "test",
                "This is a manager's comment",
                LeavePeriodStatus.Approuved
            );

            //Act
            var exception = Record.Exception(() => service.UpdateLeavePeriod(leavePeriodUpdateDto));

            //Assert
            Assert.NotNull(exception);
            Assert.IsType<LeavePeriodDoesntExistsException>(exception);
        }
    }
}
