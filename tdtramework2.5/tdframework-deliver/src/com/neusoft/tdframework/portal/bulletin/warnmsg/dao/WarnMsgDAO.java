package com.neusoft.tdframework.portal.bulletin.warnmsg.dao;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.portal.bulletin.warnmsg.data.WarnMsgColl;
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

public interface WarnMsgDAO extends BaseDao{
    /**
     * <p>Description: 获取公告信息</p>
     * <p>Remark: CPH_BULLETIN_ACCEPT_T</p>
     * @param workno  工号
     * @return WarnMsgColl
     * @throws DataAccessException
     */
    public WarnMsgColl getWarnMsg(String workno) throws DataAccessException;
}
