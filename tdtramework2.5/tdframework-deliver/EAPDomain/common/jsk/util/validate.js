/* validtype="required" 
/* validtype="date[(��ʽ)]" 
/* validtype="time[(��ʽ)]" 
/* validtype="datetime[(��ʽ)]" 
/* validtype="email" 
/* validtype="number" 
/* validtype="integer"
/* validtype="float" 
/* validtype="idcard" 
/* validtype="serviceno" 
/* validtype="range" 
/* validtype="equals(��һ�����name)" */
/* validtype="lessthen(��һ�����name)" */
/* validtype="url" */
/*

*/




JSKit.validate={
	'ClassName' : 'jsk.util.validate',
	'Depend'	: 'jsk.util.string',
	
	'hasDepend'	: /^datetime|^date|^time|^minlength|^maxlength|^DT|^D|^T|^MINL|^MAXL/ ,
	'hasArgument' : /^equals|^lessthen|^EQ|^LT/ ,
	'KeyMapping'	: {
		'R'     	:	'required',     
		'DT'		:	'datetime',
		'D'			:	'date',         
		'T'			:	'time',         
		'E'     	:	'email',
		'ID'    	:	'idcard',
		'N'     	:	'number',       
		'I'     	:	'integer',      
		'F'			:	'float',
		'M'			:	'money',
		'SNO'    	:	'serviceno',    
		'RG'		:	'range',        
		'EQ'		:	'equals',       
		'LT'		:	'lessthen',     
		'U'     	:	'url',
		'ENC'		:	'enchar',
		'CNC'		:	'cnchar',
		'MINL'		:	'minlength',
		'MAXL'		:	'maxlength'

	},

	'MessageLib' : {
		'required'	: '{0#����}�Ǳ�����Ŀ��',
		'date'		: '{0#����}��������ȷ������({1#YYYY-MM-DD})��',
		'time'		: '{0#����}��������ȷʱ��({1#HH:mm})��',
		'datetime'	: '{0#����}��������ȷ�����ں�ʱ��({1#YYYY-MM-DD HH:mm})��',
		'email'		: '{0#����}��������ȷ��email��ʽ��',
		'telephone'	: '{0}��������ȷ�ĵ绰���룡',
		'number'	: '{0}������������ʽ��',
		'integer'	: '{0}������������ʽ��',
		'float'		: '{0}������������С����ʽ��',
		'money'		: '{0}��������������λС����ʽ��',
		'range'		: '{0}�ķ�Χ����Ҫ��{1}��{2}֮�䣡',
		'equals'	: '{0}�ı����{1#��һ��}��ȣ�',
		'lessthen'	: '{0}���ܴ���{1#��һ��}��',
		'idcard'	: '{0}��������ȷ�����֤���룡',
		'url'		: '{0}��������ȷ��URL(��ַ)��ʽ��',

		'enchar'	: '{0}��������ͨӢ���ַ�����ĸ�����ֺ��»��ߡ�',
		'cnchar'	: '{0}�����������ַ���',
		'minlength'	: '{0}���Ȳ���С��{1}���ַ���',
		'maxlength'	: '{0}���Ȳ��ܴ���{1}���ַ���',
		'serviceno'	: '{0}��������ȷ��ҵ����룡'
	},



	'RegExpLib'	: {
		'email'		: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ ,
		'number'	: /^\d+$/ ,
		'integer'	: /^[1-9]\d*|0$/ ,
		'float'		: /^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*|0)$/ ,
		'money'		: /^([1-9]\d*\.\d{1,2}|0\.\d{1,2}|[1-9]\d*|0)$/ ,
		'telephone'	: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,16})+$/ ,
		'enchar'	: /^[ \w]*$/ ,
		'cnchar'	: /^[\u4E00-\u9FA5\uF900-\uFA2D]*$/ ,
		'serviceno'	: /^[A-Za-z0-9]*$/ 
	
	},

	'getMessage' : function(){
			var k=arguments[0];
			var msg=JSKit.validate.MessageLib[k];
			var wordNum=(' '+msg).split(/\{[0-9]/).length-1;
			for (var i=1;i<=wordNum ;i++ ){
				var ns=arguments[i];
				var rex;
				eval("rex = /\{("+(i-1)+"[^#\}]*)#?([^\}]*)\}/;");
				var ostring=rex.exec(msg);
				if (ostring!=null && ostring.length>2){
					if (!ns){
						msg=JSKit.string.replaceAll(msg,ostring[0],' '+ostring[2]+' ');
						//msg=msg.replace(ostring[0],ostring[2]);
					}else{
						msg=JSKit.string.replaceAll(msg,ostring[0],' '+ns+' ');
					}
				}
			}
			return '* '+msg+'\n';

		},

	'required'	: function(values){ 
					if (values==null || values == undefined ){
						return false;
					}
					
					if (typeof(values) != 'string' && values.length){
						if (values.length<1) {return false;}

						for (var i=0;i<values.length;i++){
							var r =JSKit.validate.required(values[i]);
							if (r) return true;
						}
						return false;
					}
					return JSKit.string.trim(values+'').length>0
	
				},

	'date'		: function(dateValue,format){ 
					dateValue=[].concat(dateValue);

					if (!format||format.length<1){
						format="YYYY-MM-DD";
					}
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
						if (!re.test(dateValue[ii]))  return false;

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
							var rs=JSKit.validate.date(values[0],fatms[0])&&JSKit.validate.time(values[1],fatms[1]);
							if (!rs){ return false; }
						}

						return true;
					},

	'telephone'	: function(value){
						if (!JSKit.validate.RegExpLib.telephone.exec(value)) return false
						return true
				},
	'email'		: function(value){  
						return value && JSKit.validate.RegExpLib['email'].test(value);			
				},
	'enchar'	: function(value){  
						return value && JSKit.validate.RegExpLib['enchar'].test(value);			
				},
	'cnchar'	: function(value){  
						return value && JSKit.validate.RegExpLib['cnchar'].test(value);			
				},
	'number'	: function(value){  
					 return value && JSKit.validate.RegExpLib['number'].test(value);	
				},
	'integer'	: function(value){ 
						return value && JSKit.validate.RegExpLib['integer'].test(value);		
				},
	'float'		: function(value){ 
						return value && JSKit.validate.RegExpLib['float'].test(value);			
				},
	'money'		: function(value){ 
						return value && JSKit.validate.RegExpLib['money'].test(value);			
				},

	'range'		: function(value,min,max){ 
						
						if (!min){
							return value<=max;
						}else if (!max){
							return value>=min;
						}
						return value>=min && value<=max ;
				},

	'equals'	: function(value,values2){ 
					values2=[].concat(values2);
					for (var i=0;i<values2.length;i++ ){
						if (value==values2){
							return true;
						}
					}
					return false;
					
				},
	'lessthen'	:  function(value,values2){

					values2=[].concat(values2);
					for (var i=0;i<values2.length;i++ ){
						if (value<=values2){
							return true;
						}
					}
					return false;
					
				},
	'minlength' : function(value,lt){
					return value && (value+'').length>=lt;
				},
	'maxlength' : function(value,lt){
					return value && (value+'').length<=lt;
				},	
	
	'idcard'	: function(value){ 
				var rex= /^(\d{15}|\d{18}|\d{17}X?)$/i ;
				if (!value|| value.length<15 || !rex.test(value)){return false;}
				var birthday;
				if (value.length==18){
					birthday=value.substr(6,8);
				}else{
					birthday='19'+value.substr(6,6);
				}
				return JSKit.validate.date(birthday,'YYYYMMDD');
				
		},

	'serviceno'	: function(value){  },

	'url'		: function(value){  }

};


(function(){
	for (var k in JSKit.validate.KeyMapping ){
		JSKit.validate[k]=JSKit.validate[JSKit.validate.KeyMapping[k]];
		JSKit.validate.MessageLib[k]=JSKit.validate.MessageLib[JSKit.validate.KeyMapping[k]];
	}
})();

(function(){

if (!JSKit.initClass(JSKit.validate)) return;

/* ����д��ֻ�������������������еĴ��� */

JSKit.completeClass(JSKit.validate);


})();