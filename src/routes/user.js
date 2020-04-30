const express = require("express");

const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth.js"); 

const helpers = require("../lib/helpers");






router.get("/edit",isLoggedIn, async(req,res)=>{


const user = await pool.query("Select * From users WHERE id = ?", [req.user.id]);


res.render("user/edit", {user:user[0]});


});



router.post("/edit/", async(req,res)=>{



const {fullname, username} = req.body;

const actUser = {

	fullname,
	username
	
	
};
//puedo enviar directamente req.body solo qe se hace de esa forma porque quizas necesite validar 
//await pool.query("UPDATE links set ? WHERE id = ?", [req.body,id]);

await pool.query("UPDATE users set ? WHERE id = ?", [actUser,req.user.id]);


//console.log(req.body);
req.flash("success","Datos actualizado satisfactoriamente");
res.redirect("/user/edit/");


});

module.exports = router;