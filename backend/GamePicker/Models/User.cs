using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePicker.Models
{
    public class User
    {
        public int Id { get; set; }
        public int SteamId { get; set; }
        public IEnumerable<FavoriteFriend> FriendsList { get; set; }
    }
}
