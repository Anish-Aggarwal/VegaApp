using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VegaApp.Controllers.Resources;
using VegaApp.Core.Models;
using VegaApp.Persistence;

namespace VegaApp.Controllers
{
    public class MakesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;

        public MakesController(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await this.context.Makes.Include(m => m.Models).ToListAsync();

            return this.mapper.Map<List<Make>, List<MakeResource>>(makes);
        }

        [HttpGet("/api/models")]
        public async Task<IEnumerable<ModelResource>> GetModels()
        {
            var models = await this.context.Models.ToListAsync();

            return this.mapper.Map<List<Model>, List<ModelResource>>(models);
        }
    }
}