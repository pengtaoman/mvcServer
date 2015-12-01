/* ********************************** */


var DateUtil=new function(){
	var Me=this;
	

	Me.addDateArea=function(inputName,buttonName,needTime){

		var buttonObj=$(buttonName);
		
		var fieldObj=$(inputName);

		if (isValid( buttonObj) ){

			var dformat="%Y-%m-%d";
			var dateType= "date";

			if (! needTime){
				needTime=false;
				fieldObj.maxLength=10;
			}
			if (needTime){
				dformat="%Y-%m-%d %H:%M";
				dateType = 'datetime';
				fieldObj.maxLength=16;
			}


			fieldObj.setAttribute("datetype",dateType);
			fieldObj.setAttribute("ifFormat",dformat);
			fieldObj.attachEvent("onblur", Me.parseDate);
			fieldObj.attachEvent("onkeydown", Me.parseDateKeydown);
			buttonObj.setAttribute("inputField",inputName);
			buttonObj.attachEvent("onclick", Me.showCalendar);
			buttonObj.attachEvent("onkeydown", enterJump);

		}

	};
	//format(可选) :  date  time  datetime
	Me.parseDate=function(fieldObj,name,format){
		var msg;
		if (!name){
			msg="您输入了一个无效的日期！现在修改吗？";
		}else{
			msg=name+" 是一个无效的日期！现在修改吗？";
		}
		if (!fieldObj || fieldObj.srcElement){
			fieldObj=event.srcElement;
		}
		if (typeof(fieldObj)=="string"){
			fieldObj=$(fieldObj);
		}
			
		var dateType=format;
		if (!format){
			dateType=fieldObj.getAttribute("datetype");
		}
			
		if (!dateType){
			dateType="date";
			//return;
		}
		
		fieldObj.value=trim(fieldObj.value);
		if(fieldObj.value.length==0){
			return true;
		}

		var dt=fieldObj.value.split("-");
		if (dt.length>2){
			if (dt[1].length==1){
			dt[1]="0"+dt[1];
			}
			if (dt[2].length==1){
				dt[2]="0"+dt[2];
			}
			fieldObj.value=dt.join("-");
		}

		//当手工填写日期未输入时间时，自动在日期后加上默认值(当前日期控件类型为datatime)
        if(dateType == "datetime" && fieldObj.value.length == 10){
			fieldObj.value = fieldObj.value+" "+"00:00"
		}
		
		if (!DateValid[dateType](fieldObj.value)){
			if (confirm(msg)){
				try{
				fieldObj.focus();
				fieldObj.select();
				}catch(ex){
				}
			}
			return false;
			
		}
		return true;
	};


	Me.parseDateKeydown=function(){

		var okkcode="8,9,16,17,18,20,27,32,33,34,35,36,37,38,39,45,46,139,186,189,191";

		var fieldObj=event.srcElement;

		var kcode = event.keyCode;
		//alert(kcode);

//189 -
		if (event.ctrlKey ){
			okkcode=okkcode+",65,67,86,88";
		}

		okkcode=","+okkcode+",";

		//if (/^\d{8}$/gi.test(fieldObj.value) && (kcode>=48 && kcode<=57)){
		//			event.returnValue = false;
		//}

		if ( !(kcode>=48 && kcode<=57 || kcode>=96 && kcode<=105) && okkcode.indexOf(","+kcode+",")<0 ){
			event.returnValue = false;
			return;
		}
		
		if (okkcode.indexOf(","+kcode+",")>=0){
			event.returnValue = true;
			return;
		}

		var the_f=event.srcElement;
		var ss=event.keyCode;
		var t1=the_f.value+"";
		

		if ( t1.charAt(t1.length-1)!="-" &&  (t1.length==4 || (t1.length==7 && t1.charAt(4)=="-"))  ){
			the_f.value=t1+"-";
		}
		if (t1.length==6 && t1.charAt(4)=="-"){
			var x=t1.substr(5,1);
			var y=t1.substring(0,5);
			x=parseInt(x);
			if(x>1)	{
				the_f.value=y+"0"+x+"-";
			}
		}
		if (t1.length==9 && t1.charAt(4)=="-" && t1.charAt(7)=="-")	{
			var x=t1.substr(8,1);
			var y=t1.substring(0,8);
			x=parseInt(x);
			if (x>3){
				the_f.value=y+"0"+x;
			}
		}
		if (t1.length==10 && fieldObj.maxLength>10){
			the_f.value=t1+" ";
		}
		if (t1.length==13 && fieldObj.maxLength>10){
			the_f.value=t1+":";
		}
		if (ss==8){
			if (t1.length==4){
				var x=t1.substring(0,3);
				the_f.value=x;
			}
			if (t1.length==7 && t1.charAt(4)=="-"){
				var x=t1.substring(0,6);
				the_f.value=x;
			}
		}
	};



	Me.showCalendar=function(){
		var path=null;
		var jsname='td_common.js';

		if (isValid(WEBAPP_PATH)){
			path=WEBAPP_PATH;
		}else if (isValid(APP_PATH)){
			path=APP_PATH;
		}else{
			path=(function(){
					var mpath='';
					var scripts=document.getElementsByTagName("script");
					for (var i=0;i<scripts.length;i++ ){
						var tsrc=scripts[0].src;
						if((tsrc.length - jsname.length) < 0){
							continue;
						}else if (tsrc.lastIndexOf(jsname) == tsrc.length - jsname.length){
								mpath=tsrc.substring(tsrc.length - jsname.length);
							break;
						}
					}
					if (mpath.length<2){
						mpath=".";
					}else if (mpath.lastIndexOf('/')==mpath.length-1){
						mpath=mpath.substr(0,mpath.length-1);
					}
					return mpath;
				})();
		}

		var buttonObj=event.srcElement;

		var fieldObj={};
		fieldObj['input']=$(buttonObj.getAttribute("inputField"));
		fieldObj['win']=window;

		var prop = "dialogWidth:235px;dialogHeight:245px;scroll:no;status:no;help:no";
		var url = path + "/common/calendar/calendarwin.html";
		var datePopWin=window.showModelessDialog(url, fieldObj, prop);
	};


};



