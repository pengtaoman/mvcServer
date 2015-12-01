package com.neusoft.uniflow.web.common.workdayorgtree.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.uniflow.web.common.workdayorgtree.beans.WorkdayOrgTree;
import com.neusoft.uniflow.web.common.workdayorgtree.forms.WorkDayOrgTreeForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class WorkDayOrgTreeAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
	//	WorkDayOrgTreeForm workdayorgtreeform = (WorkDayOrgTreeForm) form;
		//NWSession nwsession = WorkflowManager.getNWSession();
	//	HttpSession session=request.getSession();
		//NWCalendarManager calendarmanager = nwsession.getCalendarManager();
	//	NWOrg org = WorkflowManager.getNWOrg();
		//Vector workdayCategoryList = new Vector();
	//	String expandNodeId=workdayorgtreeform.getExpandNodeId();
		/*Vector categorylist = calendarmanager.getCategoryList();
		if (categorylist != null && !categorylist.isEmpty()) {
			for (int i = 0, size = categorylist.size(); i < size; i++) {
				String unitId = (String) categorylist.elementAt(i);
				if (unitId.equals("system") || unitId.equals("SYSTEM")) {
					UnitBean unitBean = new UnitBean();
					unitBean.setId("system");
					unitBean.setName("system");
					workdayCategoryList.addElement(unitBean);

				} else {
					NWUnit nwunit = org.getUnit(unitId);
					if (nwunit != null) {
						UnitBean unitBean = new UnitBean();
						unitBean.setId(nwunit.getID());
						unitBean.setName(nwunit.getName());
						workdayCategoryList.addElement(unitBean);
					}
				}
			}
		}*/
		//workdayorgtreeform.setWorkdayCategoryList(workdayCategoryList);
	//	WorkdayOrgTree workdayOrgtree=(WorkdayOrgTree)session.getAttribute(SessionManager.workdayOrgTree);
//		if(workdayOrgtree==null){
//			workdayOrgtree=new WorkdayOrgTree(org);
//			workdayOrgtree.initTree();
//			session.setAttribute(SessionManager.workdayOrgTree, workdayOrgtree);
//		}
//		if(expandNodeId!=null&&!expandNodeId.equals(""))
//			workdayOrgtree.expandNode(expandNodeId);
		return mapping.findForward("sucess");
	}
}
