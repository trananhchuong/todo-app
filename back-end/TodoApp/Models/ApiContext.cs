using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TodoApp.Models
{
    public class ApiContext : DbContext
    {

        public ApiContext(DbContextOptions<ApiContext> options)
         : base(options)
        {
        }

        public DbSet<Status> Status { get; set; }
        public DbSet<SubTodo> SubTodo { get; set; }
        public DbSet<ToDo> ToDo { get; set; }

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
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

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

                entity.Property(e => e.StatusCode).HasMaxLength(255);
            });

        }


    }
}
