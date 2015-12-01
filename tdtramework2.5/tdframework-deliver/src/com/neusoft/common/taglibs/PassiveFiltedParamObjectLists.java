package com.neusoft.common.taglibs;

/**
*��������������������. taglib
*/

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.common.SysMaint;
import com.neusoft.om.dao.paramMaint.ParamCommonTool;
import com.neusoft.om.dao.paramMaint.ParamPowerMaint;
import com.neusoft.popedom.ParamPowerInfoCollection;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.log.SysLog;

public class PassiveFiltedParamObjectLists{
	
	private String paramId;		//ѡ�еı�ʶ
	private int ifAll=0; 		//�Ƿ���ȫ����
	private int tabs=0;		//�ƽ�����tab
	
	private String account=null;		// ����Ա�ʻ�
	
	private AuthorizeVO vo = null;
	
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
		<br>1: ���ȫ��ѡ��: value = all. caption = ��ѡ�� </br>
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
	���캯��
	*/
	public PassiveFiltedParamObjectLists(){}
	
	/** 
	 * @param request
	 * @param tagName
	 * @param paramObjectCollection
	 * @return StringBuffer
	 * @exception ActionException 
	*/
	public StringBuffer getPassiveSelectTag(HttpServletRequest request,
			ParamObjectCollection paramObjectCollection) throws ActionException{
		
		StringBuffer ret = new StringBuffer("");
		//�����ƽ���tabs
		String str_tab=SysMaint.tabs(this.tabs);		
       
		//����ȫ��ѡ��
		if(this.getIfAll()==1){
			ret.append(str_tab).append("	").append("<option value='all'>\n");

			ret.append(str_tab).append("		").append("<caption>��ѡ��</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		if(this.getIfAll()==2){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		//��������
		if(paramObjectCollection==null){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else{

			String table_name = paramObjectCollection.getTable_name();
			if(table_name==null||table_name.equals("")){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"PassiveFiltedParamObjectLists--doEndTag():���˵Ĳ���Collection����û�����ò�����setTable_name");
				
			}
			HttpSession session = request.getSession();
			vo = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
			account = vo.getEmployeeId();
			//System.out.println("��½��Ա�����Ϊ��"+account);
			ParamPowerInfoCollection filterInfoCol = ParamPowerMaint.getDataRolePower(account,table_name);
			if(filterInfoCol!=null&&filterInfoCol.getRowCount()!=0){
				ParamCommonTool.filterParamObjectCol(paramObjectCollection,filterInfoCol,table_name);
			}

			ParamObjectCollection filtedParamObjectColl = paramObjectCollection;
			for(int i=0;i<filtedParamObjectColl.getRowCount();i++){
				ret.append(filtedParamObjectColl.getParamObject(i).toString(tabs+1,paramId));
			}
		}		
				
		try {
		   ret.toString();
		}catch(Exception e){
			throw new ActionException(e.getMessage());
		}
		return ret;
	}
}

