JSKit.date={
	'ClassName' : 'jsk.widget.date',
	'Depend'	: ['jsk.util.validate','jsk.util.form'],

dateTimeformat: 'date(YYYY-MM-DD)' ,


addDateArea	: function(inputName,buttonName,needTime){

		var buttonObj=$(buttonName);
		
		var fieldObj=$(inputName);

		if (buttonObj){
			var dformat="%Y-%m-%d";
			if (! needTime){
				needTime=false;
			}
			if (needTime){
				dformat="%Y-%m-%d %H:%M";
				JSKit.date.dateTimeformat = 'datetime(YYYY-MM-DD HH:mm)';
			}

			fieldObj.setAttribute("ifFormat",dformat);
			var vtype=fieldObj.getAttribute(JSKit.form.validType);
			vtype=!vtype?'':vtype+'|';
			fieldObj.setAttribute(JSKit.form.validType,vtype+JSKit.date.dateTimeformat);
			fieldObj.attachEvent("onblur", JSKit.form.checkOnblur);
			fieldObj.attachEvent("onkeydown", JSKit.date.parseDateKeydown);
			buttonObj.setAttribute("inputField",inputName);
			buttonObj.attachEvent("onclick", JSKit.date.showCalendar);

		}

	},



parseDateKeydown	: function(){

		var okkcode="8,9,16,17,18,20,27,32,33,34,35,36,37,38,39,45,46,139,186,189";

		var fieldObj=event.srcElement;

		var kcode = event.keyCode;

		if (event.ctrlKey ){
			okkcode=okkcode+",65,67,86,88";
		}

		okkcode=","+okkcode+",";

		if ( !(kcode>=48 && kcode<=57) && okkcode.indexOf(","+kcode+",")<0 ){
			event.returnValue = false;
		}

	},

showCalendar	: function(){
		var path=JSKit.JSK_ROOT;


		var buttonObj=event.srcElement;

		var fieldObj=$(buttonObj.getAttribute("inputField"));

		var prop = "dialogWidth:235px;dialogHeight:245px;scroll:no;status:no;help:no";
		var url = path + "/widget/calendar/calendarwin.html";
		var datePopWin=window.showModelessDialog(url, fieldObj, prop);
	}


};


(function(){

if (!JSKit.initClass(JSKit.date)) return;

JSKit.completeClass(JSKit.date);

})();