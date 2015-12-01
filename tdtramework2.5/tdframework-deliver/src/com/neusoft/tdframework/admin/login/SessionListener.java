package com.neusoft.tdframework.admin.login;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

import org.apache.commons.logging.Log;

import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.service.log.LoggerManager;

public class SessionListener implements HttpSessionBindingListener {
    /**
     * Logger for this class，可设置category
     */
    private Log logger = LoggerManager.getAPPLogger("Logon");

    private String ps = null;

    private Date loginDate = null;

    private String ipInfo = "";

    private String sessionid = "";
    
    private String macaddress = "";

    private String dnsname = "";
    
    private int count = 0;

    private String logtype="";
    
    private String citycode="";

    /**
     * 构造方法，该方法会在LoginAction中调用
     * @param ps
     * @param sessionid
     * @param ip
     */
    public SessionListener(String ps, String sessionid, String ip,String macaddress,String hostname,String citycode) {
        this.ps = ps;
        this.ipInfo = ip;
        this.sessionid = sessionid;
        this.macaddress = macaddress;
        this.dnsname = hostname;
        this.citycode = citycode;
    }
    /**
     * 登录人数计数器
     * @return
     */
    public int getCount() {
        return count;
    }
    /**
     * valueBound()方法会在登录系统时记录日录及相关信息
     */
    public void valueBound(HttpSessionBindingEvent event) {
        Calendar calendar = new GregorianCalendar();
        loginDate = calendar.getTime();
        logtype = "0";//for test 0表示普通用户，1表示证书用户，这里需要读取
        
        InteractionObjectFactory factory = InteractionObjectFactory
        .getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        LoginUserDAO dao = (LoginUserDAO) factory.getInteractionObject("loginUserDAO",
                appContext);
        dao.insertUserList(sessionid, ps, logtype, ipInfo, loginDate, null, citycode,macaddress,dnsname);
        // add by zhaof 登陆成功，更新用户最后一次登录系统的时间 2010-3-10
        /* */
        boolean haveRecord = dao.haveRecord(ps);
        if(haveRecord){
        	dao.doUpdateLastLoginTime(ps);
        }else{
        	dao.doInsertLastLoginTime(ps);
        }
       
        // end
        //UserListDAO.insertUserList(sessionid, ps, logtype, ipInfo, loginDate,null, "");
        //以下记录登录系统时的日志，有时不是必须的，因为退出日志中同时记录了刚登录系统时的信息
        //if (logger.isInfoEnabled()) {
            logger.info(ipInfo + " LOGINLOG:" + " LoginType:" + logtype
                    + " Account:" + ps + " UserName:"
                    + ps + " LoginTIME:(" + loginDate + ")");
        //}
    }
    /**
     * valueUnbound()方法会在退出系统时记录日录及相关信息
     */
    public void valueUnbound(HttpSessionBindingEvent event) {
        Calendar calendar = new GregorianCalendar();
        InteractionObjectFactory factory = InteractionObjectFactory
        .getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        LoginUserDAO dao = (LoginUserDAO) factory.getInteractionObject("loginUserDAO",
                appContext);
        dao.delUserList(sessionid,citycode);
        //if (logger.isInfoEnabled()) {
            logger.info(ipInfo + " LOGINLOG:" + " LoginType:" + logtype
                    + " Account:" + ps + " UserName:"
                    + ps + " LoginTIME:(" + loginDate + ")"
                    + " LogoutTIME:(" + calendar.getTime() + ")");
        //}
    }
}
