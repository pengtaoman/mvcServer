/*
 * Created on 2004-12-13
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.authorization.action;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.appcontainer.AppContainerDAO;
import com.neusoft.tdframework.authorization.AuthorizeBO;
import com.neusoft.tdframework.authorization.AuthorizeFactory;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.authorization.SystemColl;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**brief description
 * <p>Date       : 2006-4-19</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author zhangjn
 * @version 1.0
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		   修改人			修改原因   			</p>
 * <p>   1      2006-4-19  zhangjn                        </p>
 */
public class TopAuthorizationAction extends TDDispatchAction{

	public TopAuthorizationAction() {
		super();
	}
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward common(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		authorizeVO.getWorkNo();
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");

		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
		.getInteractionObject(AuthorizeFactory.BEAN, appContext);
		AuthorizeBO authorizeBO = authorizeFactory.getAuthorizeBO(request);
		//AuthorizeBO authorizeBO = (AuthorizeBO)getBaseService().getServiceFacade(AuthorizeBO.BEAN);
		SystemColl sysColl = null;
		AppContainerDAO dao = (AppContainerDAO)getServiceFacade("containerDAO");
		List appNames = dao.getAppNames();
		try {
			sysColl = (SystemColl)authorizeBO.getSystemInfo(authorizeVO.getEmployeeId());
		} catch (ServiceException e) {
			//e.printStackTrace();
			SysLog.writeLogs("tdframework ",GlobalParameters.ERROR,"TopAuthorizationAction--common:"+e.getMessage());
			throw new ActionException(e.getMessage());
		}
		
		request.setAttribute("appNames",createRemoteRemoveUrl(appNames,request));
		request.setAttribute("sysColl",sysColl);
		ActionForward forword = mapping.findForward("commonTop"); 
		return forword;
	}
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward pbx(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		authorizeVO.getWorkNo();
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("");

		AuthorizeFactory authorizeFactory = (AuthorizeFactory) factory
		.getInteractionObject(AuthorizeFactory.BEAN, appContext);
		AuthorizeBO authorizeBO = authorizeFactory.getAuthorizeBO(request);
		//AuthorizeBO authorizeBO = (AuthorizeBO)getBaseService().getServiceFacade(AuthorizeBO.BEAN);
		SystemColl sysColl = null;
		try {
			sysColl = (SystemColl)authorizeBO.getSystemInfo(authorizeVO.getEmployeeId());
		} catch (ServiceException e) {
			e.printStackTrace();
			throw new ActionException(e.getMessage());
		}
		
		request.setAttribute("sysColl",sysColl);
		ActionForward forword = mapping.findForward("pbxTop"); 
		return forword;
	}
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward initNotifyArea(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		ArrayList msgList = new ArrayList();
		Hashtable msg = new Hashtable();
		msg.put("notifyId","1");
		msg.put("notifyTitle","旅顺");
		msgList.add(msg);
		Hashtable msg2 = new Hashtable();
		msg2.put("notifyId","2");
		msg2.put("notifyTitle","沙河口");
		msgList.add(msg2);
		Hashtable msg3 = new Hashtable();
		msg3.put("notifyId","3");
		msg3.put("notifyTitle","中山");
		msgList.add(msg3);
		Hashtable msg4 = new Hashtable();
		msg4.put("notifyId","4");
		msg4.put("notifyTitle","西岗");
		msgList.add(msg4);
		Hashtable msg5 = new Hashtable();
		msg5.put("notifyId","5");
		msg5.put("notifyTitle","甘井子");
		msgList.add(msg5);
		request.setAttribute("msgList",msgList);
		ActionForward forword = mapping.findForward("warnMsg"); 
		return forword;
	}
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward popNotifyPage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		Hashtable pageContent = new Hashtable();
		String notifyId = (String)request.getParameter("notifyId");
		if(notifyId.equals("1"))
		{
			pageContent.put("name","1");
			pageContent.put("title","旅顺");
		}
		else if(notifyId.equals("2"))
		{
			pageContent.put("name","2");
			pageContent.put("title","沙河口");
		}
		else if(notifyId.equals("3"))
		{
			pageContent.put("name","3");
			pageContent.put("title","中山");
		}
		else if(notifyId.equals("4"))
		{
			pageContent.put("name","4");
			pageContent.put("title","西岗");
		}
		else if(notifyId.equals("5"))
		{
			pageContent.put("name","5");
			pageContent.put("title","甘井子");
		}
		request.setAttribute("notifyId",notifyId);
		request.setAttribute("pageContent",pageContent);
		ActionForward forword = mapping.findForward("notifyPage"); 
		return forword;
	}
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward confirmNotifyPage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		ArrayList msgList = new ArrayList();
		Hashtable msg = new Hashtable();
		String confirmedId = (String)request.getParameter("notifyId");
		if(!confirmedId.equals("1"))
		{
			msg.put("notifyId","1");
			msg.put("notifyTitle","旅顺");
			msgList.add(msg);
		}
		if(!confirmedId.equals("2"))
		{
			Hashtable msg2 = new Hashtable();
			msg2.put("notifyId","2");
			msg2.put("notifyTitle","沙河口");
			msgList.add(msg2);
		}
		if(!confirmedId.equals("3"))
		{
			Hashtable msg3 = new Hashtable();
			msg3.put("notifyId","3");
			msg3.put("notifyTitle","中山");
			msgList.add(msg3);
		}
		if(!confirmedId.equals("4"))
		{
			Hashtable msg4 = new Hashtable();
			msg4.put("notifyId","4");
			msg4.put("notifyTitle","西岗");
			msgList.add(msg4);
		}
		if(!confirmedId.equals("5"))
		{
			Hashtable msg5 = new Hashtable();
			msg5.put("notifyId","5");
			msg5.put("notifyTitle","甘井子");
			msgList.add(msg5);
		}
		request.setAttribute("msgList",msgList);
		ActionForward forword = mapping.findForward("warnMsg"); 
		return forword;
	}
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward inCommingCall(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException 
	{
		Hashtable content = new Hashtable();
		content.put("mainCallNo","刘尔承");
		content.put("calledNo","张家宁");
		request.setAttribute("pageContent",content);
		ActionForward forward = mapping.findForward("userInfo"); 
		return forward;
	}
	/**
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward statusInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException 
	{
		Hashtable content = new Hashtable();
		content.put("mainCallNo","刘尔承");
		content.put("calledNo","张家宁");
		request.setAttribute("pageContent",content);
		ActionForward forward = mapping.findForward("statusInfo"); 
		return forward;
	}
	
	private List createRemoteRemoveUrl(List appNames,HttpServletRequest request){
		List list = new ArrayList();		
		int port = request.getServerPort();
		StringBuffer hostPath = new StringBuffer();
		hostPath.append(request.getScheme()).append("://").append(request.getServerName()).append(":").append(port);
		Iterator it = appNames.iterator();
		while(it.hasNext()){
			String appName = (String)it.next();
			String urlStr = "";
			if(appName.indexOf("http://")>-1){
				urlStr = appName+"login.do?method=logout";
			}else{
				urlStr = hostPath.toString()+appName+"login.do?method=logout";
				list.add(urlStr);
			}
		}
		
		return list;
	}
	
}
