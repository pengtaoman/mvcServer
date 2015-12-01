if (!dojo._hasResource["unieap.form.FormWidgetBinding"]) {
dojo._hasResource["unieap.form.FormWidgetBinding"] = true;
dojo.provide("unieap.form.FormWidgetBinding");
dojo.declare("unieap.form.FormWidgetBinding", null, {
	/**
	 * @declaredClass:
	 * 		unieap.form.FormWidgetBinding
	 * @summary:
	 * 		表单控件的绑定控制器，用来维护控件绑定相关操作。
	 */
	 
	/**
	 * @summary:
	 * 		指定表单控件要绑定的列(来自DataStore的Row)
	 * @type:
	 * 		{string}
	 * @example:
	 * |<form dojoType="unieap.form.Form" binding="{store:'emp'}>
	 * |	<div dojoType="unieap.form.TextBox" binding="{name:'name'}"></div>
	 * |    <div dojoType="unieap.form.DateTextBox" binding="{name:'hiredate'}"></div>
	 * |</form>
	 * 		TextBox控件和DateTextBox控件分别绑定emp DataStore的第一条row的name字段和hiredate字段
	 */
	name: '',
	
 
	/**
	 * @summary:
	 * 		设置表单控件的元数据类型
	 * @description：
	 * 		如果没有设置,框架将从元数据中去自动获取
	 * @type:
	 * 		{"string"|"number"}
	 * @example:
	 * |<form dojoType="unieap.form.Form" binding="{store:'emp'}>
	 * |	<div dojoType="unieap.form.TextBox" name="age" dataType="number"></div>
	 * |</form>
	 */
	dataType: '',
		
	/**
	 * @summary:
	 * 		设置是否显示数据修改标记。
	 * @description：
	 * 		如果为true，数据修改后会在控件左上角显示红色的三角形
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		true
	 * @img:
	 * 		images/form/markdirty.png
	 * @example:
	 * |<div dojoType="unieap.form.TextBox" binding="{name:'attr_sal',markDirty:false}"></div>
	 * 设置markDirty为false，数据修改后不会在控件左上角显示红色三角形
	 */
	markDirty: true,
	
	constructor: function(params){
		dojo.mixin(this, params);
		this.connects = [];
	},
	
	/**
	 * @summary:
	 * 		判断各表单控件的值是否已被修改。
	 * @return:
	 * 		{boolean}
	 * 		如果已被修改，返回true；没有修改则返回为false
	 * @example:
	 * |var box=unieap.byId('empName');
	 * |var binding=box.getBinding();
	 * |var bool=binding&&binding.isModified();
	 */
	isModified: function(){
		return this.getValue()!=this.getOrigValue();
	},
	

	//设置表单控件的值
	setValue: function(value){
		if(!this.row) return ;
		var dataType = this.getDataType();
		if(dataType=="number" && dojo.trim(String(value))!="" && value != null && !isNaN(value)){
			value = Number(value);
		}
		this.getValue()!= value && this.row.setItemValue(this.name, value);	
		this.markDirty&&this.widget.setModified(this.row.isItemChanged(this.name));
	},
	
	//获得表单控件绑定的值
	getValue: function(){
		var value=null;
		if(this.row){
			value=this.row.getItemValue(this.name);
			value==null&&this.metadata&&(value=this.metadata.getDefaultValue());
		}
		return value;
	},
	/**
	 * @summary:
	 * 		获取数据类型
	 * @return:
	 * 		{String} 枚举：{"number"|"string"|"boolean"|"date"}
	 */
	getDataType : function(){
		var dataType = this.dataType;
		if(!dataType && this.metadata){
			dojo.require("unieap.util.util");
			dataType = unieap.getDataType(this.metadata.getDataType());
		}
		return dataType;
	},
	
	/**
	 * @summary:
	 * 		获得表单控件初次绑定DataStore时的值
	 * @return:
	 * 		{string}
	 * @example:
	 * |var box=unieap.byId('empName');
	 * |var binding=box.getBinding();
	 * |var value=binding&&binding.getOrigValue();
	 * |alert(value);
	 */
	getOrigValue: function(){
		return this.row&&this.row.getItemOrigValue(this.name);
	},
	
	//获得控件绑定的Row对象
	getRow: function() {
		return this.row;
	},
	
	//获得绑定的datastore的元数据信息
	getMetaData:function(){
		return this.metadata
	},
	
	/**
	 * @summary:
	 * 		设置是否显示数据修改标记
	 * @description：
	 * 		如果为true，数据修改后会在控件左上角显示红色的三角形
	 * @param:
	 * 		{boolean}
	 * @example:
	 * |var text=unieap.byId('txt');
	 * |var binding=text.getBinding();
	 * |binding&&binding.setMarkDirty(false);
	 * 		设置不显示修改标记
	 */
	setMarkDirty: function(markDirty){
		this.markDirty = markDirty;
	},
	
	
	onBeforeBind:function(){},
	
	
	//数据绑定
	bind: function(row){
		if(!this.name || !row)   return;
		this.onBeforeBind();
		this.unbind();
		this.row = row;
        this.metadata = this.row.getRowSet().getMetaData(this.name);
		var widget=this.widget,
			meta=this.metadata;
		
		//控件没有maxLength属性时，处理控件的最大长度,从元数据中提取precision属性
		//如果控件为NumberTextBox,需要从元数据中读取scale
		dojo.require("unieap.form.TextBox");
		if(meta&&(widget instanceof unieap.form.TextBox)){
				var maxLen=meta.getMaxLength(),
					minLen=meta.getMinLength();

			//如果控件的maxLength为-1，即用户没有设置maxLength属性
			if(widget.maxLength==-1&&maxLen){
				widget.inputNode.maxLength=maxLen;
				widget.maxLength=maxLen;
			}
			
			//如果控件的minLength为-1，即用户没有设置minLength属性
			if(widget.minLength==-1&&minLen){
				widget.minLength=minLen;
			}
			
			//对NumberTextBox而言，长度用precision和scale来控制
			dojo.require("unieap.form.NumberTextBox");
			if (widget instanceof unieap.form.NumberTextBox) {
				var precision = meta.getPrecision(), 
					scale = meta.getScale();
				//NumberTextBox控件没有配置precision属性
				if (widget.precision ==-1&&precision) {
					widget.precision = precision;
					if (widget.scale<=0&&scale&&scale<precision) {
						widget.scale=scale;
					}
				}
				
				//NumberTextBox控件有precision但是没有scale
				if(widget.precision>-1&&widget.scale<=0&&scale&&scale<widget.precision){
					widget.scale=scale;
				}
			}
		}

		this.connect(this.widget,"fireDataChange",function(){
        		var value = this.widget.getValue();
        		this.setValue(value);
        });   
        this.widget.setValue(this.getValue());     
        
        this.connect(this.row.getRowSet(),"onItemChanged",
        	function(row, name,value){
	        	if(this.name == name && 
	        		this.row.getData()==row.getData() &&
	        		this.widget.getValue()!=value){	  
	        			this.widget.setValue(value);
	        	}
        });
        this._binded = true;
	},
	
	//事件绑定
	connect: function(context,eventName, eventFunc){
		 this.connects.push(dojo.connect(context, eventName, this, eventFunc));
	},
	
	//解除控件与store的绑定
	unbind: function(){
		dojo.forEach(this.connects, function(handle){
			dojo.disconnect(handle);
		});
		this.connects = [];
		this.row = null;		
		this.widget.setModified(false);
	},
	
	isBinded: function(){
		return this._binded?this._binded:false;
	}
});
unieap.form.FormWidgetBinding.prototype.bind._innerIdentify="widgetBind"
}
