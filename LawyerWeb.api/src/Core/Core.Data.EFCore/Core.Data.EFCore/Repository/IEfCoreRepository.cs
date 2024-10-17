using System.Linq.Expressions;

namespace Core.Data.EFCore.Repository
{
    public interface IEfCoreRepository<T>
    {
        T? Get(Expression<Func<T, bool>> predicate);
        List<T> GetList(Expression<Func<T, bool>>? predicate = null);
        T Add(T entity);
        T Update(T entity);
        void Delete(T entity);
    }
}
