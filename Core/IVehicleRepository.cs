using System.Collections.Generic;
using System.Threading.Tasks;
using VegaApp.Core.Models;

namespace VegaApp.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true); 
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery filter);
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}