const oracledb = require('oracledb');

// Inicializa el cliente solo una vez
oracledb.initOracleClient({ libDir: 'C:\\instantclient_23_8' });

const poolConfig = {
  user: 'system',
  password: 'lasi123',
  connectString: 'localhost:1521/XE',  
  poolMin: 1,
  poolMax: 5,
};

let pool;

async function getConnection() {
  if (!pool) {
    pool = await oracledb.createPool(poolConfig);
    console.log('✅ Pool Oracle creado');
  }
  return await pool.getConnection();
}

async function probarConexion() {
  try {
    const connection = await getConnection();
    console.log('🎉 Conexión exitosa a Oracle');
    await connection.close();
  } catch (err) {
    console.error('❌ Error al conectar a Oracle:', err);
  }
}

probarConexion();

module.exports = { getConnection };
