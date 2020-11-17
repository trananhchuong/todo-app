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
    [Route("api/sub-todo")]
    public class SubTodoController : ControllerBase
    {
        private readonly ApiContext _context;
        private SubTodoService _subTodoService;

        public SubTodoController(ApiContext context, SubTodoService subTodoService)
        {
            _context = context;
            _subTodoService = subTodoService;
        }
    
        [HttpGet]
        public async Task<ActionResult<object>> Index()
        {
            try
            {
                return await _subTodoService.GetListSubTodo();
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        [Route("create")]
        [HttpPost]
        public async Task<ActionResult<object>> Create([FromBody] SubTodoForm form)
        {
            try
            {
                return await _subTodoService.Create(form);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        [Route("delete")]
        [HttpDelete]
        public async Task<ActionResult<object>> Delete([FromQuery] Guid id) 
        {
            try
            {
                return await _subTodoService.Delete(id);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }

        }

        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<object>> Update([FromBody] SubTodoForm form)
        {
            try
            {
                return await _subTodoService.Update(form);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }
    }
}
