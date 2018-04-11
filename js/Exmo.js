var Exmo = function(api){
	var result;
	$.ajax({
		dataType: "JSON",
		type: "GET",
		async: false,
		url: api,
		success: function(data){
			result = data;		
		},
		error: function() {
			alert("Error");
		},
		complete: function(){
		}
	});
	this.data = result;
}

Exmo.prototype.parse = function(currency){
	$("#main-table tbody").remove();
	$("#main-table").append('<tbody></tbody>');
	var data = this.data;
	var keys = Object.keys(data);
	keys.forEach(function(currentValue, index, keys){
		if(currentValue.substring(currentValue.indexOf('_')+1)==currency){			
			var td_name = $("<td></td>").text(currentValue.substring(0,currentValue.indexOf('_')));
			var td_buy_price = $("<td></td>").text(data[currentValue].buy_price +" "+ currency);
			var td_sell_price = $("<td></td>").text(data[currentValue].sell_price +" "+ currency);
			$("#main-table tbody").append('<tr id="coin_info">', td_name, td_buy_price, td_sell_price, td_last_sell_price, '</tr>');
		}
	});
}