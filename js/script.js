var exchanges;
var currency = ['USD','EUR','RUB'];
var ExmoObj;
var MaximumCryptoList;

$(document).ready(function(){
	cmc('https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100', 'USD');

	$.getJSON("../data/exchanges.json",function(json){
		exchanges = json.exchanges;
		
		$.each(exchanges, function(key,val){
			$('.exchange-list').append('<a href="#">'+val.name+'</a>');
		});	
	});
	
	$.each(currency, function(key,val) {
		$(".currency-list").append('<option value="'+val+'">'+val+'</option>');
	});		
});

///===CURRENCY_PARSER
function cmc(api, currency){
	var result = [];
	$.ajax({
		url: api,
		type: 'GET',
		dataType: 'JSON',
		async: false,
		success: function(data){
			$('#main-table tbody').empty();
			data.forEach(function(currentValue, index, data){
				$('#main-table tbody').append('<tr><td>'+(index+1)+'</td><td><a href="">'+currentValue.name+'</a></td><td>'+currentValue.symbol+'</td><td>'+currentValue["price_"+currency.toLowerCase()]+'  '+currency+'</td><td>'+currentValue.price_btc+' BTC</td><td>'+currentValue["percent_change_1h"]+' %</td></tr>');
				//result[index] = {name:""+currentValue.name+"", symbol:""+currentValue.symbol+""}
			});
		},
		error: function() {
			alert("Error");
		},
		complete: function(){
			//MaximumCryptoList = JSON.stringify(result);
			//MaximumCryptoList = JSON.parse(MaximumCryptoList);
		}
	});	
}

///===EXMO_PARSER
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

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////===============HANDLERS===============//////////////////////////


function currencyChange(currency){
	cmc("https://api.coinmarketcap.com/v1/ticker/?convert="+currency+"&limit=100", currency);
}


/*
$("#main-table th").on("click",function(e){
	
	var z = $("#main-table tbody").children('tr').children('td').eq(0).map(function(index, elem) {		
		console.log(elem);
	});
	
	console.log("Сортировка пока не реализована");
});
*/