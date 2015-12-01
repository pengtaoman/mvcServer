    dojo.provide("unieap.form.RichTextEditor");
	dojo.require("unieap.fckeditor.fckeditor");
	dojo.require("unieap.form.FormWidget")
	dojo.declare("unieap.form.RichTextEditor",unieap.form.FormWidget,{
	/**
	 * @declaredClass:
	 * 		unieap.form.RichTextEditor
	 * @superClass：
	 * 		unieap.form.FormWidget
	 * @summary:
	 * 		富文本编辑器。
	 * @description:
	 *     基于开源组件FCKeditor进行封装实现，使用前需要对相关压缩文件进行解压
	 * 		支持数据绑定
	 *     封装了设置和获取数据的方法
	 *     能够设置ToolBar，默认提供了FCKeditor的两套实现即Default和Basic两种类型
	 *     支持文件上传：包括image、flash等
	 *     通过重写后台代码，可以实现上传文件路径、文件名的自定义等功能
	 * @example:
	 * |	<div dojoType="unieap.form.RichTextEditor">富文本编辑器的初始值</div>
	 *		上述代码解析后会生成一个富文本编辑器，并且初始值被设为“富文本编辑器的初始值”
	 * @img:
	 * 		images/form/fck.png
	 *      
	 */
	 
	 UserInterfaces : dojo.mixin({
		oFCKeditor : "object",
		initValue : "object",
		imageUploadURL : "string",
		linkUploadURL : "string",
		uploadParameter : "string",
		toolbarSet : "string"		
	},
	unieap.form.FormWidget.prototype.UserInterfaces),
	
		templateString:
			"<div style=\"width:100%;height:300px\">"+
				"<div dojoAttachPoint='requiredNode' class='u-form-required'></div>" +
				"<div dojoAttachPoint='errorNode' class='u-form-error'></div>"+
				"<div dojoAttachPoint='fieldNode' style='height:100%;overflow:hidden;zoom:1;'>" + 
					"<textarea  dojoAttachPoint=\"focusNode,editNode,stateNode\" onfocus=\"unieap.fep&&unieap.fep(this)\"></textarea>"+
				"</div>" + 
			"</div>",
		//指定FckEditor的目录
		basePath:dojo.moduleUrl("")+"unieap/fckeditor/",
		//用于创建FckEditor的类
		oFCKeditor:null,
		//对真正富文本编辑器的引用
		editor:null,
		/**
		 * @summary:
		 *      富文本编辑器的初始值
		 *  @type:
		 *       {strng}
		 *  @default:
		 *      null
		 *    
		 */
		initValue:null,
		
	     /**
		 * @summary:
		 *      图片文件上传的后台操作路径
		 *  @type:
		 *       {strng}
		 *  @default:
		 *      unieap.WEB_APP_NAME+"/ria_richEditor.do?Type=Image&method=upload"
		 *  @description:
		 *      后台端通过action和一系列的java类，实现了默认的上传图片文件操作，用户若有更个性化的需求，需要重新指定该路径并重写相关后台代码
		 *    
		 */
		imageUploadURL:unieap.WEB_APP_NAME+"/ria_richEditor.do?Type=Image&method=upload",
		
	     /**
		 * @summary:
		 *      链接文件上传的后台操作路径
		 *  @type:
		 *       {strng}
		 *  @default:
		 *      unieap.WEB_APP_NAME+"/ria_richEditor.do?Type=File&method=upload"
		 *  @description:
		 *      后台端通过action和一系列的java类，实现了默认的上传文件操作，用户若有更个性化的需求，需要重新指定该路径并重写相关后台代码
		 *    
		 */
		linkUploadURL:unieap.WEB_APP_NAME+"/ria_richEditor.do?Type=File&method=upload",
		
	     /**
		 * @summary:
		 *      Flash文件上传的后台操作路径
		 *  @type:
		 *       {strng}
		 *  @default:
		 *      unieap.WEB_APP_NAME+"/ria_richEditor.do?Type=Flash&method=upload"
		 *  @description:
		 *      后台端通过action和一系列的java类，实现了默认的上传Flash文件操作，用户若有更个性化的需求，需要重新指定该路径并重写相关后台代码
		 *    
		 */
	    flashUploadURL:unieap.WEB_APP_NAME+"/ria_richEditor.do?Type=Flash&method=upload",
		
	     /**
		 * @summary:
		 *      上传文件时一同提交到后台的参数
		 *  @type:
		 *       {string}
		 *  @default:
		 *      null
		 *  @description:
		 *      在往后台提交文件时候，如果有其他参数需要一同提交，可以通过该属性进行配置，在后台只需要使用uploadParameter名取参数就可以了
		 *    
		 */
		uploadParameter:"",
		
	     /**
		 * @summary:
		 *      富文本工具栏的设置
		 *  @type:
		 *       {string}
		 *  @default:
		 *      Default
		 *  @description:
		 *      目前支持两种形式的工具栏，即“Default”和“Basic”
		 *  @example:
		 *  |Default富文本框如下图：
		 *  @img:
		 *  	images/form/richbox_default.png
		 *  @example:
		 *  |Basic富文本框如下图：
		 *  @img:
		 *  	images/form/richbox_basic.png
		 */
		toolbarSet:"Default",
		
		//用于解决FCkeditor本身问题的textarea
		valueEditor:null,
		
		//是否已经监听blur事件
		_isListenBlur : false,
		
		/**
		 * @summary:
		 *      为富文本编辑器设置值
		 * @param 
		 *      {string} value
		 * @description:
		 *      为富文本组件进行设值操作
		 *      value可以为一般的字符串，也可以为一段html的代码片段
		 */
		setValue:function(value){ 
			if(window.FCKeditorAPI){
			  this.editor = FCKeditorAPI.GetInstance(this.id);
			  this.editor.SetData(value); 
			  if(!this._isListenBlur){
			       this.editor.Events.AttachEvent('OnBlur',dojo.hitch(this,this._onBlur));
			       this._isListenBlur = true;
			  }
			}else{
				this._tmpVlaue = value;
				window.FCKeditor_OnComplete = function(instance){
					 var _this=dijit.byId(instance.Name);
					_this.editor = FCKeditorAPI.GetInstance(_this.id);
			        _this.editor.SetData(_this._tmpVlaue);
			        delete  _this._tmpVlaue;
			        if(!_this._isListenBlur){
			           _this.editor.Events.AttachEvent('OnBlur',dojo.hitch(_this,_this._onBlur));
			           _this._isListenBlur = true;
			        }
				}	
			}
		},
		_onBlur : function(){
			this.fireDataChange();
			this.getValidator().validate();
		},
		postCreate:function(){
			this.inherited(arguments);
			if(this.uploadParameter.length > 0){
				var para = "&uploadParameter="+this.uploadParameter;
				this.imageUploadURL+=para;
				this.linkUploadURL+=para;
				this.flashUploadURL+=para;
			}
			var sBasePath = dojo.moduleUrl("")+"unieap/fckeditor/";
			if (dojo.isIE) {
				dojo.attr(this.focusNode, "id", this.id)
			}else{
				dojo.attr(this.focusNode, "name", this.id)
			}
			this.oFCKeditor = new FCKeditor(this.id) ; 
			this.oFCKeditor.BasePath = sBasePath ;
			this.focusNode.value = this.initValue;
			this.oFCKeditor.Width=this.domNode.style.width;
			this.oFCKeditor.Height=this.domNode.style.height;
			this.oFCKeditor.Config["ImageUploadURL"]=this.imageUploadURL;
			this.oFCKeditor.Config["LinkUploadURL"]=this.linkUploadURL;
			this.oFCKeditor.Config["FlashUploadURL"]=this.flashUploadURL;
			this.oFCKeditor.Config["AutoDetectLanguage"]=false;
			this.oFCKeditor.Config["DefaultLanguage"]=this.getLanguage();
			this.oFCKeditor.ToolbarSet = this.toolbarSet;
			dojo.addOnLoad(dojo.hitch(this,function(){
				this.oFCKeditor.ReplaceTextarea(); 
			}));
			this.valueEditor = document.createElement("textarea"); 
			this.valueEditor.style.display = "none"
			document.body.appendChild(this.valueEditor);
		},
		
	 /**
	  * @summary:
	  *      得到文本框的值
	  * @return  
	  *     {string}
	  *  @description:
	  *       得到富文本编辑器的值
	  */
	 getValue:function(){
			this.editor = FCKeditorAPI.GetInstance(this.id);
			this.valueEditor.value=this.editor.GetHTML();
			return this.valueEditor.value;
		},
		postMixInProperties : function() {
			if (this.srcNodeRef && this.srcNodeRef.innerHTML != "") {
				this.initValue = this.srcNodeRef.innerHTML;
				this.srcNodeRef.innerHTML = "";
			}
			if ((!this.initValue || this.initValue == "") && this.srcNodeRef
					&& this.srcNodeRef.value) {
				this.initValue = this.srcNodeRef.value;
			}
			if (!this.initValue) {
				this.initValue = "";
			}
		}	,
		
//		destroy:function(){
//				this.editor = FCKeditorAPI.GetInstance(this.id);
//				this.editor.destroy();
//				this.inherited(arguments);
//		}	
		getLanguage:function(){
			var AvailableLanguages =
			{
				af		: 'Afrikaans',
				ar		: 'Arabic',
				bg		: 'Bulgarian',
				bn		: 'Bengali/Bangla',
				bs		: 'Bosnian',
				ca		: 'Catalan',
				cs		: 'Czech',
				da		: 'Danish',
				de		: 'German',
				el		: 'Greek',
				en		: 'English',
				'en-au'	: 'English (Australia)',
				'en-ca'	: 'English (Canadian)',
				'en-uk'	: 'English (United Kingdom)',
				eo		: 'Esperanto',
				es		: 'Spanish',
				et		: 'Estonian',
				eu		: 'Basque',
				fa		: 'Persian',
				fi		: 'Finnish',
				fo		: 'Faroese',
				fr		: 'French',
				'fr-ca'	: 'French (Canada)',
				gl		: 'Galician',
				gu		: 'Gujarati',
				he		: 'Hebrew',
				hi		: 'Hindi',
				hr		: 'Croatian',
				hu		: 'Hungarian',
				is		: 'Icelandic',
				it		: 'Italian',
				ja		: 'Japanese',
				km		: 'Khmer',
				ko		: 'Korean',
				lt		: 'Lithuanian',
				lv		: 'Latvian',
				mn		: 'Mongolian',
				ms		: 'Malay',
				nb		: 'Norwegian Bokmal',
				nl		: 'Dutch',
				no		: 'Norwegian',
				pl		: 'Polish',
				pt		: 'Portuguese (Portugal)',
				'pt-br'	: 'Portuguese (Brazil)',
				ro		: 'Romanian',
				ru		: 'Russian',
				sk		: 'Slovak',
				sl		: 'Slovenian',
				sr		: 'Serbian (Cyrillic)',
				'sr-latn'	: 'Serbian (Latin)',
				sv		: 'Swedish',
				th		: 'Thai',
				tr		: 'Turkish',
				uk		: 'Ukrainian',
				vi		: 'Vietnamese',
				zh		: 'Chinese Traditional',
				'zh-cn'	: 'Chinese Simplified'
			};
			if(unieap.locale==""&&unieap.locale==null){
				return "zh-cn";
			}
			var locale = unieap.locale.toLowerCase();
            if(locale!=""&&locale!=null){
           	 locale = locale.replace("_","-");
            }
            
            if ( locale.length >= 5 )
			{
           	 locale = locale.substr(0,5) ;
				if (AvailableLanguages[locale]) return locale ;
			}


			if ( locale.length >= 2 )
			{
				locale = locale.substr(0,2) ;
				if (AvailableLanguages[locale] ) return locale ;
			}
			return "zh-cn";
		}
})
