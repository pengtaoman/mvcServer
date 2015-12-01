package com.neusoft.om.dao.checkPerson;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;

/***************************************************************
 * 程序名 : DataFilterDAO.java.java
 * 日期  : 2007-6-1
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
public interface CheckPersonDAO extends BaseDao{
        
    /**
     * 根据条件查询Bb_Account_Info_T结果集总行数
     * @param 
     * @return
     */
    public int getRowCount(String fWorkNo,String checkFlag) throws DataAccessException;
   
    /**
     * 根据条件查询OM_DATA_FILTER_T结果集
     * @param 
     * @return
     */
    public List getColl(String fWorkNo,String checkFlag,int beginNum,int endNum) throws DataAccessException;
    /**
     * 审核方法
     * @param 
     * @return
     */
    public String check(String fWorkNO,HttpServletRequest request)throws DataAccessException;
    /**
     * 审核回退方法
     * @param 
     * @return
     */
    public String undoCheck(String fWorkNO)throws DataAccessException;
}
