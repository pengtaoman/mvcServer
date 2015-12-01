package com.neusoft.om.omutil;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.neusoft.om.dao.dataParamRole.DataParamManageDAO;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.common.ParamObject;
import com.neusoft.common.ParamObjectCollection;
import com.neusoft.tdframework.common.util.FileUtil;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

public class DataParamUtil {
	private static DataParamUtil dataParamUtil = null;
	private static String ifUseCache;
	private static String powerSizeFlag;
	private boolean passiveFlag = false;
	private ICacheManager manager = CacheConfig.manager;
	
	private ParamObjectCollection backColl = null;
	
	private DataParamUtil(){
		
	}
	
	/**
	 * 获取缓存控制开关
	 * @author yanglm
	 * @param  
	 * @return 
	 * 	String 
	 * @throws 
	 * 	Exception
	 */
	public String getIfUseCache() {
		try{
			ifUseCache = (String)manager.peek("ifUseCache");//先在缓存中取参数信息
			
			if(ifUseCache==null || ifUseCache.trim().equals("")){
				//从数据库中取出参数数据值，控制是否使用缓存，存储生成好参数过滤下拉框的数据信息
				ifUseCache = getObject().getRoleCacheFlag();
				if(ifUseCache!=null && !ifUseCache.trim().equals("")){       
					manager.putCacheObject("ifUseCache",ifUseCache);//将参数信息写到缓存中	
				}
			}
		}catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"DataParamUtil--getIfUseCache()-1:"+e.getMessage());
		}
		
		return ifUseCache;
	}
	
	/**
	 * 获取权限范围控制开关
	 * @author yanglm
	 * @param  
	 * @return 
	 * 	String 
	 * @throws 
	 * 	Exception
	 */
	public String getPowerSizeFlag() {
		try{
			powerSizeFlag = (String)manager.peek("powerSizeFlag");
			
			if(powerSizeFlag==null || powerSizeFlag.trim().equals("")){
				//从数据库中取出参数数据值，控制数据参数过滤的权限范围，当一个职员在一张表上有多个角色信息，确定取交集或并集
				powerSizeFlag = getObject().getRolePowerFlag();
				if(powerSizeFlag!=null && !powerSizeFlag.trim().equals("")){
					manager.putCacheObject("powerSizeFlag",powerSizeFlag);
				}
			}
		}catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"DataParamUtil--getPowerSizeFlag()-1:"+e.getMessage());
		}
		
		return powerSizeFlag;
	}
	
	/**
     * 对象化实例方法
     * @author yanglm
     * @param
     * @return
     * @throws
     */
	public static synchronized DataParamUtil getInstance(){
		if(dataParamUtil == null){
			dataParamUtil = new DataParamUtil();
			dataParamUtil.setParamFlag();
			return dataParamUtil;
		}else{
			return dataParamUtil;
		}
	}
	
	/**
	 * 获取后台链接对象
	 * @author yanglm
	 * @param
	 * @return
	 * 	DataParamManageDAO
	 * @throws
	 */
	public DataParamManageDAO getObject(){
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        //权限可以配置为空，参数为应用名
        appContext.setApplicationName("");
        
        return (DataParamManageDAO)factory.getInteractionObject(DataParamManageDAO.BEAN, appContext);
	}
	
	/**
     * 获取过滤后的下拉框数据信息（所有用户角色能看到的信息）
     * @author yanglm
     * @param
     * 	employeeId	：职员编号
     * @param
     * 	tableId		：数据源表标识
     * @return
     * 	ParamObjectCollection
     * @throws 
     * 	ServiceException
     */
    public ParamObjectCollection getParamDataColl(String employeeId,
    		int tableId)throws ServiceException{
    	ParamObjectCollection paramColl = null;
    	
    	try{
    		//获取权限范围标识位
    		int power_size_flag = Integer.parseInt(getPowerSizeFlag());
    		//false:获取角色和权限微调的所有信息；true:至获取角色对应的数据信息，不包括微调数据
    		
    		paramColl = getObject().getParamDataColl(employeeId,tableId,power_size_flag,"true");
    	
    		
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--getParamDataColl()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return paramColl;
    }
    
    /**
     * 得到用户权限微调后增加的可以看见的权限信息
     * @author yanglm
     * @param
     * 	employeeId	：职员编号
     * @param
     * 	tableId		：数据源表标识
     * @return
     * 	dataFlag	：数据标识
     * @throws 
     * 	ServiceException
     */
    public ParamObjectCollection getEmployeeParamColl(String employeeId,
    		int tableId,int dataFlag)throws ServiceException{
    	ParamObjectCollection paramColl = null;
    	
    	try{
    		paramColl = getObject().getEmployeeParamColl(employeeId,tableId,dataFlag);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--getEmployeeParamColl(String,int,int)-1:"
						+ e.getMessage());
			throw new ServiceException(e);
		}
		
		return paramColl;
    }
    
    /**
     * 过滤用户传入的数据集合根据规则进行过滤，返回过滤后的结果集合信息
     * @author yanglm
     * @param
     * 	dataColl	：原始数据集
     * @param
     * 	employeeId	：职员编号
     * @param
     * 	tableName	：数据源表名
     * @return
     * 	ParamObjectCollection
     * @throws 
     * 	ServiceException
     */
    public ParamObjectCollection doParamFiltrate(ParamObjectCollection dataColl,
    		String employeeId, String tableName)throws ServiceException{
    	this.backColl = null;
    	//需要过滤掉的数据集
		ParamObjectCollection filterColl = null;
		//权限微调需要增加的数据集
		ParamObjectCollection needAddColl = null;
		//权限微调需要过滤掉的数据集
		ParamObjectCollection needDeleteColl = null;
		//过滤条件列名信息
		List param_info = null;					
		//过滤下拉框ID与NAME信息
		String[] main_column = new String[2];	
		//用户数据角色信息
		String optRoleInfo = null;				
		//存取缓存标识
		String session_key = null;
		
		try{
			if(dataColl == null){
				dataColl = new ParamObjectCollection();
				
				SysLog.writeLogs("om",GlobalParameters.ERROR,
						"DataParamUtil--doParamFiltrate()-1:"+"用户传入的原始数据集参数为空，无法执行过滤");
				
				return dataColl;
			}
			
			if(dataColl.getNeedFiltrate().equals("false")){
				SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--doParamFiltrate()-2:"+"数据过滤开关被关闭，直接返回用户传入的数据集信息");
				return dataColl;
			}
			
			//从传入的结果集中加载过滤数据源表名
			if(tableName==null || tableName.trim().intern()=="".intern()){
				tableName = dataColl.getParamTableName();
				
				if(tableName==null || tableName.trim().intern()=="".intern()){
					tableName = dataColl.getTable_name();
				}
				
				tableName = tableName.toUpperCase();
			}
			//首先判断是否有存储缓存数据,如果有根据表名在缓存中取数据结果集
			if(getIfUseCache().equals("1")){
				if(passiveFlag == false){
					
					//职员在数据源表上所对应的角色信息
					optRoleInfo = getObject().getParamRoleInfo(employeeId,tableName);
					//设置缓存标识
					session_key = optRoleInfo+":"+tableName;
					//从缓存中获取相同角色，相同数据源表的数据过滤信息
					this.backColl = (ParamObjectCollection) manager.peek(session_key);
					
					if(this.backColl != null && this.backColl.getRowCount() >= 0){
						return this.backColl;
					}						
				}
			}
			//得到过滤条件列名信息和数据源表ID
			HashMap tableIdAndKeys = getParamColumnInfo(employeeId,tableName);
			//获取数据源表ID和过滤条件列名信息
			String tableId = (String)tableIdAndKeys.get("tablaId");
			param_info = (List)tableIdAndKeys.get("columnList");
			
			if(tableId!=null && !tableId.trim().equals("")){
				//获取生成下拉框关键字段ID和NAME字段
				main_column = getMainColumnInfo(tableId,1);
				
				//如果主键或过滤字段为空
				if(param_info==null || param_info.size()<=0 || main_column==null){
					SysLog.writeLogs("om",GlobalParameters.ERROR,
						"DataParamUtil--doParamFiltrate()-3:"
							+"用户配置的数据源表 "+tableName+" 错误，未配置关键字段信息，直接返回用户传入的数据集信息");
					
					if(this.backColl == null)
						return setMainColumnInfo(dataColl,main_column);
					else
						return setMainColumnInfo(this.backColl,main_column);
				}else{
					int showNewData = getObject().getIfShowNewData(tableId);
					if(this.backColl == null){
						this.backColl = new ParamObjectCollection();	//返回的数据集合						
//						得到角色权限表中配置的信息						
						filterColl = getParamDataColl(employeeId, Integer.parseInt(tableId));						
					}
						//得到用户权限微调后增加的可以看见的权限信息
						needAddColl = getEmployeeParamColl(employeeId, Integer.parseInt(tableId), 1);
						//得到用户权限微调后去掉的可以看见的权限信息
						needDeleteColl = getEmployeeParamColl(employeeId, Integer.parseInt(tableId), 0);
						
						//如果没有角色过滤掉的数据信息
						//if(filterColl!=null && filterColl.getRowCount()>0){
							ParamObjectCollection cacheColl = new ParamObjectCollection();
							if(filterColl == null){
								filterColl = new ParamObjectCollection();
							}
							if(showNewData ==1 ){
								//向返回的数据集中添加角色所拥有的权限信息
								cacheColl = doFiltrate(dataColl, filterColl, param_info, main_column, -1);
			
							}else{
								cacheColl = doFiltrate(dataColl, filterColl, param_info, main_column, 2);
							}
							
							//在缓存中写入角色所拥有的权限信息
							if(getIfUseCache().equals("1"))
								manager.putCacheObject(session_key,cacheColl);	
							cacheColl = null;
						//}
						
						//向返回的数据集中添加数据微调时增加的权限信息
						if(needAddColl!=null && needAddColl.getRowCount()>0)
							doFiltrate(dataColl, needAddColl, param_info, main_column, 0);
						
						//删除返回的数据集中数据微调时减少的权限信息
						if(needDeleteColl!=null && needDeleteColl.getRowCount()>0)
							this.backColl = doFiltrate(this.backColl, needDeleteColl, param_info, main_column, 1);
					
					//在返回数据集中确定下拉框的ID和NAME
					if(this.backColl.getRowCount() > 0)
						this.backColl = setMainColumnInfo(this.backColl,main_column);
				}
			}else{
				//用数据源表名去取主字段信息，现在默认认为一张表不管配置了多少次只能用一套ID和NAME
				main_column = getMainColumnInfo(tableName,2);
				
				SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--doParamFiltrate()-4:"
						+"根据职员编号 "+employeeId+" 未获取到要过滤的数据源表信息，直接返回用户传入的数据集信息");
				
				dataColl = setMainColumnInfo(dataColl,main_column);
				return dataColl;
			}
			
			filterColl = null;
			needAddColl = null;
			needDeleteColl = null;
	
		}catch(CachingException ce){
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--doParamFiltrate()-7:"+ce.getMessage());
			throw new ServiceException(ce);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--doParamFiltrate()-8:"+e.getMessage());
			throw new ServiceException(e);
		}
		backColl = uniqueColl(backColl);
		return backColl;
    }

    
    /**
     * 根据传入的数据集合和从数据库中取出的需要过滤掉的数据集合做比较过滤掉没有权限的数据信息
     * @author yanglm
     * @param
     * 	dataColl	：原始数据集
     * @param
     * 	filterColl	：过滤数据集
     * @return
     * 	param_info	：过滤条件列名信息
     * @param
     * 	main_column	：下拉框关键字段，ID与NAME信息
     * @param
     * 	operFlag	：操作标识，0、向backColl增加权限信息；其他、返回一个新数据集（权限微调处理减少的数据时使用）
     * @return
     * 	ParamObjectCollection
     * @throws 
     * 	ServiceException
     */
    private ParamObjectCollection doFiltrate(ParamObjectCollection dataColl,
    		ParamObjectCollection filterColl,List param_info,String[] main_column
    			,int operFlag) throws ServiceException{
    	//用于比较的过滤条件数据串，它将和数据库中存储的内容做比较来判断是否需要过滤掉某条数据
    	String paramInfo = null;
    	ParamObjectCollection resultColl = new ParamObjectCollection();
    	
    	try{
    		for(int i=0;i<dataColl.getRowCount();i++){
				//获取传入数据集中的内容，根据关键字段拼装过滤条件字符串
				ParamObject vo = dataColl.getParamObject(i);
				HashMap oldkeyMap = vo.getParamMap();
				HashMap keyMap = new HashMap();
				//取出关键条件的KEY信息
				if(oldkeyMap != null){
					Iterator columnInfo = oldkeyMap.keySet().iterator();
					//将KEY值转换成大写再存入keyMap中
					while(columnInfo.hasNext()){
						String colummValue = (String)columnInfo.next();
						keyMap.put(colummValue.toUpperCase(),(String)oldkeyMap.get(colummValue));
					}
					oldkeyMap = null;
					
					for(int j=0;j<param_info.size();j++){
						//取出过滤字段名称，转换成大写取出过滤字段数据
						String paramColumn = (String)param_info.get(j);
						String msg = (String)keyMap.get(paramColumn.toUpperCase());
						
						//组装出过滤条件串，用来和数据库中存储的数据进行匹配								
						paramInfo = j==0 ? msg : paramInfo+";"+msg;
					}
					
					boolean ifRemove = false;
					
					//循环匹配过滤条件信息，得到过滤后的结果集信息
					for(int x=0;x<filterColl.getRowCount();x++){
						ParamObject obj = filterColl.getParamObject(x);
						String filterDataInfo = obj.getFilterDataInfo();
						
						if(filterDataInfo!=null && filterDataInfo.equals(paramInfo)){
							ifRemove = true;
							break;
						}
					}	
					//经过循环匹配后没有过滤掉的数据，插入到返回的数据集合中
					if(operFlag==-1 && !ifRemove){
						this.backColl.addParamObject(vo);
						resultColl.addParamObject(vo);
					}else if(operFlag==0 && ifRemove){
						this.backColl.addParamObject(vo);
					}else if(operFlag==1 && !ifRemove){
						resultColl.addParamObject(vo);
					}else if(operFlag == 2 && ifRemove){//showNewData = 0 时将结果set到返回结果集中
						resultColl.addParamObject(vo);
						this.backColl.addParamObject(vo);
					}
				}else{
					SysLog.writeLogs("om",GlobalParameters.ERROR,
						"DataParamUtil--doFiltrate()-5:"
							+"用户未将数据参数过滤所需要的关键字段信息写入数据集中，无法进行参数过滤，直接返回用户传入的数据集");
					
					return dataColl;
				}
			}
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--doFiltrate(ParamObjectCollection,ParamObjectCollection,List,String[],int)-6:"
						+ e.getMessage());
			throw new ServiceException(e);
		}
		
		return resultColl;
    }
    
    /**
     * 将传入的数据结果集过滤后，将下拉框内容返回给用户，用于局部刷新
     * @author yanglm
     * @param
     * 	dataColl	：数据结果集
     * @param
     * 	employeeId	：职员标识
     * @param
     * 	tableName	：过滤数据源表名
     * @return
     * 	StringBuffer
     * @throws
     * 	ServiceException
     */
    public StringBuffer getPassiveSelectTag(ParamObjectCollection dataColl,
    		String employeeId, String tableName) throws ServiceException {
    	
    	passiveFlag = true;    //强制关闭缓存，防止因为缓存使数据不准确
    	StringBuffer selectDate = new StringBuffer();
    	
    	try{
    		if(dataColl==null || dataColl.getRowCount()==0){
    			selectDate.append("\t<option value=''>无数据</option>\n");
    		}else{
    			ParamObjectCollection filtratedColl = doParamFiltrate(dataColl,employeeId,tableName);
    			passiveFlag = false;//把缓存开关置回来
        		if(filtratedColl==null || filtratedColl.getRowCount()==0){
        			selectDate.append("\t<option value=''>无权查看</option>\n");
        		}else{
        			for(int i=0;i<filtratedColl.getRowCount();i++){
            			ParamObject obj  = filtratedColl.getParamObject(i);
            			selectDate.append("\t<option value='"+obj.getIds()+"'>"+obj.getName()+"</option>\n");
            		}
        		}
    		}
    	}catch(ServiceException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--getPassiveSelectTag()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
    	
    	return selectDate;
    }
    
    /**
     * 检测数据集中是否设置了ID和NAME，没有设置的话在MAP中取
     * @author yanglm
     * @param
     * 	dataColl	：过滤数据集
     * @param
     * 	main_column	：生成下拉框的ID和NAME字段
     * @return
     * @throws 
     * 	ServiceException
     */
    public ParamObjectCollection setMainColumnInfo(ParamObjectCollection dataColl,String[] main_column)
    	 	throws ServiceException {
    	
    	ParamObjectCollection resultColl = new ParamObjectCollection();

		try{
			if(main_column==null || main_column.length<2)
				return dataColl;
			
			String id_column = main_column[0];
			String va_column = main_column[1];
			
			if(id_column!=null && !id_column.trim().equals("") && va_column!=null && !va_column.trim().equals("")){				
				for(int i=0;i<dataColl.getRowCount();i++){
					ParamObject obj = dataColl.getParamObject(i);
					if(obj.getIds()!=null && obj.getIds().trim().intern()!="".intern() && obj.getName()!=null){
						resultColl.addParamObject(obj);
						continue;
					}
					
					HashMap oldkeyMap = obj.getParamMap();
					HashMap keyMap = new HashMap();
					//取出关键条件的KEY信息
					if(oldkeyMap != null){
						Iterator columnInfo = oldkeyMap.keySet().iterator();
						//将KEY值转换成大写再存入keyMap中
						while(columnInfo.hasNext()){
							String colummValue = (String)columnInfo.next();
							keyMap.put(colummValue.toUpperCase(),(String)oldkeyMap.get(colummValue));
						}
						
						oldkeyMap = null;
					}
					//设置返回数据集的ID信息
					if(obj.getIds()==null || obj.getIds().equals("")){
						String ids = (String)keyMap.get(id_column.toUpperCase());
						obj.setIds(ids);
					}
					//设置返回数据集的NAME信息
					if(obj.getName() == null){
						String name = (String)keyMap.get(va_column.toUpperCase());
						obj.setName(name);
					}
					
					resultColl.addParamObject(obj);
				}
			}else{
				resultColl = dataColl;
			}
		}catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"DataParamUtil--setMainColumnInfo(ParamObjectCollection,String[])-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return resultColl;
    }
    
    /**
     * 获取参数过滤表的ID信息（未使用）
     * @param
     * 	employeeId	：职员标识
     * @param
     * 	tableName	：数据源表名
     * @return
     * 	int
     * @throws
     * 	ServiceException
     */
    public int getParamTableId(String employeeId,String tableName) 
    		throws ServiceException {
    	
    	int tableId = -1;

		try{
			tableId = getObject().getParamTableId(employeeId,tableName);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"DataParamUtil--getParamTableId(String,String)-1:"
					+ e.getMessage());
			throw new ServiceException(e);
		}
		
		return tableId;
    }
    
    /**
     * 获取参数过滤所需要的过滤条件信息
     * @author yanglm
     * @param
     * 	employeeId	：职员标识
     * @param
     * 	tableName	：数据源表名
     * @return
     * 	HashMap
     * @throws	
     * 	ServiceException
     */
    public HashMap getParamColumnInfo(String employeeId,String tableName)
    		throws ServiceException {
    	
    	HashMap tableIdAndRole = new HashMap();

		try{
			//在配置文件中读取参数过滤关键字段类型标识
			String keyColumnType = FileUtil.getConfigParams("OmParams.properties","KEY_COLUMN_TYPE");
			if(keyColumnType==null || keyColumnType.trim().equals("")){
				keyColumnType = "1,3,4";        //数据参数过滤使用的关键字段,用来过滤数据的主键信息
			}
			
			tableIdAndRole = getObject().getParamColumnInfo(employeeId,tableName,keyColumnType);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"DataParamUtil--getParamColumnInfo(String ,String)-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return tableIdAndRole;
    }
    
    /**
     * 获取参数过滤所需要的过滤条件信息
     * @author yanglm
     * @param
     * 	tableInfo	：数据源表标识或名称
     * @param
     * 	idOrName	：标识位，1、使用ID；2、使用NAME；
     * @return
     * 	String[]
     * @throws 
     * 	ServiceException
     */
    public String[] getMainColumnInfo(String tableInfo,int idOrName)
    		throws ServiceException {
    	
    	String[] mainColumn = null;

		try{
			//在配置文件中读取参数过滤关键字段类型标识
			String keyColumnType = FileUtil.getConfigParams("OmParams.properties","MAIN_COLUMN_TYPE");
			if(keyColumnType==null || keyColumnType.trim().equals("")){
				keyColumnType = "1,2";          //生成下拉框需要使用的关键字段（ID和NAME）
			}
			//用数据源表ID去取用来生成下拉框的主字段信息
			if(idOrName == 1){
				int table_id = Integer.parseInt(tableInfo);
				mainColumn = getObject().getMainColumnInfo(table_id,keyColumnType);
			//用数据源表名去取主字段信息，现在默认认为一张表不管配置了多少次只能用一套ID和NAME
			}else if(idOrName == 2){  
				mainColumn = getObject().getMainColumnInfo(tableInfo,keyColumnType);
			}
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--getMainColumnInfo(String,int)-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return mainColumn;
    }
    
    /**
     * 初始化过滤参数开关变量
     * @author yanglm
     * @param
     * @return
     * @throws
     */
    public void setParamFlag(){
		try{
			ifUseCache = (String)manager.peek("ifUseCache");
			
			if(ifUseCache==null || ifUseCache.trim().equals("")){
				//从数据库中取出参数数据值，控制是否使用缓存，存储生成好参数过滤下拉框的数据信息
				ifUseCache = getObject().getRoleCacheFlag();
				if(ifUseCache!=null && !ifUseCache.trim().equals("")){      
					manager.putCacheObject("ifUseCache",ifUseCache);	
				}
			}
			
			powerSizeFlag = (String)manager.peek("powerSizeFlag");
			
			if(powerSizeFlag==null || powerSizeFlag.trim().equals("")){
				//从数据库中取出参数数据值，控制数据参数过滤的权限范围，当一个职员在一张表上有多少角色信息，确定取交集或并集
				powerSizeFlag = getObject().getRolePowerFlag();
				if(powerSizeFlag!=null && !powerSizeFlag.trim().equals("")){
					manager.putCacheObject("powerSizeFlag",powerSizeFlag);
				}
			}
		}catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"DataParamUtil--setParamFlag()-1:"+e.getMessage());
		}
    }
    
    /**
     * 生成动态参数条件信息
     * @author yanglm
     * @param
     * 	paramName	：动态参数名
     * @param
     * 	session		：系统缓存
     * @param
     * 	powerFlag	：省份用户权限控制标识，0、只能看见自己所在地区；1、任意地区；
     * @return 
     * 	String
     * @throws
     */
    public String getDynamicParamInfo(String paramName,HttpSession session,
    		int powerFlag){
    	
    	StringBuffer paramInfo = new StringBuffer();
    	AuthorizeVO vo = (AuthorizeVO) session.getAttribute(GlobalParameters.SESSION_INFO);

		try{
			if(paramName.trim().toUpperCase().equals("CITY_CODE")){
				if(vo.getAreaLevel() < 3){
					if(powerFlag == 0){
						paramInfo.append(" '").append(vo.getCityCode()).append("' ");
					}else{
						paramInfo.append(" '%' ");
					}					
				}else{
					paramInfo.append(" '").append(vo.getCityCode()).append("' ");
				}
			}else if(paramName.trim().toUpperCase().equals("AREA_ID")){				
				if(vo.getAreaLevel() < 3){
					if(powerFlag == 0){
						paramInfo.append(" '").append(vo.getAreaId()).append("' ");
					}else{
						paramInfo.append(" '%' ");
					}					
				}else{
					paramInfo.append(" '").append(vo.getAreaId()).append("' ");
				}
			}
		}catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"DataParamUtil--getDynamicParamInfo()-1:"+e.getMessage());
		}
		
		return paramInfo.toString();
    }
    private ParamObjectCollection uniqueColl(ParamObjectCollection coll){
    	ParamObjectCollection uniqueColl = new ParamObjectCollection();
    	if(coll != null && coll.getRowCount() > 0){
    		for(int i=0; i < coll.getRowCount();i++){
    			ParamObject vo = coll.getParamObject(i);
    			if(!exist(uniqueColl, vo)){
    				uniqueColl.addParamObject(vo);
    			}    			
    		}    		
    	}
    	return uniqueColl;
    }
    private boolean exist(ParamObjectCollection coll,ParamObject vo ){
    	boolean exist = false;
    	if(coll != null && coll.getRowCount() > 0 && vo!= null && vo.getIds() != null && !vo.getIds().equals("")){
        	for(int i=0; i < coll.getRowCount() ; i++){
        		ParamObject obj = coll.getParamObject(i);
        		if(vo.getIds().equals(obj.getIds())){
        			exist = true;
        		}
        	}
    	}

    	return exist;
    }
}
