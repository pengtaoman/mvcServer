package com.neusoft.uniflow.web.webdesign.data.actions;

import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.service.cfg.io.IOUtil;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class LoadConfigAction extends Action{
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String filePath = WorkflowManager.getWorkflowConfigPath() + "/bsdesign-view.xml";
		InputStream fileStream =IOUtil.read(filePath);
		int lengh = fileStream.available();
		byte [] bytes = new byte[lengh];
		fileStream.read(bytes);
		String configContent = new String(bytes);
		fileStream.close();
		request.setAttribute("configContent", configContent);
		
		return mapping.findForward("loadConfig");
	}
}
