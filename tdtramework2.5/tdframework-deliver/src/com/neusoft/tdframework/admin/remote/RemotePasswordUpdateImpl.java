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

		String message = "密码修改成功!";
		//String oldPassword = request.getParameter("OldPassword");
		//String newPassword = request.getParameter("NewPassword");

		//AuthorizeVO authvo = (AuthorizeVO) request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		//String employeeId = authvo.getEmployeeId();
		//String workNo = authvo.getWorkNo();
		//校验密码旧密码是否正确
		EmployeeVO vo= new EmployeeVO();
		EmployeeManagementBO service =getService();
		//if(PassWord.includeChineseChar(newPassword)){
		//	message = "用户帐号只能使用字母、数字以及_，并且不能使用中文!";
		//	return message;
		//}
		try {
			vo = service.getEmployeeByWorkNo(userName);
		} catch (ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"RemotePasswordUpdateImpl--changePassword:"+e.getMessage());
			message = "发生异常!"+e.getMessage();	
		}
		String workNo = vo.getWorkNo();
		String workPwd = PassWord.decode(vo.getWorkPwd());
		if (oldPassword.equals(workPwd)) {
			
			if (newPassword.equals(workPwd)) {
				message = "密码没有修改，请录入新密码！";	
			}else{
				newPassword = PassWord.encode(newPassword);
				try {
					service.doUpdatePassWord(workNo,newPassword);		
				} catch (ServiceException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"RemotePasswordUpdateImpl--changePassword:"+e.getMessage());
					message = "修改密码失败!"+e.getMessage();			
				} catch (Exception e) {
				SysLog.writeLogs("om",GlobalParameters.ERROR,"RemotePasswordUpdateImpl--changePassword:"+e.getMessage());
				message = "修改密码失败!"+e.getMessage();			
				}

			}
		}else{
			message = "旧密码输入错误!";
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
