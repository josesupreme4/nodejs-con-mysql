const express = require("express");

const router = express.Router();

const pool = require("../database");

const passport = require("passport");

const { isLoggedIn,isNotLoggedIn } = require("../lib/auth.js"); 




router.get("/signup",isNotLoggedIn, (req,res) =>{

	res.render("auth/signup");

});




router.get("/signin",isNotLoggedIn, (req,res) =>{

	res.render("auth/signin");

});





router.get("/logout", (req,res) =>{

	req.logOut();
	res.redirect("/");

});




router.get("/profile",isLoggedIn, (req,res) =>{

	res.render("profile");

});

/* Puedo el enrutador asi 
router.post("/signup", async(req,res) =>{

passport.authenticate("local.signup",{

	successRedirect: "/profile",
	failuredirect: "/signup",
	failureFlash: true

});	


});*/

router.post("/signup", passport.authenticate("local.signup",{

	successRedirect: "/profile",
	failureRedirect: "/signup",
	failureFlash: true

}));



router.post("/signin", (req,res,next) =>{

passport.authenticate("local.signin",{

	successRedirect: "/profile",
	failureRedirect: "/signin",
	failureFlash: true

})(req,res,next);	

console.log("entra a post router");
});



module.exports = router;