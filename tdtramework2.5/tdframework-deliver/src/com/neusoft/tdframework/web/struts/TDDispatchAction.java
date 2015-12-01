/*
 * Created on Jan 9, 2006
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.web.struts;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.ecside.util.RequestUtil;

import com.neusoft.tdframework.action.TDServletWrapper;
import com.neusoft.tdframework.action.TDServletWrapperFactory;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.log.DBLogger;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.unieap.action.EAPDispatchAction;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;
import com.neusoft.unieap.ria.IDataCenter;
import com.neusoft.unieap.ria.IDataStore;
import com.neusoft.unieap.ria.impl.DataCenter;
import com.neusoft.unieap.ria.io.DataCenterIOManager;
import com.neusoft.unieap.ria.io.DataCenterReader;
import com.neusoft.unieap.ria.io.DataCenterWriter;
import com.neusoft.unieap.ria.pojo.util.PojoUtil;



/**brief description
 * <p>Date       : 2006-04-15</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author zhangjn@neusoft.com
 * @version 
 * <p>------------------------------------------------------------</p>
 * <p> 修改历史</p>
 * <p>  序号		日期		修改人			修改原因</p>
 * <p>   1                                       </p>
 */

public class TDDispatchAction extends EAPDispatchAction
{
    //是否需要进行中文编码转换
    private boolean encoding = true;

    //转换的字符集 gb2312:UTF-8
    private String charset = "gb2312";

    //是否需要权限认证
    private boolean ifneedauth = false;
    
    //service manager

    public TDDispatchAction()
    {
        super();
        // TODO Auto-generated constructor stub
    }

    private void setIfNeedAuth(boolean b1)
    {
        this.ifneedauth = b1;
    }

    protected boolean getIfNeedAuth()
    {
        return this.ifneedauth;
    }

    private void setCharset(String s1)
    {
        this.charset = s1;
    }

    protected String getCharset()
    {
        return this.charset;
    }

    private void setEnCoding(boolean b1)
    {
        this.encoding = b1;
    }

    protected boolean convertStringtoBoolean(String s1)
    {
        boolean b1 = false;
        if (s1.equalsIgnoreCase("true") || s1.equalsIgnoreCase("yes"))
        {
            b1 = true;
        }
        return b1;
    }
    
	/**
	**获取总行数
	*/
	public static int getTotalRowsFromRequest(HttpServletRequest request){
		return RequestUtil.getTotalRowsFromRequest(request);
    }
	public static int getTotalRowsFromRequest(HttpServletRequest request,String tableId){
		return RequestUtil.getTotalRowsFromRequest(request,tableId);
    }
	
	/**
	**获取翻页时的起始行数和结束行数
	*/
    public static int[] getStartEnd(HttpServletRequest request, int totalRows,int defautPageSize) {
        int offSet=1;    //控制起始位置变量
        return RequestUtil.getRowStartEnd(request,totalRows,defautPageSize,offSet);
	}
	
    public static int[] getStartEnd(HttpServletRequest request,String table, int totalRows,int defautPageSize) {
        int offSet=1;    //控制起始位置变量
        return getStartEnd(request,table,totalRows,defautPageSize,offSet);
	}
    
	public  static int[] getStartEnd(HttpServletRequest request, int totalRows,int defautPageSize,int offSet) {
		return getStartEnd(request,null,totalRows,defautPageSize,offSet);
	}
	
	public static int[] getStartEnd(HttpServletRequest request,String table, int totalRows,int defautPageSize,int offSet) {
		return RequestUtil.getRowStartEnd(request,table,totalRows,defautPageSize,offSet);
	} 
	
	
	public static int getPageNo(HttpServletRequest request) {
		return RequestUtil.getPageNo(request);
	}

