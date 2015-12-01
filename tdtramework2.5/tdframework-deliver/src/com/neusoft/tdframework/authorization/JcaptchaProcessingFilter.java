package com.neusoft.tdframework.authorization;

import com.neusoft.om.dao.byvpn.VPNUtilDAO;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.service.security.SecurityFactory;
import com.neusoft.unieap.service.security.providers.dao.SecurityUser;
import com.neusoft.unieap.service.security.ui.jcaptcha.EAPCaptchaService;
import com.neusoft.unieap.util.RequestUtil;
import com.octo.captcha.service.CaptchaServiceException;
import com.octo.captcha.service.image.ImageCaptchaService;
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
import javax.servlet.http.HttpSession;

public class JcaptchaProcessingFilter
  implements Filter
{
  String jfilterProcessesUrl;
  String jdefaultTargetUrl;

  public String getJdefaultTargetUrl()
  {
    return this.jdefaultTargetUrl;
  }

  public void setJdefaultTargetUrl(String jdefaultTargetUrl) {
    this.jdefaultTargetUrl = jdefaultTargetUrl;
  }

  public String getJfilterProcessesUrl() {
    return this.jfilterProcessesUrl;
  }

  public void setJfilterProcessesUrl(String jfilterProcessesUrl) {
    this.jfilterProcessesUrl = jfilterProcessesUrl;
  }

  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
    throws IOException, ServletException
  {
    RequestUtil requestUtil = new RequestUtil((HttpServletRequest)request);
    String ipaddress = getIpAddressFromRequest((HttpServletRequest)request);
    HttpServletRequest req = (HttpServletRequest)request;
    HttpServletResponse res = (HttpServletResponse)response;
    String forward = req.getServletPath();

    String resString = req.getParameter("jcaptcha_response");

    SecurityUser su = null;
    boolean flag = true;
    try {
      su = SecurityFactory.getInstance().getSecurityUser();
    }
    catch (Exception e) {
      flag = false;
    }

    if ((su != null) || (
      (resString != null) && (getJfilterProcessesUrl().equals(forward)))) {
      Boolean isResponseCorrect = Boolean.TRUE;
      String captchaId = req.getSession().getId();
      try {
        isResponseCorrect = EAPCaptchaService.getInstance().validateResponseForID(captchaId, resString);
      }
      catch (CaptchaServiceException localCaptchaServiceException) {
      }
      if (!isResponseCorrect.booleanValue()) {
        res.setContentType("text/html;charset=UTF-8");
        req.setAttribute("jcaptchaMsg", "error");
        if (getJfilterProcessesUrl().equals(forward)) {
          forward = "tdframework/mainframe/login.jsp";
        }
        req.setAttribute("alertMsg", "验证码错误！");
        RequestDispatcher rd = req.getRequestDispatcher("tdframework/mainframe/login.jsp");
        rd.forward(req, res);
        return;
      }

      chain.doFilter(req, res);
    }
    else if ("/login.do".equals(forward)) {
      boolean isResponseCorrect2 = true;

      isResponseCorrect2 = isMachineLegal(ipaddress);
      if (!isResponseCorrect2) {
        res.setContentType("text/html");
        req.setAttribute("alertMsg", "你的ip地址无权访问系统!");

        forward = "tdframework/mainframe/login.jsp";

        RequestDispatcher rd = req.getRequestDispatcher(forward);
        rd.forward(req, res);
      }
      else
      {
        chain.doFilter(req, res);
      }
    }
    else {
      chain.doFilter(req, res);
    }
  }

  public boolean isMachineLegal(String ipaddress) {
    
    /*
    boolean ret = false;
    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    AppContext appContext = new AppContextImpl();
    appContext.setApplicationName("");
    VPNUtilDAO daoimpl = (VPNUtilDAO)factory.getInteractionObject("vpnUtilDao", appContext);
    if (daoimpl.isByVPN(ipaddress))
      ret = false;
    else {
      ret = true;
    }
    */
    boolean ret = true;
    return ret;
  }

  public void destroy()
  {
  }

  public void init(FilterConfig arg0)
    throws ServletException
  {
  }

  protected static String getIpAddressFromRequest(HttpServletRequest request)
  {
    String ip = request.getHeader("x-forwarded-for");
    if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
      ip = request.getHeader("Proxy-Client-IP");
    }
    if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
      ip = request.getHeader("WL-Proxy-Client-IP");
    }
    if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
      ip = request.getRemoteAddr();
    }
    return ip;
  }
}