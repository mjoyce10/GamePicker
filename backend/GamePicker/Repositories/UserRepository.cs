using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GamePicker.Models;

namespace GamePicker.Repositories
{
    public class UserRepository : Repository<User>, IRepository<User> 
    {
        GPContext db;
        public UserRepository(GPContext context) : base(context)
        {
            db = context;
        }
    }
}
