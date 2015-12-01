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
	 * ��ȡ������ƿ���
	 * @author yanglm
	 * @param  
	 * @return 
	 * 	String 
	 * @throws 
	 * 	Exception
	 */
	public String getIfUseCache() {
		try{
			ifUseCache = (String)manager.peek("ifUseCache");//���ڻ�����ȡ������Ϣ
			
			if(ifUseCache==null || ifUseCache.trim().equals("")){
				//�����ݿ���ȡ����������ֵ�������Ƿ�ʹ�û��棬�洢���ɺò��������������������Ϣ
				ifUseCache = getObject().getRoleCacheFlag();
				if(ifUseCache!=null && !ifUseCache.trim().equals("")){       
					manager.putCacheObject("ifUseCache",ifUseCache);//��������Ϣд��������	
				}
			}
		}catch(Exception e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
				"DataParamUtil--getIfUseCache()-1:"+e.getMessage());
		}
		
		return ifUseCache;
	}
	
	/**
	 * ��ȡȨ�޷�Χ���ƿ���
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
				//�����ݿ���ȡ����������ֵ���������ݲ������˵�Ȩ�޷�Χ����һ��ְԱ��һ�ű����ж����ɫ��Ϣ��ȷ��ȡ�����򲢼�
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
     * ����ʵ������
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
	 * ��ȡ��̨���Ӷ���
	 * @author yanglm
	 * @param
	 * @return
	 * 	DataParamManageDAO
	 * @throws
	 */
	public DataParamManageDAO getObject(){
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        AppContext appContext = new AppContextImpl();
        //Ȩ�޿�������Ϊ�գ�����ΪӦ����
        appContext.setApplicationName("");
        
        return (DataParamManageDAO)factory.getInteractionObject(DataParamManageDAO.BEAN, appContext);
	}
	
	/**
     * ��ȡ���˺��������������Ϣ�������û���ɫ�ܿ�������Ϣ��
     * @author yanglm
     * @param
     * 	employeeId	��ְԱ���
     * @param
     * 	tableId		������Դ���ʶ
     * @return
     * 	ParamObjectCollection
     * @throws 
     * 	ServiceException
     */
    public ParamObjectCollection getParamDataColl(String employeeId,
    		int tableId)throws ServiceException{
    	ParamObjectCollection paramColl = null;
    	
    	try{
    		//��ȡȨ�޷�Χ��ʶλ
    		int power_size_flag = Integer.parseInt(getPowerSizeFlag());
    		//false:��ȡ��ɫ��Ȩ��΢����������Ϣ��true:����ȡ��ɫ��Ӧ��������Ϣ��������΢������
    		
    		paramColl = getObject().getParamDataColl(employeeId,tableId,power_size_flag,"true");
    	
    		
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--getParamDataColl()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return paramColl;
    }
    
    /**
     * �õ��û�Ȩ��΢�������ӵĿ��Կ�����Ȩ����Ϣ
     * @author yanglm
     * @param
     * 	employeeId	��ְԱ���
     * @param
     * 	tableId		������Դ���ʶ
     * @return
     * 	dataFlag	�����ݱ�ʶ
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
     * �����û���������ݼ��ϸ��ݹ�����й��ˣ����ع��˺�Ľ��������Ϣ
     * @author yanglm
     * @param
     * 	dataColl	��ԭʼ���ݼ�
     * @param
     * 	employeeId	��ְԱ���
     * @param
     * 	tableName	������Դ����
     * @return
     * 	ParamObjectCollection
     * @throws 
     * 	ServiceException
     */
    public ParamObjectCollection doParamFiltrate(ParamObjectCollection dataColl,
    		String employeeId, String tableName)throws ServiceException{
    	this.backColl = null;
    	//��Ҫ���˵������ݼ�
		ParamObjectCollection filterColl = null;
		//Ȩ��΢����Ҫ���ӵ����ݼ�
		ParamObjectCollection needAddColl = null;
		//Ȩ��΢����Ҫ���˵������ݼ�
		ParamObjectCollection needDeleteColl = null;
		//��������������Ϣ
		List param_info = null;					
		//����������ID��NAME��Ϣ
		String[] main_column = new String[2];	
		//�û����ݽ�ɫ��Ϣ
		String optRoleInfo = null;				
		//��ȡ�����ʶ
		String session_key = null;
		
		try{
			if(dataColl == null){
				dataColl = new ParamObjectCollection();
				
				SysLog.writeLogs("om",GlobalParameters.ERROR,
						"DataParamUtil--doParamFiltrate()-1:"+"�û������ԭʼ���ݼ�����Ϊ�գ��޷�ִ�й���");
				
				return dataColl;
			}
			
			if(dataColl.getNeedFiltrate().equals("false")){
				SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--doParamFiltrate()-2:"+"���ݹ��˿��ر��رգ�ֱ�ӷ����û���������ݼ���Ϣ");
				return dataColl;
			}
			
			//�Ӵ���Ľ�����м��ع�������Դ����
			if(tableName==null || tableName.trim().intern()=="".intern()){
				tableName = dataColl.getParamTableName();
				
				if(tableName==null || tableName.trim().intern()=="".intern()){
					tableName = dataColl.getTable_name();
				}
				
				tableName = tableName.toUpperCase();
			}
			//�����ж��Ƿ��д洢��������,����и��ݱ����ڻ�����ȡ���ݽ����
			if(getIfUseCache().equals("1")){
				if(passiveFlag == false){
					
					//ְԱ������Դ��������Ӧ�Ľ�ɫ��Ϣ
					optRoleInfo = getObject().getParamRoleInfo(employeeId,tableName);
					//���û����ʶ
					session_key = optRoleInfo+":"+tableName;
					//�ӻ����л�ȡ��ͬ��ɫ����ͬ����Դ������ݹ�����Ϣ
					this.backColl = (ParamObjectCollection) manager.peek(session_key);
					
					if(this.backColl != null && this.backColl.getRowCount() >= 0){
						return this.backColl;
					}						
				}
			}
			//�õ���������������Ϣ������Դ��ID
			HashMap tableIdAndKeys = getParamColumnInfo(employeeId,tableName);
			//��ȡ����Դ��ID�͹�������������Ϣ
			String tableId = (String)tableIdAndKeys.get("tablaId");
			param_info = (List)tableIdAndKeys.get("columnList");
			
			if(tableId!=null && !tableId.trim().equals("")){
				//��ȡ����������ؼ��ֶ�ID��NAME�ֶ�
				main_column = getMainColumnInfo(tableId,1);
				
				//�������������ֶ�Ϊ��
				if(param_info==null || param_info.size()<=0 || main_column==null){
					SysLog.writeLogs("om",GlobalParameters.ERROR,
						"DataParamUtil--doParamFiltrate()-3:"
							+"�û����õ�����Դ�� "+tableName+" ����δ���ùؼ��ֶ���Ϣ��ֱ�ӷ����û���������ݼ���Ϣ");
					
					if(this.backColl == null)
						return setMainColumnInfo(dataColl,main_column);
					else
						return setMainColumnInfo(this.backColl,main_column);
				}else{
					int showNewData = getObject().getIfShowNewData(tableId);
					if(this.backColl == null){
						this.backColl = new ParamObjectCollection();	//���ص����ݼ���						
//						�õ���ɫȨ�ޱ������õ���Ϣ						
						filterColl = getParamDataColl(employeeId, Integer.parseInt(tableId));						
					}
						//�õ��û�Ȩ��΢�������ӵĿ��Կ�����Ȩ����Ϣ
						needAddColl = getEmployeeParamColl(employeeId, Integer.parseInt(tableId), 1);
						//�õ��û�Ȩ��΢����ȥ���Ŀ��Կ�����Ȩ����Ϣ
						needDeleteColl = getEmployeeParamColl(employeeId, Integer.parseInt(tableId), 0);
						
						//���û�н�ɫ���˵���������Ϣ
						//if(filterColl!=null && filterColl.getRowCount()>0){
							ParamObjectCollection cacheColl = new ParamObjectCollection();
							if(filterColl == null){
								filterColl = new ParamObjectCollection();
							}
							if(showNewData ==1 ){
								//�򷵻ص����ݼ�����ӽ�ɫ��ӵ�е�Ȩ����Ϣ
								cacheColl = doFiltrate(dataColl, filterColl, param_info, main_column, -1);
			
							}else{
								cacheColl = doFiltrate(dataColl, filterColl, param_info, main_column, 2);
							}
							
							//�ڻ�����д���ɫ��ӵ�е�Ȩ����Ϣ
							if(getIfUseCache().equals("1"))
								manager.putCacheObject(session_key,cacheColl);	
							cacheColl = null;
						//}
						
						//�򷵻ص����ݼ����������΢��ʱ���ӵ�Ȩ����Ϣ
						if(needAddColl!=null && needAddColl.getRowCount()>0)
							doFiltrate(dataColl, needAddColl, param_info, main_column, 0);
						
						//ɾ�����ص����ݼ�������΢��ʱ���ٵ�Ȩ����Ϣ
						if(needDeleteColl!=null && needDeleteColl.getRowCount()>0)
							this.backColl = doFiltrate(this.backColl, needDeleteColl, param_info, main_column, 1);
					
					//�ڷ������ݼ���ȷ���������ID��NAME
					if(this.backColl.getRowCount() > 0)
						this.backColl = setMainColumnInfo(this.backColl,main_column);
				}
			}else{
				//������Դ����ȥȡ���ֶ���Ϣ������Ĭ����Ϊһ�ű��������˶��ٴ�ֻ����һ��ID��NAME
				main_column = getMainColumnInfo(tableName,2);
				
				SysLog.writeLogs("om",GlobalParameters.ERROR,
					"DataParamUtil--doParamFiltrate()-4:"
						+"����ְԱ��� "+employeeId+" δ��ȡ��Ҫ���˵�����Դ����Ϣ��ֱ�ӷ����û���������ݼ���Ϣ");
				
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
     * ���ݴ�������ݼ��Ϻʹ����ݿ���ȡ������Ҫ���˵������ݼ������ȽϹ��˵�û��Ȩ�޵�������Ϣ
     * @author yanglm
     * @param
     * 	dataColl	��ԭʼ���ݼ�
     * @param
     * 	filterColl	���������ݼ�
     * @return
     * 	param_info	����������������Ϣ
     * @param
     * 	main_column	��������ؼ��ֶΣ�ID��NAME��Ϣ
     * @param
     * 	operFlag	��������ʶ��0����backColl����Ȩ����Ϣ������������һ�������ݼ���Ȩ��΢��������ٵ�����ʱʹ�ã�
     * @return
     * 	ParamObjectCollection
     * @throws 
     * 	ServiceException
     */
    private ParamObjectCollection doFiltrate(ParamObjectCollection dataColl,
    		ParamObjectCollection filterColl,List param_info,String[] main_column
    			,int operFlag) throws ServiceException{
    	//���ڱȽϵĹ����������ݴ������������ݿ��д洢���������Ƚ����ж��Ƿ���Ҫ���˵�ĳ������
    	String paramInfo = null;
    	ParamObjectCollection resultColl = new ParamObjectCollection();
    	
    	try{
    		for(int i=0;i<dataColl.getRowCount();i++){
				//��ȡ�������ݼ��е����ݣ����ݹؼ��ֶ�ƴװ���������ַ���
				ParamObject vo = dataColl.getParamObject(i);
				HashMap oldkeyMap = vo.getParamMap();
				HashMap keyMap = new HashMap();
				//ȡ���ؼ�������KEY��Ϣ
				if(oldkeyMap != null){
					Iterator columnInfo = oldkeyMap.keySet().iterator();
					//��KEYֵת���ɴ�д�ٴ���keyMap��
					while(columnInfo.hasNext()){
						String colummValue = (String)columnInfo.next();
						keyMap.put(colummValue.toUpperCase(),(String)oldkeyMap.get(colummValue));
					}
					oldkeyMap = null;
					
					for(int j=0;j<param_info.size();j++){
						//ȡ�������ֶ����ƣ�ת���ɴ�дȡ�������ֶ�����
						String paramColumn = (String)param_info.get(j);
						String msg = (String)keyMap.get(paramColumn.toUpperCase());
						
						//��װ�����������������������ݿ��д洢�����ݽ���ƥ��								
						paramInfo = j==0 ? msg : paramInfo+";"+msg;
					}
					
					boolean ifRemove = false;
					
					//ѭ��ƥ�����������Ϣ���õ����˺�Ľ������Ϣ
					for(int x=0;x<filterColl.getRowCount();x++){
						ParamObject obj = filterColl.getParamObject(x);
						String filterDataInfo = obj.getFilterDataInfo();
						
						if(filterDataInfo!=null && filterDataInfo.equals(paramInfo)){
							ifRemove = true;
							break;
						}
					}	
					//����ѭ��ƥ���û�й��˵������ݣ����뵽���ص����ݼ�����
					if(operFlag==-1 && !ifRemove){
						this.backColl.addParamObject(vo);
						resultColl.addParamObject(vo);
					}else if(operFlag==0 && ifRemove){
						this.backColl.addParamObject(vo);
					}else if(operFlag==1 && !ifRemove){
						resultColl.addParamObject(vo);
					}else if(operFlag == 2 && ifRemove){//showNewData = 0 ʱ�����set�����ؽ������
						resultColl.addParamObject(vo);
						this.backColl.addParamObject(vo);
					}
				}else{
					SysLog.writeLogs("om",GlobalParameters.ERROR,
						"DataParamUtil--doFiltrate()-5:"
							+"�û�δ�����ݲ�����������Ҫ�Ĺؼ��ֶ���Ϣд�����ݼ��У��޷����в������ˣ�ֱ�ӷ����û���������ݼ�");
					
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
     * ����������ݽ�������˺󣬽����������ݷ��ظ��û������ھֲ�ˢ��
     * @author yanglm
     * @param
     * 	dataColl	�����ݽ����
     * @param
     * 	employeeId	��ְԱ��ʶ
     * @param
     * 	tableName	����������Դ����
     * @return
     * 	StringBuffer
     * @throws
     * 	ServiceException
     */
    public StringBuffer getPassiveSelectTag(ParamObjectCollection dataColl,
    		String employeeId, String tableName) throws ServiceException {
    	
    	passiveFlag = true;    //ǿ�ƹرջ��棬��ֹ��Ϊ����ʹ���ݲ�׼ȷ
    	StringBuffer selectDate = new StringBuffer();
    	
    	try{
    		if(dataColl==null || dataColl.getRowCount()==0){
    			selectDate.append("\t<option value=''>������</option>\n");
    		}else{
    			ParamObjectCollection filtratedColl = doParamFiltrate(dataColl,employeeId,tableName);
    			passiveFlag = false;//�ѻ��濪���û���
        		if(filtratedColl==null || filtratedColl.getRowCount()==0){
        			selectDate.append("\t<option value=''>��Ȩ�鿴</option>\n");
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
     * ������ݼ����Ƿ�������ID��NAME��û�����õĻ���MAP��ȡ
     * @author yanglm
     * @param
     * 	dataColl	���������ݼ�
     * @param
     * 	main_column	�������������ID��NAME�ֶ�
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
					//ȡ���ؼ�������KEY��Ϣ
					if(oldkeyMap != null){
						Iterator columnInfo = oldkeyMap.keySet().iterator();
						//��KEYֵת���ɴ�д�ٴ���keyMap��
						while(columnInfo.hasNext()){
							String colummValue = (String)columnInfo.next();
							keyMap.put(colummValue.toUpperCase(),(String)oldkeyMap.get(colummValue));
						}
						
						oldkeyMap = null;
					}
					//���÷������ݼ���ID��Ϣ
					if(obj.getIds()==null || obj.getIds().equals("")){
						String ids = (String)keyMap.get(id_column.toUpperCase());
						obj.setIds(ids);
					}
					//���÷������ݼ���NAME��Ϣ
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
     * ��ȡ�������˱��ID��Ϣ��δʹ�ã�
     * @param
     * 	employeeId	��ְԱ��ʶ
     * @param
     * 	tableName	������Դ����
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
     * ��ȡ������������Ҫ�Ĺ���������Ϣ
     * @author yanglm
     * @param
     * 	employeeId	��ְԱ��ʶ
     * @param
     * 	tableName	������Դ����
     * @return
     * 	HashMap
     * @throws	
     * 	ServiceException
     */
    public HashMap getParamColumnInfo(String employeeId,String tableName)
    		throws ServiceException {
    	
    	HashMap tableIdAndRole = new HashMap();

		try{
			//�������ļ��ж�ȡ�������˹ؼ��ֶ����ͱ�ʶ
			String keyColumnType = FileUtil.getConfigParams("OmParams.properties","KEY_COLUMN_TYPE");
			if(keyColumnType==null || keyColumnType.trim().equals("")){
				keyColumnType = "1,3,4";        //���ݲ�������ʹ�õĹؼ��ֶ�,�����������ݵ�������Ϣ
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
     * ��ȡ������������Ҫ�Ĺ���������Ϣ
     * @author yanglm
     * @param
     * 	tableInfo	������Դ���ʶ������
     * @param
     * 	idOrName	����ʶλ��1��ʹ��ID��2��ʹ��NAME��
     * @return
     * 	String[]
     * @throws 
     * 	ServiceException
     */
    public String[] getMainColumnInfo(String tableInfo,int idOrName)
    		throws ServiceException {
    	
    	String[] mainColumn = null;

		try{
			//�������ļ��ж�ȡ�������˹ؼ��ֶ����ͱ�ʶ
			String keyColumnType = FileUtil.getConfigParams("OmParams.properties","MAIN_COLUMN_TYPE");
			if(keyColumnType==null || keyColumnType.trim().equals("")){
				keyColumnType = "1,2";          //������������Ҫʹ�õĹؼ��ֶΣ�ID��NAME��
			}
			//������Դ��IDȥȡ������������������ֶ���Ϣ
			if(idOrName == 1){
				int table_id = Integer.parseInt(tableInfo);
				mainColumn = getObject().getMainColumnInfo(table_id,keyColumnType);
			//������Դ����ȥȡ���ֶ���Ϣ������Ĭ����Ϊһ�ű��������˶��ٴ�ֻ����һ��ID��NAME
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
     * ��ʼ�����˲������ر���
     * @author yanglm
     * @param
     * @return
     * @throws
     */
    public void setParamFlag(){
		try{
			ifUseCache = (String)manager.peek("ifUseCache");
			
			if(ifUseCache==null || ifUseCache.trim().equals("")){
				//�����ݿ���ȡ����������ֵ�������Ƿ�ʹ�û��棬�洢���ɺò��������������������Ϣ
				ifUseCache = getObject().getRoleCacheFlag();
				if(ifUseCache!=null && !ifUseCache.trim().equals("")){      
					manager.putCacheObject("ifUseCache",ifUseCache);	
				}
			}
			
			powerSizeFlag = (String)manager.peek("powerSizeFlag");
			
			if(powerSizeFlag==null || powerSizeFlag.trim().equals("")){
				//�����ݿ���ȡ����������ֵ���������ݲ������˵�Ȩ�޷�Χ����һ��ְԱ��һ�ű����ж��ٽ�ɫ��Ϣ��ȷ��ȡ�����򲢼�
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
     * ���ɶ�̬����������Ϣ
     * @author yanglm
     * @param
     * 	paramName	����̬������
     * @param
     * 	session		��ϵͳ����
     * @param
     * 	powerFlag	��ʡ���û�Ȩ�޿��Ʊ�ʶ��0��ֻ�ܿ����Լ����ڵ�����1�����������
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
