BusCard.define('/orderaccept/attrapp/attr_prod_200080.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				Me.getNowFormatDate=function(){
					 var day = new Date();
				    var Year = 0;
				    var Month = 0;
				    var Day = 0;
				    var CurrentDate = "";
				    Year= day.getFullYear();//支持IE和火狐浏览器.
				    Month= day.getMonth()+1;
				    Day = day.getDate();
				    CurrentDate += Year;
				    if (Month >= 10 ){
				     CurrentDate += Month;
				    }
				    else{
				     CurrentDate += "0" + Month;
				    }
				    if (Day >= 10 ){
				     CurrentDate += Day ;
				    }
				    else{
				     CurrentDate += "0" + Day ;
				    }
				    return CurrentDate;
				}
				Me.ifValidDate = function(dateStr){//格式：yyyymmdd		
					var ifDate = false;
					if(!!dateStr && dateStr.length == 8){
						var year = parseInt(dateStr.substring(0,4),10);
						var month = parseInt(dateStr.substring(4,6),10);
						var day = parseInt(dateStr.substring(6,8),10);
						if(!isNaN(year) && !isNaN(month) && !isNaN(day)){
							var t = new Date(year,month-1,day);
							if(year == t.getFullYear() && (month == (t.getMonth()+1)) && day == t.getDate()){
								ifDate = true;
							}
						}
					}
					return ifDate;
				}
				Me.$("200080").onblur = function(){
					var requireFinishOpenTime=Me.$("200080").value;
					if(Me.$("200080").value!=""){
					//	var SYSDATE = dojo.global.$appContext$.requestParam.today;
						//var builder = dojo.require("orderaccept.prodofferaccept.ProductDateBuilder");
						if(Me.ifValidDate(requireFinishOpenTime) == false){
							orderaccept.common.dialog.MessageBox.alert({
								message:"格式需要为yyyyMMdd"
							})
							Me.$("200080").value="";
							return;
						}
						if(requireFinishOpenTime <= Me.getNowFormatDate()){
							orderaccept.common.dialog.MessageBox.alert({busiCode:"08410216"});
							Me.$("200080").value="";
							return;
						}
					}
				}
				if(!!Me.$("200099")){
					Me.$("200099").onblur = function(){
						var funFee=Me.$("200099").value;
						if(Me.$("200099").value!=""){
							if(!/^\d+(\.\d+)?$/i.test(Me.$("200099").value)){
								orderaccept.common.dialog.MessageBox.alert({busiCode:"08410218"});
								Me.$("200099").value="";
							}
						}
					}
				}
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {
				var Me = this;
				Me.getNowFormatDate=function(){
					 var day = new Date();
				    var Year = 0;
				    var Month = 0;
				    var Day = 0;
				    var CurrentDate = "";
				    Year= day.getFullYear();//支持IE和火狐浏览器.
				    Month= day.getMonth()+1;
				    Day = day.getDate();
				    CurrentDate += Year;
				    if (Month >= 10 ){
				     CurrentDate += Month;
				    }
				    else{
				     CurrentDate += "0" + Month;
				    }
				    if (Day >= 10 ){
				     CurrentDate += Day ;
				    }
				    else{
				     CurrentDate += "0" + Day ;
				    }
				    return CurrentDate;
				}
				Me.ifValidDate = function(dateStr){//格式：yyyymmdd		
					var ifDate = false;
					if(!!dateStr && dateStr.length == 8){
						var year = parseInt(dateStr.substring(0,4),10);
						var month = parseInt(dateStr.substring(4,6),10);
						var day = parseInt(dateStr.substring(6,8),10);
						if(!isNaN(year) && !isNaN(month) && !isNaN(day)){
							var t = new Date(year,month-1,day);
							if(year == t.getFullYear() && (month == (t.getMonth()+1)) && day == t.getDate()){
								ifDate = true;
							}
						}
					}
					return ifDate;
				}
				Me.$("200080").onblur = function(){
					var requireFinishOpenTime=Me.$("200080").value;
					if(Me.$("200080").value!=""){
					//	var SYSDATE = dojo.global.$appContext$.requestParam.today;
						//var builder = dojo.require("orderaccept.prodofferaccept.ProductDateBuilder");
						if(Me.ifValidDate(requireFinishOpenTime) == false){
							orderaccept.common.dialog.MessageBox.alert({
								message:"格式需要为yyyyMMdd"
							})
							Me.$("200080").value="";
							return;
						}
						if(requireFinishOpenTime <= Me.getNowFormatDate()){
							orderaccept.common.dialog.MessageBox.alert({busiCode:"08410216"});
							Me.$("200080").value="";
							return;
						}
					}
				}
				if(!!Me.$("200099")){
					Me.$("200099").onblur = function(){
						var funFee=Me.$("200099").value;
						if(Me.$("200099").value!=""){
							if(!/^\d+(\.\d+)?$/i.test(Me.$("200099").value)){
								orderaccept.common.dialog.MessageBox.alert({busiCode:"08410218"});
								Me.$("200099").value="";
							}
						}
					}
				}
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
