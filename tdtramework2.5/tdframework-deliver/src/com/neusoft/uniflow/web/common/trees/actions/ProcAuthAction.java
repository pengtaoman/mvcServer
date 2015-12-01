package com.neusoft.uniflow.web.common.trees.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.uniflow.web.common.trees.beans.OrgTree;
import com.neusoft.uniflow.web.common.trees.forms.OneActorSelForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ProcAuthAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		OneActorSelForm actorSelForm = (OneActorSelForm) form;
		NWOrg org = WorkflowManager.getNWOrg();
		int type = actorSelForm.getSelType();
		int treeType=actorSelForm.getTreeType();
		String openallfalg=actorSelForm.getOpenallChild();
		
		String ID = actorSelForm.getExpendRoleID();
		OrgTree tree = (OrgTree) session.getAttribute(SessionManager.ORGTREE);
		if (tree == null){
			tree = new OrgTree(org);
			session.setAttribute(SessionManager.ORGTREE, tree);
		}
		if(treeType==1){
			if(tree.getTreeType()!=1){
				tree.initRoles();
				tree.setTreeType(1);
			}
		}else if(treeType==2){
			if(tree.getTreeType()!=2){
				tree.initnwUnit();
				tree.setTreeType(2);
			}
		}
		if (type == OneActorSelForm.ACTOR_TYPE_USER) {// 显示User列表
			try {
				actorSelForm.setUserList(org.openPersonList(1,
						Integer.MAX_VALUE - 1, NWPerson.PSN_ACCOUNT));
			} catch (Exception e) {
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}
		} else if(type==OneActorSelForm.ACTOR_TYPE_ROLE) {// 显示角色树
			// 从Session中取得Tree，不存在,表示第一次访问Tree，构造RoleTree
			// 并在处理后放入Session
			if (!actorSelForm.getExpendRoleID().equals(""))// 如果页面传来操作是展开，展开该Node
				try {
					tree.expandNode(ID);
				} catch (Exception e) {
					session.setAttribute(SessionManager.ERROR,
							new UniException(e));
					return mapping.findForward("error");
				}
			// if(roleForm.isSelect())
			// 如果页面传来的操作是选中，表示tree中的OpenNodeID
			// 即使页面传来展开，也显示该Node
		}else{
			
			if(openallfalg==null||openallfalg.equals("")){
				openallfalg=OrgTree.openall;
			}
			if(openallfalg.equals(OrgTree.openall)||openallfalg.equals(OrgTree.notopenall))
				tree.setOpenfalg(openallfalg);
			if(!actorSelForm.getExpendRoleID().equals(""))
				try{
					tree.expandNode(ID, 2);
				}catch(Exception e){
					session.setAttribute(SessionManager.ERROR, new UniException(e));
					return mapping.findForward("error");
				}
		}
		{
			tree.setOpenNodeID(actorSelForm.getSelActorID());
		}
		if ("request".equals(mapping.getScope()))
			request.setAttribute(mapping.getAttribute(), actorSelForm);
		else
			session.setAttribute(mapping.getAttribute(), actorSelForm);

		return mapping.findForward("success");
	}
}