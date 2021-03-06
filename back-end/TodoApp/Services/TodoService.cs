﻿using Api.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Constanst;
using TodoApp.Form;
using TodoApp.Models;
using TodoApp.Utils;

namespace TodoApp.Services
{
    public class TodoService
    {
        private readonly ApiContext _context;
        public TodoService(ApiContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<object>> GetListTodo(string key)
        {
            try
            {
                var todoList = await _context.ToDo.Include(x => x.Status).ToListAsync();

                if (key != null)
                {
                    var keyChar = Helper.ConvertToUnSign(key.ToLower().Trim());
                    todoList = todoList.Where(u => GetResultSearch(u.Name, keyChar)).ToList();
                }

                var todos = todoList
                    .OrderByDescending(x => x.CreatedAt)
                    .Select(x => new
                    {
                        Key = x.Id,
                        x.Id,
                        x.Name,
                        Completed = x.StatusCode == TodoConstant.STATUS_CODE_COMPLETED ? true : false,
                    }).ToList();
                return new ApiResponse(todos, todos.Count);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        private bool GetResultSearch(string valueQuery, string key)
        {
            return Helper.ConvertToUnSign(valueQuery.ToLower().Trim()).IndexOf(
                                    key, StringComparison.CurrentCultureIgnoreCase) >= 0;
        }

        public async Task<ActionResult<object>> Create(TodoForm form)
        {
            try
            {
                var model = new ToDo
                {
                    Name = form.Name,
                    CreatedAt = DateTime.Now,
                    StatusCode = form.StatusCode
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

        public async Task<ActionResult<object>> Delete(Guid id)
        {
            var todo = await _context.ToDo.FirstOrDefaultAsync(x => x.Id == id);

            if (todo == null)
                return new ApiResponse("Không tìm thấy todo này!!");

            _context.Remove(todo);

            await _context.SaveChangesAsync();

            return new ApiResponse();
        }

        public async Task<ActionResult<object>> Update(TodoForm form)
        {
            try
            {
                var todo = await _context.ToDo.FirstOrDefaultAsync(x => x.Id == form.Id);
                var statusCodeCompleted = await _context.Status
                    .Where(x => x.Code == "COMPLETED")
                    .Select(x => x.Code)
                    .FirstOrDefaultAsync();

                if (todo == null)
                    return new ApiResponse("Không tìm thấy todo này!!");

                todo.Name = form.Name;
                todo.StatusCode = form.StatusCode;

                if (form.StatusCode == statusCodeCompleted)
                {
                    var subTodoList = await _context.SubTodo.Where(x => x.TodoId == form.Id).ToListAsync();

                    foreach (var subTodo in subTodoList)
                    {
                        subTodo.StatusCode = statusCodeCompleted;
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

        public async Task<ActionResult<object>> Show(Guid id)
        {
            var todo = await _context.ToDo.FirstOrDefaultAsync(x => x.Id == id);
            if (todo == null)
                return new ApiResponse("Không tìm thấy todo này!!");
            return new ApiResponse(todo);
        }

    }
}
