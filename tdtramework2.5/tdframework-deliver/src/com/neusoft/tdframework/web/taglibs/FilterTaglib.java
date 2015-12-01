/*
 * Created on 2004-10-14
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.taglibs;

/*
*����������������. taglib
*@author liyj from old framework
*/

import javax.servlet.jsp.tagext.Tag;
import java.io.*;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.StringUtil;

public class FilterTaglib implements Tag{
	
	////���е�����//
	private PageContext pageContext;		//ҳ��������
	private Tag parent;						//����ǩ
	
	////���������//
	private String id;			//ѡ�еı�ʶ
	private int ifAll; 		//�Ƿ���ȫ����
	private String tagName;	//��ǩ������
	private int tabs;		//�ƽ�����tab
	private ParamObjectCollection paramObjectCollection=null;	//���ݽ����
	
	private String city_code=null;		// ����Ա����
	private String account=null;		// ����Ա�ʻ�
	private int param_role_id=0;		// ����Ա������ɫ
	
	/**
	 * ���ò���Ա����
	 */
	public void setCity_code(String city_code){
		this.city_code = city_code;
	}
	
	/**
	 * ��ȡ����Ա������Ϣ
	 */
	public String getCity_code(){
		return this.city_code;
	}
	
	/**
	 * �����ʻ���Ϣ
	 */
	public void setAccount(String account) {
		this.account = account;
	}
	
	/**
	 * ��ȡ�ʻ���Ϣ
	 */
	public String getAccount() {
		return this.account;
	}
	
	/**
	 * ���ò�����ɫ��Ϣ
	 */
	public void setParam_role_id(int param_role_id) {
		this.param_role_id = param_role_id;
	}
	
	/**
	 * ��ȡ������ɫ��Ϣ
	 */
	public int getParam_role_id() {
		return this.param_role_id;
	}
	
	/**
	����ѡ�е���Ŀ
	*/
	public void setId(String id){
		this.id = id;	
	}
	
	/**
	��ȡѡ�е���Ŀ
	*/
	public String getId(){
		return this.id;	
	}
	
	/**
	����ѡ�е���Ŀ
	*/
	public void setParamId(String id){
		setId(id);	
	}

	/**
	��ȡѡ�е���Ŀ
	*/
	public String getParamId(){
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
	public FilterTaglib(){}
	
	/** 
	@exception JspException 
	*/
	public int doStartTag() throws JspException{
	   return 0;
	}
	
	/** 
	 * ����ֵ�ĺ���
	 * SKIP_BODY:0	doStart����0,ʡ����������, ֱ�ӵ���doEnd.
     * EVAL_BODY_INCLUDE:	1	
     * SKIP_PAGE:5				
     * EVAL_PAGE:6	doEnd���ú󷵻�ҳ��.
	 */
	public int doEndTag() throws JspException{
		StringBuffer ret = new StringBuffer("");
		
		//�����ƽ���tabs
		String str_tab=StringUtil.tabs(this.tabs);		
		
		ret.append(str_tab).append("<").append(tagName).append(">\n");
		
		//����ȫ��ѡ��
		if(this.getIfAll()==1){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value>all</value>\n");
			ret.append(str_tab).append("		").append("<caption>ȫ��</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		if(this.getIfAll()==2){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value>-200</value>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		//��������
		if(this.paramObjectCollection==null){
			ret.append(str_tab).append("	").append("<option>\n");
			ret.append(str_tab).append("		").append("<value></value>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>\n");
		}else{
			//ͨ��Ȩ�޹���������Ҫ��ʾ������ ��Ҫ���µ�Ȩ��ϵͳ��������
//			ParamObjectCollection filtedParamObjectColl = 
//				ParamCommonTool.getFiltedParamObjectCollection(this.paramObjectCollection,this.city_code,this.account,this.param_role_id);
			ParamObjectCollection filtedParamObjectColl = this.paramObjectCollection;
			for(int i=0;i<filtedParamObjectColl.getRowCount();i++){
				ret.append(filtedParamObjectColl.getParamObjectByIndex(i).toString(tabs+1));
			}
		}
				
		//������ѡ
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

