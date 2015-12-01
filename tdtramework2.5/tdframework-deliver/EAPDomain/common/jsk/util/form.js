/*

*/
JSKit.form = {
	'ClassName' : 'jsk.util.form',
	'Depend'	: ['jsk.util.validate','jsk.util.element'],


	'validType'	: 'validtype',
	'validLabel': 'validlabel',
	'validTime'	: 'validtime',

	'forms'		: {},

	'formsWrong'	: {},

	'getElementName'	: function(elem){
				return elem.name?elem.name:elem.id;
			},

	'getElementValue'	: function(eles){

				var elements=[],elementValues = [],ele = null;

				if ( eles.length ){
					elements=eles;
				}else{
					elements.push(eles);
				}

				for(var i = 0; i < elements.length; i++) {
					ele = elements[i];
					if (/^(text|textarea|password|hidden|button)$/i.test(ele.type)){
						elementValues.push(ele.value);
					}else if((ele.type == "radio" || ele.type == "checkbox") && ele.checked){
						  elementValues.push(ele.value);
					}else if(ele.tagName.toLowerCase() == "select") {
						elementValues=elementValues.concat(this.getSelectValue(ele));
					}
				 }
				if (elementValues.length==0){
					return null;
				}else if (elementValues.length == 1){
					return elementValues[0];
				}
				return elementValues;
			},

	'getSelectValue' : function(select) {
				if ( select.selectedIndex == -1 ) { return null; }
				var ismultiple = select.type=='select-multiple';
				if (!ismultiple){ return select.value; }
				var elementValues = [] , optionlist = select.options;
				for(var x = 0; x < optionlist.length ; x++) {
					if(optionlist[x].selected) {
						 elementValues.push(optionlist[x].value); 
					}
				}
				return elementValues;
			},

	'initAllForms'	: function(){
			for(var i=0;i<document.forms.length;i++){
				var formObj = document.forms[i];
				var formname= this.getElementName(formObj);
				if (!formname){ formname=""; }
				this.initFormFields(formname,formObj);
				this.formsWrong[formname]=[];

			}
	},

	'initFormFields' : function(formname,form){
			
					if (!form){ form=$byName(formname)[0]; }

					if (!form){ return;}

					var fieldsMap={"" : []};

					var fields=form.elements;
						for (var i=0;i<fields.length ;i++ ){
							//if ( !fields[i].getAttribute(this.validType)){
							//	continue;
							//}
							var name=this.getElementName(fields[i]);

							if ( !name || name.length<1){
								fieldsMap[""].push(fields[i]);
							}else if ( !fieldsMap[name] || fieldsMap[name].length==0 ){
								fieldsMap[name]=this.createField(name,$byName(name));
							}
						}

					this.forms[formname] = fieldsMap ;

					
				},

	'getValidLabel'	: function(field,tlabel){
					var tfieldObj=field.core;
					if (!tlabel){
						try{
							tlabel=tfieldObj[0].parentNode.previousSibling.innerText;
							tlabel=(!tlabel)?tfieldObj[0].previousSibling.nodeValue:tlabel;
						}catch(e){
							tlabel='';
						}
					}
					
					tlabel=(!tlabel)?'':tlabel;
					tlabel=tlabel.replace(/(^\s+)|(\s*\*\s*|\s*＊\s*)/,'').replace(/(^\s+)|(\s*:\s*|\s*：\s*)$/,'');
					
					field.label= (tlabel.length<1)?null:tlabel;

			},

		'parseValidType'	: function(field,tattribute){
						if (!tattribute){
							field.validtype=null;
						}else{
							field.validtype=[];
							var vtypes=tattribute.split('|');
							for (var i=0;i<vtypes.length;i++){
								vtypes[i]=vtypes[i].replace(/(^\s+|\s+$)/,'');
								var depCmd=null , argCmd=null , commonCmd=null;
								if (vtypes[i].toLowerCase()=='required'|| vtypes[i].toUpperCase()=='R'){
									field.required=true;
								}else {
									
									depCmd=JSKit.validate['hasArgument'].exec(vtypes[i]);
									argCmd=JSKit.validate['hasDepend'].exec(vtypes[i]);
									if ( depCmd && depCmd.length>0 ) {
										depCmd=depCmd[0];
									}else if ( argCmd && argCmd.length>0 ) {
										argCmd=argCmd[0];
									}else{
										commonCmd=vtypes[i];
									}

								}

								if (commonCmd){
									field.validtype.push(commonCmd);
								}else{
									var dep=/\((.*)\)/.exec(vtypes[i]);
									
									if (dep && dep.length>1){
										dep=dep[1];
									}else{
										dep=null;
									}
										if (depCmd!=null) {
											field.validtype.push(depCmd);
											field.depend[depCmd]=dep;
										}else if(argCmd!=null) {
											field.validtype.push(argCmd);
											field.argument[argCmd]=dep;
										}
								}

							}

						}

				},

		'createField'	: function(tname,tfieldObj,checkTime){

						var field={
							'name'	: tname,
							'label'	: null,
							'required'	: false,
							'isNumber'	: false,
							'formname'	: this.getElementName(tfieldObj[0].form),
							'depend'	: {},
							'argument'	: {},
							'core'		: tfieldObj,
							'oBackground': []
						
						};

						var tattribute = null , tlabel = null , tvalidtime = null;

						var temp_f;
						for (var i=0;i<tfieldObj.length;i++ ){
							temp_f=tfieldObj[i];
							if (!tattribute){
								tattribute= temp_f.getAttribute(this.validType);
							}
							if (!tlabel){
								tlabel=temp_f.getAttribute(this.validLabel);
							}
							tvalidtime=temp_f.getAttribute(this.validTime);
							if (tvalidtime && this['checkOn'+tvalidtime]){
									temp_f.attachEvent('on'+tvalidtime,this['checkOn'+tvalidtime]);
							}
							if (checkTime){
								temp_f.attachEvent('on'+checkTime,this['checkOn'+checkTime]);
							}
							if (tvalidtime && checkTime && tvalidtime!='blur' && checkTime!='blur'){
									temp_f.attachEvent('onblur',this['checkOnblur']);
							}
							field.oBackground[i]=temp_f.style.background+'';
							//if (tattribute && tlabel && tvalidtime){
							//	break;
							//}
						}

						this.getValidLabel(field,tlabel);

						this.parseValidType(field,tattribute);

						return field;
					},


		'checkAllField'	: function(formId){
						var formObj=this.forms[formId];
						var wrongEle=[];
						var msg='';
						for (var keyname in formObj ){
							if (!keyname||keyname.length<1){
								continue;
							}
							var tem=this.checkField(formObj[keyname]);
							if (tem.length>0){
								for (var i=0;i<formObj[keyname].core.length;i++ ){
									wrongEle.push(formObj[keyname].core[i]);
								}
								
								msg+=tem;
							}
						}
						if (msg.length>0){
							alert('您填写的数据有如下错误:\n\n'+msg);
								try {
									JSKit.element.flash(wrongEle);
								}catch (e) {
								}
							return false;
						}
						return true;
						
					},
		'checkField'	: function(fieldObj,tempvalue){
					var validMsg='';
					if (!fieldObj.required && (fieldObj.validtype==null ||fieldObj.validtype.length==0)){
						return  validMsg;
					}
					var val=this.getElementValue(fieldObj.core);
					var hasFill=JSKit.validate.required(val);

					if (!fieldObj.required && !hasFill ){
						return  validMsg;
					}
					
					if (fieldObj.required && !hasFill){
						var msg= JSKit.validate.getMessage("required",fieldObj.label);
						validMsg=msg;
						return validMsg;
					}

					for ( var i=0;i<fieldObj.validtype.length;i++ ){

						var vt=fieldObj.validtype[i];
						var arg= fieldObj.argument[vt];
						var dfield=null;
						if (arg == null) {
							arg=fieldObj.depend[vt];
							
							if (arg){
								dfield = this.forms[fieldObj.formname][fieldObj.depend[vt]] ;
								if (tempvalue){
									arg=tempvalue;
								}else{
									arg = this.getElementValue(dfield.core );
								}
							}

						}
						if (!dfield){
							dfield={'label':null};
						}
						var vfun= JSKit.validate[vt];
						if (!vfun){ continue; }
						var validRs = vfun( val, arg );

						if (!validRs) {
							validMsg = validMsg+JSKit.validate.getMessage( vt, fieldObj.label, dfield.label );
						}
					}

					return validMsg;
			
			},
		'checkFormField'	: function(fieldName,formId){
							var fieldObj=null;
							if (formId){
								fieldObj=this.forms[formId][fieldName];
							}else{
								fieldObj=this.createField(fieldName,$byName(fieldName));
							}

							return this.checkField(fieldObj);
					},
		'validField'	:function(fname,vtype,vlabel,vtime,formname){
				field=$byName(fname);
				var formname= this.getElementName(field[0].form);
				field[0].setAttribute(this.validType,vtype);
				field[0].setAttribute(this.validLabel,vlabel);
				field[0].setAttribute(this.validTime,vtime);				
				var fieldObj = this.createField(fname,field);

				this.forms[formname][fname]=fieldObj;

			},

		'checkOnblur'	: function(){
				var field = event.srcElement;
				var name = JSKit.form.getElementName(field);
				var formname = "";
				if (field.form){
					formname = JSKit.form.getElementName(field.form);
				}

				var fieldObj=null;

				fieldObj=JSKit.form.forms[formname][name];

				var b=fieldObj.required;
				fieldObj.required=false;
				var msg= JSKit.form.checkField(fieldObj);
				if (msg.length>0){
					alert(msg);
					var wrongEle=[];
					for (var i=0;i<fieldObj.core.length;i++ ){
						wrongEle.push(fieldObj.core[i]);
					}
					try {
						JSKit.element.flash(wrongEle);
					}catch (e) {
						//field.focus();
						//field.select();
					}
					

					return false;
					
				}
				fieldObj.required=b;

		},
		
		'checkOnkeydown' : function(){

				var field = event.srcElement;
				var keycode=event.keyCode;
				var msg='';
				var name = JSKit.form.getElementName(field);
				var formname = "";
				if (field.form){
					formname = JSKit.form.getElementName(field.form);
				}

				var fieldObj=null;

				fieldObj=JSKit.form.forms[formname][name];

				var searchRs=-1;
				var vtype= ','+fieldObj.validtype+',';



				//如果按下的是 特殊功能按键 或 f1--f12  返回true;
				if ( JSKit.form.functionKeyCode[keycode] || keycode>=112 && keycode<=123){
					return true;
				}
				//如果按下了ctrl, 那么 A C V X Z (全选，复制，粘贴，剪切，撤消 )也应该是允许的。
				if (event.ctrlKey && (keycode==65 || keycode==67 || keycode==86 || keycode==88 || keycode==90) ){
					return true;
				}

				//数字
				searchRs=vtype.search(/,(integer|number|I|N),/i);
				if (searchRs>=0 && !( keycode>=48 && keycode<=57 )){
					msg+=fieldObj.label+" 只能输入数字！"+"\n";
				}

				//数字和小数点
				searchRs=vtype.search(/,(float|money|F|M),/i);
				
				if (searchRs>=0 && !( keycode>=48 && keycode<=57 || keycode==190 || keycode==110 )){
					msg+=fieldObj.label+" 只能输入数字、小数点！"+"\n";
				}

				//数字 空格 - / :
				searchRs=vtype.search(/,(datetime|date|time|DT|D|T),/i);
				if (searchRs>=0 && !( keycode>=48 && keycode<=57 || ",96,105,32,186,189,191,109,111,".indexOf(','+keycode+',')!=1 ) ){
					msg+=fieldObj.label+" 只能输入“数字 空格 - / : ” ！"+"\n";
				}
				/*
				if (!(  keycode>=65 && keycode<=90  )){
					msg=+"此处只能输入英文字母！"+"\n";
				}
				*/

				/*
					未完待续... 还有一些不常用的按键判断功能没有实现
				*/



				if (msg.length>0){
					alert(msg);
					event.returnValue = false;
					return false;
				}



		}

};

