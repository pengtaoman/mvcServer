/*
 * Created on 2006-12-1
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.bas.subscription.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.bas.log.DssLogBO;
import com.neusoft.tdframework.bas.subscription.assistant.BbsBO;
import com.neusoft.tdframework.bas.subscription.assistant.MailShareResourceBO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.util.RequestUtil;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SubscriptionPowerAction  extends TDDispatchAction {
    public ActionForward getPower(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws ActionException, IOException {
    	RequestUtil requestUtil=new RequestUtil(request);
        StringBuffer result = new StringBuffer();
    	String menuId = requestUtil.getParameter("menuId");
        InteractionObjectFactory factory = InteractionObjectFactory
                .getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("dss");
        BbsBO bbsBO = (BbsBO) factory.getInteractionObject("bbsBO",appContext);
        MailShareResourceBO msrBO = (MailShareResourceBO) factory.getInteractionObject("maiShareResourceBO",
                appContext);

        boolean isForum =true;
        boolean isMail =true;
       try{
            isForum = bbsBO.hasMenuForum(menuId);
            isMail = msrBO.getIfShared(menuId);
        	
        }catch (ServiceException e) {
            SysLog.writeLogs("dss", GlobalParameters.ERROR,
                    "SubscriptionPowerAction--log:" + e.getMessage());
            throw new ActionException(e);
        }
        if(isForum)
        	result.append("isForum");
        else
        	result.append("notForum");
        
        result.append(";");
       	
        if(isMail)
        	result.append("isMail");
        else
        	result.append("notMail");
        	
    	response.getWriter().write(result.toString());
    	return null; 
    }

 }
