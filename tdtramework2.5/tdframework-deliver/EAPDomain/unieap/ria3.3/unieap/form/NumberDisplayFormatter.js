dojo.provide("unieap.form.NumberDisplayFormatter");
dojo.require("unieap.form.SimpleFormatter");
dojo.require("dojo.number");
dojo.require("unieap.patch.number");

dojo.declare("unieap.form.NumberDisplayFormatter", unieap.form.SimpleFormatter, {
	
	/**
	 * @declaredClass:
	 * 		unieap.form.NumberDisplayFormatter
	 * @summary:
	 * 		对数字文本框中的数字进行格式化
	 * @example:
	 * |<div dojoType="unieap.form.NumberTextBox" displayFormatter="{dataFormat:'###,###'}"></div>
	 */
	
	/**
	 * @summary:
	 * 		指定格式化的数据类型，在没有配置binding的情况下使用
	 * @type：
	 * 		{String}
	 * @example:
     * |<div dojoType="unieap.form.NumberTextBox" displayFormatter="{dataType:'number'}"></div>
	 */
    dataType : "number",
    
    /**
	 * @summary:
	 * 		格式化字符串
	 * @type:
	 * 		{string}
	 * @description:
	 * 		数字格式化字符串，参见
	 * 		http://www.unicode.org/reports/tr35/#Number_Format_Patterns
	 * @example:
	 * |<div dojoType="unieap.form.NumberTextBox" value="1234567.8910" displayFormatter="{dataFormat:'#,000.00'}"></div>
	 * @img:
     * 		images/form/numberformat.png
	 */
	dataFormat: "",
    
    /**
     * @summary
     * 		格式转换,对形如###,###的格式进行转换,
     * 		该方法仅适合20位以内的数字的格式化，大于20位的数字可以自定义格式化方法，具体见下面样例。
     * @param:
     * 		{number} value 要格式化的数字
     * @return:
     * 		{string}
     * @example:
     * |<script type="text/javascript">
     * |var dataFormat = function(value){
     * |	return value+'999';
     * |}
     * |</script>
     * |<div dojoType="unieap.form.NumberTextBox" displayFormatter="{format:dataFormat}"></div>
     */
    format: function(value){
    	var dataType = "";
    	if(this.dataType){
    		dojo.require("unieap.util.util");
			dataType = unieap.getDataType(this.dataType);
    	}
    	else{
    		//如果不在form中使用，不存在getbinding方法
    		if(this.widget.getBinding){
	    		var binding = this.widget.getBinding();
		    	if(binding){
		    		dataType = binding.getDataType();
		    	}
    		}
    	}
    	if(dataType=="number" && dojo.trim(String(value))!="" && value != null && !isNaN(value)){
			 value = Number(value);
		} 
		//isNaN("")返回的是false,isNaN("333")返回的也是false,isNaN('char')为true
		if (value!==""&&!isNaN(value)) {
			value = this.dataFormat ? dojo.number.format(value, {
				pattern: this.dataFormat
			}) : value;
		}
		return value;		
    },
	
	
    /**
     * @summary
     * 		根据dataFormat的值还原成value值
     * @param:
     * 		{string} value 要解析的字符
     * @return：
     * 		{number}
     */
    parse: function(value){
		var v=this.dataFormat?dojo.number.parse(value,{pattern:this.dataFormat}):value;
		return String(v)=="NaN" ? value : v ;		
    }
});