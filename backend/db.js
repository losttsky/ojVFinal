const oracledb = require('oracledb');

// Inicializa el cliente solo una vez
oracledb.initOracleClient({ libDir: 'C:\\instantclient_23_8' });

// Configuración del pool
const poolConfig = {
  user: 'system',
  password: 'lasi123',
  connectString: 'localhost/',
  poolMin: 1,
  poolMax: 5,
};

let pool; // solo se crea una vez

async function getConnection() {
  if (!pool) {
    pool = await oracledb.createPool(poolConfig);
    console.log('✅ Pool Oracle creado');
  }
  return await pool.getConnection();
}

module.exports = { getConnection };
