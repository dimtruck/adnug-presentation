using Newtonsoft.Json;
using StackExchange.Redis;
using System.Collections.Generic;
using WebAPIApplication.Models;
using System;
using System.Linq;

namespace WebAPIApplication.Repositories
{
    public class ClassRepository : IClassRepository 
    {
        private readonly IDatabase _database;

        public ClassRepository(IDatabase database)
        {
            this._database = database;
        }

        /*
        Get all grades for student
        Get all classes and map all together
        */
        IList<StudentClass> IClassRepository.GetStudentClasses(int studentId)
        {
            RedisValue[] classes = this._database.ListRange("classes");
            HashEntry[] grades = this._database.HashGetAll(studentId + "-classes");
            IList<StudentClass> studentClasses = new List<StudentClass>();
            IList<Class> allClasses = new List<Class>();

            foreach(RedisValue cl in classes)
            {
                allClasses.Add(JsonConvert.DeserializeObject<Class>(cl.ToString()));
            }

            foreach(HashEntry grade in grades)
            {
                int classId = Int32.Parse(grade.Name);
                studentClasses.Add(
                    new StudentClass(
                        classId, allClasses.First(t => t.Id == classId).Name, float.Parse(grade.Value)));
            }

            return studentClasses;
        }

        bool IClassRepository.UpdateGrade(int studentId, int classId)
        {
            throw new NotImplementedException();
        }
    }
}
