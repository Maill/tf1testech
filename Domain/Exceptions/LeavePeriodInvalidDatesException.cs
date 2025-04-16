namespace Domain.Exceptions
{
    public class LeavePeriodInvalidDatesException() 
        : Exception("The start date is superior to the end date.");
}
