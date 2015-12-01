/*
 * Created on 2005-1-21
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.tdframework.web.struts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionServlet;

import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.web.controller.BaseController;
import com.neusoft.tdframework.web.controller.ControllerData;
import com.neusoft.tdframework.web.controller.UnValidateException;

/**
 * @deprecated
 * @author Chenzt
 *
 * �����Ŀ���Action��
 * 
 */
public abstract class BaseControllerAction extends BaseAction{
	
	protected final String DEFAULT_OPER_TYPE = "default";
	
	private Map controllerMap = new HashMap();
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.struts.BaseAction#service(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	public ActionForward service(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ActionException {
		String operType = request.getParameter("operType");
		
		if(operType==null) operType = DEFAULT_OPER_TYPE;
		
		//��ȡ�����࣬���ִ��
		List list = (List)controllerMap.get(operType);
		ControllerData controllerData = new ControllerData();
		if(list!=null) {
			for(int i=0,j=list.size();i<j;i++) {
				BaseController controller = (BaseController)list.get(i);
				try {
					controller.dataValidate(request,controllerData);
				} catch (UnValidateException e) {
					controllerData.setAlertMessage("����У��ʧ��: " + e.getMessage());
					controllerData.setResult(ControllerData.INVALID_ERROR);
					break;
				}
			}
			
			//���У��ɹ���ִ��ҵ����
			if(controllerData.getResult()!= ControllerData.INVALID_ERROR)
			for(int i=0,j=list.size();i<j;i++) {
				BaseController controller = (BaseController)list.get(i);
				try {
					controller.serviceProcess(mapping,form,request,response,controllerData);
				} catch (ServiceException e) {
					controllerData.setResult(ControllerData.SERVICE_ERROR);
					controllerData.setAlertMessage("ҵ����ʧ�ܣ�" + e.getMessage());
					break;
				}
				
			}
		}
		
		request.setAttribute(ControllerData.REQUEST_NAME,controllerData);
		
		//������תҳ��		
		return getActionForward(mapping,operType,controllerData);
	}
	
	/**
	 * ��ȡ��תҳ��
	 * @param mapping
	 * @param operType
	 * @param controllerData
	 * @return
	 */
	protected abstract ActionForward getActionForward(ActionMapping mapping,String operType,ControllerData controllerData);
	
	/**
	 * �������ʼ����ֱ�ӵ���addController����ʵ����Actionע�������
	 * @throws Exception
	 */
	protected abstract void initController();
	
	
	/**
	 * 
	 * ע�������
	 * 
	 * @param requestOperType
	 * @param controlerOperType
	 * @param controlerBean
	 */
	protected void addController(String operType,BaseController controller) {
		if(operType==null || operType.trim()=="".intern())
			operType = DEFAULT_OPER_TYPE;
		
		List list = (List)controllerMap.get(operType);
		if(list==null) {
			list = new ArrayList();
			controllerMap.put(operType,list);
		}
		
		list.add(controller);
		
	}
	/* (non-Javadoc)
	 * @see org.apache.struts.action.Action#setServlet(org.apache.struts.action.ActionServlet)
	 */
	public void setServlet(ActionServlet actionServlet) {
		super.setServlet(actionServlet);
		initController();
	}

}
