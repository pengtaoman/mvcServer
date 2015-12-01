package com.neusoft.om.action.password;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import com.neusoft.om.omutil.PassWord;
import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.BaseAction;

/**brief description
 * <p>Date       : 2004-11-16</p>
 * <p>Module     : om</p>
 * <p>Description: employee</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public class PasswordUpdateAction extends BaseAction {

	private static String SYSTEM_ID = "41";
	
	private static String BUTTON_NAME = "041ABE";
	
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{
			String operType = NullProcessUtil.nvlToString(request.getParameter("OperType"),"init");
			String message = "�����޸ĳɹ�!";
			String oldPassword = request.getParameter("OldPassword");
			String newPassword = request.getParameter("NewPassword");
			if(operType.intern()=="init".intern()){
				return mapping.findForward("result");
			}
			//AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
			String employeeId = (String)request.getSession().getAttribute("EmployeeId");
			String workNo = (String)request.getSession().getAttribute("WorkNo");;
			//У������������Ƿ���ȷ
			EmployeeVO vo= new EmployeeVO();
			if(PassWord.includeChineseChar(newPassword)){
				message = "�û��ʺ�ֻ��ʹ����ĸ�������Լ�_�����Ҳ���ʹ������!";
				request.setAttribute("EmployeeId",employeeId);
				request.setAttribute("Message",message);
				return mapping.findForward("result");	
			}
			HashMap map = getLogInfo(request);
			EmployeeManagementBO service =(EmployeeManagementBO)getBaseService().getServiceFacade("employeeManagementFacade");
			try {
				vo = service.getEmployeeByEmployeeId(employeeId);
			} catch (ServiceException e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"PasswordUpdateAction--getEmployeeInfoByWorkNo:"+e.getMessage());
				message = "�����쳣!"+e.getMessage();	
				request.setAttribute("Message",message);
				return mapping.findForward("result");			
			}
			String workPwd = PassWord.decode(vo.getWorkPwd());
			if (oldPassword.equals(workPwd)) {
				if (newPassword.equals(workPwd)) {
					message = "����û���޸ģ�������¼�룡";	
				}else{
					newPassword = PassWord.encode(newPassword);
					try {
						String desc = "��½�˺�Ϊ:"+workNo+"��ְԱ�޸�����";
						service.doUpdatePassWord(workNo,newPassword);	
						DBLogger logbo = (DBLogger)getDBLogger();
						HashMap logMap = getLogMap(request,BUTTON_NAME,desc);
						logbo.doAddLogInfoByProc(logMap);	
						request.getSession().removeAttribute("decodedPass");
						request.getSession().setAttribute("decodedPass",PassWord.decode(newPassword));
					} catch (ServiceException e) {
						SysLog.writeLogs("om",GlobalParameters.ERROR,"PasswordUpdateAction--passwordUpdate:"+e.getMessage());
						message = "�޸�����ʧ��!"+e.getMessage();			
					}
				}
			}else{
				message = "�������������!";
			}
			request.setAttribute("EmployeeId",employeeId);
			request.setAttribute("Message",message);
			return mapping.findForward("result");	
		}
	
	/**
	 * ����Աд�����м�����־
	 */
	
	public HashMap getLogInfo(HttpServletRequest request){
        HashMap map = new HashMap();
		//��ǰ����Ա������Ϣ
		AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		map.put("employeeId",authvo.getEmployeeId());
		map.put("systemId","");
		map.put("menuId","");
		map.put("bottonName","");
		map.put("loginHost","");
		map.put("operDesc","");
		return map;
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
