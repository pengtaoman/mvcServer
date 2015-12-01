package com.neusoft.om.common.partRefresh;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.common.commonBO.OmCommon;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.demo.bo.common.RoleListBo;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.tdframework.web.taglibs.BaseSelectTag;
import com.neusoft.unieap.comp.datawindow.OptionCell;
import com.neusoft.unieap.taglib.combobox.ComboData;
import com.neusoft.unieap.taglib.listbox.ListBoxUtil;
import com.neusoft.unieap.util.RequestUtil;
import com.neusoft.unieap.util.ResponseUtil;

public class PartRefresh extends TDDispatchAction{
	
	public ActionForward getDealerInfo(ActionMapping actionMapping,ActionForm actionForm,HttpServletRequest request,HttpServletResponse response) throws IOException{
    	RequestUtil requestUtil=new RequestUtil(request);
        //ResponseUtil responseUtil=new ResponseUtil(response);
    	response.setContentType("text/xml;charset=UTF-8");
    	
    	String dealerName = "";
    	String value = requestUtil.getParameter("dealerId");
    	OmCommon bo =(OmCommon)getServiceFacade("omCommon",actionMapping);
    	try{
    		if(value!=null && !value.trim().equals("")){
    			dealerName = bo.getDealerNameInfo(value);
    		}
    	}catch(ServiceException e){
    		 SysLog.writeLogs("om",GlobalParameters.ERROR,"PartRefresh--getDealerInfo:"+e.getMessage());
    	}
    	StringBuffer result = new StringBuffer();
    	result.append("<input type='text' id='DealerIdValue' name='DealerIdValue' maxlength='15' style='width:160px' value='").append(dealerName).append("'/>");
    	response.getWriter().write(result.toString());
    	return null; 
    }
}
