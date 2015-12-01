dojo.provide("unieap.form.InlineEditor");
dojo.declare("unieap.form.InlineEditor",null,{
	
	/**
	 * @declaredClass:
	 * 		unieap.form.InlineEditor
	 * @summary:
	 * 		InlineEditBox控件的编辑器，当点击InlineEditBox控件的只读文本时弹出，对文本进行编辑，失去焦点后消失，文本值发生改变。
	 * @img:
	 * 		images/form/inlineeditbox2.png
	 * @example:
	 * | 	<div dojoType="unieap.form.InlineEditBox" editor="{editorClass:'unieap.form.TextBox'}" value="1">
	 * |	</div>
	 */
	
	
	
	/**
	 * @summary:
	 * 		编辑器名
	 * @type:
	 * 		{string}
	 * @default:
	 * 		unieap.form.TextBox
	 * @example:
	 * | 	<div dojoType="unieap.form.InlineEditBox" editor="{editorClass:'unieap.form.TextBox'}">
	 * |	</div>
	 */
	editorClass:'unieap.form.TextBox',
	
	/**
	 * @summary:
	 * 		创建编辑器所需要的参数
	 * @type:
	 * 		{object}
	 * @img:
	 * 		images/form/inlineeditbox_checkbox2.png
	 * @example:
	 * |	英语四级：<div id="level" dojoType="unieap.form.InlineEditBox" 
	 * |					editor="{editorClass:'unieap.form.CheckBox',editorProps:{checkedValue:'通过',uncheckedValue:'未通过'}}">
	 * |			  </div>
	 * 处于编辑状态时，如下图：
	 * @img:
	 * 		images/form/inlineeditbox_checkbox1.png
	 */
	editorProps:null,
	
	constructor:function(params){	
		this.widget = params.widget;
		this.editorClass=params.editorClass||this.editorClass;
		this.editorProps=params.editorProps;	
		dojo.require(this.editorClass);
		var clazz = dojo.getObject(this.editorClass);
		//重新创建一个编辑器对象
		this.editWidget = new clazz(this.editorProps);		
		if(this.widget.nextFocusId){
			this.editWidget.setNextFocusId(this.widget.nextFocusId);
		}
		dojo.connect(this.editWidget,"onBlur",this,"_onBlur");
	},
	attachEditor : function(){
		this.widget.editing = true;
		this.editWidget.setValue(this.widget.value);
		var binding = this.editWidget.getBinding();
		binding && binding.bind(this.widget.getBinding().row);
		if(!this.widget.editorNode){
			this.widget.editorNode = this.editWidget.domNode;
			this.widget.domNode.appendChild(this.editWidget.domNode);
		}
		dojo.style(this.widget.inlineNode,"display","none");
		dojo.style(this.editWidget.domNode,"display","block");
		this.focus();
	},	
    //编辑器的onblur事件
	_onBlur: function(evt){
			dojo.style(this.widget.inlineNode,"display","block");
			dojo.style(this.editWidget.domNode,"display","none");
			var binding = this.editWidget.getBinding();
			binding && binding.unbind();
			this.widget.editing = false;
			var value=this.editWidget.getValue();
			if(value!=this.widget.value){
				this.widget.onChange(value);
			}	
			this.widget.setValue(value);
			//判断是否有Popup，有就关闭它
			this.editWidget.getPopup&&this.editWidget.getPopup().close();
			
	},
	focus: function(){
		 this.editWidget.focus();
	}
});