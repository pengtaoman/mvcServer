if (!dojo._hasResource["unieap.form.DateValidator"]) {
	dojo._hasResource["unieap.form.DateValidator"] = true;
	dojo.provide("unieap.form.DateValidator");
	dojo.require("unieap.form.TextBoxValidator");
	dojo.declare("unieap.form.DateValidator", unieap.form.TextBoxValidator, {
	   /**
        * @summary:
        * 		日期校验器
        * @declaredClass：
        * 		unieap.form.DateValidator
     	* @superClass:
     	* 		unieap.form.FormWidgetValidator 
        */
		
		
		/**
		 * @summary:
		 * 		关联另一个日期框
		 * @description:
		 * 		当前日期必须晚于指定的日期框
		 */
		preDate:"",
		
		/**
		 * @summary
		 * 		日期校验
		 * */
		validate: function(){
			var bool=this.inherited(arguments);
			if(!bool) return false;
			if(this.nextDate){
				this._processValidate(this.nextDate,'next')
			}
			
			if (this.preDate) {
				this._processValidate(this.preDate,'pre')
			}
			
			var binding=this.widget.getBinding();
			if(binding&&binding.getRow()){
				var meta=binding.getMetaData(),
					currentTime=this._getLongValue(this.widget),
					past=meta&&meta.getPast(),
					future=meta&&meta.getFuture(),
					msg;
				if(meta){
					if(past&&this.compareTime(past,currentTime)){
						msg=this.getPastMsg(meta);
						msg&&(this.setErrorMsg(msg));
						return false;
					}else if(future&&this.compareTime(currentTime,future)){
						msg=this.getFutureMsg(meta);
						msg&&(this.setErrorMsg(msg));
						return false;
					}else{
						return true;
					}
				}else{
					return true;
				}
			}
			return true;
		},
		
		
		//TODO:
		//	其实可以直接进行日期比较,不应该进行format
		//	DateTextBox bug,需要修正
		compareTime:function(date1,date2){
			return this.widget.getDisplayFormatter().format(date1)>this.widget.getDisplayFormatter().format(date2);
		},
		
		
		//获得时间过大校验信息
		getFutureMsg:function(meta){
			var msg=this.prompts['future']||(meta&&meta.getPrompt("future"));
			return msg;
			
		},
		
		//获得时间过小校验信息
		getPastMsg:function(meta){
			var msg=this.prompts['past']||(meta&&meta.getPrompt("past"));
			return msg;
		},
		
		//处理校验逻辑
		_processValidate:function(id,str){
			var box = dijit.byId(id);
			if (!box.getValue()) {
				return ;
			}
			switch(str){
				case 'pre':
					bool = this._compareResult(box, this.widget);
					break;
				case 'next':
					bool = this._compareResult(this.widget, box);
					break;
			}
			if(!bool){
				this.widget.setValue(box.getValue());
			}
			
		},
		
		
		//比较两个日期的long值
		_compareResult:function(startDate,endDate){
			var startValue=this._getLongValue(startDate);
			var endValue=this._getLongValue(endDate);
			return startValue<=endValue;
		},
		
		//将日期的文本值转换为long
		_getLongValue:function(box){
			return box.getDisplayFormatter().parse(box.getText());
		}
	});
}