	public static void beforeDirectExport(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException {
		RequestUtil.beforeExport(request, response);
	}   
	public static void afterDirectExport(HttpServletRequest request,HttpServletResponse response) throws IOException {
		RequestUtil.afterExport(request, response);
	}  
	
	/**
     * 取得web.xml配置文件中的配置信息
     */
    private void getConfig(){

        String s1 = getServlet().getServletConfig().getInitParameter(
                GlobalParameters.ENCODING);
        String s2 = getServlet().getServletConfig().getInitParameter(
                GlobalParameters.IFNEEDAUTH);
        String s3 = getServlet().getServletConfig().getInitParameter(
                GlobalParameters.CHARSET);

        if (s1 != null && s1.intern() != "".intern())
        {
            setEnCoding(convertStringtoBoolean(s1));
        }
        if (s2 != null && s2.intern() != "".intern())
        {
            setIfNeedAuth(convertStringtoBoolean(s2));
        }
        if (s3 != null && s3.intern() != "".intern())
        {
            setCharset(s3);
        }
        SysLog.writeLogs("tdframework", GlobalParameters.DEBUG, "-encoding-"
                + s1 + "-:ifneedauth-" + s2);
    }

    /**
     * 
     * @param serviceFacadeName
     * @return
     */
    public Object getServiceFacade(String serviceFacadeName,
            ActionMapping actionMapping)
    {
        InteractionObjectFactory factory = InteractionObjectFactory
                .getInstance();
        return (Object) factory.getInteractionObject(serviceFacadeName,
                getAppContext(actionMapping));
    }
    public Object getServiceFacade(String serviceFacadeName)
    {
        InteractionObjectFactory factory = InteractionObjectFactory
                .getInstance();
		AppContext appContext = new AppContextImpl();
        appContext.setApplicationName("");

        return (Object) factory.getInteractionObject(serviceFacadeName,appContext);
    }
    /**
     * 
     * @param actionMapping
     * @return
     */
    private String getAppName(ActionMapping actionMapping)
    {
        return actionMapping.getModuleConfig().getPrefix().substring(1);
    }
    /**
     * 
     * @param actionMapping
     * @return
     */
    public AppContext getAppContext(ActionMapping actionMapping)
    {
		String appName = getAppName(actionMapping);
		AppContext appContext = new AppContextImpl();
        appContext.setApplicationName(appName);
        return appContext;
    }
    
    public DBLogger getDBLogger()
    {    
         InteractionObjectFactory factory = InteractionObjectFactory.getInstance();                 
         AppContext appContext = new AppContextImpl();
         appContext.setApplicationName("");
         DBLogger logger = (DBLogger) factory.getInteractionObject("logFacade",appContext);           
         return logger;  
    }
    
    
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
    
    protected Class[] typesTD = {TDServletWrapper.class };
    
    protected final static String TD_METHODCACHE_PREFIX="TD_METHODCACHE_PREFIX";
    protected final static String TD_DEFAULT_METHOD="defaultMethod";
    protected final static String TD_NEW_FORWARD_PREFIX="NEW:";
    
    /** CRM2.0 FOR CRM 2.0 BEGIN   */
    
    /** 从前端取得DataCenter后，设置到request属性的KEY*/
    private final static String PARP_KEY_DATACENTER = "dataCenterFromRequest";
    
    /** 前端设置的标识页面VO classname的KEY*/
    private final static String PARP_KEY_PAGEDATACLASS_NAME = "pageDataClass";
    
    /** 转换后的VO对象，设置到request属性的KEY*/
    private final static String ATTR_KEY_PAGEDATA = "pageDataFromRequest";
    
    /** 前端传入的FROM表单信息的KEY*/
    private final static String PARA_KEY_FORM = "queryFormData";
    /** FOR CRM 2.0 END   */
    protected Method getMethodTD(String name)
        throws NoSuchMethodException {

    	String cacheKey=TD_METHODCACHE_PREFIX+name;
    	
        synchronized (methods) {
            Method method = (Method) methods.get(cacheKey);

            if (method == null) {
                method = clazz.getMethod(name, typesTD);
                methods.put(cacheKey, method);
            }

            return (method);
        }
    }
    
    protected ActionForward unspecified(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return dispatchMethod(mapping, form, request, response, TD_DEFAULT_METHOD);
	}
    
    /** CRM2.0 FOR CRM 2.0 BEGIN   */
    
    /**
     * 根据前端传入的Form表单信息，生成对应的VO实例
     * @param request
     * @return
     */
    protected Object getPageData(HttpServletRequest request) {
    	if (request.getAttribute(ATTR_KEY_PAGEDATA) == null) {
	    	try {
		    	IDataCenter iDataCenter = getDataCenter(request);
				if (iDataCenter != null) {
					if (iDataCenter.getParameter(PARA_KEY_FORM) != null) {
					    if (iDataCenter.getParameter(PARP_KEY_PAGEDATACLASS_NAME) != null) {
					    	JSONObject queryFormData = (JSONObject)iDataCenter.getParameter(PARA_KEY_FORM);
					    	String pageDataClass = (String)iDataCenter.getParameter(PARP_KEY_PAGEDATACLASS_NAME);
					    	Object pageData = com.neusoft.tdframework.common.util.json.JsonUtil.json2Bean(queryFormData.toString(), pageDataClass);
					    	request.setAttribute(ATTR_KEY_PAGEDATA, pageData);
					    } 
					}
				}
	    	} catch (Exception ex) {
	    		ex.printStackTrace();
	    	}
    	}
    	return request.getAttribute(ATTR_KEY_PAGEDATA);
    }
    
    /**
     * 取得前端传入的DataCenter实例
     * @param request
     * @return
     */
    protected IDataCenter getDataCenter(HttpServletRequest request) {
    	
    	if (request.getAttribute(PARP_KEY_DATACENTER) == null) {
	        InputStream requestInputStream = null;
			IDataCenter iDataCenter = null;
			try {
				requestInputStream = request.getInputStream();
				DataCenterReader dataCenterReader = DataCenterIOManager.createReader(requestInputStream);
				if (dataCenterReader != null) {
					iDataCenter = dataCenterReader.parse();
					request.setAttribute(PARP_KEY_DATACENTER, iDataCenter);
				}
			} catch(Exception ex) {
				log.error("DataCenter取得失败。", ex);
				ex.printStackTrace();
			} finally {
				if (requestInputStream  != null) {
					try {
					    requestInputStream.close();
					} catch(Exception e) {
						e.printStackTrace();
					}
				}
			}
    	}
    	return (IDataCenter)request.getAttribute(PARP_KEY_DATACENTER);
    	
    }

    /**
     * 根据后台得到的pojoLst，转换为DataCenter的DataStore，并将DataCenter传回到前端
     * @param request
     * @param response
     * @param dataStoreId 指定DataStore的ID
     * @param pojoLst 后台得到的pojoLst
     * @throws Exception
     */
    protected void addDatastoreAndResponseToPage(
    		HttpServletRequest request, 
    		HttpServletResponse response, 
    		String dataStoreId,
    		List<?> pojoLst) throws Exception {
    	
    	IDataCenter iDataCenter = getDataCenter(request);
    	IDataStore dataStore = PojoUtil.createDataStore(dataStoreId, pojoLst);
    	iDataCenter.addDataStore(dataStore);
    	DataCenterWriter writer;
		try {
			writer = DataCenterIOManager.createWriter(response.getOutputStream());
			writer.write((DataCenter) iDataCenter);
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		}
		
    }
    /** FOR CRM 2.0 END   */
	
    protected ActionForward dispatchMethod(ActionMapping mapping,
        ActionForm form, HttpServletRequest request,
        HttpServletResponse response, String name)
        throws Exception {

        if (name == null) {
            return this.unspecified(mapping, form, request, response);
        }
        
        Method method = null;
        
//TD:   Modified by Wei Zijun
        boolean useTDMethod=false;
        try {
        	// 按传统方式取 action方法
            method = getMethod(name);
        } catch (NoSuchMethodException ex) {
        	try {
        	// 没取到的话 再按新方式取 action方法
        	 method = getMethodTD(name);
        	 // 标识一下到底是使用的原始方法 还是新方法
        	 useTDMethod=true;
	        } catch (NoSuchMethodException e) {
	            String message =
	                messages.getMessage("dispatch.method", mapping.getPath(), name);
	
	            log.error(message, e);
	
	            String userMsg =
	                messages.getMessage("dispatch.method.user", mapping.getPath());
	            throw new NoSuchMethodException(userMsg);
	        }
        	
        }

        ActionForward forward = null;

        try {
//TD:	Modified by Wei Zijun
        	Object forwardR=null;
            /**CRM2.0 FOR CRM2 BEGIN*/
        	com.neusoft.tdframework.common.util.TraceLogBaseInfoUtil.traceLogBaseInfoSet(request);
        	java.util.Properties envProp = (java.util.Properties)request.getSession().getServletContext().getAttribute("ENVCONF");
        	if ("1".equals(envProp.getProperty("td.tracelog.enabled"))) {
        	    com.neusoft.jdbc.spy.TraceLogUtil.begin(com.neusoft.jdbc.spy.LogConstants.INFO_LEVEL, clazz.getName(), method.getName());
        	}
        	if (!useTDMethod){
        	// 如果是原始 action 方法
        		Object[] args = { mapping, form, request, response };
        		forwardR= method.invoke(this, args);

        	}else{
        	// 如果是新 action 方法
        		// TDServletWrapperFactory.getInstance创建一个封装的对象
        		Object[] args = { TDServletWrapperFactory.getInstance(mapping, form,request, response) };
        		forwardR= method.invoke(this, args);
        	}
        	if ("1".equals(envProp.getProperty("td.tracelog.enabled"))) {
        	    com.neusoft.jdbc.spy.TraceLogUtil.end(com.neusoft.jdbc.spy.LogConstants.INFO_LEVEL, clazz.getName(), method.getName());
        	}
        	/**FOR CRM2 END*/
    		if (forwardR!=null){
    			if (forwardR instanceof ActionForward){
    				forward=(ActionForward)forwardR;
    			}else{
    				// 如果返回值是字符串:
    				// 以 TD_NEW_FORWARD_PREFIX("NEW:")开头,则new ActionForward;
    				// 否则 调用 mapping.findForward.
        			if ( (String.valueOf(forwardR) ).toUpperCase().startsWith(TD_NEW_FORWARD_PREFIX)){
        				forward = new ActionForward(String.valueOf(forwardR).substring(TD_NEW_FORWARD_PREFIX.length()) );
            		}else{
            			forward = mapping.findForward(String.valueOf(forwardR));
        			}
    			}
    		}
    		
        } catch (ClassCastException e) {
            String message =
                messages.getMessage("dispatch.return", mapping.getPath(), name);

            log.error(message, e);
            throw e;
        } catch (IllegalAccessException e) {
            String message =
                messages.getMessage("dispatch.error", mapping.getPath(), name);

            log.error(message, e);
            throw e;
        } catch (InvocationTargetException e) {

            Throwable t = e.getTargetException();

            if (t instanceof Exception) {
            	super.writeOptLogs(request, "权限操作失败！");
                throw ((Exception) t);
            } else {
                String message =
                    messages.getMessage("dispatch.error", mapping.getPath(),
                        name);

                log.error(message, e);
                throw new ServletException(t);
            }
        }

        return (forward);
    }
    public Object getServiceFacade(String serviceFacadeName,
            String appName)
    {
        InteractionObjectFactory factory = InteractionObjectFactory
                .getInstance();
        return (Object) factory.getInteractionObject(serviceFacadeName,
                getAppContext(appName));
    }

    public AppContext getAppContext(String appName)
    {
		AppContext appContext = new AppContextImpl();
        appContext.setApplicationName(appName);
        return appContext;
    }
    
}
