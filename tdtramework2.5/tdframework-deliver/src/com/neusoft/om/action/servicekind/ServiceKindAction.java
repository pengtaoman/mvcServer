package com.neusoft.om.action.servicekind;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.ServiceKindBO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.util.RequestUtil;

public class ServiceKindAction extends TDDispatchAction {
	
	public ServiceKindAction(){
		super();
	}
	
	public ActionForward getServiceKind(
			ActionMapping mapping,
			ActionForm form,
			HttpServletRequest request,
			HttpServletResponse response)
    throws ActionException { 
		
        //下拉框
		
		ServiceKindBO serviceKindBO = (ServiceKindBO) getServiceFacade(ServiceKindBO.BEAN);

        RequestUtil requestUtil = new RequestUtil(request);
        //托收行
        String serviceId = NullProcessUtil.nvlToString(requestUtil.getParameter("serviceId"), "");
        
        AuthorizeVO authVO = (AuthorizeVO) request.getSession().getAttribute(
				GlobalParameters.SESSION_INFO);
        
        String areaCode = authVO.getAreaCode();
        int serviceKind =-200;
        try
        {   
        	 serviceKind = serviceKindBO.getServiceKind(serviceId,areaCode);          
            try{
            response.setContentType("text/html;charset=GBK");
            response.getWriter().write(String.valueOf(serviceKind));
            }catch(Exception e){
            	
            }
        }
        catch (ServiceException e)
        {
            SysLog.writeLogs("accountsave", GlobalParameters.ERROR,"BusinessAcceptAction--getServiceKind:" + e.getMessage());
            throw new ActionException(e);
        }
        return null;
	}
	

}
