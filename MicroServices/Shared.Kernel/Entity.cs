using System;

namespace Shared.Kernel
{
    public abstract class Entity<TId> : IEquatable<Entity<TId>>
    {
        public TId Id { get; protected set; }

        protected Entity(TId id)
        {
            if (Equals(id, default(TId)))
            {
                throw new ArgumentException("The ID cannot be the type's default value.", nameof(id));
            }

            Id = id;
        }

        // EF requires an empty constructor
        protected Entity()
        {
        }

        // For simple entities, this may suffice
        // As Evans notes earlier in the course, equality of Entities is frequently not a simple operation
        public override bool Equals(object otherObject)
        {
            // ReSharper disable once BaseObjectEqualsIsObjectEquals
            return otherObject is Entity<TId> entity ? Equals(entity) : base.Equals(otherObject);
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public bool Equals(Entity<TId> other)
        {
            return other != null && Id.Equals(other.Id);
        }
    }
}
