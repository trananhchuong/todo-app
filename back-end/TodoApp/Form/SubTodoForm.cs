using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Form
{
    public class SubTodoForm
    {
        public Guid? Id { get; set; }
        public Guid? TodoId { get; set; }
        public string Content { get; set; }
        public string StatusCode { get; set; }

    }
}
