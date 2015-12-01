if (!dojo._hasResource["unieap.form.DateValueFormatter"]) {
	dojo._hasResource["unieap.form.DateValueFormatter"] = true;
	dojo.provide("unieap.form.DateValueFormatter");
	dojo.require("unieap.form.SimpleFormatter");
	dojo.require("unieap.util.util")
	dojo.declare("unieap.form.DateValueFormatter", unieap.form.SimpleFormatter, {
	   /**
        * @summary:
        * 		日期实际值的格式化
        * @declaredClass：
        * 		unieap.form.DateValueFormatter
     	* @superClass:
     	* 		unieap.form.SimpleFormatter 
        */
		
		/**
		 * @summary:
		 * 		日期值格式化
		 */
		dataFormat:"",
		/**
		 * @summary
		 * 		格式转换，从字符串转换成Date的long型数据
		 * @param {string} value
		 * @return {number}
		 */
		format: function(value){
			if(!this.dataFormat||!value){
				return value;
			}
			return unieap.dateParser(value, this.getFormat()).getTime();
		},
		/**
		 * @summary
		 * 		从Date的long型转换成字符串
		 * @param {number} value
		 * @return {string}
		 */
		parse: function(value){
			if(!this.dataFormat||!value){
				return value;
			}
			var date = new Date(value);
			return unieap.dateFormat(date.getTime(), this.getFormat());
		}
	});
}
