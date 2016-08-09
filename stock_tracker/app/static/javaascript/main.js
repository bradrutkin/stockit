$(document).ready(function(){
	console.log('shit')

	$("#search").click(function(){
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
				}

			});
		});

	$("#more").click(function(){
		$(".apps").empty()
		$("#my_chart").empty()
		$(".apps").append('<button class="buttonxb" id="cf_button1">cashflow calculator</button')
		$(".apps").append('<button class="buttonxb" id="wacc_button1">WACC calculator</button')
		$("#wacc_button1").click(function(){
			$(".apps").empty()
			$(".wacc_calc").empty()
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
	});
});


