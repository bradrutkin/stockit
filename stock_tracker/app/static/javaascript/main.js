$(document).ready(function(){
	console.log('shit')

	$("#search").click(function(){
		$("#results").empty();
		console.log('fuck')
		$('#results').append('This is the home page here are all posts');
		$.ajax({
			url: "search/",
			method: "POST",
			data : { tick : $('#search_tick').val() },
			success: function(data){
				console.log($('#search_tick').val());
				var l1 = data['prices']

				} 
			});
		});
	});

