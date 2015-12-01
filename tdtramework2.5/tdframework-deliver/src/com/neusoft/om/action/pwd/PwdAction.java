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
 * 程序名 : MenuAction.java 
 * 日期 : 2008-6-16
 * 作者 : zhaof@neusoft.com 
 * 模块 : 描述 :权限维护
 * 备注 :
 * 
 * ------------------------------------------------------------
 * 修改历史 序号 日期 修改人
 * 修改原因 1 2
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
		String message = "保存密码配置信息成功";		
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
			/** 写日志 */
			 String desc = "登录帐号为:"+authVO.getWorkNo() + "的操作员修改密码参数，" +
			 		"密码有效期：" + String.valueOf(pwdValidVO.getInValidDays()) + 
			 		" 提前提醒天数：" + String.valueOf(pwdValidVO.getAlertDays()) + 
			 		" 密码最小长度：" + String.valueOf(pwdValidVO.getPwdMinLength()) + 
			 		" 密码最大长度：" + String.valueOf(pwdValidVO.getPwdMaxLength());
			 
			 DBLogger logbo = (DBLogger)getDBLogger();
			 HashMap logMap = getLogMap(request,ADD_SAVE_BUTTON_ID,desc);
			 logbo.doAddLogInfoByProc(logMap);	
		}catch(DataAccessException e){
			message = "保存密码配置信息失败！"+e.getMessage();
		}catch(ServiceException e){
			message = "记录密码配置信息修改信息日志失败！"+e.getMessage();
		}
    	
    	request.setAttribute("message",message);
		return getDetail(actionMapping,actionForm,request,response);	
	}
	/**
	 * 获取认证信息
	 * @param request
	 * @return
	 */
	protected AuthorizeVO getAuthorize(HttpServletRequest request) {
		return (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
	}
    /**
     * 记录日志所需信息
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
