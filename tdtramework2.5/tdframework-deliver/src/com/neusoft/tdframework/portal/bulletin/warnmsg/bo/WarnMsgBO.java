package com.neusoft.tdframework.portal.bulletin.warnmsg.bo;

import com.neusoft.tdframework.core.BaseBO;
import com.neusoft.tdframework.portal.bulletin.warnmsg.data.WarnMsgColl;
import com.neusoft.tdframework.exception.ServiceException;

/**<p>Module: com.neusoft.cph.frame.warnmsg.dao</p>
 * <p>Description: 获取公告信息</p>
 * <p>Remark: </p>
 * <p>Date: 2006-10-31</p>
 *
 * @author wangzg
 * @version
 *
 * <p> 修改历史</p>
 * <p> 序号 日期 修改人 修改原因</p>
 *
 */
public interface WarnMsgBO extends BaseBO {
    /**
     * <p>Description: 获取公告信息</p>
     * <p>Remark: CPH_BULLETIN_ACCEPT_T</p>
     * @param workno  工号
     * @return WarnMsgColl
     * @throws DataAccessException
     */
    public WarnMsgColl getWarnMsg(String workno) throws ServiceException;
}
