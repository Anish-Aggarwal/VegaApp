namespace VegaApp.Controllers.Resources
{
    public interface IQueryResource
    {
        string SortBy { get; set; }
        bool IsSortAscending { get; set; }
    }
}