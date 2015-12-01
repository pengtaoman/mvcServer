package com.neusoft.tdframework.portal.bulletin.warnmsg.bo;

import com.neusoft.tdframework.portal.bulletin.warnmsg.data.WarnMsgColl;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.portal.bulletin.warnmsg.dao.WarnMsgDAO;

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
public class WarnMsgBOImpl implements WarnMsgBO{
    private WarnMsgDAO warnMsgDAO;

    public void setWarnMsgDAO(WarnMsgDAO warnMsgDAO){
        this.warnMsgDAO = warnMsgDAO;
    }
    /**
     * <p>Description: ��ȡ������Ϣ</p>
     * <p>Remark: CPH_BULLETIN_ACCEPT_T</p>
     * @param workno  ����
     * @return WarnMsgColl
     * @throws DataAccessException
     */
    public WarnMsgColl getWarnMsg(String workno) throws ServiceException {
        WarnMsgColl warnColl = null;
        warnColl = warnMsgDAO.getWarnMsg(workno);
        return warnColl;
    }
}
