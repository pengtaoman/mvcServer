package com.neusoft.tdframework.authorization;
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neusoft.om.dao.employee.EmployeeDAOImpl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.util.RequestUtil;

public class JcaptchaProcessingFilterForBAS implements Filter {
	//对应于配置文件里的参数
	String jfilterProcessesUrl;
	String jdefaultTargetUrl;
	public String getJdefaultTargetUrl() {
		return jdefaultTargetUrl;
	}

	public void setJdefaultTargetUrl(String jdefaultTargetUrl) {
		this.jdefaultTargetUrl = jdefaultTargetUrl;
	}

	public String getJfilterProcessesUrl() {
		return jfilterProcessesUrl;
	}

	public void setJfilterProcessesUrl(String jfilterProcessesUrl) {
		this.jfilterProcessesUrl = jfilterProcessesUrl;
	}

	/**
	 * @author yinkun Sep 5, 2006 10:40:39 AM
	 * 校验码验证过滤器
	 * @return
	 */
	public void doFilter(ServletRequest request,ServletResponse response,
			FilterChain chain) throws IOException, ServletException {   
		
		RequestUtil requestUtil = new RequestUtil((HttpServletRequest) request);
		String macaddress = requestUtil.getParameter("txtMACAddr");
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String forward=req.getServletPath(); 
		String username = req.getParameter("j_username");
		String ipaddress = req.getRemoteAddr();
      
          //如果页面上没有验证码不进行过滤，仅过滤定义的请求getJfilterProcessesUrl()=/j_unieap_security_check.do
          if(getJfilterProcessesUrl().equals(forward)){    		
	    		boolean isResponseCorrect =true;
	    		
	    		isResponseCorrect = isMachineLegal(ipaddress,macaddress,username);
				if(isResponseCorrect==false){
					res.setContentType("text/html");
					req.setAttribute("alertMsg","您的机器无权访问系统!");
					if(getJfilterProcessesUrl().equals(forward)){
						forward="tdframework/mainframe/login.jsp";
					}
					RequestDispatcher rd = req.getRequestDispatcher(forward);
					rd.forward(req,res);
					//res.sendRedirect(req.getContextPath()+forward);//不能带request
				}
				//已经通过验证的则继续
				else {
					chain.doFilter(req, res);
				}	
          }
          else {
        	  chain.doFilter(req, res);
          }	
	}
	// 为bas系统修改，只判断登录者的ip是否合法。
	public boolean isMachineLegal(String ipaddress,String macaddress,String workno){
		boolean ret = false;
		//return true;
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        EmployeeDAOImpl daoimpl = (EmployeeDAOImpl) factory.getInteractionObject("employeeDAO", appContext);
        EmployeeVO vo = daoimpl.getEmployeeInfoByWorkNo(workno.toUpperCase());
        String loginip1 = vo.getLoginIp();
        String loginip2 = vo.getLoginIp2();
        if(ipaddress.equals(loginip1)||ipaddress.equals(loginip2)){
        	ret = true;
        }        
		return ret;
	}
//bss系统，通过登录者ip判断是否是通过vpn接入，如果是则再判断mac地址合法。
/*	public boolean isMachineLegal(String ipaddress,String macaddress){
		boolean ret = false;
		//return true;
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
		VPNUtilDAOImpl daoimpl = (VPNUtilDAOImpl) factory.getInteractionObject("vpnUtilDao", appContext);
		if(daoimpl.isByVPN(ipaddress)){
			if(daoimpl.isMacLegal(macaddress)){
				ret = true;
			}
		}else{
			ret = true;
		}
		return ret;
	}
*/	
	public void destroy() {

	}

	public void init(FilterConfig arg0) throws ServletException {
		
	}
	
}
