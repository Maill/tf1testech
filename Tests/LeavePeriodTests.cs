using Domain.Entities;
using Domain.Entities.Enums;
using Domain.Exceptions;

namespace Tests
{
    public class LeavePeriodTests
    {
        [Fact]
        public void LeavePeriodShouldBeValid()
        {
            //Arrange
            var leavePeriod = new LeavePeriodDemand(LeavePeriodType.Vacation)
            {
                Comment = "This is a comment",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1)
            };

            //Act
            var exception = Record.Exception(() => leavePeriod.ValidateLeavePeriodDates());

            //Assert
            Assert.Null(exception);
        }

        public static readonly TheoryData<DateTime, DateTime> Cases = new()
        {
            { DateTime.Now, DateTime.Now.AddDays(-1) },
            { DateTime.Now.AddDays(1), DateTime.Now }
        };
        [Theory, MemberData(nameof(Cases))]
        public void LeavePeriodDatesShouldBeInvalid(DateTime startDate, DateTime endDate)
        {
            //Arrange
            var leavePeriod = new LeavePeriodDemand(LeavePeriodType.Vacation)
            {
                Comment = "This is a comment",
                StartDate = startDate,
                EndDate = endDate
            };

            //Act
            var exception = Record.Exception(() => leavePeriod.ValidateLeavePeriodDates());

            //Assert
            Assert.NotNull(exception);
            Assert.IsType<LeavePeriodInvalidDatesException>(exception);
        }

        [Theory]
        [InlineData(LeavePeriodStatus.Approuved)]
        [InlineData(LeavePeriodStatus.Rejected)]
        public void LeavePeriodStatusChangeShouldBeValid(LeavePeriodStatus status)
        {
            //Arrange
            var leavePeriod = new LeavePeriodDemand(LeavePeriodType.Maternity)
            {
                Comment = "This is a comment",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1)
            };

            //Act
            var exception = Record.Exception(() => leavePeriod.UpdateStatus(status));

            //Assert
            Assert.Null(exception);
        }

        [Theory]
        [InlineData(LeavePeriodStatus.AwaitingResponse)]
        [InlineData(LeavePeriodStatus.Rejected)]
        public void LeavePeriodStatusChangeShouldBeIllegal(LeavePeriodStatus status)
        {
            //Arrange
            var leavePeriod = new LeavePeriodDemand(LeavePeriodType.Maternity, LeavePeriodStatus.Approuved)
            {
                Comment = "This is a comment",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1)
            };

            //Act
            var exception = Record.Exception(() => leavePeriod.UpdateStatus(status));

            //Assert
            Assert.NotNull(exception);
            Assert.IsType<LeavePeriodIllegalStatusChangeException>(exception);
        }
    }
}
