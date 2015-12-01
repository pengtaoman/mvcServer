/**
 * 文件说明信息
 */
package com.neusoft.om.bo;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.neusoft.om.dao.loginuserlist.LoginUserListVO;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.ServiceException;

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
public interface LoginUserListBO {

    /**
     * 查询区域列表集合
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param cityCode
     * @param cityLevel
     * @return
     * @throws ServiceException
     */
    public ParamObjectCollection getAreaCollection(String cityCode, int cityLevel) throws ServiceException;
	
    /**
     * 获取登录系统人员日志查询结果总数
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @return
     * @throws ServiceException
     */
    public int getLoginUserListCount(LoginUserListVO loginUserListVO)
            throws ServiceException;

    /**
     * 获取登录系统人员日志查询结果列表
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @param start
     * @param end
     * @return
     * @throws ServiceException
     */
    public List getLoginUserList(LoginUserListVO loginUserListVO, int start, int end)
            throws ServiceException;
    
    /**
     * 根据ID主键查询登录人员的详细信息
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param vo
     * @return
     */
    public LoginUserListVO getDetailById(LoginUserListVO loginUserListVO) throws ServiceException;
    /**
     * 导出登录系统人员信息
     * <p>Description: </p>
     * <p>Remark: </p>
     * @param loginUserListVO
     * @param start
     * @param end
     * @return
     * @throws ServiceException
     */
    public void exportAllLoginUserColl(Map map, OutputStream outputStream) throws ServiceException;
}
