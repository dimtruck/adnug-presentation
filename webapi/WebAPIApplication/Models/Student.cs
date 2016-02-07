using System;
using System.Collections.Generic;

namespace WebAPIApplication.Models
{
    public class Student
    {
        public Student(int id, string name, IList<StudentClass> classes, float gpa)
        {
            this.Id = id;
            this.Name = name;
            this.Classes = classes;
            this.gpa = gpa;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<StudentClass> Classes { get; set; }
        public float gpa { get; set; }
    }
}