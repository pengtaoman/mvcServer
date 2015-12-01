package com.neusoft.tdframework.portal.bulletin.warnmsg.action;

import java.io.IOException;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.authorization.AuthorizeVO;
import com.neusoft.tdframework.common.util.NullProcessUtil;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.tdframework.common.util.DESUtil;

import javax.servlet.http.*;
import org.apache.struts.action.*;
import com.neusoft.tdframework.portal.bulletin.warnmsg.bo.WarnMsgBO;
import com.neusoft.tdframework.portal.bulletin.warnmsg.data.WarnMsgColl;
import com.neusoft.tdframework.portal.bulletin.warnmsg.data.WarnMsgVO;

/**<p>Module: com.neusoft.cph.frame.warnmsg.action</p>
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

public class PartRefreshWarnMsgAction extends TDDispatchAction{
	
	/** 通知类型为提醒 */
	private static final String BULLET_IN_TYPE_AWAKE = "3";
	private static final String BULLET_IN_TYPE_URGENCY = "2";
	private static final String BULLET_IN_TYPE_NORMAL = "1";
    /**
     * <p>Description: 初始化</p>
     * <p>Remark: </p>
     * @param actionMapping
     * @param actionForm
     * @param request
     * @param response
     * @return
     * @throws ActionException
     */
    public ActionForward init(ActionMapping actionMapping, ActionForm actionForm, HttpServletRequest request, HttpServletResponse response) throws ActionException    {
        return actionMapping.findForward("init");
    }

    /**
     * <p>Description: 查询按钮</p>
     * <p>Remark: </p>
     * @param actionMapping
     * @param actionForm
     * @param request
     * @param response
     * @return
     * @throws ActionException
     */
    public ActionForward getWarnMsg(ActionMapping actionMapping,ActionForm actionForm, HttpServletRequest request,HttpServletResponse response) throws ActionException, IOException{
        WarnMsgBO bo = (WarnMsgBO) getServiceFacade("warnMsgBO");
        String workNo = ((AuthorizeVO) request.getSession(true).getAttribute(GlobalParameters.SESSION_INFO)).getWorkNo();
        String passWordDs = (String)request.getSession(true).getAttribute("decodedPass");
        String endpassword = DESUtil.encrypt(passWordDs);
        WarnMsgColl warnColl =null;
        try{
            warnColl = bo.getWarnMsg(workNo);
        }catch (ServiceException se){
            SysLog.writeLogs("PartRefreshWarnMsgAction", "ERROR", "PartRefreshWarnMsgAction--getWarnMsg-1:" + se.getMessage());
        }catch (Exception e){
            SysLog.writeLogs("orderRepeal", "ERROR", "PartRefreshWarnMsgAction--getWarnMsg-2:" + e.getMessage());
            throw new ActionException(e.getMessage());
        }
        //if(warnColl!=null){
        //    request.setAttribute("warnColl",warnColl);
        //}
        StringBuffer marqueecontents = new  StringBuffer();
        StringBuffer marqueecontents_normal = new  StringBuffer();
        StringBuffer marqueecontents_awake = new  StringBuffer();
        StringBuffer marqueecontents_urgency = new  StringBuffer();
        StringBuffer marqueecontents_other = new  StringBuffer();
        if (warnColl != null && warnColl.getRowCount()>0){
            for (int i = 0; i < warnColl.getRowCount(); i++){
              WarnMsgVO warnMsgVO = warnColl.getWarnMsgVO(i);
              //modified by pengtao for CRM6 2011-02-24
              
            	  if (BULLET_IN_TYPE_NORMAL.equals(warnMsgVO.getBulletinTypeId())) {
            		  marqueecontents_normal
            	              .append("<span id='")
            	              .append(warnMsgVO.getBulletinID())
            	              .append("' onclick=\"warnDetail(this,'','")
            	              .append(workNo)
            	              .append("','")
            	              .append(endpassword)
            	              .append("');\" onmouseover=\"this.style.cursor='hand'\"   onmouseout=\"this.style.cursor='normal'\"><font color = 'green'>")
            	              .append(i+1)
            	              .append(",</font><font color = '#4690ff'>")
            	              .append(warnMsgVO.getBulletinType())
            	              .append("：")
            	              .append(warnMsgVO.getBulletinTitle())
            	              .append("； </font></span><br>");
            	  } else if (BULLET_IN_TYPE_URGENCY.equals(warnMsgVO.getBulletinTypeId())) {
            		  marqueecontents_urgency
		    	              .append("<span id='")
		    	              .append(warnMsgVO.getBulletinID())
		    	              .append("' onclick=\"warnDetail(this,'','")
		    	              .append(workNo)
		    	              .append("','")
		    	              .append(endpassword)
		    	              .append("');\" onmouseover=\"this.style.cursor='hand'\"   onmouseout=\"this.style.cursor='normal'\"><font color = 'green'>")
		    	              .append(i+1)
		    	              .append(",</font><font color = '#ff0009'>")
		    	              .append(warnMsgVO.getBulletinType())
		    	              .append("：")
		    	              .append(warnMsgVO.getBulletinTitle())
		    	              .append("； </font></span><br>");
                	  
				  } else if (BULLET_IN_TYPE_AWAKE.equals(warnMsgVO.getBulletinTypeId())) {
						marqueecontents_awake
								.append("<span id='")
								.append(warnMsgVO.getBulletinID())
								.append("'")
								.append("><font color = 'green'>")
								.append(i + 1)
								.append(",</font><font color='#ffd200'><span onmouseover=\"this.style.color='blue'\" onmouseout=\"this.style.color='#ffd200'\">")
								.append(warnMsgVO.getBulletinType())
								.append("：")
								.append(warnMsgVO.getBulletinTitle())
								.append("； </span></font></span><br>");
				 } else {
					 marqueecontents_other.append("<span id='").append(warnMsgVO.getBulletinID()).append("' onclick=\"warnDetail(this,'','"+workNo+"','"+endpassword+"');\"><font color = 'green'>").append(i+1).append(",</font><font color = 'blue'>").append(warnMsgVO.getBulletinType()).append("：").append(warnMsgVO.getBulletinTitle()).append("； </font></span>");
                 }
              } 
            marqueecontents
	          .append(marqueecontents_urgency)
	          .append(marqueecontents_normal)
	          .append(marqueecontents_awake)
	          .append(marqueecontents_other);
        } else {
        	marqueecontents.append("noMsg");
        	
        }
        
		response.setContentType("text/xml;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
    	response.getWriter().write(marqueecontents.toString());
        return null;
    }
}
