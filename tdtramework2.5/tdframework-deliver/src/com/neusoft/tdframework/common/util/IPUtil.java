package com.neusoft.tdframework.common.util;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class IPUtil {
	
	public static List<String> getIp() {
		String localip = null;// 本地IP，如果没有配置外网IP则返回它
		String netip = null;// 外网IP
		
		List<String> IPLst = new ArrayList<String>();
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
//					System.out.println(ni.getName() + ";" + ip.getHostAddress()
//							+ ";ip.isSiteLocalAddress()="
//							+ ip.isSiteLocalAddress()
//							+ ";ip.isLoopbackAddress()="
//							+ ip.isLoopbackAddress());
					if (!ip.isSiteLocalAddress() && !ip.isLoopbackAddress()
							&& ip.getHostAddress().indexOf(":") == -1) {// 外网IP
						netip = ip.getHostAddress();
						finded = true;
						IPLst.add(netip);
						break;
					} else if (ip.isSiteLocalAddress()
							&& !ip.isLoopbackAddress()
							&& ip.getHostAddress().indexOf(":") == -1) {// 内网IP
						localip = ip.getHostAddress();
						IPLst.add(localip);
					}
				}
			}
		} catch (SocketException e) {
			e.printStackTrace();
		}
		return IPLst;
	}
	
	public static boolean isLocalIP(String ip) {
		boolean returnValue = false;
		
		List<String> ipLst = getIp();
		
		for (String ipStr : ipLst) {
			if (ip.equals(ipStr)) {
				returnValue = true;
				break;
			}
		}
		
		return returnValue;
	}
	
	public static boolean isLocalIPContained(String httpStr) {
		boolean returnValue = false;
		
		List<String> ipLst = getIp();
		
		for (String ipStr : ipLst) {
			if (httpStr.indexOf(ipStr) > -1) {
				returnValue = true;
				break;
			}
		}
		
		return returnValue;
	}


}
