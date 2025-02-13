using Assignment3_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Assignment3_Backend.Controllers
{
    [Route("api/[controller]")]
        [ApiController]
    public class ReportController : Controller
    {
        private readonly IRepository _repository;

        public ReportController(IRepository repository)
        {
            _repository = repository;
        }

        //Generate the report
        [HttpGet("GenerateReport")]
        public async Task<IActionResult> ProductReport()
        {
            var report = await _repository.GenerateProductReportAsync();
            return Ok(report);
        }
       
    }
}
