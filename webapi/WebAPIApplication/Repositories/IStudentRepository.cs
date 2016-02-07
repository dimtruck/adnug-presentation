using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIApplication.Models;

namespace WebAPIApplication.Repositories
{
    public interface IStudentRepository
    {
        IList<Student> GetAll();
    }
}
