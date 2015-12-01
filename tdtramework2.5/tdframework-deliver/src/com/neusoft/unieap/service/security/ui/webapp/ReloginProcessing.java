package com.neusoft.unieap.service.security.ui.webapp;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.acegisecurity.intercept.web.FilterInvocation;

import com.neusoft.unieap.config.EAPConfigHelper;
import com.neusoft.unieap.ria.config.RIAConfig;
public class ReloginProcessing{
	private String[] processesUrl;
	private String targetUrl;

	public String[] getProcessesUrl() {
		return processesUrl;
	}

	public void setProcessesUrl(String[] processesUrl) {
		this.processesUrl = processesUrl;
	}

	public String getTargetUrl() {
		return targetUrl;
	}

	public void setTargetUrl(String targetUrl) {
		this.targetUrl = targetUrl;
	}
	
	public boolean isValidProcesses(FilterInvocation fi) throws ServletException, IOException{
		if(RIAConfig.DIALOGRELOGIN){
			HttpServletRequest request = (HttpServletRequest) fi.getRequest();
			HttpServletResponse response = (HttpServletResponse) fi.getResponse();
			String url=request.getServletPath();			
			for(int index=0;index<processesUrl.length;index++){
				if(url.equals(processesUrl[index])){
					return false;
				}
			}
			if(request.getQueryString()!=null){
				url+="?"+request.getQueryString();
			}
			
			request.setAttribute("path", request.getContextPath()+url);
			request.getRequestDispatcher(getTargetUrl()).forward(request, response);
			return true;
		}else{
			return false;
		}
	}

	public void reloginAppliction(HttpServletRequest request){
		if(RIAConfig.DIALOGRELOGIN){
			String name = request.getParameter("j_application");
			HttpSession session = request.getSession(true);
			if(name!=null && !"".equals(name) && session!=null){
				EAPConfigHelper.setApplicationName(session,name);
			}
		}
	}
}

