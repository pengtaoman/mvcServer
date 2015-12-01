package com.neusoft.tdframework.authorization;

import com.neusoft.unieap.service.security.ui.webapp.AuthenticationProcessingFilter;
import com.neusoft.unieap.util.RequestUtil;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.acegisecurity.Authentication;
import net.sf.acegisecurity.AuthenticationException;
import net.sf.acegisecurity.AuthenticationManager;
import net.sf.acegisecurity.providers.UsernamePasswordAuthenticationToken;
import net.sf.acegisecurity.providers.dao.UserCache;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class TDAuthenticationProcessingFilter extends AuthenticationProcessingFilter
{
  public Authentication attemptAuthentication(HttpServletRequest request)
    throws AuthenticationException
  {
    RequestUtil requestUtil = new RequestUtil(request);
    String username = requestUtil
      .getParameter("j_username");
    String password = requestUtil
      .getParameter("j_password");
    String macaddress = requestUtil.getParameter("txtMACAddr");
    String dnsname = requestUtil.getParameter("txtDNSName");
    String doubScreen = request.getParameter("double_screen");
    boolean login = false;

    UserCache uc = (UserCache)
      WebApplicationContextUtils.getWebApplicationContext(
      request.getSession().getServletContext()).getBean(
      "userCache");
    if ((uc != null) && (username != null)) {
      uc.removeUserFromCache(username);
    }
    if (username == null) {
      username = "";
    }

    if (password == null) {
      password = "";
    }

    if (macaddress == null) {
      macaddress = "";
    }

    if (dnsname == null) {
      dnsname = "";
    }

    UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
      username, password);
    authRequest.setDetails(request.getRemoteAddr());
    HttpSession session = request.getSession(true);
    session.setAttribute("macaddress", macaddress);
    session.setAttribute("dnsname", dnsname);
    if (doubScreen != null) {
      if (doubScreen.equals("on"))
        session.setAttribute("double_flag", "1");
    }
    else session.setAttribute("double_flag", "0");
    
    session.setAttribute("isMobile", requestUtil.getParameter("isMobile"));
    session.setAttribute("USER_INPUT_MOBILE_CODE", requestUtil.getParameter("mobile_code"));
    
    String ischangecity = requestUtil.getParameter("changeCityUser");
    if ("1".equals(ischangecity)) {
    	session.setAttribute("changeCityUser", "1");
    } else {
    	session.setAttribute("changeCityUser", "0");
    }
    
    return getAuthenticationManager().authenticate(authRequest);
  }
}