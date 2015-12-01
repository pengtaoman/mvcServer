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
 * 程序名 : DataParamManageAction.java 
 * 日期 : 2007-8-20
 * 作者 : yanglm@neusoft.com 
 * 模块 : 描述 :
 * 备注 :
 * 
 * ------------------------------------------------------------
 * 修改历史 序号 日期 修改人
 * 修改原因 1 2
 ******************************************************************************/

public class DataParamManageAction extends TDDispatchAction {
    
	/**
	 * 初始化查询页面
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
        //tableId 为null 显示新增页面否则显示详细信息页面
        String tableId=request.getParameter("tableId").equals("null")?"":request.getParameter("tableId");
        String operType=request.getParameter("operType");
        
        try {
        	//employeeId不为空则为权限微调
        	if(employeeId!=null && !employeeId.equals("null")){
        		tableColl=bo.getTableByEmployee(employeeId);
        		request.setAttribute("employeeId",employeeId);
        	}else if(!tableId.equals("")){
                tableColl=bo.getTableByRole(roleId);
                request.setAttribute("tableId",tableId);
            }else{//employeeId和vtableId都为空则为数据权限新增
                tableColl = bo.getTable();
            }
        } catch (ServiceException e) {
            SysLog.writeLogs("om", GlobalParameters.ERROR, 
            	"DataParamManageAction--init()-1 :" + e.getMessage());
            throw new ActionException(e);
        }
        request.setAttribute("tableColl",tableColl);
        request.setAttribute("roleId",roleId);
        //如果数据源表ID不为空，表明需要打开修改页面或是查看详细信息页面
        if(!tableId.equals("")){
        	//如果操作类型为grant则为修改页面
        	if(operType!=null && operType.equals("grant")){
        		request.setAttribute("flag","modify");
        	}else{
        		request.setAttribute("flag","detailPage");
        	}
        //如果数据源表ID为空，表明需要打开新增数据权限页面或权限微调页面    
        }else{
        	//如果操作类型为powerAdjust则为权限微调页面
        	if(operType!=null && operType.equals("powerAdjust")){
        		request.setAttribute("flag","powerAdjust");
        	}else if(operType!= null && operType.equals("add")){
        		request.setAttribute("flag","add");
        	}
        }
        return actionMapping.findForward("filterinfo");
    }
  
    /**
	 * 根据 table_id 获取到该表对应的所有的过滤器信息
	 * @param mapping
	 * @param request
	 * @param response
	 * @return
	 */
    public ActionForward getFilters(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
        DataParamManageBO bo = (DataParamManageBO) getServiceFacade("dataParamManageBO", actionMapping);
        HttpSession session = (HttpSession)request.getSession(true);
        
        List listColl = null;          //过滤器下拉框数据信息
        List listFilterName = null;    //过滤器下拉框中文名称
        List filterTagName = null;     //过滤器下拉框TAG标识
        List methodList = null;        //过滤器下拉框的ONCHANGE方法
        //List filterSql = null;         //查询过滤器数据的SQL语句
        HashMap map=null;
        com.neusoft.tdframework.common.data.ParamObjectCollection tableColl = null;
        String paramTableDesc="";
        String filterTagNames = "";
        //tableId不为空，则显示详细信息页面
        String tableId=request.getParameter("tableId");
        String roleId=request.getParameter("roleId");
        //employeeId不为空，则显示的是权限微调页面
        String employeeId=request.getParameter("employeeId");
        //获取flag标识
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
             
             //过滤器下拉列表内容
             listColl = (List)map.get("listColl");
             //过滤器下拉框描述信息
             listFilterName = (List)map.get("listFilterName");
             //过滤器下拉框的ONCHANGE方法
             methodList = (List)map.get("methodList");
             //过滤器下拉框TAG标识
             filterTagName = (List)map.get("filterTagName");
             //查询过滤器数据的SQL语句
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
	 * 过滤参数过滤赋权信息
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
        //存放显示数据的结果集
        List infoColls = null;
        //存放列名字
        List nameColls=null;
        //旧的数据库中存储的需要掉过滤的数据串
        String dataInfo = null;
        //用户新赋权生成的需要掉过滤的数据串
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
                		map = bo.getInfoColl(tableId,roleId,paramMap,-1,-1);//不使用数据库分页
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
    	//页面显示的数据的列数
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
    		vo = (DataParamManageVO)coll.get(j); //得到一个vo
    		String values = "";
    		//得到其设置的primaryKey值
        	for (int i=countCols+1;i<=lengthNum;i++){
        		values = values+getColum(vo, i);
        		if(i<lengthNum){
        			values = values+(";");
        		}
        	}
        	//如果primaryKey与数据角色表中配置的数据相同，说明该vo在数据角色赋权时被保存，将其整理到preList中
        	String[] info = dataInfo.split("~");
        	String same = "false"; //是否相同
        	for(int k=0; k < info.length ; k ++){
        		if(values.equals(info[k])){
        			preList.add(vo);
        			same = "true";
        		}
        	}  
        	//如果此vo没有被保存，将其整理到lstList中
        	if(same.equals("false")){
        		lstList.add(vo);
        	}
    	}
    	//preList和lstList整理好后，根据showNewData配置决定将那一部分放在前面
    	//showNewData == 0 ，新增数据不可见，则保存数据为可见数据，应该将preList放在前面
    	//showNewData == 1 ，新增数据可见，则保存数据为不可见数据，应该将lstList放在前面
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
	 * 保存方法
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
        //控制关闭
        String flag="";
        //获取tableInfo.jsp 中的 unCheckValue 的值。
        String    oldDataInfo = NullProcessUtil.nvlToString((String) request.getParameter("oldDataInfo"), "");
        String   unCheckValue = NullProcessUtil.nvlToString((String) request.getParameter("unCheckValue"), "");
        String[] checkedValue = request.getParameterValues("checkboxs");
        int showNewData = dataDAO.getIfShowNewData(tableId);
        try{
        	
        	String newDataInfo = bo.makeParamDataInfo(oldDataInfo,unCheckValue,checkedValue,tableId);
        	//转换为数组
            String[] values = newDataInfo.split("~");        
            if(showNewData == 1){//新增数据可见
            	if(operType!=null && (operType.equals("adjust")||operType.equals("showAdjustResult"))){
                    message= bo.addParamAdjustData(employeeId,tableId,values);
                    if(message.equals("true")){
                        message="插入权限微调信息成功";
                        flag="closeAdjust";
                    }
            	}else{
                    message= bo.addParamRoleData(roleId,tableId,tableDesc,values);
                    if(message.equals("true")){
                        message="插入角色赋权信息成功";
                        flag="close";
                    }
            	}
        	}else{//新增数据不可见
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
                        message="权限微调成功";
                        flag="closeAdjust";
                    }
            	}else{
            		int insertTableCode = 1;
            		if(operType != null && (operType.trim().equals("add")||(operType.trim().equals("showAddResult")) )){//如果是新增，则首先将角色和数据源表的关系插入数据库
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
            			message="插入角色赋权信息成功";
                        flag="close";
            		}else{
            			message="插入角色赋权信息失败";
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
	 * 根据 role_id 获取到此角色对应的所有参数过滤数据源表信息
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
            message = "查找角色赋权数据源表失败: "+e.getMessage().replaceAll("\"", "'");
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
	 * 根据 role_id和table_id 删除参数过滤数据源表信息
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
            message = "删除角色赋权数据源表失败: "+e.getMessage().replaceAll("\"", "'");
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
