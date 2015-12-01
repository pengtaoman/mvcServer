package com.neusoft.om.action.password;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.DynamicListBO;
import com.neusoft.om.bo.EmployeeManagementBO;
import com.neusoft.om.bo.OMDictionaryBOInterface;
import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.duty.DutyColl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.organ.OrganColl;
import com.neusoft.om.dao.organkind.OrganKindColl;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
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
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public class PasswordRenewAction extends BaseAction {
	public ActionForward service(
		ActionMapping mapping,
		ActionForm form,
		HttpServletRequest request,
		HttpServletResponse response)
		throws ActionException{
			String operType = NullProcessUtil.nvlToString(request.getParameter("OperType"),"query");
			if(operType.equals("query")){
				return getEmployeeInfo(mapping,request,response);
			}
			else{//renew
				return getRenewPassword(mapping,request,response);
			}
		}
	private ActionForward getEmployeeInfo(ActionMapping mapping,
						HttpServletRequest request,
						HttpServletResponse response) {
		String message = "查询成功!";
		String operFlag = "1";
		String workNo = request.getParameter("WorkNo");
		EmployeeManagementBO service = (EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
		//MaoQ add begin
		OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");		
		//得到参数信息
		ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();//职位
		ParamObjectCollection genderColl =  omdictionary.getGenderColl();//性别
		ParamObjectCollection educateLevelColl = omdictionary.getEducateLevelColl();//教育水平
		ParamObjectCollection incomeColl = omdictionary.getIncomeColl();//收入
		ParamObjectCollection marriageStatusColl = omdictionary.getMarriageStatusColl();//婚姻状况
		request.setAttribute("busDutyColl",busDutyColl);
		request.setAttribute("genderColl",genderColl);
		request.setAttribute("educateLevelColl",educateLevelColl);
		request.setAttribute("incomeColl",incomeColl);
		request.setAttribute("marriageStatusColl",marriageStatusColl);
		
		
		
		//Maoq add end
		//从session中获得操作员的行政区域
		AuthorizeVO authVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String operatorAreaId = authVO.getAreaId();
		EmployeeVO vo = null;
		try{
			vo = service.getEmployeeByWorkNo(workNo);
		}catch(ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PasswordRenewAction--getEmployeeByWorkNo:"+e.getMessage());
			message = "查询失败!"+e.getMessage();
		}
		if(vo == null){
			operFlag = "0";
			message = "该账号不存在!";
		}else{
		
			vo.setWorkPwd("");
			DynamicListBO serviceDynamicList = (DynamicListBO)getBaseService().getServiceFacade(DynamicListBO.BEAN);
					//得到当前需要的地市下拉框信息
					AreaColl areaColl = null;
					try{
						areaColl = serviceDynamicList.getAreaChildList(operatorAreaId);
					} catch (ServiceException e) {
						SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
						message = "获得地市下拉框数据失败!"+e.getMessage();			
					}
					
					AreaVO areaVO = areaColl.getArea(vo.getAreaId());
					if(areaVO!=null){
						//得到当前需要的组织机构的下拉框
						OrganColl organColl = null;
						try{
							organColl = serviceDynamicList.getOrganList();
						}catch (ServiceException e) {
							SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
							message = "获得组织机构下拉框失败!"+e.getMessage();			
						}
						//得到组织机构类型下拉框
						OrganKindColl organKindColl = null;
						try{
							organKindColl = serviceDynamicList.getOrganKindList();
						}catch (ServiceException e) {
							SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
							message = "获得组织机构类型下拉框失败!"+e.getMessage();			
						}
						//得到当前的职务下拉框信息
						DutyColl dutyColl = null;
						try{
							dutyColl = serviceDynamicList.getDutyList();
						}catch (ServiceException e) {
							SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
							message = "获得职务下拉框失败!"+e.getMessage();			
						}
					//下拉框
					  request.setAttribute("AreaColl",areaColl);
					  request.setAttribute("DutyColl",dutyColl);
					  request.setAttribute("OrganColl",organColl);
					  request.setAttribute("OrganKindColl",organKindColl);
						
						request.setAttribute("OperType","query");
						request.setAttribute("OperFlag",operFlag);
						request.setAttribute("Message",message);
						request.setAttribute("EmployeeVO",vo);
						return mapping.findForward("renew");
					}else{
						message = "您无权限恢复该用户密码!";
						operFlag = "0";
						request.setAttribute("AreaColl",null);
						request.setAttribute("DutyColl",null);
						request.setAttribute("OrganColl",null);
						request.setAttribute("OrganKindColl",null);
				 
						request.setAttribute("OperType","query");
						request.setAttribute("OperFlag",operFlag);
						request.setAttribute("Message",message);
						request.setAttribute("EmployeeVO",vo);
						return mapping.findForward("renew");
						
					}
		}
//		下拉框
		request.setAttribute("AreaColl",null);
		request.setAttribute("DutyColl",null);
		request.setAttribute("OrganColl",null);
		request.setAttribute("OrganKindColl",null);
						 
		request.setAttribute("OperType","query");
		request.setAttribute("OperFlag",operFlag);
		request.setAttribute("Message",message);
		request.setAttribute("EmployeeVO",vo);
		return mapping.findForward("renew");	
	}
	
	private ActionForward getRenewPassword(ActionMapping mapping,
							HttpServletRequest request,
							HttpServletResponse response) {
		StringBuffer buf = new StringBuffer("密码恢复成功!");
		buf.append("恢复后密码组成:登陆账号转为小写,转为小写的登陆账号,如果长度小于6位,则在转为小写的账号后加数字0补足六位;");
		buf.append("如大于15位,则取前15位;下划线换成数字0!");
		String message = buf.toString();
		String operFlag = "2";
		String workNo = request.getParameter("WorkNo");
		EmployeeManagementBO service = (EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
		try{
			service.doRenewPassWord(workNo);
		}catch(ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassWord:"+e.getMessage());
			message = "密码恢复失败!"+e.getMessage();
		}
		request.setAttribute("OperType","renew");
		request.setAttribute("OperFlag",operFlag);
		request.setAttribute("Message",message);
		return mapping.findForward("renew");	
	}
}




