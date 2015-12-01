package com.neusoft.common.taglibs;

/**
*被动级别参数表的下拉框. taglib
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
	
	private String paramId;		//选中的标识
	private int ifAll=0; 		//是否有全部项
	private int tabs=0;		//推进几个tab
	
	private String account=null;		// 操作员帐户
	
	private AuthorizeVO vo = null;
	
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
		<br>1: 添加全部选项: value = all. caption = 请选择 </br>
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
	构造函数
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
		//构造推进的tabs
		String str_tab=SysMaint.tabs(this.tabs);		
       
		//构造全部选中
		if(this.getIfAll()==1){
			ret.append(str_tab).append("	").append("<option value='all'>\n");

			ret.append(str_tab).append("		").append("<caption>请选择</caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		if(this.getIfAll()==2){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}
		
		//构造数据
		if(paramObjectCollection==null){
			ret.append(str_tab).append("	").append("<option value=''>\n");
			ret.append(str_tab).append("		").append("<caption></caption>\n");
			ret.append(str_tab).append("	").append("</option>");
		}else{

			String table_name = paramObjectCollection.getTable_name();
			if(table_name==null||table_name.equals("")){
				SysLog.writeLogs("om",GlobalParameters.ERROR,"PassiveFiltedParamObjectLists--doEndTag():过滤的参数Collection对象没有设置参数表setTable_name");
				
			}
			HttpSession session = request.getSession();
			vo = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
			account = vo.getEmployeeId();
			//System.out.println("登陆的员工编号为："+account);
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

