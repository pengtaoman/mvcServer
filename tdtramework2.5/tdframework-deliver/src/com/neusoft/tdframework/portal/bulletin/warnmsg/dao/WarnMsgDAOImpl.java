package com.neusoft.tdframework.portal.bulletin.warnmsg.dao;

import com.neusoft.tdframework.portal.bulletin.warnmsg.data.WarnMsgColl;
import com.neusoft.tdframework.portal.bulletin.warnmsg.data.WarnMsgVO;
import com.neusoft.tdframework.exception.DataAccessException;
import com.neusoft.tdframework.dao.BaseDaoImpl;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import com.neusoft.tdframework.common.GlobalParameters;
import java.sql.SQLException;
import com.neusoft.tdframework.log.SysLog;
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
public class WarnMsgDAOImpl extends BaseDaoImpl implements WarnMsgDAO{

    /**
     * <p>Description: 获取公告信息</p>
     * <p>Remark: CPH_BULLETIN_ACCEPT_T</p>
     * @param workno  工号
     * @return WarnMsgColl
     * @throws DataAccessException
     */
    public WarnMsgColl getWarnMsg(String workno) throws DataAccessException {
        WarnMsgColl warnColl = new WarnMsgColl();
        WarnMsgVO vo = null;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rest = null;
        int i = -1;
        StringBuffer bufSql = new StringBuffer();
        bufSql.append("select a.F_BULLETIN_ID,k.F_BULLETIN_KIND_NAME,a.F_BULLETIN_TITLE,k.f_bulletin_kind ");
        bufSql.append("from CPH_BULLETIN_ACCEPT_T a,CPH_BULLETIN_KIND_T k ");
        bufSql.append("where a.F_BULLETIN_KIND = k.F_BULLETIN_KIND and a.F_ACCEPT_PERSON = ? ");
        bufSql.append("and a.F_READ_FLAG = '0' and a.F_AVAILIBLE_BEGIN_TIME <= to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') ");
        bufSql.append("and a.F_AVAILIBLE_END_TIME >= to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') ");
        bufSql.append("order by CASE WHEN k.f_bulletin_kind=2 THEN '-1' ELSE f_bulletin_kind END,a.F_SEND_TIME desc ");
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(bufSql.toString());
            pstmt.setString(1, workno);
            rest = pstmt.executeQuery();
            while (rest.next()) {
                vo = new WarnMsgVO();
                vo.setBulletinID(rest.getString(1));
                vo.setBulletinType(rest.getString(2));
                vo.setBulletinTitle(rest.getString(3));
                vo.setBulletinTypeId(rest.getString(4));
                warnColl.addWarnMsgVO(vo);
            }
        } catch (SQLException e) {
            SysLog.writeLogs("getWarnMsg", GlobalParameters.ERROR,"getWarnMsg--getWarnMsg-1:" + e.getMessage());
            throw new DataAccessException(e);
        } catch (Exception e) {
            SysLog.writeLogs("getWarnMsg", GlobalParameters.ERROR,"getWarnMsg--getWarnMsg-2:" + e.getMessage());
            throw new DataAccessException(e);
        } finally {
            close(rest, pstmt, conn);
        }
        return warnColl;
    }
}
