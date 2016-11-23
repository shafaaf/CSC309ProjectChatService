$(".email-signup").hide();

$("#signup-box-link").click(function(){
	$(".email-login").fadeOut(100);
	$(".email-signup").delay(100).fadeIn(100);
	$("#login-box-link").removeClass("active");
	$("#signup-box-link").addClass("active");
});

$("#login-box-link").click(function(){
	$(".email-login").delay(100).fadeIn(100);;
	$(".email-signup").fadeOut(100);
	$("#login-box-link").addClass("active");
	$("#signup-box-link").removeClass("active");
});

$("email-login").submit(function(e) {
	e.preventDefault();
});

function clickLogIn() {
	var email = ($('.email-login').find('input[type=email]')).val();
	var password = ($('.email-login').find('input[type=password]')).val();
	
	$.ajax({
		url: '\/signin',
		method: 'POST',
		data: {email, password}
	}).done(function() {
		alert("Success");
	}).fail(function() {
		alert("Failed");
	});
}

function clickSignUp() {
	var email = ($('.email-signup').find('input[type=email]')).val();
	var password = (($('.email-signup').find('input[type=password]')).eq(0)).val();
	var confirm = (($('.email-signup').find('input[type=password]')).eq(1)).val();
	
	if (password == confirm) {
		$.ajax({
			url: '\/register',
			method: 'POST',
			data: {email, password}
		}).done(function(jsondata) {
			alert("Success");
		}).fail(function (){
			alert("Failed");
		});
	}
}

function clickGithub() {
	$.ajax({
		url: '\/github',
		method: 'GET'
	}).done(function(jsondata) {
		if (jsondata.redirect) {
			window.location.href = jsondata.redirect;
		}
	});
}

function clickGoogle() {
	$.ajax({
		url: '\/google',
		method: 'GET'
	}).done(function(jsondata) {
		if (jsondata.redirect) {
			window.location.href = jsondata.redirect;
		}
	});
}

function getSession() {
	$.ajax({
		url: '\/session',
		method: 'GET'
	}).done(function(jsondata) {
		alert(jsondata.session);
	});
}