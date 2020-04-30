const bcrypt = require ("bcryptjs");

const helpers = {};


//metodo para registrar el password
helpers.encryptPass = async(pass) => {


const salt = await bcrypt.genSalt(10);
const finalpass = await bcrypt.hash(pass,salt);

return finalpass;
};


//metodo para comparar password

helpers.matchPass = async(pass,savePass) => {


	
	try{

	return	await bcrypt.compare(pass,savePass);

	}catch(e){

		console.log("error en helpers: ",e);


	}

}

module.exports = helpers;