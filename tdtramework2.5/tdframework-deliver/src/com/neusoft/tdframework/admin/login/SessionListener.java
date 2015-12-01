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
     * Logger for this class��������category
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
     * ���췽�����÷�������LoginAction�е���
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
     * ��¼����������
     * @return
     */
    public int getCount() {
        return count;
    }
    /**
     * valueBound()�������ڵ�¼ϵͳʱ��¼��¼�������Ϣ
     */
    public void valueBound(HttpSessionBindingEvent event) {
        Calendar calendar = new GregorianCalendar();
        loginDate = calendar.getTime();
        logtype = "0";//for test 0��ʾ��ͨ�û���1��ʾ֤���û���������Ҫ��ȡ
        
        InteractionObjectFactory factory = InteractionObjectFactory
        .getInstance();
        AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");
        LoginUserDAO dao = (LoginUserDAO) factory.getInteractionObject("loginUserDAO",
                appContext);
        dao.insertUserList(sessionid, ps, logtype, ipInfo, loginDate, null, citycode,macaddress,dnsname);
        // add by zhaof ��½�ɹ��������û����һ�ε�¼ϵͳ��ʱ�� 2010-3-10
        /* */
        boolean haveRecord = dao.haveRecord(ps);
        if(haveRecord){
        	dao.doUpdateLastLoginTime(ps);
        }else{
        	dao.doInsertLastLoginTime(ps);
        }
       
        // end
        //UserListDAO.insertUserList(sessionid, ps, logtype, ipInfo, loginDate,null, "");
        //���¼�¼��¼ϵͳʱ����־����ʱ���Ǳ���ģ���Ϊ�˳���־��ͬʱ��¼�˸յ�¼ϵͳʱ����Ϣ
        //if (logger.isInfoEnabled()) {
            logger.info(ipInfo + " LOGINLOG:" + " LoginType:" + logtype
                    + " Account:" + ps + " UserName:"
                    + ps + " LoginTIME:(" + loginDate + ")");
        //}
    }
    /**
     * valueUnbound()���������˳�ϵͳʱ��¼��¼�������Ϣ
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
