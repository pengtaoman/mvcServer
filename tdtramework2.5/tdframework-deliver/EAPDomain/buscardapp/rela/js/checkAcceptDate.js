BusCard.define('/buscardapp/rela/js/checkAcceptDate.js',function(_buscard,cardParam){ 
try{
	var Me = this;
	/*var bookBegDateElem = Me.$("installBegTime");
	var bookEndDateElem = Me.$("installEndTime");
	var datePattern = /^(\d+)\-(\d+)\-(\d{2,2})$/;
	var checkDate =function(elem){
		if (bookBegDateElem && bookEndDateElem && datePattern.test(bookBegDateElem.value) &&datePattern.test(bookEndDateElem.value)){
		     var beginTime = new Date();
		     var endTime = new Date();
		     var dateArr = bookBegDateElem.value.split("-");
	     beginTime.setFullYear(parseInt(dateArr[0],10), parseInt(dateArr[1],10)-1, parseInt(dateArr[2],10));
	     dateArr = bookEndDateElem.value.split("-");
	     endTime.setFullYear(parseInt(dateArr[0],10), parseInt(dateArr[1],10)-1, parseInt(dateArr[2],10));
	     if(beginTime>endTime) {
	       alert("\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65f6\u95f4");
	       elem.value="";
		       elem.focus();
		       return false;
		     }
		} 
	  return true;
	};
	
	var checkCurrentDate = function(elem){
		if(datePattern.test(elem.value)){
			var current = new Date(),elemTime = new Date();
			var dateArr = elem.value.split("-");
		elemTime.setFullYear(parseInt(dateArr[0],10), parseInt(dateArr[1],10)-1, parseInt(dateArr[2],10));
		if(elemTime<current){
		   alert("\u5f00\u59cb\u65f6\u95f4\u6216\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u5c0f\u4e8e\u5f53\u524d\u65f6\u95f4");
	       elem.value="";
		       elem.focus();
		       return false;
			}
		}
	};
	
	bookBegDateElem.onpropertychange = function() {
		var evt = event || window.event;
	  	if (evt.propertyName == "value"&&datePattern.test(this.value)){
	    if(checkCurrentDate(this)==false)
	    return false;
	    if(checkDate(this)==false)
	    return false;
		}
	};
	
	bookEndDateElem.onpropertychange = function() {
		var evt = event || window.event;
	    if (evt.propertyName == "value"&&datePattern.test(this.value)){
	    if(checkCurrentDate(this)==false)
	    return false;
	    if(checkDate(this)==false)
	    return false;
		}
	};*/
	
	if(this.$("contactPhone")){
	this.$("contactPhone").onkeypress = function(){return checkInputChar();};
	this.$("contactPhone").onblur = function(){checkTelephone(Me.$("contactPhone"));};
	}
	if(this.$("contcatPhone")){
	
	this.$("contcatPhone").onkeypress = function(){return checkInputChar();};
	this.$("contcatPhone").onblur = function(){checkTelephone(Me.$("contcatPhone"));};
	
	}
	
	
	
	function checkInputChar(){
		if(!(event.keyCode>=47&&event.keyCode<=57))
		{
			alert("\u7535\u8bdd\u53f7\u7801\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c/");
			event.srcElement.focus();
			return false;
		}
		return true;
	}	
	function checkTelephone(obj){
		var phoneNum = obj.value;
		var regexServiceKind = /[^\d||\/]/;
		var flagPhone = regexServiceKind.test(phoneNum);
		if(flagPhone){
			alert("\u7535\u8bdd\u53f7\u7801\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c/");
			obj.value = "";
			obj.focus();
			return;
		}
	}	
}
catch(e){
alert(e.message)
}
});
