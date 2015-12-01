package com.neusoft.om.dao.dictionary;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/**brief description
 * <p>Date       : 2004-12-04</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author renh
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号      日期      修改人         修改原因</p>
 * <p>   1                                       </p>
 */

public interface OMDictionaryDAO extends BaseDao{
    
    public static final String BEAN = "omDictionaryDAO";

    /**
     * 获取所有性别的参数数据，
     * 
     */ 
    public ParamObjectCollection getGenderColl() throws DataAccessException ;
    
    /**
     * 获取学历参数数据
     * 
     */
    public ParamObjectCollection getEducateLevelColl() throws DataAccessException ;
    
    /**
     * 获取职位参数数据 
     *
     */
    public ParamObjectCollection getBusDutyColl() throws DataAccessException ;
    /**
     *获取薪资范围 
     *
     */
    public ParamObjectCollection getIncomeColl() throws DataAccessException ;
    /**
     * 获取组织机构类型
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOrganKindColl() throws DataAccessException ;
    /**
     * 获取婚姻状况
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getMarriageStatusColl() throws DataAccessException ;
    
    /**
     * 获取所属组织机构人员信息
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOrganEmployeeColl(String organId,String employeeId) throws DataAccessException ;
    /**
     * 根据组织机构id得到职务信息列表
     * @param organId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getDutyColl (String organId) throws DataAccessException;
    
    
    public ParamObjectCollection getDutyColl () throws DataAccessException;
    
    public ParamObjectCollection getOrganInfoByAreaId (String areaId) throws DataAccessException;
    
    public ParamObjectCollection getAreaColl() throws DataAccessException;
    
    public ParamObjectCollection getAreaColl(String areaId) throws DataAccessException;
    
    public ParamObjectCollection getPersonLevelColl() throws DataAccessException;
    /**
     * 获取操作级别列表
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOperLevelColl() throws DataAccessException;
    
    /**
     * 获取所属组织机构人员信息 -- 转为渠道系统提供
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getOrganEmployeeCollForChnl(String organId,String employeeId) throws DataAccessException ;
    /**
     * 如果areaId是地市（level = 3）则得到areaId确定的区域。
     * 如果areaId是省份或中心（level <= 2）则得到省份下全部的地市信息 
     * 如果areaId是区域以下级别的区域，则返回空
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaCollLevel3(String areaId) throws DataAccessException;
    /**
     * 如果areaId是地市（level = 3）则得到areaId确定的区域。
     * 如果areaId是省份或中心（level <= 2）则得到省份下全部的地市信息 
     * 如果areaId是区域以下级别的区域，则返回空
     * @param areaId
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaColl(String areaId,int areaLevel) throws DataAccessException;
    
    public ParamObjectCollection getAreaLevel() throws DataAccessException;
    
    public ParamObjectCollection getContainerColl() throws DataAccessException;
    
    public ParamObjectCollection getOperLevelColl(int adminLevel) throws DataAccessException;
}
