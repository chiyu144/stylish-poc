app.init=function(){
	app.cart.init();
	app.fb.statusChangeCallback=app.initProfile;
};
app.initProfile=function(){
	// 如果 FB 沒登入 or Native 沒登入 → 登入註冊畫面
	if(app.state.auth===null){
		// window.location="./";
		app.get("#signWrap").style.display = "flex";
		app.get("#view").style.display = "none";
		
		// app.setEventHandlers(app.get("#fbLoginBtn"), {
		// 	click: app.fb.login()
		// });
	}
	// FB 有登入 → 個人資訊畫面
	app.get("#signWrap").style.display = "none";
	app.get("#view").style.display = "block";
	app.fb.getProfile().then(function(data){
		app.showProfile(data);
	}).catch(function(error){
		console.log("Facebook Error", error);
	});
};
app.mobileSignStyle=function(){
	let signCards=app.getAll('.sign');
	for(let i=0;signCards.length;i++){
		app.setEventHandlers(signCards[i],{
			click: console.log(signCards[i])
		});
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