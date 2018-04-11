var CoinMarketCup = function(api){
	var result;
	$.ajax({
		url: api,
		type: 'GET',
		dataType: 'JSON',
		async: false,
		success: function(data){
			data.forEach(function(currentValue, index, data){			
				$('#main-table tbody').append('<tr id="z_'+index+'"><td>'+index+'</td><td><a href="">'+currentValue.name+'</a></td><td>'+currentValue.symbol+'</td><td>'+currentValue.price_usd+'</td></tr>');
			});
		},
		error: function() {
			alert("Error");
		},
		complete: function(){
		}
	});	
}