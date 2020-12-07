using GamePicker.Models;
using GamePicker.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePicker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteFriendController : ControllerBase
    {
        IRepository<FavoriteFriend> favoriteFriendRepo;

        public FavoriteFriendController(IRepository<FavoriteFriend> favoriteFriendRepo)
        {
            this.favoriteFriendRepo = favoriteFriendRepo;
        }

        [HttpGet]
        public IEnumerable<FavoriteFriend> Get()
        {
            return favoriteFriendRepo.GetAll();
        }

        [HttpGet("{id}")]
        public FavoriteFriend Get(int id)
        {
            return favoriteFriendRepo.GetById(id);
        }

        [HttpPost]
        public IEnumerable<FavoriteFriend> Post([FromBody] FavoriteFriend favoriteFriend)
        {
            favoriteFriendRepo.Create(favoriteFriend);
            return favoriteFriendRepo.GetAll();
        }

        // PUT api/<FavoriteFriendController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FavoriteFriendController>/5
        [HttpDelete("{id}")]
        public IEnumerable<FavoriteFriend> Delete(int id)
        {
            var favoriteFriend = favoriteFriendRepo.GetById(id);
            favoriteFriendRepo.Delete(favoriteFriend);
            return favoriteFriendRepo.GetAll();
        }
    }
}
