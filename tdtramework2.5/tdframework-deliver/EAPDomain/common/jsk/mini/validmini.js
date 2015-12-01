


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
		'required'	: '{0#该项}是必填项目！',
		'number'	: '{0}必须是数字形式！',
		'integer'	: '{0}必须是整数形式！',
		'float'		: '{0}必须是整数或小数形式！',
		'enchar'	: '{0}必须是普通英文字符：字母，数字和下划线。',
		'cnchar'	: '{0}必须是中文字符。'
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
							var validMsg = validMsg+JSKit.validmini.getMessage( type, '该项',null );
							alert(validMsg)	;
							elem.focus();
							return false;
						}
						return true;
				},
	'checkMeR'	: function(elem,vtype,arg){


				var keycode=event.keyCode;
				var msg='';
				
					//如果按下的是 特殊功能按键 或 f1--f12  返回true;
					if ( keycode>=112 && keycode<=123){
						return true;
					}
					//如果按下了del backspace 或者ctrl+ A C V X Z (全选，复制，粘贴，剪切，撤消 )也应该是允许的。
					if (keycode==8 || keycode==46 || event.ctrlKey && (keycode==65 || keycode==67 || keycode==86 || keycode==88 || keycode==90) ){
						return true;
					}

				vtype= ','+vtype+',';

					//数字
					var searchRs=-1;
					searchRs=vtype.search(/,(integer|number|I|N),/i);
					if (searchRs>=0 && !( keycode>=48 && keycode<=57  )){
						msg+="该项 只能输入数字！"+"\n";
					}

					//数字和小数点
					searchRs=vtype.search(/,(float|money|F|M),/i);
					
					if (searchRs>=0 && !( keycode>=48 && keycode<=57 || keycode==190 || keycode==110 )){
						msg+="该项 只能输入数字、小数点！"+"\n";
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

/* 这里写入只有依赖类载入后才能运行的代码 */

JSKit.completeClass(JSKit.validmini);


})();