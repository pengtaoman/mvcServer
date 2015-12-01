dojo.provide("unieap.formdemo.NumberValueFormatter");
dojo.require("unieap.form.SimpleFormatter");
dojo.require("dojo.number");

dojo.declare("unieap.formdemo.NumberValueFormatter", unieap.form.SimpleFormatter, {
   
    /**
     * @summary
     * 		格式转换,对形如###,###的格式进行转换
     * @param {number} value
     * @return {string}
     */
    format: function(value){
		//isNaN("")返回的是false,isNaN("333")返回的也是false,isNaN('char')为true
		if (value!=""&&!isNaN(value)) {
			value = this.dataFormat ? dojo.number.format(value, {
				pattern: this.dataFormat
			}) : value;
		}
		return value;		
    },
	
	

    parse: function(value){
		var v=this.dataFormat?dojo.number.parse(value,{pattern:this.dataFormat}):value;
		return String(v)=="NaN" ? value : v ;		
    }
});

