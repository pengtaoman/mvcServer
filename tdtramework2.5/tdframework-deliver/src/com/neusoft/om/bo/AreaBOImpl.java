package com.neusoft.om.bo;

import java.util.Vector;

import com.neusoft.om.dao.area.AreaColl;
import com.neusoft.om.dao.area.AreaDAO;
import com.neusoft.om.dao.area.AreaVO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.common.GlobalParameters;

/**brief description
 * <p>Date       : 2004-11-01</p>
 * <p>Module     : om</p>
 * <p>Description: ��������ά��</p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		�޸���			�޸�ԭ��</p>
 * <p>   1                                       </p>
 */

public class AreaBOImpl implements AreaBO{
	private AreaDAO areaDAO;
	
	public AreaVO getAreaInfoById(String areaId) throws ServiceException {
		AreaVO vo = null;
		try {
			vo = new AreaVO();
			vo = areaDAO.getAreaById(areaId);
		} catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--getAreaAllInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return vo;
	}
	
	public AreaColl getAreaAllInfo() throws ServiceException {
		AreaColl coll = new AreaColl();
		try {
			coll = areaDAO.getAreaAllInfo();
		} catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--getAreaAllInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return coll;
	}

	public int doAddAreaInfo(AreaVO vo) throws ServiceException {
		int code = 1;
		int areaLevel;
		//�����������ļ���
		String parentAreaId = vo.getParentAreaId();
		try {
			areaLevel = areaDAO.getAreaLevelByAreaId(parentAreaId);
			if(areaLevel == -1){
				code = 0;
				throw new DataAccessException("���������������,�޷��õ����򼶱���Ϣ!"); 
			}
		}catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--getAreaLevelByParentAreaId:"+e.getMessage());
			throw new ServiceException(e);
		}
		vo.setAreaLevel(areaLevel);
		try {
			code = areaDAO.doAddAreaInfo(vo);
		} catch (DataAccessException e) {
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--addAreaInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}

	public int doModifyAreaInfo(AreaVO vo) throws ServiceException{
		int code = 1;
		
		try{
			code = areaDAO.doModifyAreaInfo(vo);
		}catch(DataAccessException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--modifyAreaInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return code;
	}
	/**
	 * �޸�����������Ϣ--ylm
	 * @param areaVO
	 * @return
	 * @throws DataAccessException
	 */
	public String modifyAreaInfo(AreaVO vo) throws ServiceException{
		String message = "";
		
		try{
			int code = areaDAO.modifyAreaInfo(vo);
			if(code < 0){
				message = "������Ϣ�޸�ʧ��";
			}else{
				message = "true";
			}
		}catch(DataAccessException e){
			SysLog.writeLogs("om",GlobalParameters.ERROR,
					"AreaBO--modifyAreaInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		return message;
	}

	public int doDeleteAreaInfoById(String areaId) throws ServiceException{
		int code = 1;
		try{
			code = areaDAO.doDeleteAreaInfo(areaId);
		}catch(DataAccessException e){
			code = 0;
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--modifyAreaInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return code;
	}
	
	public String getPartCityByAreaId(String areaId) throws ServiceException{
		String partCity = "";
		AreaVO areaVO = null;
		try{
			areaVO = areaDAO.getAreaById(areaId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--getPartCityByAreaId:"+e.getMessage());
			throw new ServiceException(e);
		}
		
		if(areaVO != null){
			int areaLevel = areaVO.getAreaLevel();
			if(areaLevel < 3){
				partCity = areaId;
			}else{	
				partCity = areaVO.getAreaId().trim().substring(3,6);
			}
		}
		return partCity;
	}
    /**
     * ������������Id�õ��ϼ���������ļ���
     * @param areaId 
     * @return areaLevel
     * @throws DataAccessException
     */
    public int getAreaLevelByAreaId(String areaId) throws ServiceException{
        int areaLevel = -1;
        try{
            areaLevel = areaDAO.getAreaLevelByAreaId(areaId);
        }catch(DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--getAreaLevelByAreaId:"+e.getMessage());
            throw new ServiceException(e);
        }
        return areaLevel;
    }
	public void setAreaDAO(AreaDAO maintenanceDAO) {
		areaDAO = maintenanceDAO;
	}
	/**
     * ���ݲ���Ա����������ȡ���е�������Ϣ
     * @param areaId areaLevel
     * @return areaLevel
     * @throws DataAccessException
     */
    public Vector getAllAreaInfo(String areaId,int areaLevel) throws ServiceException{
    	Vector coll = new Vector();
    	
        try{        	
        	coll = areaDAO.getAreaVec(areaId,areaLevel);
        }catch(DataAccessException e) {
            SysLog.writeLogs("om",GlobalParameters.ERROR,"AreaBO--getAllAreaInfo:"+e.getMessage());
            throw new ServiceException(e);
        }
        
        return coll;
    }
} 