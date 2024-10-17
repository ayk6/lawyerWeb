using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace Core.Data.EFCore.Repository
{
    public class EntityGuidGenerator : ValueGenerator<long>
    {
        public override bool GeneratesTemporaryValues => false;

        public override long Next(EntityEntry entry)
        {
            return GenerateUniqueGuid();
        }

        private long GenerateUniqueGuid()
        {
            long ticks = DateTime.UtcNow.Ticks;

            Random rnd = new Random();
            int randomNumber = rnd.Next(100000);

            long uniqueId = (ticks << 16) | (long)randomNumber;

            return uniqueId;
        }
    }
}
