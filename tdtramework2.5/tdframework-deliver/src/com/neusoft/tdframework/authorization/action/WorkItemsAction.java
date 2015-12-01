/*
 * Created on 2004-12-31
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.authorization.WorkFlowInfo;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.log.FrameWorkLogger;
import com.neusoft.tdframework.web.struts.BaseAction;

/**
 * @author Administrator
 *
 * 显示待办工作的条目
 */
public class WorkItemsAction extends BaseAction{
	
	private static final String FORWORD = "showWorkItems";
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseAction#service(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		try {
			WorkFlowInfo workFlowInfo = (WorkFlowInfo)getBaseService().getServiceFacade(WorkFlowInfo.BEAN);
			String workItems = workFlowInfo.getWorkItems();
			request.setAttribute("workItems",workItems);
		} catch (Exception e) {
			FrameWorkLogger.error("获取工作流待办信息失败: " + e.getMessage(),e);
			request.setAttribute("workItems","获取工作流待办信息失败!");
		}
		
		return mapping.findForward(FORWORD);
	}

}
