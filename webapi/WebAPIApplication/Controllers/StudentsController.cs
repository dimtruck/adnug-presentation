using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using WebAPIApplication.Models;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class StudentsController : Controller
    {
        // GET: api/students
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            IEnumerable<Student> studentList = new List<Student>(){
                new Student(1, "Tom", new List<StudentClass>(), 2.5f),
                new Student(2, "Jane", new List<StudentClass>(), 3.4f),
                new Student(3, "Brad", new List<StudentClass>(), 4.0f),
                new Student(4, "Dave", new List<StudentClass>(), 1.7f)
            }.AsEnumerable();

            return studentList;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
