package com.neusoft.om.bo.dataParamRole.dataParamManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.neusoft.om.dao.dataParamRole.DataParamManageDAO;
import com.neusoft.om.omutil.DataParamUtil;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.FileUtil;
import com.neusoft.common.ParamObject;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;

/***************************************************************
 * 程序名 : DataFilter.java.java
 * 日期  : 2007-8-11
 * 作者  : sunchonggui@neusoft.com
 * 模块  : 
 * 描述  : 
 * 备注  : 
 * ------------------------------------------------------------
 * 修改历史
 * 序号  日期  修改人   修改原因
 * 1
 * 2
 ***************************************************************/
public class DataParamManageBOImpl implements DataParamManageBO{

    private DataParamManageDAO dataParamManageDAO;
    
    /**
     * @return Returns the dataParamManageDAO.
     */
    public DataParamManageDAO getDataParamManageDAO() {
        return dataParamManageDAO;
    }
    /**
     * @param dataParamManageDAO The dataParamManageDAO to set.
     */
    public void setDataParamManageDAO(DataParamManageDAO dataParamManageDAO) {
        this.dataParamManageDAO = dataParamManageDAO;
    }
    
    /**
     *  根据角色编号获取过滤表名下拉框值
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTableByRole(String roleId) 
    	throws ServiceException{
    	com.neusoft.tdframework.common.data.ParamObjectCollection tableColl=null;
	    try{    
	        tableColl=dataParamManageDAO.getTableByRole(roleId);
	    }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataParamManageBOImpl--getTableByRole()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return tableColl;
    }
    /**
     *  根据职员编号获取过滤表名下拉框值
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTableByEmployee(String employeeId) 
    	throws ServiceException{
	    com.neusoft.tdframework.common.data.ParamObjectCollection tableColl=null;
	    try{    
	        tableColl=dataParamManageDAO.getTableByEmployee(employeeId);
	    }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataParamManageBOImpl--getTableByEmployee()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return tableColl;
    }
    /**
     *  获取过滤表名下拉框值
     * @param
     * @return
     */
    public com.neusoft.tdframework.common.data.ParamObjectCollection getTable() throws ServiceException{
    	com.neusoft.tdframework.common.data.ParamObjectCollection tableColl=null;
	    try{    
	        tableColl=dataParamManageDAO.getTable();
	    }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"DataParamManageBOImpl--getTable()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return tableColl;
    }
    /**
     *  获取过滤信息描述
     * 
     * @param
     * @return
     */
    public String getParamTableDesc(String id,String tableId,String flag) throws ServiceException{
        String paramTableDesc="";
        try{ 
        	if(flag.equals("employee")){
        		paramTableDesc=dataParamManageDAO.getPowerDescByEmployee(id,tableId);
        	}else{
        		paramTableDesc=dataParamManageDAO.getParamTableDesc(id,tableId);
        	}	
        }catch(DataAccessException e){
                SysLog.writeLogs("om",GlobalParameters.ERROR,"DataParamManageBOImpl--getParamTableDesc()-1:"+e.getMessage());
               throw new ServiceException(e);
        }
         return paramTableDesc;
    }
    /**
     *  获取该表对应的过滤器信息
     * @param
     * @return
     */
    public HashMap getFilters(String tableId,HttpSession session) throws ServiceException{
        HashMap map=null;
        int a = Integer.parseInt(tableId);
        
        try{    
            map=dataParamManageDAO.getFilters(tableId);
            List list = (List)map.get("listColl");
            List listColl = (List)map.get("ifPassiveFilter");
            List filterTagName = (List)map.get("filterTagName");
            //替换查询过滤器下拉框的SQL中的动态参数
            List sqlListColl = new ArrayList();
            //List filterSql = new ArrayList();
            if(list != null){
            	for(int i=0;i<list.size();i++){
            		String sql = (String)list.get(i);
            		if(sql.indexOf("@") >= 0){
            			String[] params = sql.split("@");
                		sql = "";
        				for(int j=0;j<params.length;j++){
        					if(j%2 == 0){
        						sql = sql + " "+ params[j] + " ";
        						continue;
        					}else{
        						String temp = params[j];
        						temp = DataParamUtil.getInstance().getDynamicParamInfo(temp,session,1);
        						sql = sql + " "+ temp + " ";
        					}
        				}
            		}
    				//ParamObjectCollection coll = dataParamManageDAO.getParamFilterColl(sql);
    				//将生成过滤下拉框的SQL语句组装成一个LIST
    				if(!sql.trim().equals("")){
    					sqlListColl.add(sql);
//    					int beginStr = sql.indexOf("where");
//    					if(beginStr < 0){
//    						beginStr = sql.indexOf("WHERE");
//    					}
//    					
//    					if(beginStr < 0)
//    						filterSql.add(" where 1=1 ");
//    					else
//    						filterSql.add(sql.substring(beginStr));
    				}
            	}
            	
            	String methodName = FileUtil.getConfigParams("OmParams.properties","FILTER_ONCHANGE_METHOD");
            	if(methodName==null || methodName.trim().equals("")){
            		methodName = "showPassiveSelect";
            	}
            	//查询过滤器下拉框的ONCHANGE方法
            	List methodList = dataParamManageDAO.getOnChangeMethod(a,listColl,filterTagName,methodName);
            	//循环LIST生成过滤下拉框数据
            	listColl = dataParamManageDAO.getParamFilterColl(sqlListColl,listColl);
            	
            	//map.put("filterSql",filterSql);
            	map.put("listColl",listColl);
            	map.put("methodList",methodList);
            }
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--getFilters()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        
        return map;
    }
    /**
     *  获取查询结果集
     * 
     * @param
     * @return
     */
    public HashMap getInfoColl(String tableId,String roleId,HashMap paramMap,
    		int beginNum, int endNum) throws ServiceException{
        HashMap map=null;
        try{    
            map=dataParamManageDAO.getInfoColl(tableId,roleId,paramMap,beginNum,endNum);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--getInfoColl()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return map;
    }
    /**
     * 权限微调——根据职员编号标识获取查询结果集
     * 
     * @param
     * @return
     */
    public HashMap getDataInfoColl(String tableId,String employeeId,
    		HashMap paramMap,int beginNum, int endNum, int showNewData) throws ServiceException{
        HashMap map=null;
        try{ 
        	//获取权限范围标识
        	int powerFlag = Integer.parseInt(DataParamUtil.getInstance().getPowerSizeFlag());
        	map=dataParamManageDAO.getDataCollByEmployee(tableId,employeeId,paramMap,
                		beginNum,endNum,powerFlag,showNewData);
        	            
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--getInfoColl()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return map;
    }
    /**
     *  获取查询结果集的列数
     * 
     * @param
     * @return
     */
    public int getRowCount(String tableId,HashMap paramMap) throws ServiceException{
        int allRows=0;
        try{    
            allRows=dataParamManageDAO.getRowCount(tableId,paramMap);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--getRowCount()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
        return allRows;
        
    }
    /**
	 * 查询某个角色对应的过滤表描述信息
	 * @param 
	 * @return
	 */
	public List getDescTableInfo(String roleId) throws ServiceException{
		List list = new ArrayList();
		int a = 0;
		if(roleId != null && !roleId.trim().equals("")){
			a = Integer.parseInt(roleId);
		}
		
		try{    
			list=dataParamManageDAO.getDescTableInfo(a);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--getDescTableInfo()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
		
		return list;
	}
    /**
	 * 新增过滤表描述信息
	 * @param 
	 * @return
	 */
	public String addDescTableInfo(String roleId,String tableId,String tableDesc) 
		throws ServiceException{ 
		String msg = "false";
		int a = Integer.parseInt(roleId);
		int b = Integer.parseInt(tableId);
		
		try{    
			msg = dataParamManageDAO.addDescTableInfo(a,b,tableDesc);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--addDescTableInfo()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
		
		return msg;
	}
	/**
	 * 删除过滤表描述信息
	 * @param 
	 * @return
	 */
	public String deleteDescTableInfo(String roleId,String[] tableIds) 
		throws ServiceException{ 
		String message = "删除数据角色过滤数据源表信息成功";
		int a = Integer.parseInt(roleId);
		
		try{    
			int code=dataParamManageDAO.deleteDescTableInfo(a,tableIds);
			if(code < 0){
				message = "删除数据角色过滤数据源表信息失败";
			}
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--deleteDescTableInfo()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
		
		return message;
	}
	/**
     * 新增参数过滤数据信息
     * @param 
     * @return
     */
    public String addParamRoleData(String roleId,String tableId,String tableDesc,String[] values) 
    	throws ServiceException{ 
		String message = "";
		int a = Integer.parseInt(roleId);
		int b = Integer.parseInt(tableId);
		
		try{  
			//取数据库中存储的旧的过滤参数据信息
			ParamObjectCollection oldColl = getParamDataColl(roleId,tableId);
			ParamObjectCollection deleteDataInfo = null;
    		ParamObjectCollection insertDataInfo = null;
			//循环生成删除和插入的俩个数据集合
    		int ifShowNewData = dataParamManageDAO.getIfShowNewData(tableId);
        	if(oldColl!=null && oldColl.getRowCount()>0){
        		deleteDataInfo = new ParamObjectCollection();
        		insertDataInfo = new ParamObjectCollection();
        		//生成需要删除的旧的数据集合信息
        		getDeleteData(values, oldColl, deleteDataInfo, ifShowNewData);
        		//生成需要插入的新的数据集合信息
        		getInsertData(values, oldColl, insertDataInfo, ifShowNewData);
        		
        		if(deleteDataInfo.getRowCount()==0 && insertDataInfo.getRowCount()==0){
        			message = addDescTableInfo(roleId,tableId,tableDesc);
        		}else{
        			message = dataParamManageDAO.addParamRoleData(a,b,tableDesc,deleteDataInfo,insertDataInfo);
        		}
        	}else{//新增
        		if(values!=null && values.length>0){
        			insertDataInfo = new ParamObjectCollection();
        			
        			for(int i=0;i<values.length;i++){
        				ParamObject obj = new ParamObject();
        				obj.setFilterDataInfo(values[i]);
        				insertDataInfo.addParamObject(obj);
        			}
        			
        			message = dataParamManageDAO.addParamRoleData(a,b,tableDesc,deleteDataInfo,insertDataInfo);	
        		}
        	}
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--addParamRoleData()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
		
		return message;
	}
	private void getInsertData(String[] values, ParamObjectCollection oldColl, 
			ParamObjectCollection insertDataInfo, int ifShowNewData) {
		for(int j=0;j<values.length;j++){
			if(values[j].trim().equals("") || values[j].equals("null"))
				continue;
			
			boolean ifInsert = true;
			for(int i=0;i<oldColl.getRowCount();i++){
				ParamObject vo = oldColl.getParamObject(i);
				String oldInfo = vo.getFilterDataInfo();
				if(oldInfo.equals(values[j])){
					ifInsert = false;
					break;
				}
			}
			if(ifInsert == true){
				ParamObject obj = new ParamObject();
				obj.setFilterDataInfo(values[j]);
				insertDataInfo.addParamObject(obj);
			}
		}
	}
	private void getDeleteData(String[] values, ParamObjectCollection oldColl, 
			ParamObjectCollection deleteDataInfo, int ifShowNewData) {
		for(int i=0;i<oldColl.getRowCount();i++){
			ParamObject vo = oldColl.getParamObject(i);
			String oldInfo = vo.getFilterDataInfo();
			boolean ifDelete = true;
			if(ifShowNewData == 1){//如果新增数据可见
				for(int j=0;j<values.length;j++){
					if(values[j].trim().equals("") || values[j].equals("null"))
						continue;
					
						if(oldInfo.equals(values[j])){
							ifDelete = false;
							break;
						}		
				}	
				if(ifDelete == true){
					deleteDataInfo.addParamObject(vo);
				}
			}else{
				for(int j=0;j<values.length;j++){
					if(values[j].trim().equals("") || values[j].equals("null"))
						continue;
					if(oldInfo.equals(values[j])){
							ifDelete = true;
							deleteDataInfo.addParamObject(vo);
						}				
				}
			}
			
		}
	}
    /**
     * 权限微调——新增参数过滤数据信息
     * @param 
     * @return
     */
    public String addParamAdjustData(String employeeId,String tableId,String[] values) 
    	throws ServiceException{ 
		String message = "";
		int b = Integer.parseInt(tableId);
		
		try{  
			//取数据库中存储的旧的过滤参数据信息
			ParamObjectCollection oldRoleColl = getParamDataColl(employeeId,tableId,"false");
			ParamObjectCollection oldAdjustColl = dataParamManageDAO.getParamDataColl(employeeId,b);
			ParamObjectCollection deleteDataInfo = new ParamObjectCollection();
    		ParamObjectCollection insertDataInfo = new ParamObjectCollection();
    		ParamObjectCollection dataInfo = null;
    		
			//循环生成删除和插入的俩个数据集合
        	if(oldRoleColl!=null && oldRoleColl.getRowCount()>0){
        		dataInfo = new ParamObjectCollection();
        		//生成需要删除的旧的数据集合信息
        		for(int i=0;i<oldRoleColl.getRowCount();i++){
        			ParamObject vo = oldRoleColl.getParamObject(i);
        			String oldInfo = vo.getFilterDataInfo();
        			boolean ifInsert = true;
        			for(int j=0;j<values.length;j++){
    					if(oldInfo.equals(values[j])){
    						ifInsert = false;
        					break;
        				}
        			}
        			if(ifInsert){
        				vo.setFilterDataFlag(1);
        				dataInfo.addParamObject(vo);
        			}
        		}
        		//生成需要插入的新的数据集合信息
        		for(int j=0;j<values.length;j++){
        			boolean ifDelete = true;
        			for(int i=0;i<oldRoleColl.getRowCount();i++){
        				ParamObject vo = oldRoleColl.getParamObject(i);
            			String oldInfo = vo.getFilterDataInfo();
        				if(oldInfo.equals(values[j])){
        					ifDelete = false;
        					break;
        				}
        			}
        			if(ifDelete){
        				ParamObject obj = new ParamObject();
        				obj.setFilterDataInfo(values[j]);
        				obj.setFilterDataFlag(0);
        				dataInfo.addParamObject(obj);
        			}
        		}
        		
        		if(dataInfo.getRowCount()==0){
        			message = "true";
        		}else{
        			if(oldAdjustColl!=null && oldAdjustColl.getRowCount()>0){
        				for(int i=0;i<dataInfo.getRowCount();i++){
        					boolean ifDelete = false;
        					//新的权限微调的数据
        					ParamObject vo = dataInfo.getParamObject(i);
                			String oldInfo = vo.getFilterDataInfo();
                			int oldFlag = vo.getFilterDataFlag();
        					for(int j=0;j<oldAdjustColl.getRowCount();j++){
        						//旧的微调表中的数据
        						ParamObject obj = oldAdjustColl.getParamObject(j);
        						String adjustInfo = obj.getFilterDataInfo();
        						int adjustFlag = obj.getFilterDataFlag();
        						//如果存储的数据对象相同而且数据状态不同，则把旧的微调表中的数据删除掉就可以了
        						if(oldInfo.equals(adjustInfo) && oldFlag!=adjustFlag){
        							ifDelete = true;
        							break;
        						}
            				}
        					
        					if(ifDelete){
        						deleteDataInfo.addParamObject(vo);
        					}else{
        						insertDataInfo.addParamObject(vo);
        					}
        				}
        				
        				dataInfo = null;
    				}else{
    					insertDataInfo = dataInfo;
    					dataInfo = null;
    				}
        			
        			message = dataParamManageDAO.addParamAdjustData(employeeId,b,deleteDataInfo,insertDataInfo);
        		}
        	}else{
        		if(values!=null && values.length>0){       			
        			for(int i=0;i<values.length;i++){
        				ParamObject obj = new ParamObject();
        				obj.setFilterDataInfo(values[i]);
        				obj.setFilterDataFlag(0);
        				insertDataInfo.addParamObject(obj);
        			}
        			
        			message = dataParamManageDAO.addParamAdjustData(employeeId,b,deleteDataInfo,insertDataInfo);	
        		}
        	}
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--addParamAdjustData()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
		
		return message;
	}
    /**
     * 保存微调数据，当数据源配置新增数据不可见时调用这个方法
     * @param employeeId
     * @param tableId
     * @param values
     * @return
     * @throws ServiceException
     */
    public int addAdjustDataUnshowNew(String employeeId,String tableId,String[] uncheck, String[] check) 
	throws ServiceException{ 
    	int code = 0;
		int table = Integer.parseInt(tableId);	
		try{  
			ParamObjectCollection oldRoleColl = getParamDataColl(employeeId,tableId,"false");
			ParamObjectCollection oldAdjustColl = dataParamManageDAO.getParamDataColl(employeeId,table);
			ParamObjectCollection deleteDataInfo = new ParamObjectCollection();
			ParamObjectCollection insertDataInfo = new ParamObjectCollection();
			ParamObjectCollection updateDataInfo = new ParamObjectCollection();
			ParamObjectCollection dataInfo = null;
			/* 生成微调表插入数据和删除数据的集合，逻辑如下
			 * 	checked		inRoleColl		inAdjustColl	operate		status
			 *  true		true			true			delete
			 *  ture		flase			false			insert		1
			 *  true		false			true			update		1
			 *  false		true			false			insert		0
			 *  false		true			true			update		0
			 *  false		false			true			delete
			 */
			for(int i=0; i<check.length; i++){
				int status = 1;//增加权限
				String data = check[i];
				if(data!=null && !data.trim().equals("") && inColl(data,oldRoleColl)){//数据可见，又在角色权限中，说明不需要微调
					if(inColl(data,oldAdjustColl)){//在微调权限中，说明原来的微调权限是取消权限，所以删除
						ParamObject obj = getObjectByFilterData(data,oldAdjustColl);
						if(obj != null){
							deleteDataInfo.addParamObject(obj);
						}
					}
				}else if(data!=null && !data.trim().equals("") && !inColl(data,oldRoleColl)){//如果不在角色权限中，又可见，所以需要微调
					if(inColl(data,oldAdjustColl)){//在微调权限中，则说明在微调中是取消权限，所以update状态 //此种情况不大可能发生
						ParamObject obj = getObjectByFilterData(data,oldAdjustColl);
						if(obj != null){
							obj.setFilterDataFlag(status);
							updateDataInfo.addParamObject(obj);
						}
					}else{//不在微调权限中，则增加
						ParamObject obj = new ParamObject();
						obj.setFilterDataFlag(status);
						obj.setFilterDataInfo(data);
						insertDataInfo.addParamObject(obj);
					}
				}
			}
			
			for(int i=0; i < uncheck.length; i++){
				int status = 0;//没有选中的数据
				String data = uncheck[i];
				if(data!=null && !data.trim().equals("") &&!inColl(data,oldRoleColl)){//如果不可见，又不在角色权限中。说明不需要微调
					if(inColl(data,oldAdjustColl)){//在微调权限中，说明原来的微调权限是增加权限，所以删除
						ParamObject obj = getObjectByFilterData(data,oldAdjustColl);
						if(obj != null){
							deleteDataInfo.addParamObject(obj);
						}
					}
				}else if(data!=null && !data.trim().equals("") && inColl(data,oldRoleColl)){//如果数据不可见，又在角色权限中，说明需要微调
					if(inColl(data,oldAdjustColl)){//在微调权限中，则说明在微调中是增加权限，所以update 状态 //此种情况不大可能发生
						ParamObject obj = getObjectByFilterData(data,oldAdjustColl);
						if(obj != null){
							obj.setFilterDataFlag(status);
							updateDataInfo.addParamObject(obj);
						}
					}else{//不在微调权限中，则增加
						ParamObject obj = new ParamObject();
						obj.setFilterDataFlag(status);
						obj.setFilterDataInfo(data);
						insertDataInfo.addParamObject(obj);
					}
				}
			}		  			
	    	code = dataParamManageDAO.doModifyAdjustData(employeeId,table,deleteDataInfo,insertDataInfo,updateDataInfo);	
	    	
	    }catch(DataAccessException e){
	        SysLog.writeLogs("om",GlobalParameters.ERROR,
	        	"DataParamManageBOImpl--addParamAdjustData()-1:"+e.getMessage());
	        throw new ServiceException(e);
	    }
		
		return code;
	}
    private boolean inColl(String data,ParamObjectCollection coll){
    	boolean in = false;
    	for(int i=0; i < coll.getRowCount(); i++){
    		ParamObject vo = coll.getParamObject(i);
    		String filterData =vo.getFilterDataInfo();
    		if(filterData.trim().equals(data.trim())){
    			in = true;
    		}
    	}
    	return in;
    }
    
    private ParamObject getObjectByFilterData(String data,ParamObjectCollection coll){
    	ParamObject returnObj = null;
    	for(int i=0; i < coll.getRowCount(); i++){
    		ParamObject obj = coll.getParamObject(i);
    		String filterData = obj.getFilterDataInfo();
    		if(filterData.trim().equals(data.trim())){
    			returnObj = obj;
    		}
    	}
    	return returnObj;
    }
    
    /**
     * 获取过滤数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String roleId,String tableId) 
		throws ServiceException{ 
    	ParamObjectCollection oldColl = null;
		int a = Integer.parseInt(roleId);
		int b = Integer.parseInt(tableId);
		
		try{    
			oldColl=dataParamManageDAO.getParamDataColl(a,b);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--addParamRoleData()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
		
		return oldColl;
	}
    /**
     * 获取过滤数据信息
     * @param 
     * @return
     */
    public ParamObjectCollection getParamDataColl(String employeeId,String tableId,
    		String useRoleOnly) throws ServiceException{ 
    	ParamObjectCollection oldColl = null;
		int b = Integer.parseInt(tableId);
		
		try{ 
			int powerFlag = Integer.parseInt(DataParamUtil.getInstance().getPowerSizeFlag());
			oldColl=dataParamManageDAO.getParamDataColl(employeeId,b,powerFlag,"false");
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--getParamDataColl()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
		
		return oldColl;
	}
    /**
     * 组装数据权限赋权信息
     * @param 
     * @return
     */
    public String makeParamDataInfo(String oldDataInfo,String unCheckData,String[] checkedValue, String tableId){
    	String info = "";
    	//得到数据源表配置的"新增数据是否可见"信息
    	int showNewData = dataParamManageDAO.getIfShowNewData(tableId);
    	//新增数据可见
    	if(showNewData == 1){
    		info = getUnshownData(oldDataInfo,unCheckData,checkedValue);
    	}else if(showNewData == 0){
    		info = getShownData(oldDataInfo,unCheckData,checkedValue);
    	}
    	return info;
	}
    
    /*
     * 根据原来数据，选中数据，未选中数据
     * 组装保存到权限系统表中的数据
     * 数据源表配置新增数据可见时使用此方法（新增数据可见，则保存到权限系统表中的是不可见数据）
     */
    private String getUnshownData(String oldDataInfo,String unCheckData,String[] checkedValue){
		String dataInfo = "";
		String old_data = "";
		String new_data = "";
		
		try{  
			String[] oldValues = null;
			String[] unCheckValue = null;
			//在旧的数据权限信息中删除已经被赋权的数据信息
    		if(!oldDataInfo.trim().equals("")){
    			if(checkedValue!=null && checkedValue.length>0){
    				oldValues = oldDataInfo.split("~");
        			
        			for(int i=0;i<oldValues.length;i++){
            			boolean ifSave = true;
            			for(int j=0;j<checkedValue.length;j++){
            				if(oldValues[i].equals(checkedValue[j])){
            					ifSave = false;
            					break;
            				}
            			}
            			if(ifSave == true){
            				if(!oldValues[i].trim().equals("")){
            					old_data = old_data+oldValues[i]+"~";
            				}
            			}
            		}
    			}
    			
    			//在新的数据权限信息中删除旧权限信息中已有的数据信息
        		if(!unCheckData.trim().equals("")){
        			unCheckValue = unCheckData.split("~");
        			
        			for(int j=0;j<unCheckValue.length;j++){
            			boolean ifSave = true;
            			for(int i=0;i<oldValues.length;i++){
            				if(oldValues[i].equals(unCheckValue[j])){
            					ifSave = false;
            					break;
            				}
            			}
            			if(ifSave == true){
            				if(!unCheckValue[j].trim().equals("")){
            					new_data = new_data+unCheckValue[j]+"~";
            				}
            			}
            		}
        		}
        		
        		dataInfo = old_data + new_data;
    		}else{
    			dataInfo = unCheckData;
    		}
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--makeParamDataInfo()-1:"+e.getMessage());
        }
		
		return dataInfo;
    }
    /*
     * 根据原来数据，选中数据，未选中数据
     * 组装保存到权限系统表中的数据
     * 数据源表配置新增数据不可见时使用此方法（新增数据不可见，则保存到权限系统表中的是可见数据）
     */
    private String getShownData(String oldDataInfo,String unCheckData,String[] checkedValue){
		String dataInfo = "";
		String old_data = "";
		String new_data = "";
		
		try{  
			String[] oldValues = null;
			String[] unCheckValue = null;
			//在旧的数据权限信息中删除已经被赋权的数据信息
			
    		if(!oldDataInfo.trim().equals("")){
    			oldValues = oldDataInfo.split("~");
    			if(unCheckData!= null && !unCheckData.trim().equals("")){
        			unCheckValue = unCheckData.split("~");
        			if(unCheckValue.length > 0){
            			for(int i=0;i<oldValues.length;i++){
                			boolean ifSave = true;
                			for(int j=0;j<unCheckValue.length;j++){
                				if(oldValues[i].equals(unCheckValue[j])){
                					ifSave = false;
                					break;
                				}
                			}
                			if(ifSave == true){
                				if(!oldValues[i].trim().equals("")){
                					old_data = old_data+oldValues[i]+"~";
                				}
                			}
                		}
        			}
    			}
    			
    			//在新的数据权限信息中删除旧权限信息中已有的数据信息
        		if(checkedValue!=null && checkedValue.length>0){        			
        			for(int j=0;j<checkedValue.length;j++){
            			boolean ifSave = true;
            			for(int i=0;i<oldValues.length;i++){
            				if(oldValues[i].equals(checkedValue[j])){
            					ifSave = false;
            					break;
            				}
            			}
            			if(ifSave == true){
            				if(!checkedValue[j].trim().equals("")){
            					new_data = new_data+checkedValue[j]+"~";
            				}
            			}
            		}
        		}        		
        		dataInfo = old_data + new_data;
    		}else{
    			if(checkedValue != null && checkedValue.length >0){
    				for(int i=0; i <checkedValue.length; i++){
    					dataInfo = dataInfo+"~"+checkedValue[i];
    				}
    			}
    			//dataInfo = unCheckData;
    		}
        }catch(Exception e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--makeParamDataInfo()-1:"+e.getMessage());
        }
		
		return dataInfo;
    }
    
}
