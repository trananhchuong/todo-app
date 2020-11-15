using System;
using System.Collections.Generic;

namespace TodoApp.GeneralModel
{
    public partial class Status
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
