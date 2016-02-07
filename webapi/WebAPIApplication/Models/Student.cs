using System;
using System.Collections.Generic;

namespace WebAPIApplication.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<Class> Classes { get; set; }
        public float gpa { get; set; }
    }
}