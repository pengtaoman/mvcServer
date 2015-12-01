package com.neusoft.om.dao.byvpn;

public interface VPNUtilDAO {
	public boolean isByVPN(String ipaddress);
	public boolean isMacLegal(String macaddress);
}
