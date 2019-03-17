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
		app.mobileSignStyle();

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
	let signForms=app.getAll('.signForm');
	let signinputs=app.getAll('.signForm>input');
	let signbtns=app.getAll('.signForm>button');
	let signps=app.getAll('.signForm>p');
	for(let i=0;signCards.length;i++){
		app.setEventHandlers(signCards[i], {
			click:function(){
				if(signForms[i].style.display = "none") {
					signForms[i].style.display = "flex";
					signForms[i].style.height = "auto";
					signForms[i].style.opacity = "1";
					signinputs[i].style.display = "block";
					signbtns[i].style.display = "block";
					signps[i].style.display = "block";
				} else {
					signForms[i].style.display = "none";
					signForms[i].style.height = "0";
					signForms[i].style.opacity = "0";
					signinputs[i].style.display = "none";
					signbtns[i].style.display = "none";
					signps[i].style.display = "none";
				}
			}
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