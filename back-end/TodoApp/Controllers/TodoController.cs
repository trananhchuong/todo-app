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

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        private readonly ApiContext _context;

        public TodoController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<object>> Index()
        {
            try
            {
                var todos = await _context.ToDo.OrderByDescending(x => x.CreatedAt).ToListAsync();

                return new ApiResponse(todos, todos.Count);

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
                var model = new ToDo
                {
                    Name = form.Name,
                    Content = form.Content,
                    Completed = form.Completed,
                    CreatedAt = DateTime.Now
                };

                _context.ToDo.Add(model);

                await _context.SaveChangesAsync();
                return new ApiResponse();

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
            var todo = await _context.ToDo.FirstOrDefaultAsync(x => x.Id == id);

            if (todo == null)
                return new ApiResponse("Không tìm thấy todo này!!");

            _context.Remove(todo);

            await _context.SaveChangesAsync();

            return new ApiResponse();
        }
    }
}
