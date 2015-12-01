package com.neusoft.om.action.pwd;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.pwd.PwdValidDAO;
import com.neusoft.om.dao.pwd.PwdValidVO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/*******************************************************************************
 * ������ : MenuAction.java 
 * ���� : 2008-6-16
 * ���� : zhaof@neusoft.com 
 * ģ�� : ���� :Ȩ��ά��
 * ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/
public class PwdAction extends TDDispatchAction{
	private static String SYSTEM_ID="41";
	private static String ADD_SAVE_BUTTON_ID = "041AJA";
	public ActionForward getDetail(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        PwdValidDAO pwdValidDAO = (PwdValidDAO) factory.getInteractionObject("pwdValidDAO", appContext); 
        PwdValidVO vo = pwdValidDAO.getAllPwdValidInfo();
        request.setAttribute("pwdValidVO", vo);
		return actionMapping.findForward("detailPage");
	}
	

	public ActionForward doSave(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		String message = "��������������Ϣ�ɹ�";		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();        
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");        
        PwdValidDAO pwdValidDAO = (PwdValidDAO) factory.getInteractionObject("pwdValidDAO", appContext); 
		AuthorizeVO authVO = getAuthorize(request);
		String ifCortrolS = request.getParameter("ifControl");
		String invalidDaysS = request.getParameter("invalidDays");
		String alertDaysS = request.getParameter("alertDays");
		String pwdMinLengthS = request.getParameter("pwdMinLength");
		String pwdMaxLengthS = request.getParameter("pwdMaxLength");
		String authEmpId = authVO.getEmployeeId();
		PwdValidVO pwdValidVO = new PwdValidVO();
		if(ifCortrolS!= null && !ifCortrolS.equals("")){
			int ifControl = Integer.parseInt(ifCortrolS);
			pwdValidVO.setIfCortrol(ifControl);
		}
		if(invalidDaysS!= null && !invalidDaysS.equals("")){
			int inValidDay = Integer.parseInt(invalidDaysS);
			pwdValidVO.setInValidDays(inValidDay);
		}
		if(alertDaysS!= null && !alertDaysS.equals("")){
			int alertDays = Integer.parseInt(alertDaysS);
			pwdValidVO.setAlertDays(alertDays);
		}
		if(pwdMinLengthS!= null && !pwdMinLengthS.equals("")){
			int pwdMinLength = Integer.parseInt(pwdMinLengthS);
			pwdValidVO.setPwdMinLength(pwdMinLength);
		}
		if(pwdMaxLengthS!= null && !pwdMaxLengthS.equals("")){
			int pwdMaxLength = Integer.parseInt(pwdMaxLengthS);
			pwdValidVO.setPwdMaxLength(pwdMaxLength);
		}
		pwdValidVO.setUpdEmployeeId(authEmpId);
		try{
			pwdValidDAO.doModify(pwdValidVO);
			/** д��־ */
			 String desc = "��¼�ʺ�Ϊ:"+authVO.getWorkNo() + "�Ĳ���Ա�޸����������" +
			 		"������Ч�ڣ�" + String.valueOf(pwdValidVO.getInValidDays()) + 
			 		" ��ǰ����������" + String.valueOf(pwdValidVO.getAlertDays()) + 
			 		" ������С���ȣ�" + String.valueOf(pwdValidVO.getPwdMinLength()) + 
			 		" ������󳤶ȣ�" + String.valueOf(pwdValidVO.getPwdMaxLength());
			 
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,ADD_SAVE_BUTTON_ID,desc);
			 logbo.doAddLogInfoByProc(logMap);	
		}catch(DataAccessException e){
			message = "��������������Ϣʧ�ܣ�"+e.getMessage();
		}catch(ServiceException e){
			message = "��¼����������Ϣ�޸���Ϣ��־ʧ�ܣ�"+e.getMessage();
		}
    	
    	request.setAttribute("message",message);
		return getDetail(actionMapping,actionForm,request,response);	
	}
	/**
	 * ��ȡ��֤��Ϣ
	 * @param request
	 * @return
	 */
	protected AuthorizeVO getAuthorize(HttpServletRequest request) {
		return (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	}
    /**
     * ��¼��־������Ϣ
     * @param request
     * @param buttonId
     * @param desc
     * @return
     */
    private HashMap getLogMap(HttpServletRequest request,String buttonId,String desc){
    	HashMap logMap = new HashMap();
    	AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
    	String loginHost = request.getRemoteHost();
    	String workNo =  authvo.getWorkNo();
    	String employeeId = authvo.getEmployeeId();
    	logMap.put("systemId", SYSTEM_ID);
    	logMap.put("buttonId", buttonId);
    	logMap.put("employeeId", employeeId);
    	logMap.put("workNo", workNo);
    	logMap.put("loginHost", loginHost);
    	logMap.put("operDesc", desc);    	
    	return logMap;
    }
}
