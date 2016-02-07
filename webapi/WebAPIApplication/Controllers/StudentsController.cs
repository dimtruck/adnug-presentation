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
                new Student(1, "Tom", 2.5f),
                new Student(2, "Jane", 3.4f),
                new Student(3, "Brad", 4.0f),
                new Student(4, "Dave", 1.7f)
            }.AsEnumerable();

            return studentList;
        }

        // GET api/students/5
        // get classes
        [HttpGet("{id}")]
        public IEnumerable<StudentClass> Get(int id)
        {
            IEnumerable<StudentClass> classes = new List<StudentClass>()
            {
                new StudentClass(1, "Math", 4.0f),
                new StudentClass(2, "History", 1.5f),
                new StudentClass(3, "Spanish", 2.0f)
            }.AsEnumerable();
            return classes;
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
