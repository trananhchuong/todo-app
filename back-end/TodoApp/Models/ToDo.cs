using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class ToDo
    {
        public ToDo()
        {
            SubTodo = new HashSet<SubTodo>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string StatusCode { get; set; }

        public virtual ICollection<SubTodo> SubTodo { get; set; }
        public virtual Status Status { get; set; }


    }
}
