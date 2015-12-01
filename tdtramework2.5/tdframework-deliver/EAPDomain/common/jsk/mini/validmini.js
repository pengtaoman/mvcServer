


JSKit.validmini={
	'ClassName' : 'jsk.mini.validmini',
	'Depend'	: 'jsk.util.string',

	'KeyMapping'	: {
		'R'     	:	'required',     
		'N'     	:	'number',       
		'I'     	:	'integer',      
		'F'			:	'float',
		'ENC'		:	'enchar',
		'CNC'		:	'cnchar'
	},

	'MessageLib' : {
		'required'	: '{0#����}�Ǳ�����Ŀ��',
		'number'	: '{0}������������ʽ��',
		'integer'	: '{0}������������ʽ��',
		'float'		: '{0}������������С����ʽ��',
		'enchar'	: '{0}��������ͨӢ���ַ�����ĸ�����ֺ��»��ߡ�',
		'cnchar'	: '{0}�����������ַ���'
	},



	'RegExpLib'	: {
		'number'	: /^\d+$/ ,
		'integer'	: /^[1-9]\d*|0$/ ,
		'float'		: /^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*|0)$/ ,
		'enchar'	: /^[ \w]*$/ ,
		'cnchar'	: /^[\u4E00-\u9FA5\uF900-\uFA2D]*$/ 
	},

	'getMessage' : function(){
			var k=arguments[0];
			var msg=JSKit.validmini.MessageLib[k];
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
							var r =JSKit.validmini.required(values[i]);
							if (r) return true;
						}
						return false;
					}
					return JSKit.string.trim(values+'').length>0
	
				},

	'enchar'	: function(value){  
						return value && JSKit.validmini.RegExpLib['enchar'].test(value);			
				},
	'cnchar'	: function(value){  
						return value && JSKit.validmini.RegExpLib['cnchar'].test(value);			
				},
	'number'	: function(value){  
					 return value && JSKit.validmini.RegExpLib['number'].test(value);	
				},
	'integer'	: function(value){ 
						return value && JSKit.validmini.RegExpLib['integer'].test(value);		
				},
	'float'		: function(value){ 
						return value && JSKit.validmini.RegExpLib['float'].test(value);			
				},

	'checkMe'	: function(elem,type,arg){
						var vfun= JSKit.validmini[type];
						if (!vfun){ return true; }
						var validRs = vfun( elem.value, arg );
						if (!validRs) {
							var validMsg = validMsg+JSKit.validmini.getMessage( type, '����',null );
							alert(validMsg)	;
							elem.focus();
							return false;
						}
						return true;
				},
	'checkMeR'	: function(elem,vtype,arg){


				var keycode=event.keyCode;
				var msg='';
				
					//������µ��� ���⹦�ܰ��� �� f1--f12  ����true;
					if ( keycode>=112 && keycode<=123){
						return true;
					}
					//���������del backspace ����ctrl+ A C V X Z (ȫѡ�����ƣ�ճ�������У����� )ҲӦ��������ġ�
					if (keycode==8 || keycode==46 || event.ctrlKey && (keycode==65 || keycode==67 || keycode==86 || keycode==88 || keycode==90) ){
						return true;
					}

				vtype= ','+vtype+',';

					//����
					var searchRs=-1;
					searchRs=vtype.search(/,(integer|number|I|N),/i);
					if (searchRs>=0 && !( keycode>=48 && keycode<=57  )){
						msg+="���� ֻ���������֣�"+"\n";
					}

					//���ֺ�С����
					searchRs=vtype.search(/,(float|money|F|M),/i);
					
					if (searchRs>=0 && !( keycode>=48 && keycode<=57 || keycode==190 || keycode==110 )){
						msg+="���� ֻ���������֡�С���㣡"+"\n";
					}

					if (msg.length>0){
						alert(msg);
						event.returnValue = false;
						return false;
					}
				}

};


(function(){
	for (var k in JSKit.validmini.KeyMapping ){
		JSKit.validmini[k]=JSKit.validmini[JSKit.validmini.KeyMapping[k]];
		JSKit.validmini.MessageLib[k]=JSKit.validmini.MessageLib[JSKit.validmini.KeyMapping[k]];
	}
})();

(function(){

if (!JSKit.initClass(JSKit.validmini)) return;

/* ����д��ֻ�������������������еĴ��� */

JSKit.completeClass(JSKit.validmini);


})();