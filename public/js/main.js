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
	

	$('body').on('click', '.register-post', function() {
		var data = {
			usernameRegister: $("#username-register").val(),
			passwordRegister: $("#password-register").val(),
			passwordConfirmRegister: $("#password-confirm-register").val(),
			emailRegister: $("#email-register").val()
		}
		
		if(data.password==data.passwordConfirm) {
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
		} else window.location = '/login?error=2';
    })
});
