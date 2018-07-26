using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VegaApp.Core;
using VegaApp.Core.Extensions;
using VegaApp.Core.Models;

namespace VegaApp.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
              .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
              .Include(v => v.Model)
                .ThenInclude(m => m.Make)
              .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var query = context.Vehicles
             .Include(v => v.Features)
             .ThenInclude(vf => vf.Feature)
             .Include(v => v.Model)
             .ThenInclude(m => m.Make).AsQueryable();
            if (queryObj.MakeId.HasValue)
            {
                query = query.Where(x => x.Model.MakeId == queryObj.MakeId.Value);
            }
            if (queryObj.ModelId.HasValue)
            {
                query = query.Where(x => x.Model.Id == queryObj.ModelId.Value);
            }

            var dictMap = new Dictionary<string, Expression<Func<Vehicle, object>>>{
                {"make",x=> x.Model.Make.Name},
                {"model",x=> x.Model.Name},
                {"contactName", x=> x.ContactName}
             };

            query = query.ApplyOrdering<Vehicle>(queryObj, dictMap);

            return await query.ToListAsync();
        }
    }
}