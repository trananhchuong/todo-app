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
    public class StatusService
    {
        private readonly ApiContext _context;
        public StatusService(ApiContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<object>> GetListStatus()
        {
            try
            {
                var todos = await _context.Status.ToListAsync();
                return new ApiResponse(todos, todos.Count);
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        public async Task<ActionResult<object>> Create([FromBody] StatusForm form)
        {
            try
            {
                var model = new Status
                {
                    Name = form.Name,
                    Code = form.Code
                };
                _context.Status.Add(model);
                await _context.SaveChangesAsync();
                return new ApiResponse();
            }
            catch (Exception ex)
            {
                return new ApiResponse(ex.Message);
            }
        }

        public async Task<ActionResult<object>> Delete([FromQuery] string code)
        {
            var status = await _context.Status.FirstOrDefaultAsync(x => x.Code == code);

            if (status == null)
                return new ApiResponse("Không tìm thấy status này!!");

            _context.Remove(status);

            await _context.SaveChangesAsync();

            return new ApiResponse();
        }

        public async Task<ActionResult<object>> Update([FromBody] StatusForm form)
        {
            try
            {
                var status = await _context.Status.FirstOrDefaultAsync(x => x.Code == form.Code);
                if (status == null)
                    return new ApiResponse("Không tìm thấy status này!!");
                status.Name = form.Name;
                _context.Status.Update(status);
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
