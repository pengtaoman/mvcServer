package com.neusoft.common.taglibs;

/**
级别参数表的下拉框. taglib
*/

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.common.ParamObjectCollection;
import com.neusoft.common.SysMaint;
import com.neusoft.om.dao.paramMaint.ParamCommonTool;
import com.neusoft.om.dao.paramMaint.ParamPowerMaint;
import com.neusoft.popedom.ParamPowerInfoCollection;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;

public class FiltedParamObjectLists implements Tag{
	
	////必有的属性//
	private PageContext pageContext;		//页面上下文
	private Tag parent;						//父标签
	
	////传入的属性//
	private String id;			//选中的标识
	private String paramId;
	private int ifAll; 		//是否有全部项
	private int optionFlag; 		//是否有全部项
	private String tagName;	//标签的名称
	private int tabs;		//推进几个tab
	private ParamObjectCollection paramObjectCollection=null;	//数据结果集
	
	private String city_code=null;		// 操作员地市
	private String account=null;		// 操作员帐户
	private String onkeydown=null;
	private String onchange=null;
	private String onclick=null;
	private int param_role_id=0;		// 操作员参数角色
	
//	private static final SysLog sysLog = SysLog.getInstance(new Long(40));
	
	/**
	 * 设置操作员地市
	 */
	public void setCity_code(String city_code){
		this.city_code = city_code;
	}
	
	/**
	 * 获取操作员地市信息
	 */
	public String getCity_code(){
		return this.city_code;
	}
	
	/**
	 * 设置帐户信息
	 */
	public void setAccount(String account) {
		this.account = account;
	}
	
	/**
	 * 获取帐户信息
	 */
	public String getAccount() {
		return this.account;
	}
	
	/**
	 * 设置onkeydown方法
	 */
	public void setOnkeydown(String onkeydown) {
		this.onkeydown = onkeydown;
	}
	
	/**
	 * 获取onkeydown方法
	 */
	public String getOnkeydown() {
		return this.onkeydown;
	}
	
	/**
	 * 设置onchange方法
	 */
	public void setOnchange(String onchange) {
		this.onchange = onchange;
	}
	
	/**
	 * 获取onchange方法
	 */
	public String getOnchange() {
		return this.onchange;
	}
	
