$(document).ready(function() {
	$('#ai-form').on('submit', function(e) {

		e.preventDefault();
		console.log('here');
		$.ajax({
			method: 'post',
			data: 'Diana',
			url: '/api/homepage',
			success: function(data, data2) {
				console.log(data);
				console.log(data2);
			}
		})
	})

	$('body').on('click', '.login-post', function() {
		var data = {
			username: $("#username").val(),
			password: $("#password").val()
		}
		
    	 $.ajax({
	        method: "POST",
	        url: "/api/login",
	        data: data,
	        dataType: "json",
	        success: function(res) {
	            if (res.error) window.location = '/login?error=1';
	            else
	            	window.location = "/homepage";
	        }
	    });
    });



	$('body').on('keyup', '#password-confirm-register', function() {

		    var pass1 = document.getElementById('password-register');
		    var pass2 = document.getElementById('password-confirm-register');

		    var message = document.getElementById('confirmMessage');

		    var goodColor = "#66cc66";
		    var badColor = "#ff6666";

		    if(pass1.value == pass2.value) {
		    	pass2.style.borderColor = goodColor;
		    	pass1.style.borderColor = goodColor;
		        message.style.color = goodColor;
		        message.style.b
		        message.innerHTML = "Passwords Match!"
		    } else {
		    	pass2.style.borderColor = badColor;
		    	pass1.style.borderColor = badColor;
		        message.style.color = badColor;
		        message.innerHTML = "Passwords Do Not Match!"
		    }
		})

	$('body').on('click', '.register-post', function() {
		
		var data = {
			usernameRegister: $("#username-register").val(),
			passwordRegister: $("#password-register").val(),
			passwordConfirmRegister: $("#password-confirm-register").val(),
			emailRegister: $("#email-register").val()
		}
		var message = document.getElementById('confirmMessage');
		var badColor = "#ff6666";

		if(data.usernameRegister != "" && data.passwordRegister != "" && data.passwordConfirmRegister != "" && data.emailRegister != "") {
		
			if(data.passwordRegister==data.passwordConfirmRegister) {
				$.ajax({
					method: "POST",
					url: "/api/login",
					data: data,
					dataType: "json",
					success: function(res) {
						console.log(res);
					    if (res.error) window.location = '/login?error=3';
					    else
					    	window.location = "/homepage";
					}
				});
			} 
			else message.innerHTML = "Passwords do not match!";
		}
		else {
			message.style.color = badColor;
			message.innerHTML = "All fields are required!"
		}
    })
});
