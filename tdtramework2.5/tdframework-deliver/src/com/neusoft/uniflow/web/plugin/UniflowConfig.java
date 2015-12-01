package com.neusoft.uniflow.web.plugin;

import org.apache.struts.action.ActionServlet;
import org.apache.struts.action.PlugIn;
import org.apache.struts.config.ModuleConfig;

import com.neusoft.uniflow.service.WorkFlowContext;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class UniflowConfig implements PlugIn {

	public UniflowConfig() {
	}

	public void destroy() {
	}

	public void init(ActionServlet servlet, ModuleConfig config) {
		try {
			String path = servlet.getServletContext().getRealPath("/");
			if (path!=null&&(path.endsWith("/") || path.endsWith("\\"))) {
				path = path.substring(0, path.length() - 1);
			}
			else if(path==null)
				path="";
			
			UniflowManager.initEngine(servlet.getServletContext());
			WorkflowManager.initCustom(servlet.getServletContext(), path.concat("/WEB-INF/").concat(WorkFlowContext.WORKFLOW_PATH));

		} catch (Exception e1) {
			System.out.println("INFO >> 工作流后台服务初始化失败 ......");
			e1.printStackTrace();
		}
	}

	/**
	 * 在V4平台下需要对配置文件进行初始化
	 */
	private void initConfigPath_V4() {
		WorkFlowContext.LICENSE_PATH = "conf/workflow/uniflow/unieap/license";
		WorkFlowContext.WORKFLOW_PATH = "conf/workflow/uniflow/unieap/workflow";
		WorkFlowContext.CONNECTION_PATH = "conf/workflow/uniflow/unieap/connection";
		WorkFlowContext.TRANSACTION_PATH = "conf/workflow/uniflow/unieap/transaction";
	}
}