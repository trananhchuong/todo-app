using System;
using System.Collections.Generic;

namespace TodoApp.GeneralModel
{
    public partial class ToDo
    {
        public ToDo()
        {
            SubTodo = new HashSet<SubTodo>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool? Completed { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<SubTodo> SubTodo { get; set; }
    }
}
