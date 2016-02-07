using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIApplication.Models
{
    public class StudentClass
    {
        public StudentClass(int id, string name, float grade)
        {
            this.Id = id;
            this.Name = name;
            this.Grade = grade;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public float Grade { get; set; }
    }
}
