using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIApplication.Models;

namespace WebAPIApplication.Repositories
{
    public interface IClassRepository
    {
        IList<StudentClass> GetStudentClasses(int studentId);
        Boolean UpdateGrade(int studentId, int classId);
    }
}
