using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TodoApp.GeneralModel
{
    public partial class ToDoContext : DbContext
    {
        public ToDoContext()
        {
        }

        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<SubTodo> SubTodo { get; set; }
        public virtual DbSet<ToDo> ToDo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-9F787H9,1433\\\\MSSQLSERVER;Database=ToDo;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Status>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PK__Status__A25C5AA61431BFD5");

                entity.HasIndex(e => e.Code)
                    .HasName("Status_Code_uindex")
                    .IsUnique();

                entity.Property(e => e.Code)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<SubTodo>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.StatusCode)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.StatusCodeNavigation)
                    .WithMany(p => p.SubTodo)
                    .HasForeignKey(d => d.StatusCode)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("SubTodo_Status_Code_fk");

                entity.HasOne(d => d.Todo)
                    .WithMany(p => p.SubTodo)
                    .HasForeignKey(d => d.TodoId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("SubTodo_ToDo_Id_fk");
            });

            modelBuilder.Entity<ToDo>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Name).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