var DateValid={

	'date'		: function(dateValue,format){ 



					if (dateValue.length==9)	{
						if (!format||format.length<1){
							format="YYYY-MM-D";
						}
					}else if (dateValue.length==8)	{
						if (!format||format.length<1){
							format="YYYY-M-D";
						}
					}else{
						if (!format||format.length<1){
							format="YYYY-MM-DD";
						}
					}


					dateValue=[].concat(dateValue);
	
					format=format.toUpperCase();

					var formatRex = format.replace(/([$^.*+?=!:|\/\\\(\)\[\]\{\}])/g, "\\$1");

					formatRex = formatRex.replace( "YYYY", "([0-9]{4})" );
					formatRex = formatRex.replace( "YY", "([0-9]{2})" );
					formatRex = formatRex.replace( "MM", "(0[1-9]|10|11|12)" );
					formatRex = formatRex.replace( "M", "([1-9]|10|11|12)" );
					formatRex = formatRex.replace( "DD", "(0[1-9]|[12][0-9]|30|31)" );
					formatRex = formatRex.replace( "D", "([1-9]|[12][0-9]|30|31)" );
					formatRex = "^" + formatRex + "$";
					var re = new RegExp(formatRex);

					var year = 0, month = 1, date = 1;

					var tokens = format.match( /(YYYY|YY|MM|M|DD|D)/g );

					for (var ii=0;ii<dateValue.length;ii++ ){
						if (!re.test(dateValue[ii])) {
							

							return false;
						}

						var values = re.exec(dateValue[ii]);

						for (var i = 0; i < tokens.length; i++) {
							switch (tokens[i]) {
							case "YY":
								year = 2000+Number(values[i+1]); break;
							case "YYYY":
								year = Number(values[i+1]); break;
							case "M":
							case "MM":
								month = Number(values[i+1]); break;
							case "D":
							case "DD":
								date = Number(values[i+1]); break;
							}
						}
						var leapyear = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
						if (date > 30 && (month == 2 || month == 4 || month == 6 || month == 9 || month == 11)) return false; 
						if (month == 2 && ( date == 30 || date == 29 && !leapyear )  ) return false; 

					}
					return true;
				},

	'time'		: function(timeValue,format){ 
					timeValue=[].concat(timeValue);

					if (!format||format.length<1){
						format="HH:mm";
					}
					var formatRex = format.replace( /([.$?*!=:|{}\(\)\[\]\\\/^])/g, "\\$1");
					formatRex = formatRex.replace( "HH", "([01][0-9]|2[0-3])" );
					formatRex = formatRex.replace( "H", "([0-9]|1[0-9]|2[0-3])" );
					formatRex = formatRex.replace( "mm", "([0-5][0-9])" );
					formatRex = formatRex.replace( "m", "([1-5][0-9]|[0-9])" );
					formatRex = formatRex.replace( "ss", "([0-5][0-9])");
					formatRex = formatRex.replace( "s", "([1-5][0-9]|[0-9])");
					formatRex = "^" + formatRex + "$";
					var re = new RegExp(formatRex);
					for (var ii=0;ii<timeValue.length;ii++ ){
						if (!re.test(timeValue[ii]))  return false;
					}
					return true;	
	
					},

	'datetime'	: function(timeValue,format){ 

						timeValue=[].concat(timeValue);

						var trex= /^\S+ \S+$/ ;
						if (!format||format.length<1){
							format="YYYY-MM-DD HH:mm";
						}else if ( !trex.test(format) ){
							return false;
						}

						for (var ii=0;ii<timeValue.length;ii++ ){
							if (!trex.test(timeValue[ii]) ){ return false; }
							var values= timeValue[ii].split(' ');
							var fatms= format.split(' ');
							var rs=DateValid.date(values[0],fatms[0])&&DateValid.time(values[1],fatms[1]);
							if (!rs){ return false; }
						}

						return true;
					}

};



//回调函数： 参数1 选择的日期  参数2 要放置日期信息的input域 参数3 打开的日期选择窗口
// 作用： 可以改变日期组件默认的行为。例如选择日期后 对选择的日期进行一些操作
// 例子：  如果选择的日期是 2006-12-25日 那么显示 圣诞快乐 同时关闭打开的窗口 否则显示：请选择圣诞节
/*
window.DateCallBack=function(dateValue,inputField,openWindow){
	if (dateValue=="2006-12-25"){
		alert("圣诞快乐");
		inputField.value=dateValue;
		openWindow.close();
	}else{
		alert("请选择圣诞节");
	}
};

*/