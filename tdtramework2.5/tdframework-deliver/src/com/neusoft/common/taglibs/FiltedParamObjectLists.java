package com.neusoft.common.taglibs;

/**
����������������. taglib
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
	
	////���е�����//
	private PageContext pageContext;		//ҳ��������
	private Tag parent;						//����ǩ
	
	////���������//
	private String id;			//ѡ�еı�ʶ
	private String paramId;
	private int ifAll; 		//�Ƿ���ȫ����
	private int optionFlag; 		//�Ƿ���ȫ����
	private String tagName;	//��ǩ������
	private int tabs;		//�ƽ�����tab
	private ParamObjectCollection paramObjectCollection=null;	//���ݽ����
	
	private String city_code=null;		// ����Ա����
	private String account=null;		// ����Ա�ʻ�
	private String onkeydown=null;
	private String onchange=null;
	private String onclick=null;
	private int param_role_id=0;		// ����Ա������ɫ
	
//	private static final SysLog sysLog = SysLog.getInstance(new Long(40));
	
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
	 * ����onkeydown����
	 */
	public void setOnkeydown(String onkeydown) {
		this.onkeydown = onkeydown;
	}
	
	/**
	 * ��ȡonkeydown����
	 */
	public String getOnkeydown() {
		return this.onkeydown;
	}
	
	/**
	 * ����onchange����
	 */
	public void setOnchange(String onchange) {
		this.onchange = onchange;
	}
	
	/**
	 * ��ȡonchange����
	 */
	public String getOnchange() {
		return this.onchange;
	}
	
	/**
	 * ����onchange����
	 */
	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}
	
	/**
	 * ��ȡonclick����
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
	public void setParamId(String paramId){
		this.paramId = paramId;	
	}

	/**
	��ȡѡ�е���Ŀ
	*/
	public String getParamId(){
		return this.paramId;	
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
		
		//�����ƽ���tabs
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
		//����ȫ��ѡ��
		if(this.getIfAll()==1){
			ret.append(str_tab).append("	").append("<option value='all'>\n");

			ret.append(str_tab).append("		").append("<caption>ȫ��</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		if(this.getIfAll()==2){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		//����ȫ��ѡ��
		if(this.optionFlag ==1 ){
			ret.append(str_tab).append("	").append("<option value='all'>\n");

			ret.append(str_tab).append("		").append("<caption>ȫ��</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.optionFlag == 2){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>��ѡ��</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.optionFlag == 3){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>������</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else{
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		//��������
		if(this.paramObjectCollection==null){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else{

			String table_name = this.paramObjectCollection.getTable_name();
			if(table_name==null||table_name.equals("")){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"FiltedParamObjectLists--doEndTag():���˵Ĳ���Collection����û�����ò�����setTable_name");
				
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
		//������ѡ
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
