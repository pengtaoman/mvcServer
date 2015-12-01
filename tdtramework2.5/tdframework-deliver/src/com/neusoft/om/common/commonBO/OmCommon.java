package com.neusoft.om.common.commonBO;

import com.neusoft.om.common.commonDAO.OmCommonInfo;
import com.neusoft.om.common.commonDAO.OmCommonSelect;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.core.BaseBO;
//import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.config.CacheConfig;
import com.neusoft.unieap.service.cache.ICacheManager;
import com.neusoft.unieap.service.cache.exception.CachingException;

public class OmCommon implements BaseBO{
	public static final String BEAN = "omCommonBO";
	private ICacheManager manager = CacheConfig.manager;
	private OmCommonSelect omCommonSelect;
	private OmCommonInfo omCommonInfo;
	
	public void setOmCommonSelect(OmCommonSelect omCommonSelect){
        this.omCommonSelect = omCommonSelect;
    }
	
	public void setOmCommonInfo(OmCommonInfo omCommonInfo){
        this.omCommonInfo = omCommonInfo;
    }
	/**
     *获取地市信息
     * @return
     */
    public ParamObjectCollection getCityColl(int[] cityLevel)throws ServiceException{
		ParamObjectCollection cityColl = null;
		try{
			cityColl = (ParamObjectCollection) manager.peek("cityColl");
			if(cityColl==null){
				try{
					cityColl = omCommonSelect.getCityColl(cityLevel);
				}catch(DataAccessException e) {
					SysLog.writeLogs("om",GlobalParameters.ERROR,"OmCommon--getCityColl()-1:"+e.getMessage());
					throw new ServiceException(e);
				}
				manager.putCacheObject("cityColl",cityColl);
			}
		}
		catch(CachingException ce){
            return new ParamObjectCollection();
		}
		return cityColl;
    }
    
    public ParamObjectCollection getCityColl(int cityLevel,String cityCode)throws ServiceException{
		ParamObjectCollection cityColl = null;
		try{
			cityColl = omCommonSelect.getCityColl(cityLevel,cityCode);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmCommon--getCityColl()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return cityColl;
    }
    
    public ParamObjectCollection getRoleColl(String adminType, String employeeId)throws ServiceException{
		ParamObjectCollection roleColl = null;
		try{
			roleColl = omCommonSelect.getRoleColl(adminType, employeeId);
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmCommon--getRoleColl()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return roleColl;
    }
    
    public ParamObjectCollection getDutyColl()throws ServiceException{
		ParamObjectCollection dutyColl = null;
		try{
			dutyColl = omCommonSelect.getDutyColl();
		}catch(DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmCommon--getDutyColl()-1:"+e.getMessage());
			throw new ServiceException(e);
		}
		return dutyColl;
    } 
    
    /**
     *获取渠道名称信息
     * @return
     */
    public String getDealerNameInfo(String dealerId) throws ServiceException {
		String dealerName = "";
		try{
			dealerName= omCommonInfo.getDealerNameById(dealerId);
		}catch (DataAccessException e) {
			SysLog.writeLogs("om",GlobalParameters.ERROR,"OmCommon--getDealerNameInfo:"+e.getMessage());
			throw new ServiceException(e);
		}
		return dealerName;
	}
}
