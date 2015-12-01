package com.neusoft.om.action.group;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.dao.employee.EmployeeColl;
import com.neusoft.om.dao.employee.EmployeeVO;
import com.neusoft.om.dao.group.GroupColl;
import com.neusoft.om.dao.group.GroupDAO;
import com.neusoft.om.dao.group.GroupVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.GridUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

public class GroupAction extends TDDispatchAction{
	int DEFAULT_PAGE_SIZE = 50;
	public ActionForward getGroup(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException{
		
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    GroupDAO dao = (GroupDAO) factory.getInteractionObject("groupDAO",appContext);
	    String groupName = request.getParameter("groupNames");
	    if(groupName == null||"".equals(groupName.trim())){
	    	groupName = "";
	    }
	    int totalRows = dao.getGroupCount(groupName);
	    int[] startEnd = getStartEnd(request,totalRows,DEFAULT_PAGE_SIZE,1);
	    
	    GroupColl groupColl = dao.getGroupColl(groupName, startEnd[0], startEnd[1]);
	    request.setAttribute("totalRows",new Integer(totalRows));
	    request.setAttribute("groupList", groupColl.getList());
		return actionMapping.findForward("initGroupList");	
	}
	
	public ActionForward doAdd(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		String message = "��������Ϣ�ɹ�";
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    GroupDAO dao = (GroupDAO) factory.getInteractionObject("groupDAO",appContext);
	    String groupName = request.getParameter("groupName");
	    String groupDesc = request.getParameter("groupDesc");
	    GroupVO vo = new GroupVO();
	    vo.setGroupName(groupName);
	    vo.setGroupDesc(groupDesc);
	    int code = dao.doAddGroup(vo);
	    if(code < 0){
	    	message = "��������Ϣʧ��";
	    }	    
		request.setAttribute("message", message);
		return getGroup(actionMapping, actionForm, request,response);
	}
	
	public ActionForward modifyInit(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {		
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    GroupDAO dao = (GroupDAO) factory.getInteractionObject("groupDAO",appContext);
	    
	    String groupId = request.getParameter("groupId");
	    GroupVO groupVO = dao.getGroupVO(groupId);
	    request.setAttribute("groupVO", groupVO);
	    request.setAttribute("method", "doModify");
	    return actionMapping.findForward("initGroup");	
	}
	public ActionForward doModify(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		String message = "�޸Ĺ�������Ϣ�ɹ�";
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    GroupDAO dao = (GroupDAO) factory.getInteractionObject("groupDAO",appContext);
	    String groupId = request.getParameter("groupId");
	    String groupName = request.getParameter("groupName");
	    String groupDesc = request.getParameter("groupDesc");
	    GroupVO vo = new GroupVO();
	    vo.setGroupId(groupId);
	    vo.setGroupName(groupName);
	    vo.setGroupDesc(groupDesc);
	    int code = dao.doModifyGroup(vo);
	    if(code < 0){
	    	message = "�޸Ĺ�������Ϣʧ��";
	    }
		request.setAttribute("message", message);
		return getGroup(actionMapping, actionForm, request,response);
	}
	public ActionForward doDeleteGroup(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
		String message = "ɾ����������Ϣ�ɹ�";
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    GroupDAO dao = (GroupDAO) factory.getInteractionObject("groupDAO",appContext);
	    String groupId = request.getParameter("groupId");
	    boolean haveEmp = dao.haveEmp(groupId);
	    if(haveEmp){
	    	message = "������ڹ�����Ϣ������ɾ��";	    	
	    }else{
	    	int code = dao.doDeleteGroup(groupId);
		    if(code < 0){
		    	message = "ɾ����������Ϣʧ��";
		    }
		}
		request.setAttribute("message", message);
		return getGroup(actionMapping, actionForm, request,response);
	}
	public ActionForward queryEmp(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException{
		String operType = (String)request.getAttribute("operType");
//	    String message = (String)request.getAttribute("message");
	    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    GroupDAO dao = (GroupDAO) factory.getInteractionObject("groupDAO",appContext);
	    String groupId = request.getParameter("groupId");
	    EmployeeColl groupEmpColl = dao.getGroupEmpColl(groupId);
	    String workNo = request.getParameter("workNo");
	    if(workNo == null){
	    	workNo = "";
	    }
	    String name = request.getParameter("name");
	    if(name == null){
	    	name = "";
	    }
	    int totalRows = dao.getEmpCount(workNo, name);
	    int[] startEnd = getStartEnd(request,totalRows,DEFAULT_PAGE_SIZE,1);
	    EmployeeColl empColl = dao.getEmpColl(workNo, name, startEnd[0], startEnd[1]);
	    if(empColl != null && groupEmpColl != null){
    		for(int j=0; j < groupEmpColl.getRowCount(); j++){
    			EmployeeVO groupEmpVO = groupEmpColl.getEmployee(j);
    	    	for(int i=0; i < empColl.getRowCount(); i++){
    	    		EmployeeVO empVO = empColl.getEmployee(i);
    	    		if(groupEmpVO.getWorkNo().equals(empVO.getWorkNo())){
    	    			empVO.setRoleNum(1);
    	    		}
    	    	}	
    		}
	    }
	    request.setAttribute("totalRows",new Integer(totalRows));
	    request.setAttribute("empList", empColl.getList());
//	    request.setAttribute("message",message);
	    if(operType != null && operType.equals("show")){
	    	request.setAttribute("operType", "show");
	    }else{
	    	request.setAttribute("operType", "grant");
	    }
	    
	    request.setAttribute("groupId", groupId);
		return actionMapping.findForward("groupEmpList");
	}
	
	public ActionForward getEmp(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException{
	    String message = "";
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
	    AppContext appContext = new AppContextImpl();
	    appContext.setApplicationName("om");
	    GroupDAO dao = (GroupDAO) factory.getInteractionObject("groupDAO",appContext);
	    String groupId = request.getParameter("groupId");	    
	    EmployeeColl groupEmpColl = dao.getGroupEmpColl(groupId);
	    int totalRows = groupEmpColl.getRowCount();
	    GridUtil.getStartEnd(request,groupEmpColl.getRowCount(),groupEmpColl.getRowCount());
	    if(totalRows == 0){
	    	message = "�����в����ڹ�����Ϣ";
	    }
	    request.setAttribute("message",message);
	    request.setAttribute("empList", groupEmpColl.getList());
	    request.setAttribute("operType", "show");
		return actionMapping.findForward("groupEmpList");
	}
	public ActionForward doGrant(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException{
		String message = "���乤����Ϣ�ɹ�";
		EmployeeColl grantColl = new EmployeeColl();
		String groupId = request.getParameter("groupId");
	    String workNo = request.getParameter("workNo");
	    if(workNo == null){
	    	workNo = "";
	    }
	    String name = request.getParameter("name");
	    if(name == null){
	    	name = "";
	    }
//        Enumeration parameterNames = request.getParameterNames();
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");    
        GroupDAO dao = (GroupDAO) factory.getInteractionObject("groupDAO",appContext);//�õ�DAO
//    	int totalRows = dao.getEmpCount(workNo, name);
//    	int[] startEnd = GridUtil.getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE, 1);
    	
//    	EmployeeColl thisPageEmp = dao.getEmpColl(workNo, name);
//    	int count = 0;
    	String checkValue = request.getParameter("checkValue");
//    	String uncheckValue = request.getParameter("uncheckValue");
    	String allValue = request.getParameter("allValue");
    	String[] checkValues = checkValue.split("`");
//    	String[] uncheckValues = uncheckValue.split("`");
    	String[] allValues = allValue.split("`");
    	//ҳ�����й���
    	EmployeeColl delEmpColl = new EmployeeColl();
    	//���ҳ���Ѿ�ѡ��Ĺ���
    	for(int i=0; i< checkValues.length;i++){
    		String empId = checkValues[i];
    		if(empId != null && !empId.equals("")){
    			EmployeeVO vo = new EmployeeVO();
    			vo.setEmployeeId(empId);
    			grantColl.addEmployee(vo);
    		}
    	}
    	for(int i=0;i<allValues.length; i++){
    		String empId = allValues[i];
    		if(empId != null && !empId.equals("")){
    			EmployeeVO vo = new EmployeeVO();
    			vo.setEmployeeId(empId);
    			delEmpColl.addEmployee(vo);
    		}
    	}    	
        try{
        	if(dao.haveEmpInSameCity(grantColl)){
        		message="��ȷ��ÿ������ֻ��һ������";          		
        	}else{
        		//��½Ա������Ȩ�޹���
        	    EmployeeColl groupEmpColl = dao.getGroupEmpColl(groupId);
        	    //��ҳ����ʾ������Ȩ�޹���
        	    EmployeeColl regrantColl = getPriEmpColl(delEmpColl,groupEmpColl);
        	    //ɾ��ҳ����ʾ�����й���  regrantColl
        		dao.doDeleteGroupEmp(groupId, delEmpColl);        		
        		String sameCity = dao.haveEmpInSameCity(groupId, grantColl);
        		String inotherGroup = dao.haveInOtherGroup(groupId, grantColl);
        		if( sameCity.equals("") && inotherGroup.equals("")){        			
        			dao.doAddGroupEmp(groupId, grantColl);    	
        		}else if(!sameCity.equals("")){
        			dao.doAddGroupEmp(groupId, regrantColl);
        			message = "����"+sameCity+"�ڸ����д��ڶ�����ţ�������ѡ��";
        		}else{
        			dao.doAddGroupEmp(groupId, regrantColl);
        			message = inotherGroup+"������ѡ��";
        		}
        	}       	
        	
        }catch(DataAccessException e){
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"ServiceAction--doGrant:"+e.getMessage());
    		message = "���乤��ʧ��!";
        }
    	request.setAttribute("message", message); 
    	request.setAttribute("operType", "grant");
    	return queryEmp(actionMapping, actionForm, request, response);
	}
	/**
	 * ����������ϵĽ���
	 * 
	 * @param allEmpColl
	 * @param checkedEmpColl
	 * @return
	 */
	private EmployeeColl getPriEmpColl(EmployeeColl allEmpColl, EmployeeColl checkedEmpColl){
		EmployeeColl returnEmp = new EmployeeColl();
		for(int i=0; i < allEmpColl.getRowCount() ; i++){
			EmployeeVO vo = allEmpColl.getEmployee(i);
			for(int j=0; j<checkedEmpColl.getRowCount();j++){
				EmployeeVO checkEmpVO = checkedEmpColl.getEmployee(j);
				if(vo.getEmployeeId().equals(checkEmpVO.getEmployeeId())){
					returnEmp.addEmployee(vo);
				}
			}
		}			
		return returnEmp;
	}
	
}
