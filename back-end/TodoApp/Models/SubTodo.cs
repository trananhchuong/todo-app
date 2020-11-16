using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class SubTodo
    {
        public Guid Id { get; set; }
        public Guid? TodoId { get; set; }
        public string Content { get; set; }
        public string StatusCode { get; set; }
        public bool? Completed { get; set; }

        public virtual Status StatusCodeNavigation { get; set; }
        public virtual ToDo Todo { get; set; }

    }
}
