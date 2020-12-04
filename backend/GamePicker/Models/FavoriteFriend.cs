using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePicker.Models
{
    public class FavoriteFriend
    {
        public int Id { get; set; }
        public int FriendId { get; set; }
        public User User { get; set; }
    }
}