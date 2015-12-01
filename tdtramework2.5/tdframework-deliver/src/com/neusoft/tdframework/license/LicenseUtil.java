package com.neusoft.tdframework.license;

import java.util.List;

import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

public class LicenseUtil {
	private static ICacheManager manager = CacheConfig.manager;
	public static List getLicenseNames(){
		List list = null;
		try {
			if(manager.peek("licenseNamelist")!=null){
				list = (List)manager.peek("licenseNamelist");
			}else{
				ConfigFileUtil.init();
				list = (List)manager.peek("licenseNamelist");
			}
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	public static List getLicenseColl(){
		List list = null;
		try {
			if(manager.peek("licenselistdetail")!=null){
				list = (List)manager.peek("licenselistdetail");
			}else{
				ConfigFileUtil.init();
				list = (List)manager.peek("licenselistdetail");
			}
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	public static LicenseWarnConfig getLicenseWarnConfig(){
		LicenseWarnConfig conf = null;
		try {
			if(manager.peek("licenseWarnConfig")!=null){
				conf = (LicenseWarnConfig)manager.peek("licenseWarnConfig");
			}
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conf;
	}
	public static LicenseVO getLicenseVO(String menuId){
		LicenseVO vo = null;
		try {
			vo = (LicenseVO) manager.peek(menuId);
		} catch (CachingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
/*		String strDateEnd = "2007-12-24";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date_start = null;
		try {
			date_start = sdf.parse(strDateEnd);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		LicenseVO vo = new LicenseVO();
		vo.setExpiredDate(date_start);
		vo.setLicenseNo("12345678");
		vo.setProjectName("河北bss项目");
		vo.setProjectNo("DXB00018");
*/		return vo;
	}

}
