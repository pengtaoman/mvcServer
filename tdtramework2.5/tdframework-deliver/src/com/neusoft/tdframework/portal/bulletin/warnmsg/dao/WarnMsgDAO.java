package com.neusoft.tdframework.portal.bulletin.warnmsg.dao;

import com.neusoft.tdframework.dao.BaseDao;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.portal.bulletin.warnmsg.data.WarnMsgColl;
/**<p>Module: com.neusoft.cph.frame.warnmsg.dao</p>
 * <p>Description: ��ȡ������Ϣ</p>
 * <p>Remark: </p>
 * <p>Date: 2006-10-31</p>
 *
 * @author wangzg
 * @version
 *
 * <p> �޸���ʷ</p>
 * <p> ��� ���� �޸��� �޸�ԭ��</p>
 *
 */

public interface WarnMsgDAO extends BaseDao{
    /**
     * <p>Description: ��ȡ������Ϣ</p>
     * <p>Remark: CPH_BULLETIN_ACCEPT_T</p>
     * @param workno  ����
     * @return WarnMsgColl
     * @throws DataAccessException
     */
    public WarnMsgColl getWarnMsg(String workno) throws DataAccessException;
}
