/*
 * Created on 2004-10-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.taglibs;

/*
*级别参数表的下拉框. taglib
*@author liyj from old framework
*/

import javax.servlet.jsp.tagext.Tag;
import java.io.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.StringUtil;

public class FilterTaglib implements Tag{
	
	////必有的属性//
	private PageContext pageContext;		//页面上下文
	private Tag parent;						//父标签
	
	////传入的属性//
	private String id;			//选中的标识
	private int ifAll; 		//是否有全部项
	private String tagName;	//标签的名称
	private int tabs;		//推进几个tab
	private ParamObjectCollection paramObjectCollection=null;	//数据结果集
	
	private String city_code=null;		// 操作员地市
	private String account=null;		// 操作员帐户
	private int param_role_id=0;		// 操作员参数角色
	
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
	public void setParamId(String id){
		setId(id);	
	}

	/**
	获取选中的项目
	*/
	public String getParamId(){
		return getId();	
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
	public FilterTaglib(){}
	
	/** 
	@exception JspException 
	*/
	public int doStartTag() throws JspException{
	   return 0;
	}
	
	/** 
	 * 返回值的含义
	 * SKIP_BODY:0	doStart返回0,省略正文运算, 直接调用doEnd.
     * EVAL_BODY_INCLUDE:	1	
     * SKIP_PAGE:5				
     * EVAL_PAGE:6	doEnd调用后返回页面.
	 */
	public int doEndTag() throws JspException{
		StringBuffer ret = new StringBuffer("");
		
		//构造推进的tabs
		String str_tab=StringUtil.tabs(this.tabs);		
		
		ret.append(str_tab).append("<").append(tagName).append(">\n");
		
		//构造全部选中
		if(this.getIfAll()==1){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value>all</value>\n");
			ret.append(str_tab).append("		").append("<caption>全部</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		if(this.getIfAll()==2){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value>-200</value>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		//构造数据
		if(this.paramObjectCollection==null){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value></value>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>\n");
		}else{
			//通过权限过滤最终需要显示的数据 需要跟新的权限系统进行整合
//			ParamObjectCollection filtedParamObjectColl = 
//				ParamCommonTool.getFiltedParamObjectCollection(this.paramObjectCollection,this.city_code,this.account,this.param_role_id);
			ParamObjectCollection filtedParamObjectColl = this.paramObjectCollection;
			for(int i=0;i<filtedParamObjectColl.getRowCount();i++){
				ret.append(filtedParamObjectColl.getParamObjectByIndex(i).toString(tabs+1));
			}
		}
				
		//构造所选
		if(this.id != null)
			ret.append(str_tab).append("	").append("<selected>").append(this.id).append("</selected>\n");
		else
			ret.append(str_tab).append("	").append("<selected></selected>\n");
			
		ret.append(str_tab).append("</").append(tagName).append(">\n");
		
		try {
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

