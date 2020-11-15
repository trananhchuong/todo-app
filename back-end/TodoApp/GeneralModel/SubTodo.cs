using System;
using System.Collections.Generic;

namespace TodoApp.GeneralModel
{
    public partial class SubTodo
    {
        public Guid Id { get; set; }
        public Guid? TodoId { get; set; }
        public string Content { get; set; }
        public string StatusCode { get; set; }

        public virtual Status StatusCodeNavigation { get; set; }
        public virtual ToDo Todo { get; set; }
    }
}
