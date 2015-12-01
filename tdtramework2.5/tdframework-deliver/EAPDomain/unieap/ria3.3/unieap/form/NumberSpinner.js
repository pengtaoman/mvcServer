dojo.provide("unieap.form.NumberSpinner");
dojo.require("unieap.form.FormWidget");
dojo.require("unieap.form.NumberTextBoxValidator");
dojo.declare("unieap.form.NumberSpinner",[unieap.form.NumberTextBox,unieap.form.FormWidget],{
	
	//用户属性配置接口
	UserInterfaces : dojo.mixin({
		smallDelta : "number",
		constraints : "object"
	},
	unieap.form.FormWidget.prototype.UserInterfaces),
	
	templateString :
		"<div class='u-form-widget'>"+
			"<div dojoAttachPoint='requiredNode' class='u-form-required'></div>" + 
			"<div dojoAttachPoint='fieldNode' class='u-form-field'>"+
				"<div dojoAttachPoint='modifiedNode' class='u-form-modified'></div>"+
				"<div class='u-form-spinner-icon' dojoAttachPoint='iconNode'>"+
					"<div tabindex='-1' class='u-form-spinner-arrowup' dojoAttachPoint='iconUpNode'></div>"+
					"<div tabindex='-1' class='u-form-spinner-arrowdown' dojoAttachPoint='iconDownNode'></div>"+
				"</div>"+
				"<div dojoAttachPoint='errorNode' class='u-form-error'></div>"+
				"<div class='u-form-textbox-field'>" +
					"<input dojoAttachPoint='inputNode,focusNode,textbox' class='u-form-textbox-input' onfocus='unieap.fep&&unieap.fep(this)'>"+
				"</div>" + 	
			"</div>" + 	
		"</div>",		
	
	/**
	 * @summary:
	 * 		按向上或向下按钮时，控件中数字减少的偏移量
	 * @type:
	 * 		{Number}
	 * @default：
	 * 		1
	 * @example:
	 * |<div dojoType="unieap.form.NumberSpinner" id="integerspinner1" binding={name:'attr_empno'} 
	 * |		constraints={max:500,min:0} smallDelta=3></div>
	 */
	smallDelta: 1,
	
	/**
	 * @summary:
	 * 		指定控件输入数字的边界。
	 * @type:
	 * 		{object}
	 * @default：
	 * 		null
	 * @example:
	 * |<div dojoType="unieap.form.NumberSpinner" id="integerspinner1" binding={name:'attr_empno'} 
	 * |		constraints={max:500,min:0}></div>
	 */
	constraints:{max:999999,min:-999999},
	
	//默认值格式化实现类名称
	valueFormatterClass : "unieap.form.SimpleFormatter",
	
	postCreate:function(){
		this.inherited(arguments);
		this.connect(this.iconNode, "mouseover", "domouseover");
		this.connect(this.iconUpNode, "mousedown", "doupdown");
		this.connect(this.iconUpNode, "mouseup", "doupup");
		this.connect(this.iconDownNode, "mousedown", "dodowndown");
		this.connect(this.iconDownNode, "mouseup", "dodownup");
		var bind = this.getBinding();
	},
	
	domouseover: function(e) {
		e.target.style.cursor = 'hand'; 
	},

	doupdown: function(e){
		dojo.addClass(this.iconUpNode,"u-form-spinner-arrowup-down");
		if(this.disabled || this.readOnly){ return; }
		var value = this.getValue();
		isNaN(value) && (value=this.constraints.min);
		var new_value = value + this.smallDelta;
		if(new_value > this.constraints.max) return;
		this.setValue(new_value);
		var self = this;
		this.handleUp && clearTimeout(this.handleUp);
		this.handleUp=setTimeout(dojo.hitch(self,function(){self.doupdown();}),150);
	},
	
	doupup: function(e){
		this.handleUp && clearTimeout(this.handleUp);
		dojo.removeClass(this.iconUpNode,"u-form-spinner-arrowup-down");
	},
	
	dodowndown: function(e){
		dojo.addClass(this.iconDownNode,"u-form-spinner-arrowdown-down");
		if(this.disabled || this.readOnly){ return; }
		var value = this.getValue();
		isNaN(value) && (value=this.constraints.max);
		var new_value = value - this.smallDelta;
		if(new_value < this.constraints.min) return;
		this.setValue(new_value);
		var self = this;
		this.handleDown && clearTimeout(this.handleDown);
		this.handleDown=setTimeout(dojo.hitch(self,function(){self.dodowndown();}),150);
	},
	
	dodownup: function(e){
		this.handleDown && clearTimeout(this.handleDown);
		dojo.removeClass(this.iconDownNode,"u-form-spinner-arrowdown-down");
	},
	
	getValue : function(){
		var value = this.getText();
		value = parseInt(value);
		return value;
	}
});