const express = require("express");

const morgan = require("morgan");

const path = require("path");

const exphbs = require("express-handlebars");

const flash = require("connect-flash");

const session = require("express-session");

const MySQLStore = require("express-mysql-session");

const {database} =  require("./keys");

const passport = require("passport");
	
//inicializaciones

const app = express();

require("./lib/passport");

//setting 

app.set("port", process.env.PORT || 4000);

app.set("views", path.join(__dirname,'views'));

app.engine('.hbs',exphbs({

	defaultLayout:"main",
	layoutsDir:path.join(app.get("views"),"layouts"),
	partialsDir:path.join(app.get("views"),"partials"),
	extname:".hbs",
	helpers: require('./lib/handlebars')

}));

app.set("view engine",".hbs");


//Middleware

app.use(session({

	secret:"jrbgnodescrud",
	resave:false,
	saveUninitialized: false,
	store: new MySQLStore(database)


}));
//como flash es un middelware puede usarlo la función req.
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Variables globales

app.use((req,res,next)=>{

	app.locals.success = req.flash("success");
	app.locals.messege = req.flash("messege");
	app.locals.user = req.user;
	next();

});

//rutas

app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links",require("./routes/links"));
app.use("/user",require("./routes/user"));


//Archivos publicos
app.use(express.static(path.join(__dirname,"public")));

//inicialización de de servidor

app.listen(app.get("port"), () => {

	console.log("Servicio iniciado en el puerto", app.get("port"));

});

