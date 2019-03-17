app.init=function(){
	app.cart.init();
	let inTitle = app.get("#inTitle");
	let upTitle = app.get("#upTitle");
	inTitle.addEventListener('click', app.evts.mobileSignInStyle);
	upTitle.addEventListener('click', app.evts.mobileSignUpStyle);
	let signUpBtn = app.get('#signUpBtn');
	signUpBtn.addEventListener('click', app.evts.signUp);
	let signInBtn = app.get('#signInBtn');
	signInBtn.addEventListener('click', app.evts.signIn);
	let fbLoginBtn= app.get('#fbLoginBtn');
	fbLoginBtn.addEventListener('click', app.fb.login);
	// app.fb.statusChangeCallback=app.initProfile;
	app.initProfile();
};
app.initProfile=function(){
	// 如果 FB 沒登入 → 登入註冊畫面
	if(app.state.auth===null){
		app.get("#signWrap").style.display = "flex";
		app.get("#view").style.display = "none";
	} else {
		// 有登入 → 個人資訊畫面
		app.get("#signWrap").style.display = "none";
		app.get("#view").style.display = "block";

		// 如果是 Stylish 登入 → 抓 Stylish 個資顯示
		
		// 如果是 fb 登入 → 抓 fb 個資顯示
		app.fb.statusChangeCallback = function() {
			app.fb.getProfile().then(function(data){
				app.showProfile(data);
			}).catch(function(error){
				console.log("Facebook Error", error);
			});
		}
	}
};
app.evts.signIn=function(e){
	e.preventDefault();
	let inFormData = new FormData(app.get('#inForm'));
	let data={
		provider:'native',
		email: inFormData.get('signInEmail'),
		password: inFormData.get('signInPw')
	}
	app.ajax("post", app.cst.API_HOST+"/user/signin", data, {}, function(req){
		let result=JSON.parse(req.responseText);
		if(result.error){
			console.log("登入 failed", error);
		}else{
			console.log("登入成功", result);
		}
	});
}
app.evts.signUp=function(e){
	e.preventDefault();
	let upFormData = new FormData(app.get('#upForm'));
	let data={
		name: upFormData.get('signUpName'),
		email: upFormData.get('signUpEmail'),
		password: upFormData.get('signUpPw')
	}
	app.ajax("post", app.cst.API_HOST+"/user/signup", data, {}, function(req){
		let result=JSON.parse(req.responseText);
		if(result.error){
			console.log("註冊 failed", error);
		}else{
			console.log("註冊成功", result);
		}
	});
}
app.evts.mobileSignInStyle=function(){
	let inForm=app.get('#inForm');
		if(inForm.className === "signForm signFormGrow") {
			inForm.classList.remove('signFormGrow');
		} else {
			inForm.classList.add('signFormGrow');
		}
}
app.evts.mobileSignUpStyle=function(){
	let upForm=app.get('#upForm');
		if(upForm.className === "signForm signFormGrow") {
			upForm.classList.remove('signFormGrow');
		} else {
			upForm.classList.add('signFormGrow');
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