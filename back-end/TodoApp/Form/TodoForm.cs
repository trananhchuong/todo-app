using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Form
{
    public class TodoForm 
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool? Completed { get; set; }
        public DateTime? CreatedAt { get; set; }

    }
}
