const mysql = require("mysql");

const { promisify } = require("util");

const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{

 if(err){

 	if(err.code === 'PROTOCOL_CONNECTION_LOST')
 	{
 		console.error("Conexión fue cerrada");
 	}

 	if(err.code === 'ER_CON_COUNT_ERROR')
 	{
 		console.error("base de datos tiene muchas conexiones");
 	}

 	if(err.code === 'ECONNREFUSED')
 	{
 		console.error("Conexión fue rechazada");
 	}
 }

if(connection) connection.release();
console.log("Base de datos conectada");
return;

});

//para no usar pool con colback
pool.query = promisify(pool.query);

module.exports = pool;