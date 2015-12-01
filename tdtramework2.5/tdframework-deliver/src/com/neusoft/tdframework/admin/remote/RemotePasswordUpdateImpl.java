package com.neusoft.tdframework.admin.remote;

import java.io.File;
import java.math.BigDecimal;

import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.omutil.PassWord;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class RemotePasswordUpdateImpl {
	public String changePassword(String userName,String oldPassword,String newPassword){

		String message = "�����޸ĳɹ�!";
		//String oldPassword = request.getParameter("OldPassword");
		//String newPassword = request.getParameter("NewPassword");

		//AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		//String employeeId = authvo.getEmployeeId();
		//String workNo = authvo.getWorkNo();
		//У������������Ƿ���ȷ
		EmployeeVO vo= new EmployeeVO();
		EmployeeManagementBO service =getService();
		//if(PassWord.includeChineseChar(newPassword)){
		//	message = "�û��ʺ�ֻ��ʹ����ĸ�������Լ�_�����Ҳ���ʹ������!";
		//	return message;
		//}
		try {
			vo = service.getEmployeeByWorkNo(userName);
		} catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"RemotePasswordUpdateImpl--changePassword:"+e.getMessage());
			message = "�����쳣!"+e.getMessage();	
		}
		String workNo = vo.getWorkNo();
		String workPwd = PassWord.decode(vo.getWorkPwd());
		if (oldPassword.equals(workPwd)) {
			
			if (newPassword.equals(workPwd)) {
				message = "����û���޸ģ���¼�������룡";	
			}else{
				newPassword = PassWord.encode(newPassword);
				try {
					service.doUpdatePassWord(workNo,newPassword);		
				} catch (ServiceException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"RemotePasswordUpdateImpl--changePassword:"+e.getMessage());
					message = "�޸�����ʧ��!"+e.getMessage();			
				} catch (Exception e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"RemotePasswordUpdateImpl--changePassword:"+e.getMessage());
				message = "�޸�����ʧ��!"+e.getMessage();			
				}

			}
		}else{
			message = "�������������!";
		}
		return message;
	}
	
	private EmployeeManagementBO getService(){
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        return (EmployeeManagementBO) factory.getInteractionObject("employeeManagementFacade",appContext);
	}
	public static void main(String args[])
	{
		//new Tester().listFiles();
		
		RemotePasswordUpdateImpl impl = new RemotePasswordUpdateImpl();
		impl.changePassword("super", "aaaaaa", "super1");
		
	}
	
}
