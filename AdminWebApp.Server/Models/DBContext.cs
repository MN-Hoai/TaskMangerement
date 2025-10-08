using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AdminWebApp.Server.Models
{
    public partial class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<AccountCategory> AccountCategories { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<TaskCategory> TaskCategories { get; set; }
        public virtual DbSet<Plan> Plans { get; set; }
        public virtual DbSet<TaskDetail> TaskDetails { get; set; }
        public virtual DbSet<TaskAssignees> TaskAssignees { get; set; } // Fixed to TaskAssignee

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Username).HasName("PK__Account__536C85E535ED4D6C");

                entity.ToTable("Account");

                entity.Property(e => e.Username).HasMaxLength(50);
                entity.Property(e => e.AccountCategoryID).HasMaxLength(50);
                entity.Property(e => e.Address).HasMaxLength(255);
                entity.Property(e => e.Avatar).HasMaxLength(255);
                entity.Property(e => e.CreateBy).HasMaxLength(50);
                entity.Property(e => e.CreateTime).HasColumnType("datetime");
                entity.Property(e => e.Email).HasMaxLength(255);
                entity.Property(e => e.FullName).HasMaxLength(50);
                entity.Property(e => e.LastLoginTime).HasColumnType("datetime");
                entity.Property(e => e.Mobile).HasMaxLength(50);
                entity.Property(e => e.Password).HasMaxLength(255);
                entity.Property(e => e.PasswordEncodeKey).HasMaxLength(255);
                entity.Property(e => e.PasswordUpdatedTime).HasColumnType("datetime");
                entity.Property(e => e.RefreshToken).HasMaxLength(4000);
                entity.Property(e => e.RefreshTokenCreateTime).HasColumnType("datetime");
                entity.Property(e => e.UpdateTime).HasColumnType("datetime");

                entity.HasOne(d => d.AccountCategory).WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.AccountCategoryID)
                    .HasConstraintName("FK__Account__Account__1367E606");
            });

            modelBuilder.Entity<AccountCategory>(entity =>
            {
                entity.HasKey(e => e.AccountCategoryID).HasName("PK__AccountC__8E42115AD5F2FDB8");

                entity.ToTable("AccountCategory");

                entity.Property(e => e.AccountCategoryID).HasMaxLength(50);
                entity.Property(e => e.Avatar).HasMaxLength(255);
                entity.Property(e => e.Description).HasMaxLength(4000);
                entity.Property(e => e.Title).HasMaxLength(50);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF1A2C8E7B3");

                entity.ToTable("Employees");

                entity.Property(e => e.EmployeeId).ValueGeneratedOnAdd();
                entity.Property(e => e.Account).HasMaxLength(50);
                entity.Property(e => e.FullName).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(100).IsRequired();
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Position).HasMaxLength(50);
                entity.Property(e => e.Department).HasMaxLength(50);

                entity.HasIndex(e => e.Email, "UQ__Employee__Email").IsUnique();

                entity.HasOne(d => d.Superior).WithMany()
                    .HasForeignKey(d => d.superior)
                    .HasConstraintName("FK__Employee__superior__1A14E395");
            });

            modelBuilder.Entity<TaskCategory>(entity =>
            {
                entity.HasKey(e => e.CategoryId).HasName("PK__TaskCategory__19093A2B8F9A2C7D");

                entity.ToTable("TaskCategories");

                entity.Property(e => e.CategoryId).ValueGeneratedOnAdd();
                entity.Property(e => e.CategoryName).HasMaxLength(100).IsRequired();
            });

            modelBuilder.Entity<Plan>(entity =>
            {
                entity.HasKey(e => e.PlanId).HasName("PK__Plan__755C22B6E8B2C3F4");

                entity.ToTable("Plans");

                entity.Property(e => e.PlanId).ValueGeneratedOnAdd();
                entity.Property(e => e.PlanName).HasMaxLength(150).IsRequired();
                entity.Property(e => e.Tag).HasMaxLength(50);
                entity.Property(e => e.StartDate).HasColumnType("datetime");
                entity.Property(e => e.EndDate).HasColumnType("datetime");
                entity.Property(e => e.Status).HasMaxLength(20);
                entity.Property(e => e.Priority).HasMaxLength(20);

                entity.HasOne(d => d.CreatedBy).WithMany()
                    .HasForeignKey(d => d.CreatedById)
                    .HasConstraintName("FK__Plan__CreatedById__1DB06A4F");
            });

            modelBuilder.Entity<TaskDetail>(entity =>
            {
                entity.HasKey(e => e.TaskId).HasName("PK__TaskDetail__7C6949D1B4F3A7C8");

                entity.ToTable("TaskDetails");

                entity.Property(e => e.TaskId).ValueGeneratedOnAdd();
                entity.Property(e => e.TaskName).HasMaxLength(150).IsRequired();
                entity.Property(e => e.StartDate).HasColumnType("datetime");
                entity.Property(e => e.EndDate).HasColumnType("datetime");
                entity.Property(e => e.Priority).HasMaxLength(20);
                entity.Property(e => e.Status).HasMaxLength(20);
                entity.Property(e => e.CreatedById).HasColumnName("CreatedById");
              

                entity.HasOne(d => d.Plan).WithMany()
                    .HasForeignKey(d => d.PlanId)
                    .HasConstraintName("FK__TaskDetail__PlanId__208CD6FA");

          

                entity.HasMany(d => d.TaskAssignees)
                    .WithOne(ta => ta.Task)
                    .HasForeignKey(ta => ta.TaskId)
                    .HasConstraintName("FK__TaskDetail__TaskAssignees__245D67DE");
            });

            modelBuilder.Entity<TaskAssignees>(entity =>
            {
                entity.HasKey(e => new { e.TaskId, e.EmployeeId }).HasName("PK__TaskAssignee__3B8F8B2C9E7D3A1F");

                entity.ToTable("TaskAssignees");

                entity.Property(e => e.TaskId).HasColumnName("TaskId");
                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeId");

                entity.HasOne(d => d.Task).WithMany(t => t.TaskAssignees)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK__TaskAssignee__TaskId__245D67DE");

                entity.HasOne(d => d.Employee).WithMany()
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__TaskAssignee__EmployeeId__25518C17");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}