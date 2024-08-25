import sql from 'mssql'

const config = {
    user: '',
    password: '',
    server: '',
    database: '',
    options: {
      encrypt: true, // Use encryption (recommended for Azure SQL)
      trustServerCertificate: false, // Change this based on your setup
    },
  };
  const poolPromise = sql.connect(config)
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

export { sql, poolPromise };
