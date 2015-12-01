package com.neusoft.tdframework.common.util;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.jdbc.spy.TraceLogContextHolder;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;

public class TraceLogBaseInfoUtil {
	
	public static void traceLogBaseInfoSet(HttpServletRequest request) {
		
		String sessionId = request.getSession(false).getId();
        AuthorizeVO vo = (AuthorizeVO)request.getSession(false).getAttribute(
                GlobalParameters.SESSION_INFO);
        
        String longinId = "LOGON";
        if (vo != null) {
        	longinId = vo.getEmployeeId();
        }
		String clientIp = getIpAddressFromRequest(request);
		
		TraceLogContextHolder.setCurrentThreadLocal("loginID", longinId);
		
		TraceLogContextHolder.setCurrentThreadLocal("sessionID", sessionId);
		
		TraceLogContextHolder.setCurrentThreadLocal("clientIP", clientIp);
		
		TraceLogContextHolder.setCurrentThreadLocal("serverIP", getIp());

	}
	
	private static String getIpAddressFromRequest(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
	
	public static String getIp() {
		
		String localip = null;// 本地IP，如果没有配置外网IP则返回它
		String netip = null;// 外网IP
		
		try {
			Enumeration<NetworkInterface> netInterfaces = NetworkInterface
					.getNetworkInterfaces();
			InetAddress ip = null;
			boolean finded = false;// 是否找到外网IP
			
			while (netInterfaces.hasMoreElements() && !finded) {
				NetworkInterface ni = netInterfaces.nextElement();
				Enumeration<InetAddress> address = ni.getInetAddresses();
				
				while (address.hasMoreElements()) {
					ip = address.nextElement();
					if (!ip.isSiteLocalAddress() && !ip.isLoopbackAddress()
							&& ip.getHostAddress().indexOf(":") == -1) {// 外网IP
						netip = ip.getHostAddress();
						finded = true;
						break;
					} else if (ip.isSiteLocalAddress()
							&& !ip.isLoopbackAddress()
							&& ip.getHostAddress().indexOf(":") == -1) {// 内网IP
						localip = ip.getHostAddress();
					}
				}
			}
		} catch (SocketException e) {
			e.printStackTrace();
		}
		if (netip != null && !"".equals(netip)) {
			return netip;
		} else {
			return localip;
		}
	} 

}
