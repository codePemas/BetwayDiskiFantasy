namespace BetwayDiskiFantasy.Api.DTOs
{
    public class TransferRequestDto
    {
        public int UserId { get; set; }
        public int PlayerOutId { get; set; } // Player being sold
        public int PlayerInId { get; set; }  // Player being bought
    }

    public class TransferResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public decimal RemainingBudget { get; set; }
        public string SoldPlayerName { get; set; } = string.Empty;
        public string BoughtPlayerName { get; set; } = string.Empty;
    }
}