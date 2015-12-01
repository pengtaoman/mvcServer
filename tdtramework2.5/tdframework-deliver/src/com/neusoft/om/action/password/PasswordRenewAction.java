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
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
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
		String message = "��ѯ�ɹ�!";
		String operFlag = "1";
		String workNo = request.getParameter("WorkNo");
		EmployeeManagementBO service = (EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
		//MaoQ add begin
		OMDictionaryBOInterface omdictionary = (OMDictionaryBOInterface)getBaseService().getServiceFacade("omDictionaryFacade");		
		//�õ�������Ϣ
		ParamObjectCollection busDutyColl = omdictionary.getBusDutyColl();//ְλ
		ParamObjectCollection genderColl =  omdictionary.getGenderColl();//�Ա�
		ParamObjectCollection educateLevelColl = omdictionary.getEducateLevelColl();//����ˮƽ
		ParamObjectCollection incomeColl = omdictionary.getIncomeColl();//����
		ParamObjectCollection marriageStatusColl = omdictionary.getMarriageStatusColl();//����״��
		request.setAttribute("busDutyColl",busDutyColl);
		request.setAttribute("genderColl",genderColl);
		request.setAttribute("educateLevelColl",educateLevelColl);
		request.setAttribute("incomeColl",incomeColl);
		request.setAttribute("marriageStatusColl",marriageStatusColl);
		
		
		
		//Maoq add end
		//��session�л�ò���Ա����������
		AuthorizeVO authVO = (AuthorizeVO)request.getSession().getAttribute(GlobalParameters.SESSION_INFO);
		String operatorAreaId = authVO.getAreaId();
		EmployeeVO vo = null;
		try{
			vo = service.getEmployeeByWorkNo(workNo);
		}catch(ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"PasswordRenewAction--getEmployeeByWorkNo:"+e.getMessage());
			message = "��ѯʧ��!"+e.getMessage();
		}
		if(vo == null){
			operFlag = "0";
			message = "���˺Ų�����!";
		}else{
		
			vo.setWorkPwd("");
			DynamicListBO serviceDynamicList = (DynamicListBO)getBaseService().getServiceFacade(DynamicListBO.BEAN);
					//�õ���ǰ��Ҫ�ĵ�����������Ϣ
					AreaColl areaColl = null;
					try{
						areaColl = serviceDynamicList.getAreaChildList(operatorAreaId);
					} catch (ServiceException e) {
						SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
						message = "��õ�������������ʧ��!"+e.getMessage();			
					}
					
					AreaVO areaVO = areaColl.getArea(vo.getAreaId());
					if(areaVO!=null){
						//�õ���ǰ��Ҫ����֯������������
						OrganColl organColl = null;
						try{
							organColl = serviceDynamicList.getOrganList();
						}catch (ServiceException e) {
							SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
							message = "�����֯����������ʧ��!"+e.getMessage();			
						}
						//�õ���֯��������������
						OrganKindColl organKindColl = null;
						try{
							organKindColl = serviceDynamicList.getOrganKindList();
						}catch (ServiceException e) {
							SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
							message = "�����֯��������������ʧ��!"+e.getMessage();			
						}
						//�õ���ǰ��ְ����������Ϣ
						DutyColl dutyColl = null;
						try{
							dutyColl = serviceDynamicList.getDutyList();
						}catch (ServiceException e) {
							SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--getEmployeeByEmployeeId:"+e.getMessage());
							message = "���ְ��������ʧ��!"+e.getMessage();			
						}
					//������
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
						message = "����Ȩ�޻ָ����û�����!";
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
//		������
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
		StringBuffer buf = new StringBuffer("����ָ��ɹ�!");
		buf.append("�ָ����������:��½�˺�תΪСд,תΪСд�ĵ�½�˺�,�������С��6λ,����תΪСд���˺ź������0������λ;");
		buf.append("�����15λ,��ȡǰ15λ;�»��߻�������0!");
		String message = buf.toString();
		String operFlag = "2";
		String workNo = request.getParameter("WorkNo");
		EmployeeManagementBO service = (EmployeeManagementBO)getBaseService().getServiceFacade(EmployeeManagementBO.BEAN);
		try{
			service.doRenewPassWord(workNo);
		}catch(ServiceException e) {
			operFlag = "0";
			SysLog.writeLogs("om",GlobalParameters.ERROR,"EmployeeMaintanceAction--doRenewPassWord:"+e.getMessage());
			message = "����ָ�ʧ��!"+e.getMessage();
		}
		request.setAttribute("OperType","renew");
		request.setAttribute("OperFlag",operFlag);
		request.setAttribute("Message",message);
		return mapping.findForward("renew");	
	}
}




