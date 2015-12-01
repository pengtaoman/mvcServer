BusCard.define('/buscardapp/rela/js/buscardWithJsonFmt.js',function(_buscard,cardParam){ 
window.onload = function() {

	var card5 = BusCard.createInstance({
				productId : '170295',
				serviceOfferId : '301',
				cityCode : '910',
				userId : 0
			}, Jscu.$('buscard4'));
	card5.init();

	var card6 = BusCard.createInstance({
				productId : '-101',
				serviceOfferId : '-101', 
				userId : 0,
				cityCode : '910',
				custOrderId : 7862, 
				level : 4
			}, Jscu.$('buscard5'));

//	card6.init(function(a, b) {
				/*
				 * var param = { custOrderId : 7862 }; var data = {}; data[BusCard.constants.APPLY_ID] = 16; data[BusCard.constants.EXCLUSIVE_SESSION] = 1; var jsonData = BusCard.toJson(param);
				 * data["jsonData"] = jsonData; data.method = "apply"; var data = a.util.doGet(a.path.initPath, data); this.renderDefaultValue(data);
				 */
//			});

	document.getElementById("submit").onclick = function() {

		alert(card5.getJsonData())

	}
	document.getElementById("hiddenBtn").onclick = function() {

		BusCard.fx.hidden(card6.dom.getElementsByTagName('FIELDSET')[0], 500, 1);

	}
	var index = 1;

	document.getElementById("addPage").onclick = function() {

	if(card5.getTabPanel())
	{
	card5.getTabPanel().addPage({pageId:"1212",pageName:'≤‚ ‘“≥√Ê',callback:function(){alert("ºÏ≤‚ ß∞‹");return false;}});
	
	}

	}
	
	
}
});
