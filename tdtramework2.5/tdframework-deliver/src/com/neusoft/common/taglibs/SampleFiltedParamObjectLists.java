package com.neusoft.common.taglibs;

/**
����������������. taglib
*/

import java.io.IOException;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.Tag;

import com.neusoft.common.ParamObject;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.common.SysMaint;
import com.neusoft.om.omutil.DataParamUtil;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.SysLog;

public class SampleFiltedParamObjectLists implements Tag{
	
	////���е�����//
	private PageContext pageContext;		//ҳ��������
	private Tag parent;						//����ǩ
	
	////���������//
	private String paramId = null;
	private int ifAll = 0; 		//�Ƿ���ȫ����
	private String tagName;	//��ǩ������
	private String styleClass;	//��ǩ����ʽ
	private int tabs = 0;		//�ƽ�����tab
	private ParamObjectCollection paramObjectCollection=null;	//���ݽ����
	
	private String account=null;		// ����Ա�ʻ�
	private String onkeydown=null;
	private String onchange=null;
	private String onclick=null;
	
	private AuthorizeVO vo = null;
	
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
	���ñ�ǩ����
	*/
	public void setStyleClass(String styleClass){
		this.styleClass = styleClass;
	}
	/**
	��ȡ��ǩ����
	*/
	public String getStyleClass(){
		return this.styleClass;	
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
	public SampleFiltedParamObjectLists(){}
	
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
		
		ret.append(str_tab).append("	").append("<select name=\"" + tagName + "\"");
		
		if(styleClass != null && !styleClass.trim().equals("")){
            ret.append(" style=\""+styleClass+"\"");
        }
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
       
		//����ȫ��ѡ��
		if(this.getIfAll() == 1){
			ret.append(str_tab).append("	").append("<option value='all'>\n");
			ret.append(str_tab).append("		").append("<caption>ȫ��</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.getIfAll() == 2){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.getIfAll() == 3){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>��ѡ��</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else if(this.getIfAll() == 4){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>������</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		//��������
		if(this.paramObjectCollection == null){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>������</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
			
			SysLog.writeLogs("om",GlobalParameters.WARN,
				"SampleFiltedParamObjectLists--doEndTag():��ǩ"+this.tagName+"�еĴ������Collection����Ϊ��");
		}else if(this.paramObjectCollection.getRowCount() == 0){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption>������</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
			
			SysLog.writeLogs("om",GlobalParameters.WARN,
				"SampleFiltedParamObjectLists--doEndTag():��ǩ"+this.tagName+"�еĴ������Collection����������");
		}else{
			HttpSession session = pageContext.getSession();
			vo = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
			account = vo.getEmployeeId();
			String table_name = this.paramObjectCollection.getParamTableName();
			if(table_name==null || table_name.equals("")){
				table_name = this.paramObjectCollection.getTable_name();
				SysLog.writeLogs("om",GlobalParameters.ERROR,
						"SampleFiltedParamObjectLists--doEndTag():��ǩ"+this.tagName+"�еĴ������Collection����û�����ù�������Դ����");

			}else{
				try{
					ParamObjectCollection selectColl = DataParamUtil.getInstance().doParamFiltrate(this.paramObjectCollection,account,table_name);
					//���˺���������ʾ,Ĭ����ʾ
		            if(selectColl.getRowCount() == 0){
		                 ret.append(str_tab).append("	").append("<option value=''>\n");
		     			 ret.append(str_tab).append("		").append("<caption>��Ȩ�鿴</caption>\n");
		     			 ret.append(str_tab).append("	").append("</option>");
		     			 
		     			SysLog.writeLogs("om",GlobalParameters.WARN,
		     				"SampleFiltedParamObjectLists--doEndTag():��ǩ"+this.tagName+"�����������˺��û���Ȩ�鿴�κ�������Ϣ");
		            }else{               
		                for(int i=0; i<selectColl.getRowCount(); i++){   
		                	ParamObject vo =(ParamObject)selectColl.getElement(i);
		                    if(paramId!= null && paramId.equals(vo.getIds())){
		                    	ret.append(" <option value=\""+vo.getIds()+"\" selected> \n");
		                    	ret.append("     <caption>"+vo.getName()+"</caption> \n");
		                        ret.append(" </option> \n");
		                        continue;
		                    }
		                    
		                    ret.append("<option value=").append(vo.getIds()).append(">\n");
		                    ret.append("<caption>").append(vo.getName()).append("</caption>\n");
		                    ret.append("</option>\n");
		                }
		            }
				}catch(Exception e){
			           SysLog.writeLogs("DataParamSelectTag",GlobalParameters.ERROR, 
			        		   "SampleFiltedParamObjectLists--doEndTag():���ɱ�ǩ"+this.tagName+"ʱ�����쳣��ԭ��:" + e.getMessage());
		        }
			}	
		}
		ret.append("</select>\n");		
				
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

