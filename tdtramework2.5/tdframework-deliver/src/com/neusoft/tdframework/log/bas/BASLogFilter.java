/*
 * Created on 2006-11-16
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.log.bas;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class BASLogFilter extends TDDispatchAction{
	public BASLogFilter() {
		super();
	}
	/**
	 * 
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward log(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
        String systemId = request.getParameter("systemId");
        String menuId = request.getParameter("menuId");
        String destUrl = request.getParameter("destUrl");
        HttpSession session = request.getSession();
        String visitId = (String) session.getAttribute("visitId");
        InteractionObjectFactory factory = InteractionObjectFactory
                .getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("dss");
        DssLogBO dssLogBO = (DssLogBO) factory.getInteractionObject("dssLogBO",
                appContext);
        AuthorizeVO vo = (AuthorizeVO) session
                .getAttribute(GlobalParameters.SESSION_INFO);
        try {
            if (visitId != null) {
                dssLogBO.doEndVisit(visitId);
            }
            if (menuId != null) {
                session.setAttribute("visitId", dssLogBO.doVisit(vo
                        .getLoginId(), vo.getEmployeeId(), menuId, systemId, 1));
            }
        }
        catch (ServiceException e) {
            SysLog.writeLogs("dss", GlobalParameters.ERROR,
                    "FrameManageAction--log:" + e.getMessage());
            throw new ActionException(e);
        }
        ActionForward af = new ActionForward("/" + destUrl);
        return af;
	}  
	/**
	 * 
	 * @return
	 */
	private int getVisitId()
	{
		return 0;
	}
	/**
	 * 
	 * @return
	 */
	private Date getVisitTime()
	{
		return new Date();
	}



}
