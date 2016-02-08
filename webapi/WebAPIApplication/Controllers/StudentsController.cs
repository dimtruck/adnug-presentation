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
            IDictionary<int, IEnumerable<StudentClass>> classList = 
                new Dictionary<int, IEnumerable<StudentClass>>()
                {
                    {
                        1,
                        new List<StudentClass>()
                        {
                            new StudentClass(1, "Math", 4.0f),
                            new StudentClass(2, "History", 1.5f),
                            new StudentClass(3, "Spanish", 2.0f)
                        }.AsEnumerable()
                    },
                    {
                        2,
                        new List<StudentClass>()
                        {
                            new StudentClass(1, "Math", 1.2f),
                            new StudentClass(2, "History", 2.5f),
                            new StudentClass(3, "Spanish", 2.5f)
                        }.AsEnumerable()
                    },
                    {
                        3,
                        new List<StudentClass>()
                        {
                            new StudentClass(1, "Math", 2.2f),
                            new StudentClass(2, "History", 3.5f),
                            new StudentClass(3, "Spanish", 4.0f)
                        }.AsEnumerable()
                    },
                    {
                        4,
                        new List<StudentClass>()
                        {
                            new StudentClass(1, "Math", 1.2f),
                            new StudentClass(2, "History", 2.5f),
                            new StudentClass(3, "Spanish", 2.5f)
                        }.AsEnumerable()
                    }
                };

            return classList.FirstOrDefault(t => t.Key == id).Value;
            
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
