app.init=function(){
	app.cart.init();
	let inTitle = app.get("#inTitle");
	let upTitle = app.get("#upTitle");
	inTitle.addEventListener('click', app.evts.mobileSignInStyle);
	upTitle.addEventListener('click', app.evts.mobileSignUpStyle);
	app.fb.statusChangeCallback=app.initProfile;
};
app.initProfile=function(){
	// 如果 FB 沒登入 → 登入註冊畫面
	if(app.state.auth===null){
		app.get("#signWrap").style.display = "flex";
		app.get("#view").style.display = "none";
	} else {
		// FB 有登入 → 個人資訊畫面
		app.get("#signWrap").style.display = "none";
		app.get("#view").style.display = "block";
		app.fb.getProfile().then(function(data){
			app.showProfile(data);
		}).catch(function(error){
			console.log("Facebook Error", error);
		});
	}
};
app.evts.mobileSignInStyle=function(){
	let inForm=app.get('#inForm');
		if(inForm.style.opacity === "1") {
			inForm.style.display = "none";
			inForm.style.opacity = "0";
		} else {
			inForm.style.display = "flex";
			inForm.style.opacity = "1";
		}
}
app.evts.mobileSignUpStyle=function(){
	let upForm=app.get('#upForm');
		if(upForm.style.opacity==="1") {
			upForm.style.display = 'none';
			upForm.style.opacity = '0';
		} else {
			upForm.style.display = 'flex';
			upForm.style.opacity = "1";
		}
}
app.showProfile=function(data){
	app.get("#profile-picture").src="https://graph.facebook.com/"+data.id+"/picture/?width=200";
	let details=app.get("#profile-details");
	app.createElement("div", {atrs:{
		className:"name", textContent:data.name
	}}, details);
	app.createElement("div", {atrs:{
		className:"email", textContent:data.email
	}}, details);
};
window.addEventListener("DOMContentLoaded", app.init);