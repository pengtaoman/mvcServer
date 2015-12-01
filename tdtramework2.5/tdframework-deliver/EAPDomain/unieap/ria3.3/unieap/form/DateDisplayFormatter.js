if (!dojo._hasResource["unieap.form.DateDisplayFormatter"]) {
    dojo._hasResource["unieap.form.DateDisplayFormatter"] = true;
    dojo.provide("unieap.form.DateDisplayFormatter");
    dojo.require("unieap.util.util")
    dojo.require("unieap.form.SimpleFormatter");
    
    dojo.declare("unieap.form.DateDisplayFormatter", unieap.form.SimpleFormatter, {
       /**
        * @summary:
        * 		格式化显示日期
        * @declaredClass：
        * 		unieap.form.DateDisplayFormatter
     	* @superClass:
     	* 		unieap.form.SimpleFormatter 
        */
	   
	   /**
	    * @summary:
	    * 		显示格式
	    * @type：
	    * 		{string}
	    * @default:
	    * 		"yyyy-MM-dd"
	    * @example:
	    * |	<div dojoType="unieap.form.DateTextBox" displayFormatter="{dataFormat:${1}'yyyy/MM/dd'}">
	    * |	</div>
	    *	${1}日期的显示格式为'yyyy/MM/dd'
	    */
	   dataFormat:RIA_I18N.form.dateTextBox.dataFormat,
	   
	    /**
         * @summary
         * 		格式转换，从Date的long格式化成显示值
         * @param {number} value
         * @return {string}
         */
        format: function(value){
			if(!value){
				return value;
			}
            var date = new Date(Number(value));
            return unieap.dateFormat(date.getTime(), this.getFormat());
        },
        /**
         * @summary
         * 		从显示值转换成Date的long值
         * @param {string} value
         * @return {number}
         */
        parse: function(value){
			if(!value){
				return value;
			}
            return unieap.dateParser(value, this.getFormat()).getTime();
        },
        setFormat: function(dataFormat){
			this.dtaFormat = dataFormat;
			if (this.widget && (typeof this.widget.updateDisplayText=="function"))
				this.widget.updateDisplayText();
		}
    });
}