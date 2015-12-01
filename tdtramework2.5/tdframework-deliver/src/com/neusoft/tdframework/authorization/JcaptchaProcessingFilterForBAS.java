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
	//��Ӧ�������ļ���Ĳ���
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
	 * У������֤������
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
      
          //���ҳ����û����֤�벻���й��ˣ������˶��������getJfilterProcessesUrl()=/j_unieap_security_check.do
          if(getJfilterProcessesUrl().equals(forward)){    		
	    		boolean isResponseCorrect =true;
	    		
	    		isResponseCorrect = isMachineLegal(ipaddress,macaddress,username);
				if(isResponseCorrect==false){
					res.setContentType("text/html");
					req.setAttribute("alertMsg","���Ļ�����Ȩ����ϵͳ!");
					if(getJfilterProcessesUrl().equals(forward)){
						forward="tdframework/mainframe/login.jsp";
					}
					RequestDispatcher rd = req.getRequestDispatcher(forward);
					rd.forward(req,res);
					//res.sendRedirect(req.getContextPath()+forward);//���ܴ�request
				}
				//�Ѿ�ͨ����֤�������
				else {
					chain.doFilter(req, res);
				}	
          }
          else {
        	  chain.doFilter(req, res);
          }	
	}
	// Ϊbasϵͳ�޸ģ�ֻ�жϵ�¼�ߵ�ip�Ƿ�Ϸ���
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
//bssϵͳ��ͨ����¼��ip�ж��Ƿ���ͨ��vpn���룬����������ж�mac��ַ�Ϸ���
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
