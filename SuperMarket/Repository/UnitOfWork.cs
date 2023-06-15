﻿using NuGet.Protocol.Core.Types;
using SuperMarket.Data;
using SuperMarket.Repository.Interfaces;

namespace SuperMarket.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public IProductRepository Product { get; private set; }

        public ICategoryRepository Category { get; private set; }

        public ApplicationDbContext _db;

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            Product = new ProductRepository(_db);
            Category = new CategoryRepository(_db);
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
