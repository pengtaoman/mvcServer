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
 * ������ : DataFilter.java.java
 * ����  : 2007-8-11
 * ����  : sunchonggui@neusoft.com
 * ģ��  : 
 * ����  : 
 * ��ע  : 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���  ����  �޸���   �޸�ԭ��
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
     *  ���ݽ�ɫ��Ż�ȡ���˱���������ֵ
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
     *  ����ְԱ��Ż�ȡ���˱���������ֵ
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
     *  ��ȡ���˱���������ֵ
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
     *  ��ȡ������Ϣ����
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
     *  ��ȡ�ñ��Ӧ�Ĺ�������Ϣ
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
            //�滻��ѯ�������������SQL�еĶ�̬����
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
    				//�����ɹ����������SQL�����װ��һ��LIST
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
            	//��ѯ�������������ONCHANGE����
            	List methodList = dataParamManageDAO.getOnChangeMethod(a,listColl,filterTagName,methodName);
            	//ѭ��LIST���ɹ�������������
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
     *  ��ȡ��ѯ�����
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
     * Ȩ��΢����������ְԱ��ű�ʶ��ȡ��ѯ�����
     * 
     * @param
     * @return
     */
    public HashMap getDataInfoColl(String tableId,String employeeId,
    		HashMap paramMap,int beginNum, int endNum, int showNewData) throws ServiceException{
        HashMap map=null;
        try{ 
        	//��ȡȨ�޷�Χ��ʶ
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
     *  ��ȡ��ѯ�����������
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
	 * ��ѯĳ����ɫ��Ӧ�Ĺ��˱�������Ϣ
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
	 * �������˱�������Ϣ
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
	 * ɾ�����˱�������Ϣ
	 * @param 
	 * @return
	 */
	public String deleteDescTableInfo(String roleId,String[] tableIds) 
		throws ServiceException{ 
		String message = "ɾ�����ݽ�ɫ��������Դ����Ϣ�ɹ�";
		int a = Integer.parseInt(roleId);
		
		try{    
			int code=dataParamManageDAO.deleteDescTableInfo(a,tableIds);
			if(code < 0){
				message = "ɾ�����ݽ�ɫ��������Դ����Ϣʧ��";
			}
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,
            	"DataParamManageBOImpl--deleteDescTableInfo()-1:"+e.getMessage());
            throw new ServiceException(e);
        }
		
		return message;
	}
	/**
     * ������������������Ϣ
     * @param 
     * @return
     */
    public String addParamRoleData(String roleId,String tableId,String tableDesc,String[] values) 
    	throws ServiceException{ 
		String message = "";
		int a = Integer.parseInt(roleId);
		int b = Integer.parseInt(tableId);
		
		try{  
			//ȡ���ݿ��д洢�ľɵĹ��˲�������Ϣ
			ParamObjectCollection oldColl = getParamDataColl(roleId,tableId);
			ParamObjectCollection deleteDataInfo = null;
    		ParamObjectCollection insertDataInfo = null;
			//ѭ������ɾ���Ͳ�����������ݼ���
    		int ifShowNewData = dataParamManageDAO.getIfShowNewData(tableId);
        	if(oldColl!=null && oldColl.getRowCount()>0){
        		deleteDataInfo = new ParamObjectCollection();
        		insertDataInfo = new ParamObjectCollection();
        		//������Ҫɾ���ľɵ����ݼ�����Ϣ
        		getDeleteData(values, oldColl, deleteDataInfo, ifShowNewData);
        		//������Ҫ������µ����ݼ�����Ϣ
        		getInsertData(values, oldColl, insertDataInfo, ifShowNewData);
        		
        		if(deleteDataInfo.getRowCount()==0 && insertDataInfo.getRowCount()==0){
        			message = addDescTableInfo(roleId,tableId,tableDesc);
        		}else{
        			message = dataParamManageDAO.addParamRoleData(a,b,tableDesc,deleteDataInfo,insertDataInfo);
        		}
        	}else{//����
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
			if(ifShowNewData == 1){//����������ݿɼ�
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
     * Ȩ��΢������������������������Ϣ
     * @param 
     * @return
     */
    public String addParamAdjustData(String employeeId,String tableId,String[] values) 
    	throws ServiceException{ 
		String message = "";
		int b = Integer.parseInt(tableId);
		
		try{  
			//ȡ���ݿ��д洢�ľɵĹ��˲�������Ϣ
			ParamObjectCollection oldRoleColl = getParamDataColl(employeeId,tableId,"false");
			ParamObjectCollection oldAdjustColl = dataParamManageDAO.getParamDataColl(employeeId,b);
			ParamObjectCollection deleteDataInfo = new ParamObjectCollection();
    		ParamObjectCollection insertDataInfo = new ParamObjectCollection();
    		ParamObjectCollection dataInfo = null;
    		
			//ѭ������ɾ���Ͳ�����������ݼ���
        	if(oldRoleColl!=null && oldRoleColl.getRowCount()>0){
        		dataInfo = new ParamObjectCollection();
        		//������Ҫɾ���ľɵ����ݼ�����Ϣ
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
        		//������Ҫ������µ����ݼ�����Ϣ
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
        					//�µ�Ȩ��΢��������
        					ParamObject vo = dataInfo.getParamObject(i);
                			String oldInfo = vo.getFilterDataInfo();
                			int oldFlag = vo.getFilterDataFlag();
        					for(int j=0;j<oldAdjustColl.getRowCount();j++){
        						//�ɵ�΢�����е�����
        						ParamObject obj = oldAdjustColl.getParamObject(j);
        						String adjustInfo = obj.getFilterDataInfo();
        						int adjustFlag = obj.getFilterDataFlag();
        						//����洢�����ݶ�����ͬ��������״̬��ͬ����Ѿɵ�΢�����е�����ɾ�����Ϳ�����
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
     * ����΢�����ݣ�������Դ�����������ݲ��ɼ�ʱ�����������
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
			/* ����΢����������ݺ�ɾ�����ݵļ��ϣ��߼�����
			 * 	checked		inRoleColl		inAdjustColl	operate		status
			 *  true		true			true			delete
			 *  ture		flase			false			insert		1
			 *  true		false			true			update		1
			 *  false		true			false			insert		0
			 *  false		true			true			update		0
			 *  false		false			true			delete
			 */
			for(int i=0; i<check.length; i++){
				int status = 1;//����Ȩ��
				String data = check[i];
				if(data!=null && !data.trim().equals("") && inColl(data,oldRoleColl)){//���ݿɼ������ڽ�ɫȨ���У�˵������Ҫ΢��
					if(inColl(data,oldAdjustColl)){//��΢��Ȩ���У�˵��ԭ����΢��Ȩ����ȡ��Ȩ�ޣ�����ɾ��
						ParamObject obj = getObjectByFilterData(data,oldAdjustColl);
						if(obj != null){
							deleteDataInfo.addParamObject(obj);
						}
					}
				}else if(data!=null && !data.trim().equals("") && !inColl(data,oldRoleColl)){//������ڽ�ɫȨ���У��ֿɼ���������Ҫ΢��
					if(inColl(data,oldAdjustColl)){//��΢��Ȩ���У���˵����΢������ȡ��Ȩ�ޣ�����update״̬ //�������������ܷ���
						ParamObject obj = getObjectByFilterData(data,oldAdjustColl);
						if(obj != null){
							obj.setFilterDataFlag(status);
							updateDataInfo.addParamObject(obj);
						}
					}else{//����΢��Ȩ���У�������
						ParamObject obj = new ParamObject();
						obj.setFilterDataFlag(status);
						obj.setFilterDataInfo(data);
						insertDataInfo.addParamObject(obj);
					}
				}
			}
			
			for(int i=0; i < uncheck.length; i++){
				int status = 0;//û��ѡ�е�����
				String data = uncheck[i];
				if(data!=null && !data.trim().equals("") &&!inColl(data,oldRoleColl)){//������ɼ����ֲ��ڽ�ɫȨ���С�˵������Ҫ΢��
					if(inColl(data,oldAdjustColl)){//��΢��Ȩ���У�˵��ԭ����΢��Ȩ��������Ȩ�ޣ�����ɾ��
						ParamObject obj = getObjectByFilterData(data,oldAdjustColl);
						if(obj != null){
							deleteDataInfo.addParamObject(obj);
						}
					}
				}else if(data!=null && !data.trim().equals("") && inColl(data,oldRoleColl)){//������ݲ��ɼ������ڽ�ɫȨ���У�˵����Ҫ΢��
					if(inColl(data,oldAdjustColl)){//��΢��Ȩ���У���˵����΢����������Ȩ�ޣ�����update ״̬ //�������������ܷ���
						ParamObject obj = getObjectByFilterData(data,oldAdjustColl);
						if(obj != null){
							obj.setFilterDataFlag(status);
							updateDataInfo.addParamObject(obj);
						}
					}else{//����΢��Ȩ���У�������
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
     * ��ȡ����������Ϣ
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
     * ��ȡ����������Ϣ
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
     * ��װ����Ȩ�޸�Ȩ��Ϣ
     * @param 
     * @return
     */
    public String makeParamDataInfo(String oldDataInfo,String unCheckData,String[] checkedValue, String tableId){
    	String info = "";
    	//�õ�����Դ�����õ�"���������Ƿ�ɼ�"��Ϣ
    	int showNewData = dataParamManageDAO.getIfShowNewData(tableId);
    	//�������ݿɼ�
    	if(showNewData == 1){
    		info = getUnshownData(oldDataInfo,unCheckData,checkedValue);
    	}else if(showNewData == 0){
    		info = getShownData(oldDataInfo,unCheckData,checkedValue);
    	}
    	return info;
	}
    
    /*
     * ����ԭ�����ݣ�ѡ�����ݣ�δѡ������
     * ��װ���浽Ȩ��ϵͳ���е�����
     * ����Դ�������������ݿɼ�ʱʹ�ô˷������������ݿɼ����򱣴浽Ȩ��ϵͳ���е��ǲ��ɼ����ݣ�
     */
    private String getUnshownData(String oldDataInfo,String unCheckData,String[] checkedValue){
		String dataInfo = "";
		String old_data = "";
		String new_data = "";
		
		try{  
			String[] oldValues = null;
			String[] unCheckValue = null;
			//�ھɵ�����Ȩ����Ϣ��ɾ���Ѿ�����Ȩ��������Ϣ
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
    			
    			//���µ�����Ȩ����Ϣ��ɾ����Ȩ����Ϣ�����е�������Ϣ
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
     * ����ԭ�����ݣ�ѡ�����ݣ�δѡ������
     * ��װ���浽Ȩ��ϵͳ���е�����
     * ����Դ�������������ݲ��ɼ�ʱʹ�ô˷������������ݲ��ɼ����򱣴浽Ȩ��ϵͳ���е��ǿɼ����ݣ�
     */
    private String getShownData(String oldDataInfo,String unCheckData,String[] checkedValue){
		String dataInfo = "";
		String old_data = "";
		String new_data = "";
		
		try{  
			String[] oldValues = null;
			String[] unCheckValue = null;
			//�ھɵ�����Ȩ����Ϣ��ɾ���Ѿ�����Ȩ��������Ϣ
			
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
    			
    			//���µ�����Ȩ����Ϣ��ɾ����Ȩ����Ϣ�����е�������Ϣ
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
