using Api.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Form;
using TodoApp.Models;

namespace TodoApp.Services
{
    public class TodoService
    {
        private readonly ApiContext _context;
        public TodoService(ApiContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<object>> GetListTodo()
        {
            try
            {
                var todos = await _context.ToDo.ToListAsync();
                return new ApiResponse(todos, todos.Count);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        public async Task<ActionResult<object>> Create([FromBody] TodoForm form)
        {
            try
            {
                var model = new ToDo
                {
                    Name = form.Name,
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

        public async Task<ActionResult<object>> Delete([FromQuery] Guid id)
        {
            var todo = await _context.ToDo.FirstOrDefaultAsync(x => x.Id == id);

            if (todo == null)
                return new ApiResponse("Không tìm thấy todo này!!");

            _context.Remove(todo);

            await _context.SaveChangesAsync();

            return new ApiResponse();
        }

        public async Task<ActionResult<object>> Update([FromBody] TodoForm form)
        {
            try
            {
                var todo = await _context.ToDo.FirstOrDefaultAsync(x => x.Id == form.Id);
                if (todo == null)
                    return new ApiResponse("Không tìm thấy todo này!!");

                todo.Name = form.Name;
                todo.Completed = form.Completed;
             
                if(form.Completed == true)
                {
                    var subTodoList = await _context.SubTodo.Where(x => x.TodoId == form.Id).ToListAsync();
                    
                    foreach(var subTodo in subTodoList)
                    {
                        subTodo.Completed = true;
                    }
                    _context.SubTodo.UpdateRange(subTodoList);
                }

                _context.ToDo.Update(todo);
                await _context.SaveChangesAsync();
                return new ApiResponse();
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }
    }
}
