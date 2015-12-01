package com.neusoft.om.bo;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.om.dao.common.SwitchDAO;
import com.neusoft.om.dao.log.LogColl;
import com.neusoft.om.dao.log.LogDAO;
import com.neusoft.om.dao.log.LogVO;
import com.neusoft.om.dao.omswitch.OmSwitchDAO;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;

/**brief description
 * <p>Date       : 2004-12-27</p>
 * <p>Module     : om</p>
 * <p>Description: ��־ά���ӿ�ʵ��</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */
public class LogBOImpl implements DBLogger {
	private LogDAO logDAO;
	private AreaDAO areaDAO;
    private SwitchDAO switchDAO;
    private OmSwitchDAO omSwitchDAO;
    private ICacheManager manager = CacheConfig.manager;
    private static String ifLogByProc;
    private static Map cityMap;
    
	public LogColl getLogInfo(String partCity, String systemId, String menuId, String partMonth, String begTime, String endTime) throws ServiceException {
		LogColl coll = null;
		try{
			coll = logDAO.getLogInfo(partCity,systemId,menuId,partMonth,begTime,endTime);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"DutySystemBOImpl--getOrganDisplayInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}
		
	public int doAddLogInfo(LogVO vo) throws ServiceException {
		int code = 1;//�ɹ�
		try{
			logDAO.doAddLogInfo(vo);
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"LogBOImpl--getOrganDisplayInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}
    
    public int doAddLogInfoByProc(HashMap map) throws ServiceException {
        int code = 0;//�ɹ�
        LogVO vo=new LogVO();
        try {        	
        	
        	ifLogByProc = (String)manager.peek("ifLogByProc");//���ڻ�����ȡ������Ϣ
			
			if(ifLogByProc==null || ifLogByProc.trim().equals("")){				
				boolean logProc = omSwitchDAO.getLogProc();//�õ����ر��е����ã��Ƿ�ʹ�ô洢���̼�¼��־
				ifLogByProc = String.valueOf(logProc);
				if(ifLogByProc!=null && !ifLogByProc.trim().equals("")){       
					manager.putCacheObject("ifLogByProc",ifLogByProc);//��������Ϣд��������	
				}
			}
        	if(ifLogByProc.equals("true")){
        		code = logDAO.doAddLogInfoByProc(map);
        	}else{
            	
    			String workNo = (String) map.get("workNo");
    			String systemId = (String) map.get("systemId");
    			String buttonId = (String) map.get("buttonId");
    			String loginHost = (String) map.get("loginHost");
    			String operDesc = (String) map.get("operDesc");
    			String partCity = (String) map.get("partCity");
    			String areaId = (String) map.get("areaId");
    			if(areaId == null || areaId.equals("")){
    				areaId = logDAO.getAreaIdByWorkNo(workNo);
    			}
    			if(partCity == null || partCity.equals("")){
    				cityMap = (Map)manager.peek("cityMap");    				
        			if(cityMap==null || cityMap.isEmpty()){        				
        				partCity = logDAO.getPartCityByAreaId(areaId);
        				cityMap = getCityMap();
        				if(cityMap!=null && !cityMap.isEmpty()){       
        					manager.putCacheObject("cityMap",cityMap);//��������Ϣд��������	
        				}
        			}else{
        				partCity = (String)cityMap.get(areaId);
        			}
    			}
    			
    			Calendar cal=Calendar.getInstance();
    			SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    			Map<String,String> privilegeMap=logDAO.getPrivilegeInfoByMenuId(buttonId,systemId);
    			
    			if(!privilegeMap.get("log").equals("1")){
    				
    				StringBuffer sbf=new StringBuffer();
    				sbf.append("��ģ�鲻��¼��־.");
    				sbf.append("workNo="+workNo+";");
    				sbf.append("systemId="+systemId+";");
    				sbf.append("buttonId="+buttonId+";");
    				sbf.append("loginHost="+loginHost+";");
    				sbf.append("operDesc="+operDesc+";");
    				SysLog.writeLogs("om",GlobalParameters.WARN,sbf.toString());
    				
    				return -1;
    			}

    			vo.setPartCity(partCity);
    			vo.setPartMM(cal.get(Calendar.MONTH)+1);
    			vo.setAreaId(areaId);
    			vo.setEmployeeId(logDAO.getEmployeeIdByWorkNo(workNo));
    			vo.setWorkNo(workNo);
    			vo.setSystemId(privilegeMap.get("systemId"));
    			vo.setModuleId("0");
    			vo.setMenuId(privilegeMap.get("menuId"));
    			vo.setMenuName(privilegeMap.get("menuName"));
    			vo.setBottomId(privilegeMap.get("bottomId"));
    			vo.setBottomName(privilegeMap.get("bottomName"));
    			vo.setOperateDate(sf.format(cal.getTime()));
    			vo.setLoginHost(loginHost);
    			vo.setMac("");
    			vo.setOperateDesc(operDesc);
    			
    			code = logDAO.doAddLogInfo(vo);
        	}

		}catch (DataAccessException e) {
            code = -1; // �쳣
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogBOImpl--doAddLogInfoByProc1:"+e.getMessage());
            //throw new ServiceException(e);
        }catch (Exception e) {
            code = -1; // �쳣
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogBOImpl--doAddLogInfoByProc2:"+e.getMessage());
            //throw new ServiceException(e);
        }
        return code;
    }
    
    private Map getCityMap(){
    	Map cityMap = areaDAO.getCityMap();
    	return cityMap;
    }
	public void setLogDAO(LogDAO logDAO){
		this.logDAO = logDAO;
	}
    


    public void setAreaDAO(AreaDAO areaDAO)
    {
        this.areaDAO = areaDAO;
    }
    
    
    public void setSwitchDAO(SwitchDAO switchDAO)
    {
        this.switchDAO = switchDAO;
    }
    
    public void setOmSwitchDAO(OmSwitchDAO omSwitchDAO) {
		this.omSwitchDAO = omSwitchDAO;
	}

	/**
     *        
     * �õ���־��Ϣ����������
     * @param map(systemId,menuId,areaId,month,startDate,endDate,employeeWorkNo,description)
     * @return
     * @throws ServiceException
     */
    public int getLogRowCount(HashMap map) throws ServiceException{
        int allRows = 0;
                
        try{
        	allRows = logDAO.getLogRowCount(map);
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogBOImpl--getLogInfo:"+e.getMessage());
            throw new ServiceException(e);
        }        
        return allRows;
    }
    /**
     *        
     * �õ���־��Ϣ����
     * @param map(systemId,menuId,areaId,month,startDate,endDate,employeeWorkNo,description)
     * @return
     * @throws ServiceException
     */
    public LogColl getLogInfo(HashMap map,int startRow,int endRow) throws ServiceException{
        LogColl logColl = new LogColl();
        //LogColl returnLogColl = new LogColl();
                
        try{
            logColl = logDAO.getLogInfo(map,startRow,endRow);
//            for(int i = 0; i < logColl.getRowCount() ; i++){
//                LogVO logVO = logColl.getLog(i);
//                String employeeName = switchDAO.getEmoployeeNameById(logVO.getEmployeeId());
//                String areaName = switchDAO.getAreaNameByAreaId(logVO.getAreaId());
//                String systemName = switchDAO.getSystemNameById(logVO.getSystemId());
//                logVO.setAreaName(areaName);
//                logVO.setEmployeeName(employeeName);
//                logVO.setSystemName(systemName);
//                returnLogColl.addLog(logVO);
//            }
        }catch (DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogBOImpl--getLogInfo:"+e.getMessage());
            throw new ServiceException(e);
        }        
        return logColl;
    }
    
    private String getPartCity(String areaId){
        String partCity = "";
        if(areaId != null && !areaId.trim().equals("")){
            int areaLevel = areaDAO.getAreaLevelByAreaId(areaId);
            if(areaLevel < 3){
                partCity = areaId;
            }else if(areaId.length() >= 6 ){
                partCity = areaId.substring(3,6);
            }            
        }

        return partCity;
    }
    
    public LogVO getLogInfoBySequence(int sequence) throws ServiceException{
        LogVO vo = new LogVO();
        try{
            vo = logDAO.getLogInfoBySequence(sequence);
            String areaName = switchDAO.getAreaNameByAreaId(vo.getAreaId());
            String employeeName = switchDAO.getEmoployeeNameById(vo.getEmployeeId());
            String systemName = switchDAO.getSystemNameById(vo.getSystemId());
            vo.setAreaName(areaName);
            vo.setEmployeeName(employeeName);
            vo.setSystemName(systemName);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogBOImpl--getLogInfoBySequence:"+e.getMessage());
            throw new ServiceException(e);
        }
        return vo;
    }
    /**
     * ���� ��¼�ʺ� �� ����ʱ�� ��ȡ��־��ϸ��Ϣ
     * @param map
     * @return
     * @throws DataAccessException
     */
    public LogVO getDetailLogInfo(String partCity,String workNo,
        	String operTime) throws ServiceException{
    	LogVO vo = new LogVO();
    	String partMM = operTime.substring(5,7);
    	int a = Integer.parseInt(partMM);
        try{
            vo = logDAO.getDetailLogInfo(partCity,a,workNo,operTime);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogBOImpl--getLogInfoBySequence:"+e.getMessage());
            throw new ServiceException(e);
        }
        return vo;
    }
    /**
     * ���������������󶨵İ�ťֵ����ֵ��ӦOM_MENU_T���е�����F_MENU_IDֵ
     * @param btnID
     * @return
     * @throws ServiceException
     * 20110504 zhangjn
     */
    public LogVO isWriteLogs(String btnID) throws ServiceException {
    	LogVO vo = null;
        try{
            vo = logDAO.isWriteLogs(btnID);
        }catch(DataAccessException e){
            SysLog.writeLogs("om",GlobalParameters.ERROR,"LogBOImpl--isWriteLogs:"+e.getMessage());
            throw new ServiceException(e);
        }
        return vo;
    }
}
