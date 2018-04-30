using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using TwistedCloud.CommunityManagement.Core;
using TwistedCloud.CommunityManagement.Core.Model;

namespace TwistedCloud.CommunityManagement.Data
{
    public class CommunityManagementContext<TEntity>  where TEntity : Person
    {
        private const string ParamName = "Mongo Database ConnectionString is missing";
        private readonly IMongoDatabase _database;

        private readonly IMongoCollection<TEntity> _collection;

        public CommunityManagementContext(IMongoClient client, ServiceConfigurationSettings settings)
        {
            if (settings?.Profile.Database == null) throw new ArgumentException("message", ParamName);

            _database = client.GetDatabase(settings.Profile.Database);
            _collection = _database.GetCollection<TEntity>(typeof(TEntity).Name);

        }
        #region Properties
        /// <summary>
        /// Mongo Database
        /// </summary>
        public IMongoDatabase Database => _database;

        /// <summary>
        /// Gets the collection
        /// </summary>
        public IMongoCollection<TEntity> Collection => _collection;
        #endregion


        #region Methods

        public TResult RunCommand<TResult>(string command)
        {
            return _database.RunCommand<TResult>(command);
        }

        public TResult RunCommand<TResult>(string command, ReadPreference readpreference)
        {
            return _database.RunCommand<TResult>(command, readpreference);
        }

        /// <summary>
        /// Get entity by identifier
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>Entity</returns>
        public TEntity GetById(string id)
        {
            return _collection.Find(e => e.Id.Equals(id)).FirstOrDefault();

        }

        /// <summary>
        /// Insert entity
        /// </summary>
        /// <param name="entity">Entity</param>
        public TEntity Insert(TEntity entity)
        {
            _collection.InsertOneAsync(entity);
            return entity;
        }
        
        public TEntity Save(TEntity entity)
        {
            _collection.ReplaceOneAsync(x => x.Id.Equals(entity.Id), entity, new UpdateOptions
            {
                IsUpsert = true
            });

            return entity;
        }
        /// <summary>
        /// Insert entities
        /// </summary>
        /// <param name="entities">Entities</param>
        public void Insert(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
                Insert(entity);
        }

        /// <summary>
        /// Update entity
        /// </summary>
        /// <param name="entity">Entity</param>
        public TEntity Update(TEntity entity)
        {
                 _collection.ReplaceOne(x => x.Id.Equals(entity.Id) , entity, new UpdateOptions() { IsUpsert = false });
            return entity;

        }

        /// <summary>
        /// Update entities
        /// </summary>
        /// <param name="entities">Entities</param>
        public void Update(IEnumerable<TEntity> entities)
        {
            foreach (TEntity entity in entities)
            {
                Update(entity);
            }
        }

        /// <summary>
        /// Delete entity
        /// </summary>
        /// <param name="entity">Entity</param>
        public void Delete(TEntity entity)
        {
              _collection.FindOneAndDeleteAsync(e => e.Id.Equals(entity.Id) );
        }

        /// <summary>
        /// Delete entities
        /// </summary>
        /// <param name="entities">Entities</param>
        public void Delete(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                  _collection.FindOneAndDeleteAsync(e => e.Id.Equals(entity.Id) );
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _collection.Find(new BsonDocument()).ToListAsync().Result;
        }
        #endregion


    }
}