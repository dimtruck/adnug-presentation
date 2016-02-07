using Newtonsoft.Json;
using StackExchange.Redis;
using System.Collections.Generic;
using WebAPIApplication.Models;

namespace WebAPIApplication.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly IDatabase _database;

        public StudentRepository(IDatabase database)
        {
            this._database = database;
        }

        IList<Student> IStudentRepository.GetAll()
        {
            RedisValue[] studentStore = this._database.ListRange("student");
            IList<Student> students = new List<Student>();

            foreach(RedisValue studentString in studentStore)
            {
                Student student = JsonConvert.DeserializeObject<Student>(studentString.ToString());
                HashEntry[] grades = this._database.HashGetAll(student.Id + "-classes");
                float gpa = 0.0f;
                foreach (HashEntry grade in grades)
                {
                    gpa += float.Parse(grade.Value);
                }
                student.gpa = gpa / grades.Length;
                students.Add(student);
            }
            return students;
        }
    }
}
