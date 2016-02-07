using System;
using System.Collections.Generic;

namespace WebAPIApplication.Models
{
    public class Student
    {
        public Student(int id, string name, float gpa)
        {
            this.Id = id;
            this.Name = name;
            this.gpa = gpa;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public float gpa { get; set; }
    }
}