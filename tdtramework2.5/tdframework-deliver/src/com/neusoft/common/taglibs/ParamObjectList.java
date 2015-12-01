package com.neusoft.common.taglibs;

/**
����������������. taglib
*/

import javax.servlet.jsp.tagext.Tag;
import java.io.*;
import java.util.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import com.neusoft.common.*;

public class ParamObjectList implements Tag{
	
	////���е�����//
	private PageContext pageContext;		//ҳ��������
	private Tag parent;						//����ǩ
	
	////���������//
	private int id;			//ѡ�еı�ʶ
	private int ifAll; 		//�Ƿ���ȫ����
	private String tagName;	//��ǩ������
	private int tabs;		//�ƽ�����tab
	private ParamObjectCollection paramObjectCollection=null;	//���ݽ����
	
	/**
	����ѡ�е���Ŀ
	*/
	public void setId(int id){
		this.id = id;	
	}
	
	/**
	��ȡѡ�е���Ŀ
	*/
	public int getId(){
		return this.id;	
	}
	
	/**
	����ѡ�е���Ŀ
	*/
	public void setParamId(int id){
		setId(id);	
	}

	/**
	��ȡѡ�е���Ŀ
	*/
	public int getParamId(){
		return getId();	
	}
	
	/**
	�����Ƿ���ȫ����
	@param ifAll 
		<br>0: ������κζ���ѡ�� </br>
		<br>1: ���ȫ��ѡ��: value = all. caption = ȫ�� </br>
		<br>2: ��ӿ�ѡ��: value = -200. caption = "" </br>
	*/
	public void setIfAll(int ifAll){
		this.ifAll = ifAll;	
	}
	
	/**
	��ȡ�Ƿ���ȫ����Ŀ
	*/
	public int getIfAll(){
		return this.ifAll;	
	}
	
	/**
	���ñ�ǩ����
	*/
	public void setTagName(String tagName){
		this.tagName = tagName;
	}
	
	/**
	��ȡ��ǩ����
	*/
	public String getTagName(){
		return this.tagName;	
	}
	
	/**
		����tab�ƽ�
	*/
	public void setTabs(int tabs){
		this.tabs = tabs;	
	}
	
	
	/**
		����tab�ƽ�
	*/
	public int getTabs(){
		return this.tabs;	
	}
	
	/**
	���ò����б�����
	*/
	public void setParamObjectCollection(ParamObjectCollection paramObjectColl){
		this.paramObjectCollection = paramObjectColl;	
	}
	
	/**
	��ȡ�����б�����
	*/	
	public ParamObjectCollection getParamObjectCollection(){
		return this.paramObjectCollection;	
	}
	
	/**
	���캯��
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
		
		//�����ƽ���tabs
		String str_tab=SysMaint.tabs(this.tabs);		
		
		ret.append("<").append(tagName).append(">\n");
		
		//����ȫ��ѡ��
		if(this.getIfAll()==1){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value>all</value>\n");
			ret.append(str_tab).append("		").append("<caption>ȫ��</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		if(this.getIfAll()==2){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value></value>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		//��������
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
				
		//������ѡ
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
	��ȡ����ǩ
	*/	
	public Tag getParent(){
		return parent;
	}
	
	/** 
	���ø���ǩ
	@param tag 
	*/
	public void setParent(Tag tag){
	   parent = tag;
	}
	
	/**
	�ͷ�
	*/
	public void release(){}
	
	/**
	��ȡҳ��������
	*/
	public PageContext getPageContext(){
	   return pageContext;
	}
	
	/** @param pagecontext */
	public void setPageContext(PageContext pagecontext){
	   pageContext = pagecontext;
	}

}
