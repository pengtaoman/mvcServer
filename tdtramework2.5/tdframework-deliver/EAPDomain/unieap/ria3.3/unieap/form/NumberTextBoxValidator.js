dojo.provide("unieap.form.NumberTextBoxValidator");
dojo.require("unieap.form.TextBoxValidator");
dojo.declare("unieap.form.NumberTextBoxValidator",unieap.form.TextBoxValidator,{
	
	/**
	 * @declaredClass:
	 * 		unieap.form.NumberTextBoxValidator
	 * @superClass:
	 * 		unieap.form.TextBoxValidator
	 * @summary:
	 * 		NumberTextBox控件的校验模块
	 */
	
	/**
	 * @summary:
	 * 		NumberTextBox控件的默认正则校验
	 * @type:
	 * 		{object|function}
	 * @default:
	 * 		/^(-)?\d+\.?\d*$/
	 */
	regExp:/^(-)?\d+\.?\d*$/,
	
	/**
	 * @summary:
	 * 		NumberTextBox控件默认的错误提示信息
	 * @type:
	 * 		{string}
	 * @default:
	 * 		"该输入项只能输入数字!"	
	 */
	errorMsg:RIA_I18N.form.numberTextBox.errorMsg,
	
	/**
	 * @summary:
	 * 		NumberTextBox控件的校验默认为及时校验
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		true
	 */
	realTime:true,
	
	
	/**
	 * @summary：
	 * 		对控件的值进行校验。如果校验成功返回true，否则返回false
	 * @description:
	 * 		校验过程是对输入的值先进行正则校验、然后是数字范围校验、最后是精度校验
	 * @return:
	 * 		{boolean}
	 */
	validate: function(){
		var bool=this.inherited(arguments),widget=this.widget;
		if(bool){
			var binding=widget.getBinding(),
				meta=binding&&binding.getRow()&&binding.getMetaData();
			this._update(widget);
			meta&&this.updateRange(widget.range,{
				'range':meta.getRange(),
				'max': meta.getMax(),
				'min': meta.getMin()
			});
			bool=this.validateRange(widget,meta);
			bool&&(bool=this.validatePrecisionAndScale(widget,meta));

		}
		return bool;
	},
	
	//超过最大值校验信息
	getMaxMsg:function(meta){
		var msg=this.prompts["max"]||meta&&meta.getPrompt("max");
		return msg;
	},
	
	
	//小于最小值校验信息
	getMinMsg:function(meta){
		var msg=this.prompts["min"]||meta&&meta.getPrompt("min");
		return msg;
	},
	

	
	//不再某个范围内校验信息
	getRangeMsg:function(meta){
		var msg=this.prompts["range"]||meta&&meta.getPrompt("range");
		return msg;
	},
	
	//获得精度校验信息
	getPrecisionMsg:function(meta){
		var msg=this.prompts["precision"]||meta&&meta.getPrompt("precision");
		return msg;
	},
	
	//获得精度校验信息
	getScaleMsg:function(meta){
		var msg=this.prompts["scale"]||meta&&meta.getPrompt("scale");
		return msg;
	},
	
	//获得是否允许小数点的校验信息
	getDecimalMsg:function(meta){
		var msg=this.prompts["decimal"]||meta&&meta.getPrompt("decimal");
		return msg;

	},
	
	
	//校验数字范围
	validateRange:function(widget,meta){
		var value=widget.getValue(),
			max=widget.range.max,
			min=widget.range.min,
			msg='';
		if(meta){
			if (meta.range) {
				if (value > max || value < min) {
					msg=this.getRangeMsg(meta);
					msg&&this.setErrorMsg(msg);
					return false;
				}
			}
			else {
				if(meta.max&&value>max){
					msg=this.getMaxMsg(meta);
					msg&&this.setErrorMsg(msg);
					return false;
				}else if(meta.min&&value<min){
					msg=this.getMinMsg(meta);
					msg&&this.setErrorMsg(msg);
					return false;
				}else{
					//有meta，但没有meta.max或者meta.min
					//TODO:
					//	后台应该有校验信息吧,不用再从this.prompts中读取吧?
					//   汗~ |||-_-|||
					if(value>max||value<min) return false;
				}
			}
		}else{
			//没有meta
			if(this.prompts['range']){
				if(value>max||value<min){
					msg=this.getRangeMsg(null);
					msg&&this.setErrorMsg(msg);
					return false;
				}
			}else{
				if(this.prompts['max']&&value>max){
					msg=this.getMaxMsg(null);
					msg&&this.setErrorMsg(msg);
					return false;
				}
				if (this.prompts['min'] && value < min) {
					msg = this.getMinMsg(null);
					msg&&this.setErrorMsg(msg);
					return false;
				}
				
				//没有prompts属性
				if(value>max||value<min) return false;
				
			}
		}
		
		//是否允许输入小数点
		if(String(widget.range.allowDecimal)=='false'){
			if(value.indexOf('.')>-1){
				var msg=this.getDecimalMsg();
				msg&&this.setErrorMsg(msg);
				return false;
			}
		}
		return true;
	},
	
	//精度校验
	validatePrecisionAndScale:function(widget,meta){
		var result=true;
		if(widget.precision>0){
			var value=widget.getValue()+"",re;
			var len=widget.precision-widget.scale;
			if(len<=0) return true;
			if(value.indexOf(".")>-1&&widget.scale>0){
				re=new RegExp("^(-)?\\d{1,"+len+"}.\\d{1,"+widget.scale+"}$")
			}else {
				re=new RegExp("^(-)?\\d{1,"+len+"}$");
			}
			//校验精度
			if(!re.test(value)){
				if(widget.scale>0){
					var msg=this.getScaleMsg(meta);
					msg&&this.setErrorMsg(msg);
				}else{
					var msg=this.getPrecisionMsg(meta);
					msg&&this.setErrorMsg(msg);
				}
				result=false;
			}
		}
		return result;
	},
	
	//还原到prototype状态
	_update:function(widget){
		this.maxRangeFlag&&(widget.range.max=Infinity);
		this.minRangeFlag&&(widget.range.min=-Infinity);
	},
	
	//从元数据中读取range(max、min)
	updateRange:function(range,obj){
		var max,min;
		if(obj['range']) {
			max=obj['range']['max'];
			min=obj['range']['min'];
			this._updateRange(range,max,min);
		}else{
			max=obj['max'],min=obj['min'];
			this._updateRange(range,max,min);
		}
	},
	
	_updateRange:function(range,max,min){
		if(max&&range['max']==Infinity){
			range['max']=max;
			this.maxRangeFlag=true;
		}
		if(min&&range['min']==-Infinity){
			range['min']=min;
			this.minRangeFlag=true;
		}
	}
	
})
