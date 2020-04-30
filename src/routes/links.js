const express = require("express");

const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth.js"); 




router.get("/add",isLoggedIn,(req,res)=>{

//res.send("formulario");

res.render("links/add");

});


router.post("/add",isLoggedIn, async(req,res)=>{

const {title, url, description} = req.body;

const newLink = {

	title,
	url,
	description,
	user_id :req.user.id
};

await pool.query("INSERT INTO links set ?", [newLink]);

req.flash("success","Link creado satisfactoriamente");

//console.log(req.body);
res.redirect("/links");


});



router.post("/edit/:id", async(req,res)=>{

const { id } = req.params;

const {title, url, description} = req.body;

const newLink = {

	title,
	url,
	description,
	
};
//puedo enviar directamente req.body solo qe se hace de esa forma porque quizas necesite validar 
//await pool.query("UPDATE links set ? WHERE id = ?", [req.body,id]);

await pool.query("UPDATE links set ? WHERE id = ?", [newLink,id]);


//console.log(req.body);
req.flash("success","Link actualizado satisfactoriamente");
res.redirect("/links");


});



router.get("/delete/:id", async(req,res)=>{

const { id } = req.params;

await pool.query("DELETE FROM links WHERE  ID = ?", [id]);

//console.log(req.body);
req.flash("success","Link Eliminado satisfactoriamente");
res.redirect("/links");


});


router.get("/edit/:id",isLoggedIn, async(req,res)=>{

const {id} = req.params;

const links = await pool.query("Select * From links WHERE id = ?", [id]);


res.render("links/edit", {links:links[0]});


});



router.get("/",isLoggedIn, async(req,res)=>{


const links = await pool.query("Select * From links WHERE user_id = ?",[req.user.id]);

res.render("links/list",{links})



});

module.exports = router;