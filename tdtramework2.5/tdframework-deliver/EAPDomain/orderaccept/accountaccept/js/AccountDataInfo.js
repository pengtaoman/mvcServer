/**
 * 业务数据信息
 * @return
 */
var AccountDataInfo = function(){
	this.accountSubmitObject = new AccountSubmitObject();
};

/**
 * 账户信息提交对象
 * @return
 */
var AccountSubmitObject = function(){
	this.builder=new XmlBuilder();
	this.xmlString = "";
};

AccountSubmitObject.prototype={
	build:function($){
		this.xmlString = this.builder.buildByIndex("accouInfoVO","accouInfoVO",$,{});
		return this.xmlString;
	},
	buildSign:function(){
		this.xmlString = this.builder.build("accouInfoVO","accouInfoVO",{});
		return this.xmlString;
	}
};