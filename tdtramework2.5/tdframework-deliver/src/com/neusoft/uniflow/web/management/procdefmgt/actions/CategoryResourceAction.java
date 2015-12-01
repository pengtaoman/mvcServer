package com.neusoft.uniflow.web.management.procdefmgt.actions;


 
	import java.util.Vector;

	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;
	import javax.servlet.http.HttpSession;

	import org.apache.struts.action.Action;
	import org.apache.struts.action.ActionForm;
	import org.apache.struts.action.ActionForward;
	import org.apache.struts.action.ActionMapping;

	import com.neusoft.uniflow.api.NWSession;
	import com.neusoft.uniflow.api.def.NWProcDef;
	import com.neusoft.uniflow.api.def.NWProcDefManager;
	import com.neusoft.uniflow.common.NWException;

	import com.neusoft.uniflow.web.common.list.OpenListForm;
	import com.neusoft.uniflow.web.management.procdefmgt.forms.CategoryResourceForm;
	import com.neusoft.uniflow.web.common.list.OpenListParamBean;
	import com.neusoft.uniflow.web.util.CustomHandler;
	import com.neusoft.uniflow.web.util.SessionManager;
	import com.neusoft.uniflow.web.util.UniException;
	import com.neusoft.uniflow.web.util.WorkflowManager;

	public class CategoryResourceAction  extends Action {
		
		public ActionForward execute(ActionMapping mapping, ActionForm form,
				HttpServletRequest request, HttpServletResponse response) throws NWException {
			
			CategoryResourceForm openListForm = (CategoryResourceForm) form;
			 
			HttpSession session = request.getSession();
			final String userID = (String) session
					.getAttribute(SessionManager.BIZ_USERID);
			NWSession nwSession = WorkflowManager.getNWSession();
			NWProcDefManager resourceManager = nwSession.getProcDefManager();
			String parentIdStore=request.getParameter("parentIdStore");
			String deleteId=request.getParameter("deleteId");
			
			if(deleteId!=null&&!deleteId.equals("all")){
				try{
					nwSession.removeProcDef(userID, deleteId, 1);
				}
				catch(NWException e)
				{
					
				}
			}
			
			int countOfPage = openListForm.getCountOfPage();
			if (countOfPage == 0) {
				String custom = (String) session
						.getAttribute(SessionManager.CUSTOMATION);
				String strNumber = CustomHandler.getElements(
						CustomHandler.PREFERENCE_NUMBER, custom);
				countOfPage = Integer.valueOf(strNumber).intValue();
			}
			int pagesCount;
			try {
				int itemsCount =resourceManager.getProcDefNumByClassifiedID(parentIdStore);
				openListForm.setTotal(itemsCount);
				if (itemsCount <= 2) {
					pagesCount = 1;
				} else {
					if (itemsCount % countOfPage == 0) {
						pagesCount = itemsCount / countOfPage;
					} else {
						pagesCount = itemsCount / countOfPage + 1;
					}
				}
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}
			int requestPage = openListForm.getRequestPage();
			if (requestPage > pagesCount) {
				requestPage = pagesCount;
			}

			int startLocation = (requestPage - 1) * countOfPage + 1;
			try {
				Vector list = openList(userID, resourceManager, mapping,parentIdStore, form,
						new OpenListParamBean(openListForm.getOrderBy(),
								openListForm.isAscending(), startLocation,
								countOfPage));
				openListForm.setCountOfPage(countOfPage);
				openListForm.setCurrentPage(requestPage);
				openListForm.setRequestPage(requestPage);
				openListForm.setPagesCount(pagesCount);
				openListForm.setList(list);
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}
			if ("request".equals(mapping.getScope()))
				request.setAttribute(mapping.getAttribute(), openListForm);
			else
				session.setAttribute(mapping.getAttribute(), openListForm);
			return mapping.findForward("success");
		}

		public Vector openList(String userID, NWProcDefManager resourceManager,
				ActionMapping mapping, String resource_id,
				ActionForm form, OpenListParamBean param) throws NWException {
			
			Vector list = resourceManager.openAllProcDefListByCategoryID(userID, param.getStart(),param.getOffset(), param.getOrderBy(),param.isIsAscending(),resource_id);
                     
			if (list.size() > 0) {
				String id = ((NWProcDef) list.elementAt(0)).getID();
				String verName = ((NWProcDef) list.elementAt(0)).getVersionName();
				((OpenListForm) form).setSelectedItem(id);
			}
			return list;
		}
	}

