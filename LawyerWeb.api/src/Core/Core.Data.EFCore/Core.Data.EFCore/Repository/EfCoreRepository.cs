using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Core.Data.EFCore.Repository
{
    public class EfCoreRepository<TDbContext, T> : IEfCoreRepository<T> 
        where TDbContext : DbContext
        where T : class
    {
        protected TDbContext Context { get; }

        public EfCoreRepository(TDbContext context)
        {
            Context = context;
        }

        public T Add(T entity)
        {
            var savedEntity = Context.Add(entity).Entity;
            Context.SaveChanges();
            return savedEntity;
        }

        public void Delete(T entity)
        {
            Context.Remove(entity);
            Context.SaveChanges();
        }

        public T? Get(Expression<Func<T, bool>> predicate)
        {
            return Context.Set<T>().AsQueryable().FirstOrDefault(predicate);
        }

		public List<T> GetList(Expression<Func<T, bool>>? predicate = null)
		{
			IQueryable<T> query = Context.Set<T>();

			if (predicate != null)
				query = query.Where(predicate);

			return query.ToList();
		}

		public T Update(T entity)
        {
            var savedEntity = Context.Update(entity).Entity;
            Context.SaveChanges();
            return savedEntity;
        }
    }
}
