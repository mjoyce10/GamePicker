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
        public string Persona { get; set; }
        public string UserIcon { get; set; }
    }
}
