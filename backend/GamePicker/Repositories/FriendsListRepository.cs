using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GamePicker.Models;

namespace GamePicker.Repositories
{
    public class FriendsListRepository : Repository<FriendsList>, IRepository<FriendsList>
    {
        GPContext db;
        public FriendsListRepository(GPContext context) : base(context)
        {
            db = context;
        }
    }
}
