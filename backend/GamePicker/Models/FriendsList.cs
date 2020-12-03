using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePicker.Models
{
    public class FriendsList
    {
        public int Id { get; set; }
        public int FriendId { get; set; }
        public int UserId { get; set; }
        public string FriendIcon { get; set; }
    }
}
