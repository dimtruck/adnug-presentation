using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using WebAPIApplication.Models;
using WebAPIApplication.Repositories;
using StackExchange.Redis;
using Microsoft.Extensions.OptionsModel;
using Microsoft.Extensions.Logging;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class StudentsController : Controller
    {
        private IStudentRepository _studentRepository;
        private IClassRepository _classRepository;
        private ILogger<StudentsController> _logger;

        public StudentsController(IOptions<RedisConfig> redisConfig, ILogger<StudentsController> logger)
        {
            String redisConnection = redisConfig.Value.RedisConnection;
            _logger = logger;
            _logger.LogCritical("logging redis connection: " + redisConnection);
            _studentRepository = new StudentRepository(ConnectionMultiplexer.Connect(redisConnection).GetDatabase(0));
            _classRepository = new ClassRepository(ConnectionMultiplexer.Connect(redisConnection).GetDatabase(0));
        }

        // GET: api/students
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return _studentRepository.GetAll().AsEnumerable();
        }

        // GET api/students/5
        // get classes
        [HttpGet("{id}")]
        public IEnumerable<StudentClass> Get(int id)
        {
            return _classRepository.GetStudentClasses(id).AsEnumerable();
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
