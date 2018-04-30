using System.Collections.Generic;
using MongoDB.Driver;

namespace TwistedCloud.CommunityManagement.Data
{
    public interface ICommunityManagementContext<TEntity> 
    {
        /// <summary>
        /// Mongo Database
        /// </summary>
        IMongoDatabase Database { get; }

        /// <summary>
        /// Gets the collection
        /// </summary>
        IMongoCollection<TEntity> Collection { get; }

        TResult RunCommand<TResult>(string command);
        TResult RunCommand<TResult>(string command, ReadPreference readpreference);

        /// <summary>
        /// Get entity by identifier
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>Entity</returns>
        TEntity GetById(string id);

        /// <summary>
        /// Insert entity
        /// </summary>
        /// <param name="entity">Entity</param>
        TEntity Insert(TEntity entity);

        TEntity Save(TEntity entity);

        /// <summary>
        /// Insert entities
        /// </summary>
        /// <param name="entities">Entities</param>
        void Insert(IEnumerable<TEntity> entities);

        /// <summary>
        /// Update entity
        /// </summary>
        /// <param name="entity">Entity</param>
        TEntity Update(TEntity entity);

        /// <summary>
        /// Update entities
        /// </summary>
        /// <param name="entities">Entities</param>
        void Update(IEnumerable<TEntity> entities);

        /// <summary>
        /// Delete entity
        /// </summary>
        /// <param name="entity">Entity</param>
        void Delete(TEntity entity);

        /// <summary>
        /// Delete entities
        /// </summary>
        /// <param name="entities">Entities</param>
        void Delete(IEnumerable<TEntity> entities);
    }
}