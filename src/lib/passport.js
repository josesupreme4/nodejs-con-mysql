const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");

const helpers = require("./helpers");




passport.use("local.signup", new LocalStrategy({

	usernameField : "username",
	passwordField : "password",
	passReqToCallback: true

}, async(req,username,password,done)=>{

	const {fullname} = req.body;

	const newUser = {

	username,
	password,
	fullname 
};

newUser.password = await helpers.encryptPass(password);

const result = await pool.query("INSERT INTO users set ?", [newUser]);

newUser.id = result.insertId;

return done(null,newUser);

}));




passport.use("local.signin", new LocalStrategy({

	usernameField : "username",
	passwordField : "password",
	passReqToCallback: true

}, async(req,username,password,done)=>{

	console.log("ingresa a local.signin");

const rows = await pool.query("SELECT * FROM users where username = ?", [username]);


console.log(username);

console.log("filas",rows.length);
if(rows.length >0)
{

	const user = rows[0];



	const validPass = await helpers.matchPass(password, user.password);

	console.log("validacion:",validPass);
	if(validPass)
	{
		done(null,user, req.flash("success","wellcome "+user.username));

		console.log("wellcome ",user.username);
	}else{

		console.log("contraseña invalida");
		done(null, false, req.flash("messege","contraseña invalida"));
	}
}else{

	console.log("usuario no registrado");
	return done(null,false, req.flash("messege","Usuario no registrado"));

}

}));




passport.serializeUser((user, done) =>{

	done(null,user.id);

});


passport.deserializeUser(async(id, done) =>{

	const rows = await pool.query("SELECT * FROM users where id = ?",[id]);

	done(null,rows[0]);

});