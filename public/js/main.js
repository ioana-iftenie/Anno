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
	
});
