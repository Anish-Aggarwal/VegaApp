using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VegaApp.Controllers.Resources;
using VegaApp.Core;
using VegaApp.Core.Models;

namespace VegaApp.Controllers
{
    // /api/vehicles/{vehicleId}/photos
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unit;
        private readonly IMapper mapper;
        public PhotosController(IHostingEnvironment host, IVehicleRepository repository, IUnitOfWork unit, IMapper mapper)
        {
            this.mapper = mapper;
            this.unit = unit;
            this.repository = repository;
            this.host = host;
        }
        [HttpGet]
        public async Task<IActionResult> GetPhotos(int vehicleId)
        {
            var photos = await this.repository.GetPhotos(vehicleId);
            if (photos == null)
            {
                return NotFound();
            }
            
            return Ok(this.mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos));
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await this.repository.GetVehicle(vehicleId, false);
            if (vehicle == null)
            {
                return NotFound();
            }

            var uploadsFolderPath = Path.Combine(this.host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);


            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }


            var photo = new Photo() { FileName = fileName };
            vehicle.Photos.Add(photo);
            await this.unit.CompleteAsync();

            return Ok(this.mapper.Map<Photo, PhotoResource>(photo));

        }

    }
}