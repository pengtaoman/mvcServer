/**
 * ҵ��������Ϣ
 * @return
 */
var AccountDataInfo = function(){
	this.accountSubmitObject = new AccountSubmitObject();
};

/**
 * �˻���Ϣ�ύ����
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