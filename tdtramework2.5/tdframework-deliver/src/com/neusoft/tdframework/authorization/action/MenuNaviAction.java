package com.neusoft.tdframework.authorization.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import net.sf.json.JSONArray;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.authorization.FrameMenuColl;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;



public class MenuNaviAction extends TDDispatchAction{
	
	
//    public ActionForward getCollTypeSelect(ActionMapping mapping, ActionForm form,
//            HttpServletRequest request, HttpServletResponse response) throws ActionException{
	public ActionForward getMenuNavigation(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException, IOException {    	
		//SysLog.writeLogs("om",GlobalParameters.ERROR, "#####################   MenuNaviAction  ########################");
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String employeeId = authorizeVO.getEmployeeId();
        String systemId = request.getParameter("systemId");
		//AuthorizeBO authorizeBO = (AuthorizeBO) getServiceFacade(AuthorizeBO.BEAN, "om");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
		.getInteractionObject(AuthorizeFactory.BEAN, appContext);
		AuthorizeBO authorizeBO = authorizeFactory.getAuthorizeBO(request);
		JSONArray jsonArr = new JSONArray();
		try {
			List list = authorizeBO.getMenuNavigation(systemId, employeeId);
			//List list = frameMenuColl.getList();
			for (int i = 0; i < list.size(); i++) {
				jsonArr.add(list.get(i));
			}
			String ans = jsonArr.toString();
	    	//SysLog.writeLogs("om",GlobalParameters.ERROR, "###########   " + ans);
			response.setContentType("text/html; charset=GBK");
			PrintWriter out = response.getWriter();
			out.println(ans);
		}catch(ServiceException e){
            log.error("PlanGatherAction-initOperation-1:", e);
            throw new ActionException(e);
        }catch(Exception e){
            log.error("PlanGatherAction-initOperation-2:", e);
            throw new ActionException(e);
        }
        return null;
    }
	
	public ActionForward getSystemNavigation(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException, IOException {    	
		//SysLog.writeLogs("om",GlobalParameters.ERROR, "#####################   SystemNaviAction  ########################");
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String employeeId = authorizeVO.getEmployeeId();

		//AuthorizeBO authorizeBO = (AuthorizeBO) getServiceFacade(AuthorizeBO.BEAN, "om");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
		.getInteractionObject(AuthorizeFactory.BEAN, appContext);
		AuthorizeBO authorizeBO = authorizeFactory.getAuthorizeBO(request);
		JSONArray jsonArr = new JSONArray();
		try {
			List list = authorizeBO.getSystemNavigation(employeeId);
			//List list = frameMenuColl.getList();
			for (int i = 0; i < list.size(); i++) {
				jsonArr.add(list.get(i));
			}
			String ans = jsonArr.toString();
	    	//SysLog.writeLogs("om",GlobalParameters.ERROR, "###########   " + ans);
			response.setContentType("text/html; charset=GBK");
			PrintWriter out = response.getWriter();
			out.println(ans);
		}catch(ServiceException e){
            log.error("PlanGatherAction-initOperation-1:", e);
            throw new ActionException(e);
        }catch(Exception e){
            log.error("PlanGatherAction-initOperation-2:", e);
            throw new ActionException(e);
        }
        return null;
    }
	
	
	public ActionForward getMenuForSearch(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException, IOException {    	
		//SysLog.writeLogs("om",GlobalParameters.ERROR, "#####################   MenuNaviAction  ########################");
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String employeeId = authorizeVO.getEmployeeId();
		String searchKey = request.getParameter("searchKey").trim();
		//AuthorizeBO authorizeBO = (AuthorizeBO) getServiceFacade(AuthorizeBO.BEAN, "om");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");
		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
		.getInteractionObject(AuthorizeFactory.BEAN, appContext);
		AuthorizeBO authorizeBO = authorizeFactory.getAuthorizeBO(request);
		JSONArray jsonArr = new JSONArray();
		try {
			List list = authorizeBO.getMenuForSearch(employeeId, searchKey);
			//List list = frameMenuColl.getList();
			for (int i = 0; i < list.size(); i++) {
				jsonArr.add(list.get(i));
			}
			String ans = jsonArr.toString();
	    	//SysLog.writeLogs("om",GlobalParameters.ERROR, "###########   " + ans);
			response.setContentType("text/html; charset=GBK");
			PrintWriter out = response.getWriter();
			out.println(ans);
		}catch(ServiceException e){
            log.error("PlanGatherAction-initOperation-1:", e);
            throw new ActionException(e);
        }catch(Exception e){
            log.error("PlanGatherAction-initOperation-2:", e);
            throw new ActionException(e);
        }
        return null;
    }
    
}
