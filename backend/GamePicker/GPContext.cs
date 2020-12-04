using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GamePicker.Models;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace GamePicker
{
    public class GPContext : DbContext
    {
        public DbSet<FavoriteFriend> FriendsLists { get; set; }
        public DbSet<User> Users { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = "Server=(localdb)\\mssqllocaldb;Database=GamerDb;Trusted_Connection=True;";

        optionsBuilder.UseSqlServer(connectionString);
        //.UseLazyLoadingProxies();

        base.OnConfiguring(optionsBuilder);
    }
    }
}
