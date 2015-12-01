package com.neusoft.uniflow.web.webdesign.data.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.toollistener.ToolCmd.category.LoadResourceFromCategoryCmd;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.webdesign.data.beans.GlobalDataReadForm;
import com.neusoft.workflow.globaldatamodel.GlobalDatasDocument;

public class GlobalDataReadAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String id = request.getParameter("categoryID");
		String isGetNode = request.getParameter("isGetNode");
		ServerIO serverIO = UniflowManager.getServerIO();
		if (null == id) {
			NWSession session = serverIO.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector cateVector = cateEntry
					.openAbsoluteRootCategoryList(ICategoryEntry.VARIABLE);
			String rootArrayStr = "";
			for (int i = 0; i < cateVector.size(); i++) {
				String name = ((ICategory) (cateVector.get(i))).getName();
				String iD = ((ICategory) (cateVector.get(i))).getId();
				rootArrayStr += name + "|" + iD + ";";
			}
			if (rootArrayStr != "") {
				int length = rootArrayStr.length();
				rootArrayStr = rootArrayStr.substring(0, length - 1);
			}
			request.setAttribute("rootArrayStr", rootArrayStr);
			return mapping.findForward("loadRoot");
		}
		if ("false".equals(isGetNode)) {
			NWSession session = serverIO.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector cateVector = cateEntry.openNextLevelCategoryList(id);
			String rootArrayStr = "";
			for (int i = 0; i < cateVector.size(); i++) {
				String name = ((ICategory) (cateVector.get(i))).getName();
				String iD = ((ICategory) (cateVector.get(i))).getId();
				rootArrayStr += name + "|" + iD + ";";
			}
			if (rootArrayStr != "") {
				int length = rootArrayStr.length();
				rootArrayStr = rootArrayStr.substring(0, length - 1);
			}
			request.setAttribute("childLevelArray", rootArrayStr);
			return mapping.findForward("loadChild");

		}
		try {

			GlobalDatasDocument datas = LoadResourceFromCategoryCmd.readDatas(
					serverIO.getWFSession(), id);

			if (datas != null) {
				GlobalDataReadForm dataForm = (GlobalDataReadForm) form;
				dataForm.setDatas(datas);
			} else {
				GlobalDataReadForm dataForm = (GlobalDataReadForm) form;
				dataForm.setDatas(null);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mapping.findForward("loadData");
	}

}
