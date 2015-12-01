package com.neusoft.uniflow.web.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.monitor.procdef.beans.SVGCreateFactory;

public class SVGPrintFactory extends HttpServlet {
	private static final long serialVersionUID = 1234567000;

	public final static String tab = System.getProperty("line.separator");

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession httpsession = request.getSession();
		NWSession session = WorkflowManager.getSysNWSession();
		String path = WorkflowManager.getWorkflowPath();
		String pathimg = WorkflowManager.getWorkflowStylePath()+ "/style1/process_img/";
		String oldpathimg = WorkflowManager.getWorkflowStylePath()+ "/style1/process_old_img/";
		String print = request.getParameter("print");
		StringBuffer svg = new StringBuffer();
		SVGCreateFactory processCreate = SVGCreateFactory.getInstance();
		com.neusoft.uniflow.web.monitor.procinst.beans.SVGCreateFactory procinstCreate = com.neusoft.uniflow.web.monitor.procinst.beans.SVGCreateFactory.getInstance();
		com.neusoft.uniflow.web.monitor.procinst.beans.OldSVGCreateFactory oldprocinstCreate = com.neusoft.uniflow.web.monitor.procinst.beans.OldSVGCreateFactory.getInstance();
		com.neusoft.uniflow.web.authorization.uniform.beans.SVGCreateFactory formProcessCreate = com.neusoft.uniflow.web.authorization.uniform.beans.SVGCreateFactory.getInstance();
		com.neusoft.uniflow.web.monitor.procdef.beans.OldSVGCreateFactory oldprocessCreate = com.neusoft.uniflow.web.monitor.procdef.beans.OldSVGCreateFactory.getInstance();
		com.neusoft.uniflow.web.authorization.uniform.beans.OldSVGCreateFactory oldformProcessCreate = com.neusoft.uniflow.web.authorization.uniform.beans.OldSVGCreateFactory.getInstance();

		//uniresource
		//com.neusoft.uniflow.web.authorization.uniresource.beans.SVGCreateFactory uniresourceProcessCreate = com.neusoft.uniflow.web.authorization.uniresource.beans.SVGCreateFactory.getInstance();
		//com.neusoft.uniflow.web.authorization.uniresource.beans.OldSVGCreateFactory oldUniresourceProcessCreate = com.neusoft.uniflow.web.authorization.uniresource.beans.OldSVGCreateFactory.getInstance();
		//paricipant
		com.neusoft.uniflow.web.participant.beans.SVGCreateFactory participantProcessCreate = com.neusoft.uniflow.web.participant.beans.SVGCreateFactory.getInstance();
		com.neusoft.uniflow.web.participant.beans.OldSVGCreateFactory oldParticipantProcessCreate = com.neusoft.uniflow.web.participant.beans.OldSVGCreateFactory.getInstance();

		
		svg.append(this.getSVGHeader());
		try{
			if (print.equals("mprocdef")) {
				svg.append(processCreate.createProcessDefine(request, session,path, pathimg));
			} else if (print.equals("mprocinst")) {
				svg.append(procinstCreate.createProcessDefine(request, session,path, pathimg));
			} else if (print.equals("aprocdef")) {
				svg.append(formProcessCreate.createProcessDefine(httpsession,session, path, pathimg));
			}else if (print.equals("oldmprocinst")) {
				svg.append(oldprocinstCreate.createProcessDefine(request, session,path, oldpathimg));
			}else if (print.equals("oldmprocdef")) {
				svg.append(oldprocessCreate.createProcessDefine(httpsession, session,path, oldpathimg));
			} else if (print.equals("oldaprocdef")) {
				svg.append(oldformProcessCreate.createProcessDefine(httpsession,session, path, oldpathimg));
			//}else if (print.equals("olduniresource")) {
				//svg.append(oldUniresourceProcessCreate.createProcessDefine(httpsession, session,path, oldpathimg));
			//} else if (print.equals("uniresource")) {
				//svg.append(uniresourceProcessCreate.createProcessDefine(httpsession,session, path, pathimg));
			}else if (print.equals("oldmparticipant")) {
				svg.append(oldParticipantProcessCreate.createProcessDefine(httpsession, session,path, oldpathimg));
			} else if (print.equals("mparticipant")) {
				svg.append(participantProcessCreate.createProcessDefine(httpsession,session, path, pathimg));
			}
		}catch(Exception e){
			   System.out.println("工作流异常>>流程监控异常>>"+Util.format(new Date())+">>绘制流程失败");
			   e.printStackTrace();
		}
		response.setContentType("image/svg+xml;charset=UTF-8");
		PrintWriter out = response.getWriter();
		//System.out.println(svg.toString());
		out.println(svg.toString());
	}

	private String getSVGHeader() {
		StringBuffer sb = new StringBuffer(256);
		sb
				.append("<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"no\" ?>");
		sb.append(tab);
		sb.append("<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.0//EN\"");
		sb.append(tab);
		sb
				.append("\"http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd\">");
		sb.append(tab);
		return sb.toString();
	}

}
