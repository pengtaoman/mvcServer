package com.neusoft.tdframework.demo.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.demo.bo.common.DemoDictionaryBOImpl;
import com.neusoft.tdframework.demo.bo.staffer.OptrMaintBo;
import com.neusoft.tdframework.demo.dao.staffer.EmployeeVO;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.util.RequestUtil;

public class QueryResultProcess extends TDDispatchAction {

	public QueryResultProcess() {
		super();
	}

	/**
	 * 
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward processTab1(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		RequestUtil rq = new RequestUtil(request);
		OptrMaintBo bo = (OptrMaintBo) getServiceFacade("demoOptrMaintBo",actionMapping);
		
		String str = rq.getParameter("name");
		
		try {
			EmployeeVO optr = bo.findOptrById(str);
			request.setAttribute("optr", optr);
		} catch (Exception e) {
			throw new ActionException(e);
		}

		DemoDictionaryBOImpl dict = (DemoDictionaryBOImpl) getServiceFacade("demoDictionaryBO", actionMapping);
		
		request.setAttribute("AreaColl", dict.getAreaColl());
		request.setAttribute("OrgColl", dict.getOrgColl());
		
		return actionMapping.findForward("baseinfo");
	}
}
