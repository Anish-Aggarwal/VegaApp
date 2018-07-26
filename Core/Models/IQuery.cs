namespace VegaApp.Core.Models
{
    public interface IQuery
    {
        string SortBy { get; set; }
        bool IsSortAscending { get; set; }
    }
}