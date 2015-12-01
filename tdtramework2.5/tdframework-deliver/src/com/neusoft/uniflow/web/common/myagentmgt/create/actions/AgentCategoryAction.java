/*
 * Created on 2004-11-24
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.uniflow.web.common.myagentmgt.create.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.category.IResource;
import com.neusoft.uniflow.web.common.categorytree.beans.CategoryTree;
import com.neusoft.uniflow.web.common.myagentmgt.create.forms.AgentCategoryForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class AgentCategoryAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession();
		AgentCategoryForm handlerForm = (AgentCategoryForm) form;
		String agentid = request.getParameter("agentid");
		if (agentid != null && !agentid.equals("")) {
			handlerForm.setAgentid(agentid);
		}
		agentid = handlerForm.getAgentid();
		String action = handlerForm.getAction();		
		if (action != null && action.equals("")) {// 列出
			try {
				CategoryTree cptree = (CategoryTree) session.getAttribute(handlerForm
						.getAgentid());
				if (cptree != null) {
					if (!handlerForm.getExpand().equals(""))
						cptree.ExpandNode(handlerForm.getExpand());
					if (!handlerForm.getSelect().equals("")){
						String select = handlerForm.getSelect();
						String[] selects = select.split("#");
						String resid = selects[0];
						String restype = selects[1];
						Vector selectItem = cptree.getSelectedItem();						
						if (selectItem.contains(select)){
							selectItem.remove(select);
						}else{
							this.setSelectedItem(selectItem,resid,restype);
							selectItem.add(select);
						}
					}					
				} else {
					cptree = new CategoryTree(handlerForm.getAgentid());
					
				}			
//				session.setAttribute(handlerForm.getAgentid(), cptree);
				handlerForm.setExpand("");
				handlerForm.setSelect("");

			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e,
						"error.invokeinterface"));
				return mapping.findForward("error");
			}

		} else if (action.equals("cancel")){
			session.setAttribute(handlerForm.getAgentid(), null);
			handlerForm.setAction("ok");
		}else{
			handlerForm.setAction("ok");
		}		
		return mapping.findForward("success");
	}
	
	private void setSelectedItem(Vector selectedItem , String selected ,String type)throws Exception{
		ICategoryEntry categorymgr = WorkflowManager.getNWSession().getCategoryEntry();
		if (type.equals("0")){
			Vector categoryChildlist = categorymgr.openNextLevelCategoryList(selected);
			if (categoryChildlist != null && !categoryChildlist.isEmpty()) {
				int size = categoryChildlist.size();
				for (int i = 0; i < size; i++) {
					ICategory category = (ICategory) categoryChildlist.elementAt(i);
					if (selectedItem.contains(category.getId()+"#0"))
						selectedItem.remove(category.getId()+"#0");
					this.setSelectedItem(selectedItem, category.getId(), "0");
				}
			}
			Vector resourcelist=categorymgr.openResourceListFromCategory(selected,0);
			if(resourcelist!=null&&!resourcelist.isEmpty()){
				int size=resourcelist.size();
				for(int i=0;i<size;i++){
					IResource resource = (IResource)resourcelist.elementAt(i);
					if (selectedItem.contains(resource.getId()+"#1"))
						selectedItem.remove(resource.getId()+"#1");
				}
			}
		}
	}
}
