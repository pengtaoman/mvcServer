package com.neusoft.om.action.dataParamRole.dataParamManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.om.bo.dataParamRole.dataParamManage.DataParamManageBO;
import com.neusoft.om.dao.dataParamRole.DataParamManageDAO;
import com.neusoft.om.dao.dataParamRole.DataParamManageVO;
import com.neusoft.om.omutil.DataParamUtil;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/*******************************************************************************
 * ������ : DataParamManageAction.java 
 * ���� : 2007-8-20
 * ���� : yanglm@neusoft.com 
 * ģ�� : ���� :
 * ��ע :
 * 
 * ------------------------------------------------------------
 * �޸���ʷ ��� ���� �޸���
 * �޸�ԭ�� 1 2
 ******************************************************************************/

public class DataParamManageAction extends TDDispatchAction {
    
	/**
	 * ��ʼ����ѯҳ��
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
    public ActionForward init(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataParamManageBO bo = (DataParamManageBO) getServiceFacade("dataParamManageBO", actionMapping);
        com.neusoft.tdframework.common.data.ParamObjectCollection tableColl = null;
        String roleId=request.getParameter("roleId");
        String employeeId=request.getParameter("employeeId");
        //tableId Ϊnull ��ʾ����ҳ�������ʾ��ϸ��Ϣҳ��
        String tableId=request.getParameter("tableId").equals("null")?"":request.getParameter("tableId");
        String operType=request.getParameter("operType");
        
        try {
        	//employeeId��Ϊ����ΪȨ��΢��
        	if(employeeId!=null && !employeeId.equals("null")){
        		tableColl=bo.getTableByEmployee(employeeId);
        		request.setAttribute("employeeId",employeeId);
        	}else if(!tableId.equals("")){
                tableColl=bo.getTableByRole(roleId);
                request.setAttribute("tableId",tableId);
            }else{//employeeId��vtableId��Ϊ����Ϊ����Ȩ������
                tableColl = bo.getTable();
            }
        } catch (ServiceException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageAction--init()-1 :" + e.getMessage());
            throw new ActionException(e);
        }
        request.setAttribute("tableColl",tableColl);
        request.setAttribute("roleId",roleId);
        //�������Դ��ID��Ϊ�գ�������Ҫ���޸�ҳ����ǲ鿴��ϸ��Ϣҳ��
        if(!tableId.equals("")){
        	//�����������Ϊgrant��Ϊ�޸�ҳ��
        	if(operType!=null && operType.equals("grant")){
        		request.setAttribute("flag","modify");
        	}else{
        		request.setAttribute("flag","detailPage");
        	}
        //�������Դ��IDΪ�գ�������Ҫ����������Ȩ��ҳ���Ȩ��΢��ҳ��    
        }else{
        	//�����������ΪpowerAdjust��ΪȨ��΢��ҳ��
        	if(operType!=null && operType.equals("powerAdjust")){
        		request.setAttribute("flag","powerAdjust");
        	}else if(operType!= null && operType.equals("add")){
        		request.setAttribute("flag","add");
        	}
        }
        return actionMapping.findForward("filterinfo");
    }
  
    /**
	 * ���� table_id ��ȡ���ñ��Ӧ�����еĹ�������Ϣ
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
    public ActionForward getFilters(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataParamManageBO bo = (DataParamManageBO) getServiceFacade("dataParamManageBO", actionMapping);
        HttpSession session = (HttpSession)request.getSession(true);
        
        List listColl = null;          //������������������Ϣ
        List listFilterName = null;    //��������������������
        List filterTagName = null;     //������������TAG��ʶ
        List methodList = null;        //�������������ONCHANGE����
        //List filterSql = null;         //��ѯ���������ݵ�SQL���
        HashMap map=null;
        com.neusoft.tdframework.common.data.ParamObjectCollection tableColl = null;
        String paramTableDesc="";
        String filterTagNames = "";
        //tableId��Ϊ�գ�����ʾ��ϸ��Ϣҳ��
        String tableId=request.getParameter("tableId");
        String roleId=request.getParameter("roleId");
        //employeeId��Ϊ�գ�����ʾ����Ȩ��΢��ҳ��
        String employeeId=request.getParameter("employeeId");
        //��ȡflag��ʶ
        String flag =request.getParameter("flag");
        
        try {
             map = bo.getFilters(tableId,session);
             
             if(employeeId!=null && !employeeId.equals("null")){
         		 tableColl=bo.getTableByEmployee(employeeId);
         		 request.setAttribute("employeeId",employeeId);
         		
         		 paramTableDesc=bo.getParamTableDesc(employeeId,tableId,"employee");
         	 }else{
         		 if(flag!=null && flag.equals("detailPage")){
         			 tableColl=bo.getTableByRole(roleId);
                 }else{
                	 tableColl = bo.getTable();
                 }
         		 
         		 paramTableDesc=bo.getParamTableDesc(roleId,tableId,"role");
         	 }
             
             //�����������б�����
             listColl = (List)map.get("listColl");
             //������������������Ϣ
             listFilterName = (List)map.get("listFilterName");
             //�������������ONCHANGE����
             methodList = (List)map.get("methodList");
             //������������TAG��ʶ
             filterTagName = (List)map.get("filterTagName");
             //��ѯ���������ݵ�SQL���
             //filterSql = (List)map.get("filterSql");
             if(filterTagName != null){
            	 for(int i=0;i<filterTagName.size();i++){
            		 filterTagNames = filterTagNames+filterTagName.get(i)+"~";
            	 }
             }
        } catch (ServiceException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageAction--getFilters()-1 :" + e.getMessage());
            throw new ActionException(e);
        }
        
        if(flag!=null && flag.equals("detailPage")){
            request.setAttribute("flag","setCheckbox");
        }else if(flag!=null && flag.equals("modify")){
        	request.setAttribute("flag","showSave");
        }else if(flag!=null && flag.equals("powerAdjust")){
        	request.setAttribute("flag","adjust");
        }else if(flag!=null && flag.equals("add")){
        	request.setAttribute("flag", "add");
        }
        request.setAttribute("listColl",listColl);
        request.setAttribute("listFilterName",listFilterName);
        request.setAttribute("filterTagName",filterTagName);
        //request.setAttribute("filterSql",filterSql);
        request.setAttribute("methodList",methodList);
        request.setAttribute("tableColl",tableColl);
        request.setAttribute("tableId",tableId);
        request.setAttribute("roleId",roleId);
        request.setAttribute("paramTableDesc",paramTableDesc);
        request.setAttribute("filterTagNames",filterTagNames);
        
        return actionMapping.findForward("filterinfo");
    }
    /**
	 * ���˲������˸�Ȩ��Ϣ
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
    public ActionForward query(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataParamManageBO bo = (DataParamManageBO) getServiceFacade("dataParamManageBO", actionMapping);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        DataParamManageDAO dataDAO = (DataParamManageDAO) factory.getInteractionObject("dataParamManageDAO", appContext);
               
        int totalRows = getTotalRowsFromRequest(request);
        HashMap map=new HashMap();
        //�����ʾ���ݵĽ����
        List infoColls = null;
        //���������
        List nameColls=null;
        //�ɵ����ݿ��д洢����Ҫ�����˵����ݴ�
        String dataInfo = null;
        //�û��¸�Ȩ���ɵ���Ҫ�����˵����ݴ�
        //String newDataInfo = "";
        int DEFAULT_PAGE_SIZE = 200;
        
        HashMap paramMap = new HashMap();
        String[] values = null;
        String filterTagNames=request.getParameter("filterTagNames");
        if(filterTagNames!=null && !filterTagNames.trim().equals("")){
        	values = filterTagNames.split("~");
        }
        
        if(values!=null && values.length>0){
        	for (int i=0;i<values.length;i++){
                String param = values[i];
                if(!param.trim().equals("")){
                	String valueTemp=request.getParameter(param);
                    paramMap.put(param,valueTemp);
                } 
            }
        }
        
        String tableId = NullProcessUtil.nvlToString(request.getParameter("tableId"),"");
        String roleId = request.getParameter("roleId");
        String employeeId = request.getParameter("employeeId");
        int showNewDataFlag = dataDAO.getIfShowNewData(tableId);
        String    oldDataInfo = NullProcessUtil.nvlToString((String) request.getParameter("oldDataInfo"), "");
        String   unCheckValue = NullProcessUtil.nvlToString((String) request.getParameter("unCheckValue"), "");
        String[] checkedValue = request.getParameterValues("checkboxs");
        
        try {
            if (totalRows <= 0) {
                totalRows = bo.getRowCount(tableId,paramMap);
            }else{
            	dataInfo = bo.makeParamDataInfo(oldDataInfo,unCheckValue,checkedValue,tableId);
            }
            
            int[] getStartEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
            if (totalRows > 0) {
                	if(roleId!=null && !roleId.trim().equals("") && !roleId.equals("null")){
                		//map = bo.getInfoColl(tableId,roleId,paramMap,getStartEnd[0], getStartEnd[1]);
                		map = bo.getInfoColl(tableId,roleId,paramMap,-1,-1);//��ʹ�����ݿ��ҳ
                	}else{
                		map = bo.getDataInfoColl(tableId,employeeId,paramMap,getStartEnd[0], getStartEnd[1],showNewDataFlag);
                	}
            }
            
            infoColls=(List)map.get("listColl");
            nameColls=(List)map.get("listName");
            if(dataInfo == null || dataInfo.trim().equals("~") || dataInfo.trim().equals("")){
            	dataInfo = (String)map.get("dataInfo");
            }
        } catch (ServiceException se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageAction--query()--1:", se);
            throw new ActionException(se);
        }
        String length = (String)map.get("length");
        if(infoColls != null ){
        	infoColls = orderColl(infoColls, nameColls, dataInfo,length, showNewDataFlag);
        }
        
        request.setAttribute("nameColls", nameColls);
        request.setAttribute("infoColls", infoColls);
        request.setAttribute("length",length);
        request.setAttribute("dataInfo",dataInfo);
        String flag = request.getParameter("flag");
        request.setAttribute("flag",flag);
        request.setAttribute("showNewDataFlag", String.valueOf(showNewDataFlag));
        return actionMapping.findForward("tableinfo");
    }
    private List orderColl(List coll, List nameColls, String dataInfo, String length,int showNewData){
    	//ҳ����ʾ�����ݵ�����
    	int countCols=0;
    	int lengthNum=0;
    	if(length!=null){
    		  lengthNum=Integer.parseInt(length);
    	}
    	if(nameColls!=null){
    		  countCols=nameColls.size();
    	}
    	List preList = new ArrayList();
    	List orderList = new ArrayList();
    	List lstList = new ArrayList();
    	
    	for(int j= 0 ; j < coll.size(); j++){
    		DataParamManageVO vo = new DataParamManageVO();
    		vo = (DataParamManageVO)coll.get(j); //�õ�һ��vo
    		String values = "";
    		//�õ������õ�primaryKeyֵ
        	for (int i=countCols+1;i<=lengthNum;i++){
        		values = values+getColum(vo, i);
        		if(i<lengthNum){
        			values = values+(";");
        		}
        	}
        	//���primaryKey�����ݽ�ɫ�������õ�������ͬ��˵����vo�����ݽ�ɫ��Ȩʱ�����棬��������preList��
        	String[] info = dataInfo.split("~");
        	String same = "false"; //�Ƿ���ͬ
        	for(int k=0; k < info.length ; k ++){
        		if(values.equals(info[k])){
        			preList.add(vo);
        			same = "true";
        		}
        	}  
        	//�����voû�б����棬��������lstList��
        	if(same.equals("false")){
        		lstList.add(vo);
        	}
    	}
    	//preList��lstList����ú󣬸���showNewData���þ�������һ���ַ���ǰ��
    	//showNewData == 0 ���������ݲ��ɼ����򱣴�����Ϊ�ɼ����ݣ�Ӧ�ý�preList����ǰ��
    	//showNewData == 1 ���������ݿɼ����򱣴�����Ϊ���ɼ����ݣ�Ӧ�ý�lstList����ǰ��
    	if(showNewData == 0){
    		orderList = preList;
    		for(int i = 0; i < lstList.size(); i++){
    			orderList.add(lstList.get(i));
    		}    		
    	}else{
    		orderList = lstList;
    		for(int i = 0; i < preList.size(); i++){
    			orderList.add(preList.get(i));
    		} 
    	}
    	return orderList;
    }
    

    
    /**
	 * ���淽��
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
    public ActionForward doSave(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataParamManageBO bo = (DataParamManageBO) getServiceFacade("dataParamManageBO", actionMapping);
        InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("om");
        DataParamManageDAO dataDAO = (DataParamManageDAO) factory.getInteractionObject("dataParamManageDAO", appContext);

        String tableId=request.getParameter("tableId");
        String roleId=request.getParameter("roleId");
        String employeeId=request.getParameter("employeeId");
        String operType=request.getParameter("flag");
        String tableDesc=NullProcessUtil.nvlToString((String) request.getParameter("tableDesc"), "");
        String message="";
        //���ƹر�
        String flag="";
        //��ȡtableInfo.jsp �е� unCheckValue ��ֵ��
        String    oldDataInfo = NullProcessUtil.nvlToString((String) request.getParameter("oldDataInfo"), "");
        String   unCheckValue = NullProcessUtil.nvlToString((String) request.getParameter("unCheckValue"), "");
        String[] checkedValue = request.getParameterValues("checkboxs");
        int showNewData = dataDAO.getIfShowNewData(tableId);
        try{
        	
        	String newDataInfo = bo.makeParamDataInfo(oldDataInfo,unCheckValue,checkedValue,tableId);
        	//ת��Ϊ����
            String[] values = newDataInfo.split("~");        
            if(showNewData == 1){//�������ݿɼ�
            	if(operType!=null && (operType.equals("adjust")||operType.equals("showAdjustResult"))){
                    message= bo.addParamAdjustData(employeeId,tableId,values);
                    if(message.equals("true")){
                        message="����Ȩ��΢����Ϣ�ɹ�";
                        flag="closeAdjust";
                    }
            	}else{
                    message= bo.addParamRoleData(roleId,tableId,tableDesc,values);
                    if(message.equals("true")){
                        message="�����ɫ��Ȩ��Ϣ�ɹ�";
                        flag="close";
                    }
            	}
        	}else{//�������ݲ��ɼ�
        		String[] uncheck = parseString(unCheckValue);
        		List allThisPageData = getAllThisPageData(checkedValue, uncheck);
        		int role = -1;
        		if(roleId != null && !roleId.trim().equals("") && !roleId.trim().equals("null")){
        			role = Integer.parseInt(roleId);
        		}
        		int table = -1;
        		if(tableId != null && !tableId.trim().equals("") && !tableId.trim().equals("null")){
        			table = Integer.parseInt(tableId);
        		}  
        		
        		if(operType!=null && (operType.equals("adjust")||operType.equals("showAdjustResult"))
        				&& employeeId!= null && !employeeId.trim().equals("") && !employeeId.equals("null")){
        			String[] unCheckData = parseString(unCheckValue);
        			int code = bo.addAdjustDataUnshowNew(employeeId,tableId,unCheckData,checkedValue);
                    if(code == 1){
                        message="Ȩ��΢���ɹ�";
                        flag="closeAdjust";
                    }
            	}else{
            		int insertTableCode = 1;
            		if(operType != null && (operType.trim().equals("add")||(operType.trim().equals("showAddResult")) )){//����������������Ƚ���ɫ������Դ��Ĺ�ϵ�������ݿ�
            			message = bo.addDescTableInfo(roleId,tableId,tableDesc);
            			if(!message.equals("true")){
            				insertTableCode = 0;
            			}            				
            		}
            		int deleteCode = dataDAO.doDeleteAllThisPageData(role, table, allThisPageData);
            		int insertCode = 1;
            		if(checkedValue != null && checkedValue.length > 1 ){
            			insertCode = dataDAO.doInsertCheckData(role, table,checkedValue);
            		}
            		if(deleteCode >=0 && insertCode == 1 && insertTableCode == 1){
            			message="�����ɫ��Ȩ��Ϣ�ɹ�";
                        flag="close";
            		}else{
            			message="�����ɫ��Ȩ��Ϣʧ��";
                        flag="close";
            		}
            	}

        	}

        }catch (ServiceException se) {
            SysLog.writeExceptionLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageAction--doSave()--1:", se);
            throw new ActionException(se);
        }
        
        request.setAttribute("message",message);
        request.setAttribute("flag",flag);
        request.setAttribute("ifAdd","add");        
        return actionMapping.findForward("alertPage");
    }
    /**
	 * ���� role_id ��ȡ���˽�ɫ��Ӧ�����в�����������Դ����Ϣ
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
    public ActionForward queryRoleTable(ActionMapping actionMapping, ActionForm actionForm, 
    		HttpServletRequest request,HttpServletResponse response) 
    			throws ActionException {
        DataParamManageBO service = (DataParamManageBO) getServiceFacade("dataParamManageBO", actionMapping);
        String message = "";
        List list = new ArrayList();
        String roleId = request.getParameter("roleId");
        String operType = request.getParameter("operType");
        //AuthorizeVO authvo = getAuthorize(request);
        //String employeeId = authvo.getEmployeeId();
 
        try{
        	list = service.getDescTableInfo(roleId);
        	getStartEnd(request,list.size(),list.size());
        } catch (ServiceException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageAction--queryRoleTable():"+e.getMessage());
            message = "���ҽ�ɫ��Ȩ����Դ��ʧ��: "+e.getMessage().replaceAll("\"", "'");
        }
        
        request.setAttribute("ParamRoleTable", list);
        request.setAttribute("roleId", roleId);
        request.setAttribute("operType", operType);
        if(!message.trim().equals("")){
        	request.setAttribute("message", message);
        }
                
        return actionMapping.findForward("paramRoleTable");
    }
    /**
	 * ���� role_id��table_id ɾ��������������Դ����Ϣ
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
    public ActionForward deleteRoleTable(ActionMapping actionMapping, ActionForm actionForm, 
    		HttpServletRequest request,HttpServletResponse response) 
    			throws ActionException {
        DataParamManageBO service = (DataParamManageBO) getServiceFacade("dataParamManageBO", actionMapping);
        String message = "";
        String roleId = request.getParameter("roleId");
        String[] tableIds = request.getParameterValues("table_ids");
 
        try{
        	message = service.deleteDescTableInfo(roleId,tableIds);
        } catch (ServiceException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageAction--deleteRoleTable():"+e.getMessage());
            message = "ɾ����ɫ��Ȩ����Դ��ʧ��: "+e.getMessage().replaceAll("\"", "'");
        }
        
        request.setAttribute("roleId", roleId);
        request.setAttribute("message", message);
        request.setAttribute("operType", "delete");
                
        return actionMapping.findForward("hiddenPage");
    }
    private String[] parseString(String value){
    	String[] parse = null;
    	if(value != null){
    		parse = value.split("~");
    	}
    	return parse;
    }
    
    private  List getAllThisPageData(String[] check, String[] uncheck){
    	List list = new ArrayList();
    	if(check != null && check.length > 0){
    		for(int i=0; i < check.length; i++){
    			list.add(check[i]);
    		}    		
    	}
    	if(uncheck != null && uncheck.length > 0){
    		for(int i=0; i < uncheck.length; i++){
    			list.add(uncheck[i]);
    		}
    	}
    	return list;
    }
    private String getColum(DataParamManageVO vo , int column){
    	String value = "";
    	if(column == 1){  		
    		value = vo.getColumn1();
    	}
    	if(column == 2){  		
    		value = vo.getColumn2();
    	}
    	if(column == 3){  		
    		value = vo.getColumn3();
    	}
    	if(column == 4){  		
    		value = vo.getColumn4();
    	}
    	if(column == 5){  		
    		value = vo.getColumn5();
    	}
    	if(column == 6){  		
    		value = vo.getColumn6();
    	}
    	if(column == 7){  		
    		value = vo.getColumn7();
    	}
    	if(column == 8){  		
    		value = vo.getColumn8();
    	}
    	if(column == 9){  		
    		value = vo.getColumn9();
    	}
    	if(column == 10){  		
    		value = vo.getColumn10();
    	}
    	if(column == 11){  		
    		value = vo.getColumn11();
    	}
    	if(column == 12){  		
    		value = vo.getColumn12();
    	}
    	if(column == 13){  		
    		value = vo.getColumn13();
    	}
    	if(column == 14){  		
    		value = vo.getColumn14();
    	}
    	if(column == 15){  		
    		value = vo.getColumn15();
    	}
    	return value;
    }
}
