using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class Status
    {
        public Status()
        {
            SubTodo = new HashSet<SubTodo>();
        }

        public string Code { get; set; }
        public string Name { get; set; }

        public virtual ICollection<SubTodo> SubTodo { get; set; }

    }
}
