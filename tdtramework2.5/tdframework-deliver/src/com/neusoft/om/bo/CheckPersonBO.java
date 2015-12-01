/**
 * 
 */
package com.neusoft.om.bo;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.exception.ServiceException;

/***************************************************************
 * 程序名 : DataFilterBO.java.java
 * 日期  : 2007-7-17
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
/**
 * @author wbsuncg
 *
 */
public interface CheckPersonBO extends BaseBO{

    
     /**
     * 根据条件查询OM_EMPLOYEE_CHECK_T结果集总行数
     * @param 
     * @return
     */
    public int getRowCount(String fWorkNo,String checkFlag)throws ServiceException;
    
    
    /**
     * 根据条件查询OM_EMPLOYEE_CHECK_T结果集
     * @param 
     * @return
     */
    public List getColl(String fWorkNo,String checkFlag,int beginNum,int endNum)throws ServiceException;
    /**
     * 审核方法
     * @param 
     * @return
     */
    public String check(String fWorkNO,HttpServletRequest request)throws ServiceException;
    /**
     * 审核回退方法
     * @param 
     * @return
     */
    public String undoCheck(String fWorkNO)throws ServiceException;
    
   
    
}


