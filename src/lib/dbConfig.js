// import sql from 'mssql'

// const config = {
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   server: process.env.DATABASE_SERVER,
//   database: process.env.DATABASE_NAME,
//     options: {
//       encrypt: true, // Use encryption (recommended for Azure SQL)
//       trustServerCertificate: false, // Change this based on your setup
//     },
//   };
//   const poolPromise = sql.connect(config)
//   .then(pool => {
//     console.log('Connected to SQL Server');
//     return pool;
//   })
//   .catch(err => {
//     console.error('Database connection failed:', err);
//     process.exit(1);
//   });

// export { sql, poolPromise };
// lib/db.js
import sql from 'mssql';

const config = {
  user: 'ndemo',
  password: '123',
  server: 'localhost',
  database: 'pcount',
  options: {
    encrypt: false, // Set to true if using Azure SQL Database or if encryption is required
    
  },
};

export async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
    return sql;
  } catch (err) {
    console.error('Database connection error: ', err);
    throw new Error('Failed to connect to the database');
  }
}
