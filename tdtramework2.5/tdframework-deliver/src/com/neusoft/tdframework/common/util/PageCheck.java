package com.neusoft.tdframework.common.util;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.om.dao.page.PageDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class PageCheck {
	/**
	 * ����request��menuId �жϵ�ǰ����Ա�Ƿ���Ȩ�޷��ʸ�menu(������ҳ���ť) 
	 * @param request
	 * @param menuId
	 * @return
	 */
	public static boolean ifHaveRight(HttpServletRequest request, String menuId){
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String workNo = authorizeVO.getWorkNo();
		if(workNo == null || workNo.trim().equals("")){
			workNo = (String)request.getSession().getAttribute("Account");
		}
        boolean haveRight = false;
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        PageDAO pageDAO = (PageDAO) factory.getInteractionObject("pageDAO", appContext);
        haveRight = pageDAO.ifHaveRight(workNo, menuId);        
        return haveRight;
	}
	/**
	 * ����request��menuId�õ��ð�ť������
	 * ��ǰ����Ա��Ȩ�����ð�ť�򷵻� writeable="true",��ǰ����Ա��Ȩ�����˰�ť�򷵻� readonly="true"
	 * ����ֵ����ֱ����jsp��ʹ��
	 * @param request
	 * @param menuId
	 * @return
	 */
	public static String getButtonAttibute(HttpServletRequest request, String menuId){
		AuthorizeVO authorizeVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String workNo = authorizeVO.getWorkNo();
		if(workNo == null || workNo.trim().equals("")){
			workNo = (String)request.getSession().getAttribute("Account");
		}
        boolean haveRight = false;
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        PageDAO pageDAO = (PageDAO) factory.getInteractionObject("pageDAO", appContext);
        haveRight = pageDAO.ifHaveRight(workNo, menuId);  
        if(haveRight){
        	return "writeable='true'";
        }else{
        	return "disabled='true'";
        }
	}
	
}
