$(document).ready(function(){
	console.log('shit')

	$("#search").click(function(){
		$('.metrics').empty()
		$(".apps1").empty()
		$(".apps2").empty()
		$(".current_price_up").empty()
		$(".current_price_down").empty()
		$(".current_price_equal").empty()
		$("#my_chart").empty()
		$(".wacc_calc").empty()
		$.ajax({
			url: "search/",
			method: "POST",
			data : { tick : $('#search_tick').val() },
			success: function(data){
				var l1 = data['prices'];
				var priceList = []
				var dateList = []
				for(i = 0; i < l1.length; i++) {
					x = l1[i]
					dateList.push(x[0])
					priceList.push(x[1])
				}
				console.log(dateList)
				console.log(priceList)
				var trace1 = {
					y: priceList, 
					mode: 'markers', 
					name: 'IBM', 
					text: dateList, 
					marker: {
						color: 'rgb(164, 194, 244)', 
						size: 12
					}, 
					
					mode: 'lines'
					};

				var stock_data = [trace1];

				var layout = {
				  title: $('#search_tick').val(), 
				  xaxis: {
					title: 'Observations over last Year', 
					showgrid: true, 
					zeroline: false
				  }, 
				  yaxis: {
					title: 'Price', 
					showline: false
				  }
				};

				Plotly.newPlot('my_chart', stock_data, layout);
				$('.metrics').empty()
				// $('#current_price').click(getPrice);
				// $('.metrics').append('<button class="buttonx" id="current_price"> Live Price </button>')
				// getPrice();
				poops();
				console.log('metrics')
				}



			});

		});

	var poops = function(){
			var ticky = $('#search_tick').val();
			$.ajax({
				method: "POST",
				url: "hello/",
				data : {x: ticky},
				dataType: "JSON",
				success: function(data){
					var current_price = data["current"]
					var open_price = data["open"]
					if (current_price > open_price){
						$(".current_price_up").empty()
						$(".current_price_down").empty()
						$(".current_price_equal").empty()
						$(".current_price_up").append("Current Price: ")
						$(".current_price_up").append(current_price)
						
					} else if(current_price < open_price){
						$(".current_price_up").empty()
						$(".current_price_down").empty()
						$(".current_price_equal").empty()
						$(".current_price_down").append("Current Price: ")
						$(".current_price_down").append(current_price)
					} else {
						$(".current_price_up").empty()
						$(".current_price_down").empty()
						$(".current_price_equal").empty()
						$(".current_price_equal").append("Current Price: ")
						$(".current_price_equal").append(current_price)
						
					}

					}
			});
		}

	$("#more").click(function(){
		$('.metrics').empty()
		$(".wacc_calc").empty()
		$(".apps1").empty()
		$(".apps2").empty()
		$(".current_price_up").empty()
		$(".current_price_down").empty()
		$(".current_price_equal").empty()
		$("#my_chart").empty()
		$(".apps1").append('<button class="buttonxb" id="cf_button1">FCFF</button')
		$(".apps1").append('<button class="buttonxb" id="wacc_button1">WACC calculator</button')
		$(".apps2").append('<button class="buttonxb" id="news_search">News Search</button')
		$(".apps2").append('<button class="buttonxb" id="cf_button2">FCFE</button')
		$("#wacc_button1").click(function(){
			$(".apps1").empty()
			$(".apps2").empty()
			$(".wacc_calc").empty()
			$('.metrics').empty()
			$(".current_price_up").empty()
			$(".current_price_down").empty()
			$(".current_price_equal").empty()
			$(".wacc_calc").append("<p> First we will calculate cost of equity </p>")
			$(".wacc_calc").append('<p><input type="text" name="risk_free_rate" id="risk_free_rate" placeholder="Enter in risk free rate"> Risk Free Rate (If ten year us treasury bond is 1.5%, enter in 1.5)</p>')
			$(".wacc_calc").append('<p><input type="text" name="beta" id="beta" placeholder="Enter in beta"> Beta </p>')
			$(".wacc_calc").append('<p><input type="text" name="historical_stock_return" id="historical_stock_return" placeholder="Enter historical stock return"> Historical stock Return (If 9.5% enter 9.5) </p>')
			$(".wacc_calc").append('<button id="submit_ce"> submit cost of equity form </button>')	
			$("#submit_ce").click(function(){
				var rfr = $('#risk_free_rate').val();
				var B = $('#beta').val();
				var hsr = $('#historical_stock_return').val();
				var risk_free_rate = Number(rfr);
				var beta = Number(B);
				var historical_stock_return = Number(hsr);
				var pt1 = (beta*(historical_stock_return - risk_free_rate));
				var cost_of_equity = pt1 + risk_free_rate;
				$(".wacc_calc").empty()
				$(".wacc_calc").append("<p> Now we will calculate cost of debt </p>")
				$(".wacc_calc").append('<p><input type="text" name="risk_premium" id="risk_premium" placeholder="Enter in risk premium"> Risk Premium (Enter in decimal format.</p>')
				$(".wacc_calc").append('<p><input type="text" name="gross_income" id="gross_income" placeholder="Enter pretax income"> Pre-Tax Income (Enter full number. If 3.19B enter 3,190,000,000</p>')
				$(".wacc_calc").append('<p><input type="text" name="income_tax" id="income_tax" placeholder="Enter income_tax"> Income Tax(Enter full number. If 1.19M enter 1,190,000</p>')
				$(".wacc_calc").append('<p><button id="submit_cd"> submit cost of debt form </button></p>')	

				$("#submit_cd").click(function(){
					var rfr = $('#risk_free_rate').val();
					var rp = $('#risk_premium').val();
					var gi = $('#gross_income').val();
					var it = $('#income_tax').val();
					var risk_premium = Number(rp);
					var gross_income = Number(gi);
					var income_tax = Number(it);
					var risk = risk_free_rate + risk_premium;
					var tax_rate = income_tax/gross_income;
					var pt2 = 1 - tax_rate;
					var cost_of_debt = risk * pt2;
					console.log("------------------")
					$(".wacc_calc").empty()
					$(".wacc_calc").append("<p> Some finishing touches... </p>")
					$(".wacc_calc").append('<p><input type="text" name="share_price" id="share_price" placeholder="share_price"> Share Price (Enter full number) </p>')
					$(".wacc_calc").append('<p><input type="text" name="shares_outstanding" id="shares_outstanding" placeholder="shares_outstanding"> Shares outstanding (Enter full number)</p>')
					$(".wacc_calc").append('<p><input type="text" name="debt" id="debt" placeholder="total debt"> Total Debt (Enter full number)</p>')
					$(".wacc_calc").append('<p><button id="submit_rest"> submit </button></p>')
					$("#submit_rest").click(function(){
						var sp = $("#share_price").val();
						var share_price = Number(sp);
						var so = $("#shares_outstanding").val();
						var shares_outstanding = Number(so);
						var equity = share_price * shares_outstanding
						var dbt = $("#debt").val()
						var debt = Number(dbt)
						var v = equity + debt
						var wacc = ((equity/v)*(cost_of_equity))+(((debt/v)*(cost_of_debt))*pt2)
						console.log(wacc)
						$(".wacc_calc").empty()
						$(".wacc_calc").append('<h1> Your calculated wacc is:</h1>');
						$(".wacc_calc").append(wacc);
						console.log("nate is a bitch")
						console.log(cost_of_equity.toFixed(3));
						console.log(cost_of_debt.toFixed(3));
						console.log(v);
						console.log(equity/v)
						console.log(debt/v)
						console.log(tax_rate)
					});
			});
		});
	});
		
		$("#news_search").click(function(){
			$('.metrics').empty()
			$(".apps1").empty()
			$(".apps2").empty()
			$(".current_price_up").empty()
			$(".current_price_down").empty()
			$(".current_price_equal").empty()
			$("#my_chart").empty()
			$(".wacc_calc").empty()
			$(".search").hide()
			$("#search_buttons").hide()
			$(".apps2").append('<div class="news_search_bar"><div class="nbar"><input type="text" name="search_company" id="search_company" placeholder="search the New York Times data base"></div></div><div class="news_buttons"><p> <button class="buttonx" id="searchn"> Search </button> <button class="buttonx" id="back"> Back </button> <p> </div> <div class="slists"> </div>');
			$("#searchn").click(function(){
				$.ajax({
				url: "stories/",
				method: "POST",
				data : { search : $('#search_company').val() },
				success: function(data){
					var l1 = data['stories'];
					var snippetList = []
					var urlList = []
					for(i = 0; i < l1.length; i++) {
						x = l1[i];
						$(".slists").append("<p><a href='" + x[1] + "'>" + x[0] + "<a></p>")
						console.log("happened")
					}


					}
				});
			});
			$("#back").click(function(){
				// $("body").empty()
				// $("body").append('<div class="logo1"><span class="google-logo"><span class="stockit-S">S</span><span class="stockit-T">T</span><span class="stockit-O">O</span><span class="stockit-C">C</span><span class="stockit-K">K</span><span class="stockit-I">I</span><span class="stockit-T2">T</span></span></div><h1 class="search"> <input type="text" name="search" id="search_tick" placeholder="Enter in a ticker.."></h1><div id="search_buttons"><button class="buttonx" id="search"> Search </button><button class="buttonx" id="more"> Show me more </button></div><div id="pricer"><div class="current_price_up"></div><div class="current_price_equal"></div><div class="current_price_down"></div></div><div id="my_chart" width="600" height="390"></div><div class="apps1"><div class="cashflow"></div><div class="wacc_calc"></div></div><div class="apps2"></div><div class="wacc_calc"></div><div class="metrics"></div><p class="foot"> Created by Brad Rutkin </p>')
				$(".apps2").empty()
				$(".search").show()
				$("#search_buttons").show()
			});
			
		});
		$("#cf_button1").click(function(){
			$('.metrics').empty()
			$(".apps1").empty()
			$(".apps2").empty()
			$(".current_price_up").empty()
			$(".current_price_down").empty()
			$(".current_price_equal").empty()
			$("#my_chart").empty()
			$(".wacc_calc").append("<p> Free Cash Flow to Firm </p>")
			$(".wacc_calc").append('<p><input type="text" name="ebit" id="ebit" placeholder="Enter EBIT"> EBIT (Full Dollar Amount)</p>')
			$(".wacc_calc").append('<p><input type="text" name="tax_rate" id="tax_rate" placeholder="Enter net tax rate"> Tax Rate (Decimal Form: For 25% enter in .25)</p>')
			$(".wacc_calc").append('<p><input type="text" name="cap_ex" id="cap_ex" placeholder="Enter Capital Expenditures"> Capital Expenditures (Full Dollar Amount)</p>')
			$(".wacc_calc").append('<p><input type="text" name="depreciation" id="depreciation" placeholder="Enter depreciation expenditures"> Depreciation (Full Dollar Amount)</p>')
			$(".wacc_calc").append('<p><input type="text" name="c_work_cap" id="c_work_cap" placeholder="Enter change in working capital"> Change in Working Capital (Full Dollar Amount)</p>')
			$(".wacc_calc").append('<button class="buttonx" id="submit_fcff"> submit </button>')
			$('#submit_fcff').click(function(){
				var e = $('#ebit').val();
				var tr = $('#tax_rate').val();
				var cex = $('#cap_ex').val();
				var dep = $('#depreciation').val();
				var cwp = $('#c_work_cap').val();
				var ebit = Number(e);
				var tax_rate = Number(tr);
				var cap_ex = Number(cex);
				var depreciation = Number(dep);
				var c_work_cap = Number(cwp);
				var fcff = ebit*(1-tax_rate)-(cap_ex-depreciation)-c_work_cap;
				$(".wacc_calc").empty()
				$(".wacc_calc").append(fcff)
			});

			
				

		});
	});
});

