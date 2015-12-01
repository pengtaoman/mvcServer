package com.neusoft.uniflow.web.webdesign.data.actions;

import java.io.InputStream;
import java.io.PrintWriter;
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
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.toollistener.ToolCmd.category.AddResourceAndToCategoryCmd;
import com.neusoft.uniflow.web.toollistener.ToolCmd.category.LoadResourceFromCategoryCmd;
import com.neusoft.uniflow.web.toollistener.ToolCmd.category.RemoveResourceFromCategoryCmd;
import com.neusoft.uniflow.web.util.UniflowManager;

public abstract class GlobalElementAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String categoryID = request.getParameter("categoryID");
		String command = request.getParameter("command");
		ServerIO  server = UniflowManager.getServerIO();
        response.setContentType("text/html;charset=UTF-8");
		if("getRoot".equals(command)){
			PrintWriter out = response.getWriter();
			NWSession session = server.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector cateVector = cateEntry.openAbsoluteRootCategoryList(getType());
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
			out.print(rootArrayStr);
			return null;
		}
		else if("getNextLevel".equals(command)){
			PrintWriter out = response.getWriter();
			NWSession session = server.getWFSession();
			ICategoryEntry cateEntry = session.getCategoryEntry();
			Vector cateVector = cateEntry.openNextLevelCategoryList(categoryID);
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
			out.print(rootArrayStr);
			return null;
		}
		else if("getElement".equals(command)){
			LoadResourceFromCategoryCmd cmd = new LoadResourceFromCategoryCmd();
			cmd.loadResourceToResponseByCategory(categoryID, getType(), response);	
			return null;
		}
		else if("del".equals(command)){
			PrintWriter out = response.getWriter();
			String actAndCategoryIDs = request.getParameter("actAndCategoryIDs");
			String classified = String.valueOf(getType());
			RemoveResourceFromCategoryCmd removeResCommand = new RemoveResourceFromCategoryCmd();
			String[] actAndCategoryID = {actAndCategoryIDs};
			if(actAndCategoryIDs.indexOf(";") != -1)
				actAndCategoryID = actAndCategoryIDs.split(";");
			int length = actAndCategoryID.length;
			try{
				for(int i=0 ;i<length ;i++)
				{
					String[] ids = actAndCategoryID[i].split(",");
					String resourceID = ids[0];
					String categoryId = ids[1];
					removeResCommand.executeRemoveResourceFromCategory(classified, categoryId, resourceID, "true", response);
				}
				out.print("true");
			}catch(Exception e)
			{
				e.printStackTrace();
				out.print("false");
			}
			return null;
		}
		else if("add".equals(command)){
			PrintWriter out = response.getWriter();
			try{
				String resourceID = request.getParameter("actID");
				InputStream in = request.getInputStream();
				AddResourceAndToCategoryCmd addCmd = new AddResourceAndToCategoryCmd();
				addCmd.executeAdd(resourceID, categoryID, getType(), in);
				out.print("true");
				return null;
			}catch(Exception e){
				e.printStackTrace();
				out.print("false");
				throw e;
			}
		}
		else if("deploy".equals(command)){
			InputStream in = request.getInputStream();
			AddResourceAndToCategoryCmd addCmd = new AddResourceAndToCategoryCmd();
			addCmd.addResource(getType(), in);
			return null;
		}
		return mapping.findForward("error");
	}
	
	/**
	 * 由于flex的httpservice请求是异步的，所以对于每种全局元素都要有唯一的action
	 * @return
	 */
	public abstract int getType();
}
