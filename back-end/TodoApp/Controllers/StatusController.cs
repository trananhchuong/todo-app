using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TodoApp.Form;
using TodoApp.Models;
using TodoApp.Services;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("api/status")]
    public class StatusController : ControllerBase
    {
        private readonly ApiContext _context;
        private StatusService _statusService;

        public StatusController(ApiContext context, StatusService statusService)
        {
            _context = context;
            _statusService = statusService;
        }
    
        [HttpGet]
        public async Task<ActionResult<object>> Index()
        {
            try
            {
                return await _statusService.GetListStatus();
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        [Route("get-list-for-combo")]
        [HttpGet]
        public async Task<ActionResult<object>> GetListForCombo()
        {
            try
            {
                return await _statusService.GetListStatusForCombo();
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        [Route("create")]
        [HttpPost]
        public async Task<ActionResult<object>> Create([FromBody] StatusForm form)
        {
            try
            {
                return await _statusService.Create(form);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        [Route("delete")]
        [HttpDelete]
        public async Task<ActionResult<object>> Delete([FromQuery] string code) 
        {
            try
            {
                return await _statusService.Delete(code);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }

        }

        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<object>> Update([FromBody] StatusForm form)
        {
            try
            {
                return await _statusService.Update(form);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }
    }
}
