package com.neusoft.common.taglibs;

/**
级别参数表的下拉框. taglib
*/

import javax.servlet.jsp.tagext.Tag;
import java.io.*;
import java.util.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import com.neusoft.common.*;

public class ParamObjectList implements Tag{
	
	////必有的属性//
	private PageContext pageContext;		//页面上下文
	private Tag parent;						//父标签
	
	////传入的属性//
	private int id;			//选中的标识
	private int ifAll; 		//是否有全部项
	private String tagName;	//标签的名称
	private int tabs;		//推进几个tab
	private ParamObjectCollection paramObjectCollection=null;	//数据结果集
	
	/**
	设置选中的项目
	*/
	public void setId(int id){
		this.id = id;	
	}
	
	/**
	获取选中的项目
	*/
	public int getId(){
		return this.id;	
	}
	
	/**
	设置选中的项目
	*/
	public void setParamId(int id){
		setId(id);	
	}

	/**
	获取选中的项目
	*/
	public int getParamId(){
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
	public ParamObjectList(){}
	
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
		
		ret.append("<").append(tagName).append(">\n");
		
		//构造全部选中
		if(this.getIfAll()==1){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value>all</value>\n");
			ret.append(str_tab).append("		").append("<caption>全部</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		if(this.getIfAll()==2){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value></value>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		//构造数据
		if(this.paramObjectCollection==null){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value></value>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else{
			for(int i=0;i<this.paramObjectCollection.getRowCount();i++){
				ret.append(this.paramObjectCollection.getParamObject(i).toString(tabs+1));
			}
		}
				
		//构造所选
		ret.append(str_tab).append("	").append("<selected>").append(this.id).append("</selected>\n");
		
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