	/**
	 * 设置onchange方法
	 */
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}
	
	/**
	 * 获取onclick方法
	 */
	public String getOnclick() {
		return this.onclick;
	}
	
	/**
	 * @return the optionFlag
	 */
	public int getOptionFlag() {
		return optionFlag;
	}

	/**
	 * @param optionFlag the optionFlag to set
	 */
	public void setOptionFlag(int optionFlag) {
		this.optionFlag = optionFlag;
	}

	/**
	 * 设置参数角色信息
	 */
	public void setParam_role_id(int param_role_id) {
		this.param_role_id = param_role_id;
	}
	
	/**
	 * 获取参数角色信息
	 */
	public int getParam_role_id() {
		return this.param_role_id;
	}
	
	/**
	设置选中的项目
	*/
	public void setId(String id){
		this.id = id;	
	}
	
	/**
	获取选中的项目
	*/
	public String getId(){
		return this.id;	
	}
	
	/**
	设置选中的项目
	*/
	public void setParamId(String paramId){
		this.paramId = paramId;	
	}

	/**
	获取选中的项目
	*/
	public String getParamId(){
		return this.paramId;	
	}
	
	/**
	设置是否有全部的
	@param ifAll 
		<br>0: 不添加任何额外选项 </br>
		<br>1: 添加全部选项: value = all. caption = 全部 </br>
		<br>2: 添加空选项: value = -200. caption = "" </br>
	*/
	public void setIfAll(int ifAll){
		this.ifAll = ifAll;	
	}
	
	/**
	获取是否有全部项目
	*/
	public int getIfAll(){
		return this.ifAll;	
	}
	
	/**
	设置标签名称
	*/
	public void setTagName(String tagName){
		this.tagName = tagName;
	}
	
	/**
	获取标签名称
	*/
	public String getTagName(){
		return this.tagName;	
	}
	
	/**
		几个tab推进
	*/
	public void setTabs(int tabs){
		this.tabs = tabs;	
	}
	
	
	/**
		几个tab推进
	*/
	public int getTabs(){
		return this.tabs;	
	}
	
	/**
	设置参数列表结果集
	*/
	public void setParamObjectCollection(ParamObjectCollection paramObjectColl){
		this.paramObjectCollection = paramObjectColl;	
	}
	
	/**
	获取参数列表结果集
	*/	
	public ParamObjectCollection getParamObjectCollection(){
		return this.paramObjectCollection;	
	}
	
	/**
	构造函数
	*/
	public FiltedParamObjectLists(){}
	
	/** 
	@exception JspException 
	*/
	public int doStartTag() throws JspException{
	   return 0;
	}
	
	/** 
	@exception JspException 
	*/
	public int doEndTag() throws JspException{
		StringBuffer ret = new StringBuffer("");
		
		//构造推进的tabs
		String str_tab=SysMaint.tabs(this.tabs);		
		
//		ret.append("<").append(tagName).append(">\n");
		
		ret.append(str_tab).append("	").append("<select name=\"" + tagName + "\"");
		if(onclick != null && !onclick.trim().equals("")){
            ret.append(" onclick=\""+onclick+"\"");
        }
		if(onchange != null && !onchange.trim().equals("")){
            ret.append(" onchange=\""+onchange+"\"");
        }
        if(onkeydown != null && !onkeydown.trim().equals("")){
            ret.append(" onkeydown=\""+onkeydown+"\"");
        }
        ret.append("> \n");
       /* 
        if(this.id != null){
        	ret.append(str_tab).append("	").append("<option selected value='").append(this.id).append("'>").append(this.id).append("</option>\n");
        	System.out.println(ret.toString());
        }*/
		//构造全部选中
		if(this.getIfAll()==1){
			ret.append(str_tab).append("	").append("<option value='all'>\n");

			ret.append(str_tab).append("		").append("<caption>全部</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		if(this.getIfAll()==2){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		//构造全部选中
		if(this.optionFlag ==1 ){
			ret.append(str_tab).append("	").append("<option value='all'>\n");

			ret.append(str_tab).append("		").append("<caption>全部</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.optionFlag == 2){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>请选择</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.optionFlag == 3){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>不区分</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else{
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		//构造数据
		if(this.paramObjectCollection==null){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else{

			String table_name = this.paramObjectCollection.getTable_name();
			if(table_name==null||table_name.equals("")){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"FiltedParamObjectLists--doEndTag():过滤的参数Collection对象没有设置参数表setTable_name");
				
			}
			ParamPowerInfoCollection filterInfoCol =	ParamPowerMaint.getDataRolePower(account,table_name);
			if(filterInfoCol!=null&&filterInfoCol.getRowCount()!=0){
				ParamCommonTool.filterParamObjectCol(this.paramObjectCollection,filterInfoCol,table_name);
			}
//			System.out.println("first:"+paramId);
			ParamObjectCollection filtedParamObjectColl = this.paramObjectCollection;
			for(int i=0;i<filtedParamObjectColl.getRowCount();i++){
//				System.out.println(paramId);
				ret.append(filtedParamObjectColl.getParamObject(i).toString(tabs+1,paramId));
				//System.out.println(ret.toString());
				//System.out.println(paramId);
			}
		}
		ret.append("</select>\n");		
		//构造所选
		/*
		if(this.id != null){
//			System.out.println(this.id);
			ret.append("</select>\n");
		}else
			ret.append(str_tab).append("	").append("<selected></selected>\n");
		*/	
//		ret.append(str_tab).append("</").append(tagName).append(">\n");
		
		
		try {
		   //System.out.println(ret.toString());
		   pageContext.getOut().write(ret.toString());
		} catch (IOException ioexception) {
		   throw new JspException("IO Error: " + ioexception.getMessage());
		}
		return 6;
	}
	
	/**
	获取父标签
	*/	
	public Tag getParent(){
		return parent;
	}
	
	/** 
	设置父标签
	@param tag 
	*/
	public void setParent(Tag tag){
	   parent = tag;
	}
	
	/**
	释放
	*/
	public void release(){}
	
	/**
	获取页面上下文
	*/
	public PageContext getPageContext(){
	   return pageContext;
	}
	
	/** @param pagecontext */
	public void setPageContext(PageContext pagecontext){
	   pageContext = pagecontext;
	}

}
