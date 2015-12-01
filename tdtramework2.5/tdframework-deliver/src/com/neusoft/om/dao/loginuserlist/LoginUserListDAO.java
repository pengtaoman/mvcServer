/**
 * 文件说明信息
 */
package com.neusoft.om.dao.loginuserlist;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.DataAccessException;

/**<p>Module: </p>
 * <p>Description: </p>
 * <p>Remark: </p>
 * <p>Date: 2010-06-12</p>
 *
 * @author liushen
 * @version
 * 
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 * 
 */
public interface LoginUserListDAO {

    /**
     * 查询区域列表集合
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param cityCode
     * @param cityLevel
     * @return
     * @throws DataAccessException
     */
    public ParamObjectCollection getAreaCollection(String cityCode, int cityLevel) throws DataAccessException;
	
    /**
     * 获取登录系统人员日志查询结果总数
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws DataAccessException
     */
    public int getLoginUserListCount(LoginUserListVO loginUserListVO)
            throws DataAccessException;

    /**
     * 获取登录系统人员日志查询结果列表
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws DataAccessException
     */
    public List getLoginUserList(LoginUserListVO loginUserListVO, int start, int end)
            throws DataAccessException;
    
    /**
     * 根据ID主键查询登录人员的详细信息
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public LoginUserListVO getDetailById(LoginUserListVO vo) throws DataAccessException;
    
    /**
     * 导出登录人员的详细信息
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public void exportAllLoginUserColl(Map map, OutputStream outputStream) throws DataAccessException;
}
