using System;
using System.Threading.Tasks;

namespace VegaApp.Core
{
  public interface IUnitOfWork
  {
    Task CompleteAsync();
  }
}