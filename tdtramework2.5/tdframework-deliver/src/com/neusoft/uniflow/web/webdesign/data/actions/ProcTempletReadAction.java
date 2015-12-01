package com.neusoft.uniflow.web.webdesign.data.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.category.ICategory;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.category.IResource;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.util.UniflowManager;

public class ProcTempletReadAction extends Action{
	private ServerIO serverIO;
	private HttpServletRequest request;
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		this.request=request;
		
		String id = request.getParameter("categoryID");
		String isGetNode = request.getParameter("isGetNode");
		ServerIO  server = UniflowManager.getServerIO();
		if(null == id){
			NWSession session = server.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector cateVector = cateEntry.openAbsoluteRootCategoryList(ICategoryEntry.PROCESS);
			String rootArrayStr = "";
			for(int i=0;i<cateVector.size();i++){
				String name = ((ICategory)(cateVector.get(i))).getName();
				String iD = ((ICategory)(cateVector.get(i))).getId();
				rootArrayStr += name + "|" + iD + ";";
			}
			if(rootArrayStr != ""){
			   int length = rootArrayStr.length();
			   rootArrayStr = rootArrayStr.substring(0, length-1);
			}
			request.setAttribute("rootArrayStr", rootArrayStr);
			return mapping.findForward("loadRoot");
		}
		if("false".equals(isGetNode)){
			NWSession session = server.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector cateVector = cateEntry.openNextLevelCategoryList(id);
			String rootArrayStr = "";
			for(int i=0;i<cateVector.size();i++){
				String name = ((ICategory)(cateVector.get(i))).getName();
				String iD = ((ICategory)(cateVector.get(i))).getId();
				rootArrayStr += name + "|" + iD + ";";
			}
			if(rootArrayStr != ""){
			   int length = rootArrayStr.length();
			   rootArrayStr = rootArrayStr.substring(0, length-1);
			}
			request.setAttribute("childLevelArray", rootArrayStr);
			return mapping.findForward("loadChild");
			
		}
		try {
			
			NWSession session = server.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector resVector = cateEntry.openResourceListFromCategory(id, ICategoryEntry.PROCESS);
			String procInfoS = "";
			for(int i=0;i<resVector.size();i++){
				IResource procAttr = (IResource)resVector.get(i);
				procInfoS += procAttr.getName()+"|"+procAttr.getId()+";";
			}
			if(procInfoS != ""){
				procInfoS = procInfoS.substring(0,procInfoS.length() -1);
			}
			request.setAttribute("procInfoS", procInfoS.trim());
		} catch (Exception e) {
			e.printStackTrace();			
		}
		return mapping.findForward("loadData");
	}
	
}
