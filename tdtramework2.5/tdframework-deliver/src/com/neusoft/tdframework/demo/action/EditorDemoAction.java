package com.neusoft.tdframework.demo.action;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.demo.dao.common.EditorDemoDAO;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.util.RequestUtil;

public class EditorDemoAction extends TDDispatchAction {
	
	public EditorDemoAction() {
		super();
	}

	public ActionForward submit(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		RequestUtil requestUtil = new RequestUtil(request);
		
		String sContent = new String(requestUtil.getParameter("content1"));
		String contentId = new String(requestUtil.getParameter("contentId"));
		
		//System.out.println("编辑内容是 = " + sContent + "+");
		
		EditorDemoDAO dao = (EditorDemoDAO) getServiceFacade("demoEditorDao",actionMapping);
		
		dao.insertHTML(contentId, sContent);
		
		List list = new ArrayList();
		list = dao.getAllHtmls();
		
		Iterator it = list.iterator();
		
		StringBuffer buff = new StringBuffer();
		
		while (it.hasNext()) {
			String item = (String) it.next();
			buff.append("<TR><TD><a href=\"#\" title=\"")
			    .append(item).append("\" target=\"_self\" onclick=\"getContent('").append(item)
				.append("');\"> ").append(item)
				.append("</a> </TD></TR>\n");
		}
		
		response.setContentType("text/xml;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		response.getWriter().write(buff.toString());

		return null;

	}

	public ActionForward init(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		// String sContent = new
		// String(request.getParameter("content1").getBytes("iso8859_1"));
		// System.out.println("编辑内容是++"+sContent+"+");
		EditorDemoDAO dao = (EditorDemoDAO) getServiceFacade("demoEditorDao",actionMapping);
		
		List list = new ArrayList();
		list = dao.getAllHtmls();
		
		request.setAttribute("contentList", list);
		
		return actionMapping.findForward("init");
	}

	public ActionForward render(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		RequestUtil requestUtil = new RequestUtil(request);

		String contentId = requestUtil.getParameter("contentId");
		EditorDemoDAO dao = (EditorDemoDAO) getServiceFacade("demoEditorDao",actionMapping);
		
		String renderContent = dao.getHtml(contentId);
		// renderContent = "'<b>I will be back！</b>'";
		// request.setAttribute("content", renderContent);
		// request.setAttribute("flag", "render");
		
		response.setContentType("text/xml;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");

		response.getWriter().write(renderContent);
		
		return null;
	}
}
