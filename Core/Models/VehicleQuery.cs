namespace VegaApp.Core.Models
{
    public class VehicleQuery:IQuery
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public string ContactName { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
    }
}