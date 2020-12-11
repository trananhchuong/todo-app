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
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        private readonly ApiContext _context;
        private readonly TodoService _todoService;

        public TodoController(ApiContext context, TodoService todoService)
        {
            _context = context;
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<object>> Index([FromQuery] string key)
        {
            try
            {
                return await _todoService.GetListTodo(key);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        [Route("create")]
        [HttpPost]
        public async Task<ActionResult<object>> Create([FromBody] TodoForm form)
        {
            try
            {
                return await _todoService.Create(form);
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
                return await _todoService.Delete(id);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<object>> Update([FromBody] TodoForm form)
        {
            try
            {
                return await _todoService.Update(form);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        [Route("show")]
        [HttpGet]
        public async Task<ActionResult<object>> Show([FromQuery] Guid id)
        {
            try
            {
                return await _todoService.Show(id);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

    }
}
