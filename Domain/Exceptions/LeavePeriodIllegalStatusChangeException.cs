namespace Domain.Exceptions
{
    public class LeavePeriodIllegalStatusChangeException() : Exception("Once the leave period has been approuved or rejected, you cannot change its status.");
}
