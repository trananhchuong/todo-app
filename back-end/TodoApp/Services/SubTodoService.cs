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
    public class SubTodoService
    {
        private readonly ApiContext _context;
        public SubTodoService(ApiContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<object>> GetListSubTodo()
        {
            try
            {
                var todos = await _context.SubTodo.ToListAsync();
                return new ApiResponse(todos, todos.Count);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        public async Task<ActionResult<object>> Create([FromBody] SubTodoForm form)
        {
            try
            {
                var model = new SubTodo
                {
                    Completed = form.Completed,
                    Content = form.Content,
                    StatusCode = form.StatusCode,
                    TodoId = form.TodoId
                };
                _context.SubTodo.Add(model);
                await _context.SaveChangesAsync();
                return new ApiResponse(model);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        public async Task<ActionResult<object>> Delete([FromQuery] Guid id)
        {
            var subTodo = await _context.SubTodo.FirstOrDefaultAsync(x => x.Id == id);

            if (subTodo == null)
                return new ApiResponse("Không tìm thấy subTodo này!!");

            _context.Remove(subTodo);

            await _context.SaveChangesAsync();

            return new ApiResponse();
        }

        public async Task<ActionResult<object>> Update([FromBody] SubTodoForm form)
        {
            try
            {
                var subTodo = await _context.SubTodo.FirstOrDefaultAsync(x => x.Id == form.Id);

                if (subTodo == null)
                    return new ApiResponse("Không tìm thấy subTodo này!!");

                subTodo.Completed = form.Completed;
                subTodo.Content = form.Content;
                subTodo.StatusCode = form.StatusCode;
                subTodo.TodoId = form.TodoId;

                _context.SubTodo.Update(subTodo);
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
