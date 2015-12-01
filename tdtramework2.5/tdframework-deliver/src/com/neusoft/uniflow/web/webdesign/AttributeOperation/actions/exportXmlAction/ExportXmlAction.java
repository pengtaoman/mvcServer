package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.exportXmlAction;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.xmlbeans.XmlException;

import com.neusoft.uniflow.web.webdesign.procmodify.beans.ProcModifyDetailForm;
import com.neusoft.workflow.model.ProcessContentDocument;

public class ExportXmlAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		String xmlStr = ((ProcModifyDetailForm) form).getXmlStr();
		ProcessContentDocument processDoc = null;
		try {
			processDoc = ProcessContentDocument.Factory.parse(xmlStr);
		} catch (XmlException e1) {

			e1.printStackTrace();
		}
		String processName = processDoc.getProcessContent().getProcess()
				.getName();
		String agent=request.getHeader("user-agent").toLowerCase();
		String xmlName=processName;
		if(agent.indexOf("firefox")>0)
			xmlName=new String(processName.getBytes("utf-8"),"iso-8859-1");
		else
			xmlName = java.net.URLEncoder.encode(processName, "UTF-8");
		xmlName = xmlName.replaceAll("\\+", "%20");
		response.setContentType("application/x-download;charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment; filename="
				+ xmlName + ".uwbp");
		response.getOutputStream().write(xmlStr.toString().getBytes("UTF-8"));
		response.getOutputStream().close();
		return null;

	}

}
