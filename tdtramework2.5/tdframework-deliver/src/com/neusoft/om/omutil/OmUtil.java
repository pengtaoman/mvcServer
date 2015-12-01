package com.neusoft.om.omutil;

import com.neusoft.om.dao.menu.MenuDAO;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class OmUtil {
	/**
	 切换XML格式数据为可识别的正确格式(XSL可读格式)
	*/
	public static String prepareXml(String s){
		StringBuffer stringbuffer = new StringBuffer();
		if(s != null){
			if(s.length() == 0)
			    return "";
			for(int i = 0; i < s.length(); i++){
				char c = s.charAt(i);
				if(c == '>'){
					stringbuffer.append("&gt;");
					continue;
				}else if(c == '<'){
					stringbuffer.append("&lt;");
					continue;
				}else if(c == '&'){
					stringbuffer.append("&amp;");
					continue;
				}else if(c == '"'){
					stringbuffer.append("&quot;");
					continue;
				}else
					stringbuffer.append(c);
			}
		}
		return stringbuffer.toString();
	}
	
	public static boolean haveRight(String employeeId, String menuId){
		boolean haveright = false;
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        MenuDAO menuDAO = (MenuDAO) factory.getInteractionObject("menuDAO", appContext);
        haveright = menuDAO.getEmployeePowerInfo(employeeId, menuId); 
        return haveright;
	}
}