JSKit.form.functionKeyCode = {
		8	: 'backspace',
		9	: 'tab',
		13	: 'enter',
		16	: 'shift',
		17	: 'ctrl',
		18	: 'alt',
		19	: 'pause',
		20	: 'capslock',
		27	: 'esc',
		33	: 'pagup',
		34	: 'pagdown',
		35	: 'end',
		36	: 'home',
		37	: 'left',
		38	: 'up',
		39	: 'right',
		40	: 'down',
		45	: 'insert',
		46	: 'del',
		144 : 'numlock',
		145	: 'scrolllock',
		91	: 'win',
		93	: 'menu',
		112 : 'f1',
		123 : 'f12'
};

JSKit.form.keyCharMapping={
		32	: 'space',
		186 : ";",
		187 : "=",
		188 : ",",
		189 : "-",
		190 : ".",
		191 : "/",
		192 : "`",
		219 : "[",
		220 : "\\",
		221 : "]",
		222 : "'",

//右侧小键盘
		110	: '.',
		111	: '/',
		106	: '*',
		109	: '-',
		107	: '+'
	};


(function(){

if (!JSKit.initClass(JSKit.form)) return;

/* 这里是只有依赖类载入后才能运行的代码 */

JSKit.completeClass(JSKit.form);


})();



