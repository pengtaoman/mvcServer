package com.neusoft.tdframework.admin.cache.action;


import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsDateJsonValueProcessor;

import org.apache.commons.beanutils.*;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.springframework.remoting.caucho.HessianProxyFactoryBean;


import com.caucho.hessian.client.HessianProxyFactory;
import com.neusoft.om.dao.appcontainer.AppContainerDAO;
import com.neusoft.tdframework.admin.cache.CacheService;
import com.neusoft.tdframework.admin.cache.common.BeanUtilValueConverter;
import com.neusoft.tdframework.admin.cache.common.CacheConst;
import com.neusoft.tdframework.admin.cache.common.JsonOtherValueProcessor;
import com.neusoft.tdframework.admin.cache.data.CacheObject;
import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.data.ParamObjectCollection;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.tdframework.memcache.CacheManagerConst;
import com.neusoft.tdframework.memcache.CacheManagerProxy;
import com.neusoft.tdframework.memcache.MemCacheManager;
import com.neusoft.tdframework.portal.config.TDConfigHelper;

import com.neusoft.tdframework.admin.cache.common.CacheUtil;
import com.neusoft.unieap.bl.context.AppContext;
import com.neusoft.unieap.bl.context.impl.AppContextImpl;
import com.neusoft.unieap.bl.interaction.InteractionObjectFactory;

/**brief description
 * <p>Date       : 2011-1-10</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author pengtao
 * @version 1.0
 */
public class CacheObjectManagerAction extends TDDispatchAction{

    private static final String CACHE_MODEL_NAME = "om";

    static int DEFAULT_PAGE_SIZE=10;

    public CacheObjectManagerAction() {
        super();
    }

    /**
     * 取得缓存对象的前缀的列"
     *
     * */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ActionForward getCacheObjectSumList(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "getCacheObjectSumList";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

        int totalRows = getTotalRowsFromRequest(request);

        List records=null;
        String appName = request.getParameter("appName");
        String cacheObjKey = request.getParameter("cacheObjKey");
        if (request.getAttribute("isRemoveReturn") != null && "1".equals(request.getAttribute("isRemoveReturn"))) {
        	cacheObjKey = (String)request.getAttribute("queryKey");
        }
        String reflashAll = request.getParameter("reflashAll");
        String removeAll = request.getParameter("removeAll");
        Set cacheKeyWithSize = null;
        //MemCacheManager memCacheManageraaa = (MemCacheManager) getServiceFacade("MemCacheManagerImpl",actionMapping);
        CacheManagerProxy memCacheManager = CacheManagerProxy.getInstanceOfMemcachedProxy();

        CacheManagerProxy ehCacheManager = CacheManagerProxy.getInstanceOfEhCacheProxy();

            String[] cacheKeys = request.getParameterValues("chkbx_user");

            if (cacheKeys != null && cacheKeys.length > 0) {
                   totalRows = -1;
                try {
                    for(int i=0;i<cacheKeys.length;i++){
                        String objKey = cacheKeys[i];
                        if(objKey!=null){
                            try{
                                //CacheUtil.refreshMemEhCathObject(objKey, false);
                            	this.removeCache(appName, objKey);
                            }catch(Exception e){
                                e.getMessage();
                            }
                        }else{
                            continue;
                        }
                    }
                    
                    /*
                    boolean isNotLocal = TDConfigHelper.isCluster();
                    if(!isNotLocal){
                        CacheService service = (CacheService)getServiceFacade("localCacheService");
                        service.refreshObjects(cacheKeys);
                    }else{
                        List hosts = getHostNames();
                        Iterator hostIt = hosts.iterator();
                        while(hostIt.hasNext()){
                            String hostName = (String)hostIt.next();
                            CacheService service = null;
                            service = getServiceByHostName(hostName,appName);
                            if(service!=null)
                            try{
                                service.refreshObjects(cacheKeys);
                            }
                            catch(Exception e){
                                SysLog.writeLogs("tdframework cache",GlobalParameters.ERROR,"CacheRefreash--:refreshCache "+e.getMessage());
                                //e.printStackTrace();
                            }

                        }
                    }
                    */
                } catch(Exception e) {
                    e.printStackTrace();
                    SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, e.getMessage());
                    throw new ActionException(e);
                }
            }

        try {
            cacheKeyWithSize = memCacheManager.listCacheKeys();
        } catch(Exception ex ) {
            cacheKeyWithSize = new HashSet();
            SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getCacheObjectSumList-0 :"+ex.getMessage());
        }
        try {
            cacheKeyWithSize.addAll(ehCacheManager.listCacheKeys());
            records=CacheUtil.getMemEhCacheObject(cacheKeyWithSize, appName, cacheObjKey);
        } catch(Exception ex ) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getCacheObjectSumList-1 :"+ex.getMessage());
        }
        try {
	        if (reflashAll != null && "1".equals(reflashAll)) {
	        	for (int recordCount = 0 ; recordCount < records.size(); recordCount++) {
	        		HashMap recordMap = (HashMap)records.get(recordCount);
	        		String recordCacheKey = (String)recordMap.get("cacheKeys");
	        		if (recordCacheKey != null && !"".equals(recordCacheKey)) {
	        			CacheUtil.refreshMemEhCathObject(recordCacheKey, false);
	        		}
	        	}
	        	request.setAttribute("reflashAllOver", "1");
	        } else if (removeAll != null && "1".equals(removeAll)) {
//	        	for (int recordCount = 0 ; recordCount < records.size(); recordCount++) {
//	        		HashMap recordMap = (HashMap)records.get(recordCount);
//	        		String recordCacheKey = (String)recordMap.get("cacheKeys");
//	        		if (recordCacheKey != null && !"".equals(recordCacheKey)) {
//	        			CacheUtil.refreshMemEhCathObject(recordCacheKey, true);
//	        		}
//	        	}
	        	this.removeCache(appName, cacheObjKey);
	        	request.setAttribute("removeAllOver", "1");
	        }

        } catch(Exception e) {
            e.printStackTrace();
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, e.getMessage());
            throw new ActionException(e);
        }

        if (totalRows < 0 || "1".equals(request.getAttribute("isRemoveReturn"))) {
        	if (records != null) {
                totalRows = records.size();//从数据库取得总行"
        	} else {
        		totalRows = 0;
        	}
        }

        int[] startEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
        //records = resultList.subList(beginNum - 1 , endNum - 1);
        request.setAttribute("optrs", records);
        request.setAttribute("totalRows",Integer.valueOf(totalRows));

        return actionMapping.findForward("getCacheObjectSumList");
    }


    /**
     * 取得缓存对象的MAP的元素的列表
     *
     * */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ActionForward getCacheObjectListForMap(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "getCacheObjectSumList";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

        int totalRows = getTotalRowsFromRequest(request);

        List records=null;
        String cacheKey = request.getParameter("cacheKey");
        String[] keySep = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);

        CacheManagerProxy cacheManagerProxy = null;
        if (CacheManagerConst.CACHE_TYPE_MEM.equals(keySep[1])) {
            cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
        } else {
            cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
        }

        try {
            Map cacheMap = null;
            String memType = CacheManagerConst.CACHE_TYPE_MEM;
            Object cacheObject = cacheManagerProxy.peek(keySep[0]);
            HashMap cacheObjectWithStat = null;
            try {
            	cacheObjectWithStat = (HashMap)cacheManagerProxy.peekForStat(keySep[0]);
            } catch (Exception ex) {
            	
            }

            memType = keySep[1];

            if (cacheObject instanceof Map) {
                cacheMap = (Map)cacheObject;
            }

            boolean isReloadable = false;
            if (cacheObjectWithStat != null
            		&& cacheObjectWithStat.get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null
                    && cacheObjectWithStat.get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
                    && !"".equals(((String)cacheObjectWithStat.get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {
            	isReloadable = true;
            }

            records=CacheUtil.getCacheMapKeySet(cacheMap, cacheKey, memType, isReloadable);
            if (isReloadable) {
                request.setAttribute("isReloadable", "1");
            } else {
            	request.setAttribute("isReloadable", "0");
            }
            request.setAttribute("cacheKey", cacheKey);
        } catch(Exception ex ) {
            ex.printStackTrace();
        }

//        ArrayList arrCacheKeyWithSize = new ArrayList(cacheKeyWithSize);
//        List resultList = getCachedKey(arrCacheKeyWithSize, appName, cacheKey);
//
        if (records != null && totalRows < 0) {
            totalRows = records.size();//从数据库取得总行"
        }

        int[] startEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
        int beginNum = startEnd[0];
        int endNum = startEnd[1];
        //records = resultList.subList(beginNum - 1 , endNum - 1);
        request.setAttribute("optrs", records);

        request.setAttribute("totalRows",Integer.valueOf(totalRows));

        return actionMapping.findForward("getCacheObjectListForMap");
    }



    /**
     * 取得缓存对象的详细列"
     *
     * */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ActionForward getCacheObjectList(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "getCacheObjectList";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

        int totalRows = getTotalRowsFromRequest(request);

        List records=new ArrayList();
        String cacheAd = request.getParameter("cacheAd");

        Set cacheKeyWithSize = null;
        //MemCacheManager memCacheManageraaa = (MemCacheManager) getServiceFacade("MemCacheManagerImpl",actionMapping);
        CacheManagerProxy memCacheManager = CacheManagerProxy.getInstanceOfMemcachedProxy();

        CacheManagerProxy ehCacheManager = CacheManagerProxy.getInstanceOfEhCacheProxy();

        if (request.getParameter("upvalidall") != null && !"".equals( request.getParameter("upvalidall"))) {
            totalRows = -1;
            String isvalid = request.getParameter("upvalidall");
            String[] cacheKeys = request.getParameterValues("chkbx_user");

            if (cacheKeys != null && cacheKeys.length > 0) {
                try {
                    for(String key : cacheKeys) {
                        if (key != null && !"".equals(key.trim())) {
                            String[] sepKey = key.split(CacheConst.CACHE_KEY_TYPE_SEP);
                            CacheManagerProxy cacheManagerProxy = null;
                            if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
                                cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
                            } else {
                                cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
                            }
//                            Object cachedObject = cacheManagerProxy.peekForStat(sepKey[0]);
//                            if (cachedObject instanceof HashMap && ((HashMap)cachedObject).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
//                                HashMap cacheValue = (HashMap)cachedObject;
//                                cacheValue.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf(isvalid));
//                                cacheManagerProxy.replaceCachedObject(sepKey[0], cacheValue);
//
//                            } else {
//                                cacheManagerProxy.removeCacheObject(sepKey[0]);
//                            }
                           // this.removeCache(appName, key);
                        }
                    }
                    //request.
                } catch(Exception e) {
                    e.printStackTrace();
                    SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, e.getMessage());
                    throw new ActionException(e);
                }
            }
        }

        try {
            cacheKeyWithSize = memCacheManager.listCacheKeys();
        } catch(Exception ex ) {
            cacheKeyWithSize = new HashSet();
            SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getCacheObjectList-0 :"+ex.getMessage());
        }
        try {
            cacheKeyWithSize.addAll(ehCacheManager.listCacheKeys());
        } catch(Exception ex ) {
        	 SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getCacheObjectList-1 :"+ex.getMessage());
        }

        ArrayList arrCacheKeyWithSize = new ArrayList(cacheKeyWithSize);
        List resultList = getCachedKey(arrCacheKeyWithSize, cacheAd);

        String isSingleObjValid = request.getParameter("isSingleObjValid");
        if (totalRows < 0 || (isSingleObjValid !=null && "1".equals(isSingleObjValid))) {
            totalRows = resultList.size();//从数据库取得总行"
        }

        int[] startEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
        int beginNum = startEnd[0];
        int endNum = startEnd[1];
        records = resultList.subList(beginNum - 1 , endNum - 1);
        request.setAttribute("optrs", records);
        request.setAttribute("totalRows",Integer.valueOf(totalRows));

        return actionMapping.findForward("showCatchObject");
    }


    /**
     * 从缓存中取得缓存对象的KEY+SIZE，并查分为表"
     * @param keyList 原始的从缓存中取出的KEY SET
     * @param cacheAd 客户端输入的缓存是否有效  查询条件
     * @param cacheKey 客户端输入的缓存KEY的前缀  查询条件
     * */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private List getCachedKey(List keyList,
            String cacheAd)
    throws ActionException {

        String methodName = "getCachedKey";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");


        List records=new ArrayList();
        try {

            //List preKeys = MemCacheUtil.getPreCachedKeys();
            CacheManagerProxy memCacheManager = CacheManagerProxy.getInstanceOfMemcachedProxy();

            CacheManagerProxy ehCacheManager = CacheManagerProxy.getInstanceOfEhCacheProxy();

            for (String it : (List<String>)keyList) {

                String itSub = null;
                if (it.indexOf("~") != -1) {
                    itSub = it.split("~")[0];
                } else {
                    itSub = it;
                }

                if ((cacheAd == null || "".equals(cacheAd)) || itSub.equals(cacheAd)) {

                    List difTypeCacheArr = new ArrayList();
                    difTypeCacheArr.add(memCacheManager.peekForStat(it));
                    difTypeCacheArr.add(ehCacheManager.peekForStat(it));

                    for (int typeCount = 0; typeCount < difTypeCacheArr.size(); typeCount++) {
                        Object gettedCache = difTypeCacheArr.get(typeCount);
                        if (gettedCache == null) {
                            continue;
                        }

                        if (gettedCache instanceof HashMap && ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
                            HashMap cacheValue = (HashMap)gettedCache;
                            Object valid = cacheValue.get(CacheManagerConst.KEY_CACHEDATA_VALID);

                            int isValid = ((Integer)valid).intValue();
                            /*
                            if ((appName == null
                                    || "".equals(appName))
                                    || (it.split(CacheManagerConst.CACHE_OBJECT_KEY_SEPARATOR)[0].equals(appName))) {
                            */
                                CacheObject cacheObject = new CacheObject();
                                cacheObject.setKey(it);
                                if (typeCount == 0) {
                                    cacheObject.setType(CacheManagerConst.CACHE_TYPE_MEM);
                                } else {
                                    cacheObject.setType(CacheManagerConst.CACHE_TYPE_EH);
                                }

                                StringBuilder sbu = new StringBuilder("<table width=45><tr>");

                                StringBuilder sbuReload = new StringBuilder("<td width=15><a href=\"javascript:dealReload ('")
                                        .append(it)
                                        .append(CacheConst.CACHE_KEY_TYPE_SEP)
                                        .append(cacheObject.getType())
                                        .append("');\">重载</a></td>");

                                sbu.append("<td width=15><a href=\"cacheObjectManagerAction.do?method=showCacheObjectDetail&cacheKey=");
                                sbu.append(it);
                                sbu.append(CacheConst.CACHE_KEY_TYPE_SEP);
                                sbu.append(cacheObject.getType());
                                sbu.append("\">数据</a>");
                                sbu.append("</td>");
                                
                                
                                /* 无效功能不要了
                                sbu.append("<td width=15><div id='div")
                                    .append(it)
                                    .append(":")
                                    .append(cacheObject.getType())
                                    .append("'><a href=\"javascript:dealValid (");
                                if (isValid == 1) {
//                                    cacheObject.setValid(
//                                            new StringBuilder("<div id='isvalid")
//                                                    .append(it)
//                                                    .append(CacheConst.CACHE_KEY_TYPE_SEP)
//                                                    .append(cacheObject.getType())
//                                                    .append("'>有效</div>")
//                                                    .toString());
                                    sbu.append("'0','");
                                    sbu.append(it);
                                    sbu.append(CacheConst.CACHE_KEY_TYPE_SEP);
                                    sbu.append(cacheObject.getType());
                                    sbu.append("');\">无效</a>");
                                    sbu.append("</td>");
                                   

                                } else {
//                                    cacheObject.setValid(
//                                            new StringBuilder("<div id='isvalid")
//                                                    .append(it)
//                                                    .append(CacheConst.CACHE_KEY_TYPE_SEP)
//                                                    .append(cacheObject.getType())
//                                                    .append("'>无效</div>")
//                                                    .toString());
                                    sbu.append("'1','");
                                    sbu.append(it);
                                    sbu.append(CacheConst.CACHE_KEY_TYPE_SEP);
                                    sbu.append(cacheObject.getType());
                                    sbu.append("');\">有效</a></div>");
                                    sbu.append("</td>");

                                }
                                 */
                                if (cacheValue.get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null
                                        && cacheValue.get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
                                        && !"".equals(((String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {

                                    sbu.append(sbuReload);

                                }

                                if (cacheValue.get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null
                                        && cacheValue.get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
                                        && !"".equals(((String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {

                                	sbu.append("<td width=15><a href=\"cacheObjectManagerAction.do?method=diffCacheObjectToDB&cacheKey=");
                                    sbu.append(it);
                                    sbu.append(CacheConst.CACHE_KEY_TYPE_SEP);
                                    sbu.append(cacheObject.getType());
                                    sbu.append("\">对比数据</a>");
                                    sbu.append("</td>");

                                }
                                sbu.append("<td><a href=\"javascript:removeCachedObj('")
                    	        .append(it)
                    	        .append(CacheConst.CACHE_KEY_TYPE_SEP)
                    	        .append(cacheObject.getType())
                    	        .append("');\">删除</a>");
                    	        sbu.append("</td>");
                                sbu.append("</tr></table>");
                                cacheObject.setEditor(sbu.toString());
                                String beanClass = (String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_BEANID);
                                if (beanClass != null) {
                                    String beanName = beanClass;
                                    cacheObject.setBeanClass(beanName);
                                }
                                cacheObject.setMethodName((String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_METHOD));
                                cacheObject.setDescription((String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_DISCRIPTION));
                                Object argsObj = cacheValue.get(CacheManagerConst.KEY_CACHEDATA_ARGS);
                                if (argsObj != null) {
                                    String argsName = argsObj.getClass().getName();
                                    argsName = argsName.substring(argsName.lastIndexOf(".")+1);
                                    cacheObject.setArgs(argsName);
                                }
                                records.add(cacheObject);
//                            } else {
//                                SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, "CacheKey valid not found.");
//                            }
//
                        } else {

                            CacheObject cacheObject = new CacheObject();
                            cacheObject.setKey(it);
                            if (typeCount == 0) {
                                cacheObject.setType("MEMCACHE");
                            } else {
                                cacheObject.setType("EHCACHE");
                            }
                            StringBuilder sbuUnNomal = new StringBuilder("<table width=45><tr><td width=15><div id='div")
                                    .append(it)
                                    .append(":")
                                    .append(cacheObject.getType())
                                    .append("'>");
                            /*
                            sbuUnNomal.append("<a href=\"javascript:dealValid (");
                            sbuUnNomal.append("'0','");
                            sbuUnNomal.append(it);
                            sbuUnNomal.append(CacheConst.CACHE_KEY_TYPE_SEP);
                            sbuUnNomal.append(cacheObject.getType());
                            sbuUnNomal.append("');\">无效</a></div>");
                            sbuUnNomal.append("</td>");
                            */
                            sbuUnNomal.append("<td width=15><a href=\"cacheObjectManagerAction.do?method=showCacheObjectDetail&cacheKey=");
                            sbuUnNomal.append(it);
                            sbuUnNomal.append(CacheConst.CACHE_KEY_TYPE_SEP);
                            sbuUnNomal.append(cacheObject.getType());
                            sbuUnNomal.append("\">查看</a>");
                            sbuUnNomal.append("</td></tr></table>");
                            cacheObject.setEditor(sbuUnNomal.toString());
                            records.add(cacheObject);

                        }
                    }
                } else {
                    SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, "CacheKey not found.");
                }
            }
        } catch(Exception e) {
            //e.printStackTrace();
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getCachedKey-1 :"+e.getMessage());
            throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return records;
    }

    /**
     * 显示缓存对象的详细信"
     *
     * */
    public ActionForward showCacheObjectDetail(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "showCacheObjectDetail";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");


        CacheManagerProxy memCacheManager = CacheManagerProxy.getInstanceOfMemcachedProxy();

        CacheManagerProxy ehCacheManager = CacheManagerProxy.getInstanceOfEhCacheProxy();

        CacheManagerProxy cacheManagerProxy = null;
        String cacheKey = null;
        if (request.getParameter("cacheKey") == null) {
            cacheKey = (String)request.getAttribute("cacheKey");
        } else {
            cacheKey = request.getParameter("cacheKey");
        }
        String[] keySep = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);

        Object cacheObjForStat = null;

        if (CacheManagerConst.CACHE_TYPE_MEM.equals(keySep[1])) {
            cacheManagerProxy = memCacheManager;
        } else {
            cacheManagerProxy = ehCacheManager;
        }

        cacheObjForStat = cacheManagerProxy.peekForStat(keySep[0]);

        ArrayList valueRows = null;
        ArrayList<String> methodNames = null;

        try {
            Object cacheObject = cacheManagerProxy.peek(keySep[0]);
            List arr = null;
            if (cacheObject instanceof ArrayList) {

                arr = (ArrayList)cacheObject;
            } else if (cacheObject instanceof Map) {

                Map cacheMap = (Map)cacheObject;
                String mapKey = request.getParameter("mapKey");
                arr = (ArrayList)cacheMap.get(mapKey);
                request.setAttribute("mapKey", mapKey);
            } else if (cacheObject instanceof ParamObjectCollection) {

            	ParamObjectCollection paramObjectCollection = (ParamObjectCollection)cacheObject;
            	arr = paramObjectCollection.getList();

            } else if (cacheObject instanceof String) {
                request.setAttribute("isReloadAble", "0");
                request.setAttribute("isUpdateDBAble", "0");

                ArrayList methodNamesForString = new ArrayList<String>();
                methodNamesForString.add("缓存对象");
                ArrayList valueRowsForString = new ArrayList();
                ArrayList vArr = new ArrayList();
                vArr.add(cacheObject);
                valueRowsForString.add(vArr);

                request.setAttribute("methodNames", methodNamesForString);
                request.setAttribute("valueRows", valueRowsForString);
                request.setAttribute("cacheKey", cacheKey);
                return actionMapping.findForward("showCacheObjectDetail");
            } else {
                request.setAttribute("isReloadAble", "0");
                request.setAttribute("isUpdateDBAble", "0");

                ArrayList methodNamesForString = new ArrayList<String>();
                methodNamesForString.add("缓存对象类名");
                ArrayList valueRowsForString = new ArrayList();
                ArrayList vArr = new ArrayList();
                vArr.add(cacheObject.getClass().getName());
                valueRowsForString.add(vArr);

                request.setAttribute("methodNames", methodNamesForString);
                request.setAttribute("valueRows", valueRowsForString);
                request.setAttribute("cacheKey", cacheKey);
                return actionMapping.findForward("showCacheObjectDetail");
            }

            if (arr != null && arr.size() > 0) {
                valueRows = new ArrayList();
                methodNames = new ArrayList<String>();
                int count = 0;
                for (Object voObject : arr) {
                	ArrayList<String> methodValue = new ArrayList<String>();
                	if (voObject instanceof String) {
                		if (count == 0) {
                		    methodNames.add("缓存对象");
                		}
                		methodValue.add((String)voObject);
                	} else {

                		BeanUtilsBean beanUtilsBean =
                            new BeanUtilsBean();

                		PropertyDescriptor[] propertyDescriptors = beanUtilsBean.getPropertyUtils().getPropertyDescriptors(voObject);

                		for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
                			if (!"class".equals(propertyDescriptor.getName())) {
                				 String proValue = null;
                				try {
	                			    proValue = beanUtilsBean.getProperty(voObject, propertyDescriptor.getName());
                				} catch (Exception ex) {
                					//do nothing
                				}
	                			if (proValue == null) {proValue = "";}
	                			methodValue.add(proValue);
	                			if (count == 0) {
	                			    methodNames.add(propertyDescriptor.getName());
	                			}
                			}
                		}
                    }
                	valueRows.add(methodValue);
                    count++;
                }
            }

            if (cacheObjForStat instanceof HashMap) {
            	HashMap cacheValue = (HashMap)cacheObjForStat;
            	if (cacheValue.get(CacheManagerConst.KEY_CACHEDATA_VALID) != null
            		    && cacheValue.get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null
            		    && cacheValue.get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
                        && !"".equals(((String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {
                    request.setAttribute("isReloadAble", "1");

                    String updateDBBeanID = (String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_UPDATEDB_BEANID);
                    String updateDBBeanMethodName = (String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_UPDATEDB_METHOD);
                    if (updateDBBeanID != null && !"".equals(updateDBBeanID)
                    		&& updateDBBeanMethodName != null && !"".equals(updateDBBeanMethodName)) {
                    	request.setAttribute("isUpdateDBAble", "1");
                    } else {
                    	request.setAttribute("isUpdateDBAble", "0");
                    }
            	} else {
            		 request.setAttribute("isReloadAble", "0");
            		 request.setAttribute("isUpdateDBAble", "0");
            	}
            } else {
                request.setAttribute("isReloadAble", "0");
                request.setAttribute("isUpdateDBAble", "0");
            }
        } catch(Exception ex) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--showCacheObjectDetail-0 :"+ex.getMessage());
        }

        request.setAttribute("methodNames", methodNames);
        request.setAttribute("valueRows", valueRows);
        request.setAttribute("cacheKey", cacheKey);
        return actionMapping.findForward("showCacheObjectDetail");
    }

    /**
     * 显示缓存对象管理列表页面的头
     *
     * */
    public ActionForward showCacheManagerHead(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "showCacheManagerHead";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");


        //HashSet regionSet = new HashSet();
        //HashSet showKey = new HashSet();
        try {
            MemCacheManager memCacheManager = (MemCacheManager)getServiceFacade("memCacheManagerImpl");
            String[][] contextConfig = (String[][])memCacheManager.getMemcacheConfig().get(CacheManagerConst.CONTEXT_PATH_CONFIG_KEY);

           /* CacheManagerProxy memCacheManager = CacheManagerProxy.getInstanceOfMemcachedProxy();
            CacheManagerProxy ehCacheManager = CacheManagerProxy.getInstanceOfEhCacheProxy();
            regionSet.addAll(memCacheManager.listCacheKeys());
            regionSet.addAll(ehCacheManager.listCacheKeys());

            Iterator  iterator = regionSet.iterator();

            while (iterator.hasNext()) {
                String key = (String)iterator.next();
                String[] keySep = key.split(CacheManagerConst.CACHE_OBJECT_KEY_SEPARATOR);
                if (keySep.length > 1) {
                    showKey.add(keySep[0]);
                }
            }
            */
            request.setAttribute("regionSet", contextConfig);
        } catch (Exception ex) {
            //ex.printStackTrace();
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--showCacheManagerHead-0 :"+ex.getMessage());
            throw new ActionException(ex);
        }

        return actionMapping.findForward("showCacheManagerHead");
    }
    
    
    private void refreshCache(String appName,String[] objKeys){
		boolean isNotLocal = TDConfigHelper.isCluster();
		if(!isNotLocal){
    		CacheService service = (CacheService)getServiceFacade("localCacheService");
    		service.reLoadCachedObjects(objKeys);
		}else{
			List hosts = getHostNames();
			Iterator hostIt = hosts.iterator();
			while(hostIt.hasNext()){
				String hostName = (String)hostIt.next();
				CacheService service = null;
				service = getServiceByHostName(hostName,appName);
				if(service!=null)
				try{
					//System.out.println("############################# HOST : " + hostName);
					service.reLoadCachedObjects(objKeys);
				}		
				catch(Exception e){
					SysLog.writeLogs("tdframework cache",GlobalParameters.ERROR,"CacheRefreash--:refreshCache "+e.getMessage());
					//e.printStackTrace();
				}
				
			}
		}
	}
    
    private void refreshCache(String appName,String objKey){
		boolean isNotLocal = TDConfigHelper.isCluster();
		appName = "/" + appName;
		if(!isNotLocal){
    		CacheService service = (CacheService)getServiceFacade("localCacheService");
    		service.reLoadCachedObject(objKey);
		}else{
			List hosts = getHostNames();
			Iterator hostIt = hosts.iterator();
			while(hostIt.hasNext()){
				String hostName = (String)hostIt.next();
				CacheService service = null;
				service = getServiceByHostName(hostName,appName);
				if(service!=null)
				try{
					//System.out.println("############################# HOST : " + hostName);
					service.reLoadCachedObject(objKey);
				}		
				catch(Exception e){
					SysLog.writeLogs("tdframework cache",GlobalParameters.ERROR,"CacheRefreash--:refreshCache "+e.getMessage());
					//e.printStackTrace();
				}
				
			}
		}
	}
    
    private void removeCache(String appName, String cacheObjKey){
		boolean isNotLocal = TDConfigHelper.isCluster();
		appName = "/" + appName;
		if(!isNotLocal){
    		CacheService service = (CacheService)getServiceFacade("localCacheService");
    		service.reMoveObjects(appName, cacheObjKey);
		}else{
			List hosts = getHostNames();
			Iterator hostIt = hosts.iterator();
			while(hostIt.hasNext()){
				String hostName = (String)hostIt.next();
				CacheService service = null;
				service = getServiceByHostName(hostName,appName);
				if(service!=null)
				try{
					//System.out.println("############################# HOST : " + hostName);
					service.reMoveObjects(appName, cacheObjKey);
				}		
				catch(Exception e){
					SysLog.writeLogs("tdframework cache",GlobalParameters.ERROR,"CacheRefreash--:refreshCache "+e.getMessage());
					//e.printStackTrace();
				}
				
			}
		}
	}

    /**
     * 使单选的缓存对象有效或者无"
     *
     * */
    public ActionForward validCacheObject(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "validCacheObject";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        String returnValue = "";
        try {

            String valid = request.getParameter("valid");
            String cacheKey = request.getParameter("cacheKey");

            String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
            CacheManagerProxy cacheManagerProxy = null;
            if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
            } else {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
            }

            Object gettedCache = cacheManagerProxy.peekForStat(sepKey[0]);
            if (gettedCache instanceof HashMap && ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
                HashMap cacheValue = (HashMap)gettedCache;
                cacheValue.put(CacheManagerConst.KEY_CACHEDATA_VALID, Integer.valueOf(valid));
                cacheManagerProxy.replaceCachedObject(sepKey[0], cacheValue);
            } else{
                cacheManagerProxy.removeCacheObject(sepKey[0]);
            }
        } catch (Exception e) {
            //e.printStackTrace();
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--validCacheObject-0 :"+e.getMessage());
            throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return new ActionForward("/cacheObjectManagerAction.do?method=getCacheObjectList&isSingleObjValid=1");

    }

    /**
     * 使缓存对象中包含的VO对象无效
     *
     * */
    public ActionForward invalidateSubObj(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "invalidateSubObj";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        String returnValue = "";
        try {

            String cacheKey = request.getParameter("cacheKey");
            String isDetailReloadAble = request.getParameter("isDetailReloadAble");

            String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
            CacheManagerProxy cacheManagerProxy = null;
            if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
            } else {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
            }

            String[] cacheKeys = request.getParameterValues("chkbx_sub");
            if ((cacheKeys == null || cacheKeys.length == 0)) {

                if ("1".equals(isDetailReloadAble)) {
                    String index = request.getParameter("index");
                    if(index != null && !"".equals(index)) {
                        Object gettedCache = cacheManagerProxy.peekForStat(sepKey[0]);
                        if (gettedCache instanceof HashMap && ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
                            HashMap cacheValue = (HashMap)gettedCache;
                            Object cacheObject = cacheValue.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                            if (cacheObject instanceof ArrayList) {
	                            ArrayList objArr = (ArrayList)cacheObject;
	                            objArr.remove(Integer.parseInt(index));
	                            cacheValue.put(CacheManagerConst.KEY_CACHEDATA_DATA, objArr);
	                            cacheManagerProxy.replaceCachedObject(sepKey[0], cacheValue);

                            } else if (cacheObject instanceof Map) {
                            	Map objMap = (Map)cacheObject;
                            	String mapKey = request.getParameter("mapKey");
                            	ArrayList objArr = (ArrayList)objMap.get(mapKey);
                            	if (objArr != null) {
                            		objArr.remove(Integer.parseInt(index));
                            	}
                            	objMap.put(mapKey, objArr);
                            	cacheValue.put(CacheManagerConst.KEY_CACHEDATA_DATA, objMap);
                            	cacheManagerProxy.replaceCachedObject(sepKey[0], cacheValue);
                            }
                            else if (cacheObject instanceof ParamObjectCollection) {
                            	ParamObjectCollection paramObjectCollection = (ParamObjectCollection)cacheObject;
                            	ArrayList objArr = (ArrayList)paramObjectCollection.getList();
                            	objArr.remove(Integer.parseInt(index));
                            	cacheValue.put(CacheManagerConst.KEY_CACHEDATA_DATA, paramObjectCollection);
	                            cacheManagerProxy.replaceCachedObject(sepKey[0], cacheValue);
                            }

                        }
                    } else {
                        request.setAttribute("cacheKey", cacheKey);
                        return new ActionForward("/cacheObjectManagerAction.do?method=showCacheObjectDetail");
                    }
                } else {
                	cacheManagerProxy.removeCacheObject(sepKey[0]);
                }
            } else {

                ArrayList newArr = new ArrayList();

                Object gettedCache = cacheManagerProxy.peekForStat(sepKey[0]);
                if (gettedCache instanceof HashMap && ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {

                    HashMap cacheValue = (HashMap)gettedCache;
                    Object cacheObject = cacheValue.get(CacheManagerConst.KEY_CACHEDATA_DATA);

                    if (cacheObject instanceof ArrayList) {
	                    ArrayList objArr = (ArrayList)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_DATA);

	                    for (int objeArrCount = 0; objeArrCount < objArr.size(); objeArrCount++){
	                        boolean canAdd = true;
	                        for (int chkCount = 0; chkCount < cacheKeys.length; chkCount++) {
	                            int subIndex = Integer.parseInt(cacheKeys[chkCount]);
	                            if (objeArrCount == subIndex) {
	                                canAdd =false;
	                                break;
	                            }
	                        }
	                        if (canAdd) {
	                            newArr.add(objArr.get(objeArrCount));
	                        }
	                    }
	                    cacheValue.put(CacheManagerConst.KEY_CACHEDATA_DATA, newArr);
	                    cacheManagerProxy.replaceCachedObject(sepKey[0], cacheValue);
	                    objArr.clear();
	                    objArr = null;
                    } else if (cacheObject instanceof Map) {
                    	Map objMap = (Map)cacheObject;
                    	String mapKey = request.getParameter("mapKey");
                    	ArrayList objArr = (ArrayList)objMap.get(mapKey);
	                    for (int objeArrCount = 0; objeArrCount < objArr.size(); objeArrCount++){
	                        boolean canAdd = true;
	                        for (int chkCount = 0; chkCount < cacheKeys.length; chkCount++) {
	                            int subIndex = Integer.parseInt(cacheKeys[chkCount]);
	                            if (objeArrCount == subIndex) {
	                                canAdd =false;
	                                break;
	                            }
	                        }
	                        if (canAdd) {
	                            newArr.add(objArr.get(objeArrCount));
	                        }
	                    }
	                    objMap.put(mapKey, newArr);
	                    cacheValue.put(CacheManagerConst.KEY_CACHEDATA_DATA, objMap);
	                    cacheManagerProxy.replaceCachedObject(sepKey[0], cacheValue);
	                    objArr.clear();
	                    objArr = null;
                    } else if (cacheObject instanceof ParamObjectCollection) {

                    	ParamObjectCollection paramObjectCollection = (ParamObjectCollection)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                        ArrayList objArr = (ArrayList)paramObjectCollection.getList();
                        paramObjectCollection.removeElement();
	                    for (int objeArrCount = 0; objeArrCount < objArr.size(); objeArrCount++){
	                        boolean canAdd = true;
	                        for (int chkCount = 0; chkCount < cacheKeys.length; chkCount++) {
	                            int subIndex = Integer.parseInt(cacheKeys[chkCount]);
	                            if (objeArrCount == subIndex) {
	                                canAdd =false;
	                                break;
	                            }
	                        }
	                        if (canAdd) {
	                        	paramObjectCollection.addElement(objArr.get(objeArrCount));
	                        }
	                    }
	                    cacheValue.put(CacheManagerConst.KEY_CACHEDATA_DATA, paramObjectCollection);
	                    cacheManagerProxy.replaceCachedObject(sepKey[0], cacheValue);
	                    objArr.clear();
	                    objArr = null;
                    }
                }
            }
            request.setAttribute("cacheKey", cacheKey);
        } catch (Exception e) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--invalidateSubObj-0 :"+e.getMessage());
            throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return new ActionForward("/cacheObjectManagerAction.do?method=showCacheObjectDetail");

    }


    /**
     * 使类型为MAP的缓存对象中，指定key的对象失"
     *
     * */
    public ActionForward invalidateMapKey(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "invalidateMapKey";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        String cacheKey = request.getParameter("cacheKey");
        String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
        try {
            CacheManagerProxy cacheManagerProxy = null;
            if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
            } else {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
            }
            if (sepKey.length == 2 && !"null".equals(sepKey[0])) {
	            HashMap cacheObject = (HashMap)cacheManagerProxy.peekForStat(sepKey[0]);

	            String[] cacheKeys = request.getParameterValues("chkbx_map");
	            Object cacheObj = null;
	            if (cacheObject != null) {
	            	cacheObj = cacheObject.get(CacheManagerConst.KEY_CACHEDATA_DATA);
	            }
	            if (cacheKeys != null && cacheKeys.length > 0) {
	            	if (cacheObject != null) {
		            	if (cacheObj instanceof Map) {
		            		Map objMap = (Map)cacheObj;
	                        for(String key : cacheKeys) {
	    	            		objMap.remove(key);
	                        }
		            		cacheObject.put(CacheManagerConst.KEY_CACHEDATA_DATA, objMap);
		            		cacheManagerProxy.replaceCachedObject(sepKey[0], cacheObject);
	    	            	} else {
	    	            		SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, "invalidateMapKey : 得到的缓存对象的数据结构不正确");
	    	            	}
	    	            } else {
	    	            	SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, "invalidateMapKey : 不能得到缓存对象");
	    	            }
	            } else {
	            	String mapKey = request.getParameter("mapKey");
		            if (cacheObject != null) {
		            	if (cacheObj instanceof Map) {
		            		Map objMap = (Map)cacheObj;
		            		objMap.remove(mapKey);
		            		cacheObject.put(CacheManagerConst.KEY_CACHEDATA_DATA, objMap);
		            		cacheManagerProxy.replaceCachedObject(sepKey[0], cacheObject);
		            	} else {
		            		SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, "invalidateMapKey : 得到的缓存对象的数据结构不正确");
		            	}
		            } else {
		            	SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.ERROR, "invalidateMapKey : 不能得到缓存对象");
		            }
	            }
            } else {
            	cacheManagerProxy.removeCacheObject(sepKey[0]);
            }
        } catch (Exception e) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--invalidateMapKey-0 :"+e.getMessage());
            throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        return new ActionForward("/cacheObjectManagerAction.do?method=getCacheObjectListForMap&cacheKey="+cacheKey);
    }

    /**
     * 重新载入缓存对象
     *
     * */
    public String reloadCacheObject(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "reloadCacheObject";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {
            
            String cacheKey = request.getParameter("cacheKey");
            
            this.refreshCache(request.getContextPath(), new String[]{cacheKey});
            
            
            response.setCharacterEncoding("GBK");
            response.getWriter().write("SUCCESS");
            return "重新载入缓存成功";
        } catch (Exception e) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--reloadCacheObject-0 :"+e.getMessage());
            throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }

    }

    /**
     * 对比数据库数"
     *
     * */
    public ActionForward diffCacheObjectToDB(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "diffCacheObjectToDB";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

        String cacheKey = request.getParameter("cacheKey");
        String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
        CacheManagerProxy cacheManagerProxy = null;
        if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
            cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
        } else {
            cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
        }

        Object getCached = cacheManagerProxy.peekForStat(sepKey[0]);
        try {


            if (getCached instanceof HashMap ) {

            	    //执行重载之前，先清除一下缓存数"
    	            cacheManagerProxy.removeCacheObject(sepKey[0]);

        	        String beanId = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_BEANID);
        	        String beanMethodName = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_METHOD);
        	        String applicationName = (String)((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_APPLICATION_NAME);

        	        if (beanId != null && !"".equals(beanId.trim())
        	        		&& beanMethodName != null && !"".equals(beanMethodName.trim())
        	        		&& applicationName != null) {

    	                InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	    			AppContext appContext = new AppContextImpl();
    	    		    appContext.setApplicationName(applicationName);

    	    		    Object beanObj = factory.getInteractionObject(
    	    		    		beanId,
    	                		appContext);

    	    	        Object argsObj = ((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_ARGS);
    	    	        Object[] args = (Object[])argsObj;


    	    	        Object returnValue = null;
    	    	        if (argsObj != null && args.length > 0) {

    		    	        returnValue = org.apache.commons.beanutils.MethodUtils.invokeMethod(beanObj, beanMethodName, args);

    	    	        } else {
    	    	        	returnValue = org.apache.commons.beanutils.MethodUtils.invokeMethod(beanObj, beanMethodName, null);
    	    	        }

    	    	        HashMap difMap = CacheUtil.diffObject(
    	    	        		((HashMap)getCached).get(CacheManagerConst.KEY_CACHEDATA_DATA),
    	    	        		returnValue,
    	    	        		request.getParameter("mapKey")
    	    	        		);

    	    	        request.setAttribute("difMap", difMap);

        	        } else {
        	            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR,
        	            		new StringBuilder("CacheManagerProxy-reloadCachedObject(")
        	                            .append(sepKey[0])
        	                            .append(") : 执行失败，缓存对象没有必要的重新加载的设置信息，无法对比数据").toString());
        	        }
            }

            return actionMapping.findForward("showDifCacheDB");
        } catch (Exception e) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--reloadCacheObject-0 :"+e.getMessage());
            throw new ActionException(e);
        } finally {
        	cacheManagerProxy.putObjectDirectly(sepKey[0], getCached);
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }

    }


    /**
     * 显示缓存对象的record 用于更新数据"
     *
     * */
    public ActionForward updateCacheFromDB(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "updateCacheFromDB";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {

            String cacheKey = request.getParameter("cacheKey");
            String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
            CacheManagerProxy cacheManagerProxy = null;
            if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
            } else {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
            }

            String index = request.getParameter("index");
            if(index != null && !"".equals(index)) {
                Object gettedCache = cacheManagerProxy.peekForStat(sepKey[0]);
                if (gettedCache instanceof HashMap && ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {

                	HashMap cacheValue = (HashMap)gettedCache;
                    Object cacheObject = cacheValue.get(CacheManagerConst.KEY_CACHEDATA_DATA);

        	        String beanId = (String)((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_BEANID);
        	        String beanMethodName = (String)((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_METHOD);
        	        String applicationName = (String)((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_APPLICATION_NAME);

        	        if (beanId != null && !"".equals(beanId.trim())
        	        		&& beanMethodName != null && !"".equals(beanMethodName.trim())
        	        		&& applicationName != null) {

    	                InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
    	    			AppContext appContext = new AppContextImpl();
    	    		    appContext.setApplicationName(applicationName);

    	    		    Object beanObj = factory.getInteractionObject(
    	    		    		beanId,
    	                		appContext);

    	    	        Object argsObj = ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_ARGS);
    	    	        Object[] args = (Object[])argsObj;


    	    	        Object returnValue = null;
    	    	        if (argsObj != null && args.length > 0) {

    		    	        returnValue = org.apache.commons.beanutils.MethodUtils.invokeMethod(beanObj, beanMethodName, args);

    	    	        } else {
    	    	        	returnValue = org.apache.commons.beanutils.MethodUtils.invokeMethod(beanObj, beanMethodName, null);
    	    	        }

    	    	        if (returnValue instanceof ArrayList) {
                            ArrayList objArr = (ArrayList)returnValue;
                            Object newObj = objArr.get(Integer.parseInt(index));
                            ArrayList cachedLst = (ArrayList)cacheObject;
                            cachedLst.remove(Integer.parseInt(index));
                            cachedLst.add(Integer.parseInt(index), newObj);
                        } else if (returnValue instanceof Map) {
                        	Map objMap = (Map)returnValue;
                        	String mapKey = request.getParameter("mapKey");
                        	ArrayList objArr = (ArrayList)objMap.get(mapKey);
                        	if (objArr != null) {
                        		Object newObj = objArr.get(Integer.parseInt(index));
                        		ArrayList cachedLst = (ArrayList)((Map)cacheObject).get(mapKey);
                        		cachedLst.remove(Integer.parseInt(index));
                                cachedLst.add(Integer.parseInt(index), newObj);
                        	}
                        } else if (returnValue instanceof ParamObjectCollection) {
                        	List objArr = ((ParamObjectCollection)returnValue).getList();
                        	Object newObj = objArr.get(Integer.parseInt(index));
                        	ArrayList cachedLst = (ArrayList)((ParamObjectCollection)cacheObject).getList();
                            cachedLst.remove(Integer.parseInt(index));
                            cachedLst.add(Integer.parseInt(index), newObj);
                        }

    	    	        cacheManagerProxy.putObjectDirectly(sepKey[0], gettedCache);

        	        } else {
        	            SysLog.writeLogs(CacheManagerConst.CACHE_MODEL_NAME, GlobalParameters.ERROR,
        	            		new StringBuilder("CacheManagerProxy-reloadCachedObject(")
        	                            .append(sepKey[0])
        	                            .append(") : 执行失败，缓存对象没有必要的重新加载的设置信息，无法更新缓存").toString());
        	        }

        			return new ActionForward("/cacheObjectManagerAction.do?method=diffCacheObjectToDB");
                } else {

                    return new ActionForward("/cacheObjectManagerAction.do?method=diffCacheObjectToDB");
                }
            } else {
                return new ActionForward("/cacheObjectManagerAction.do?method=diffCacheObjectToDB");
            }
        } catch (Exception e) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--updateDBFromCache-0 :"+e.getMessage());
        	request.setAttribute("updataError", "更新缓存的过程中发生错误，请联系管理员");
        	return new ActionForward("/cacheObjectManagerAction.do?method=diffCacheObjectToDB");
            //throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }


    /**
     * 显示缓存对象的record 用于更新数据"
     *
     * */
    public ActionForward showDetailForUpdate(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "showDetailForUpdate";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {

            String cacheKey = request.getParameter("cacheKey");
            String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
            CacheManagerProxy cacheManagerProxy = null;
            if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
            } else {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
            }

            String index = request.getParameter("index");
            if(index != null && !"".equals(index)) {
                Object gettedCache = cacheManagerProxy.peekForStat(sepKey[0]);
                if (gettedCache instanceof HashMap && ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
                    HashMap cacheValue = (HashMap)gettedCache;
                    Object cacheObject = cacheValue.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                    Object voObject = null;
                    if (cacheObject instanceof ArrayList) {
                        ArrayList objArr = (ArrayList)cacheObject;
                        voObject = objArr.get(Integer.parseInt(index));
                    } else if (cacheObject instanceof Map) {
                    	Map objMap = (Map)cacheObject;
                    	String mapKey = request.getParameter("mapKey");
                    	ArrayList objArr = (ArrayList)objMap.get(mapKey);
                    	if (objArr != null) {
                    		voObject = objArr.get(Integer.parseInt(index));
                    	}
                    } else if (cacheObject instanceof ParamObjectCollection) {
                    	ParamObjectCollection paramObjectCollection = (ParamObjectCollection)cacheObject;
                    	List paramObjectLst = paramObjectCollection.getList();
                    	voObject = paramObjectLst.get(Integer.parseInt(index));
                    }

                    BeanUtilsBean beanUtilsBean =
                        new BeanUtilsBean(CacheUtil.getConvertUtilsBean(), new PropertyUtilsBean());

                    Object clonedVo = beanUtilsBean.cloneBean(voObject);
                    PropertyDescriptor[] propertyDescriptors = beanUtilsBean.getPropertyUtils().getPropertyDescriptors(clonedVo);

                    for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {

                    	if (propertyDescriptor.getPropertyType().equals(Date.class)) {
                    		String propertyName = propertyDescriptor.getName();
                    		Object dateValue = beanUtilsBean.getPropertyUtils().getProperty(clonedVo, propertyName);

                    		if (dateValue == null || "".equals(dateValue.toString())) {
                    			beanUtilsBean.setProperty(clonedVo, propertyDescriptor.getName(), CacheConst.DATA_NULL_DEFAULT_VALUE);
                    		}

                    	}
                    }

                    JSONArray jsonArr = new JSONArray();
                    jsonArr.add(clonedVo, CacheUtil.getJsonConfig());

                    String ans = jsonArr.toString();
                    request.setAttribute("cacheKey", cacheKey);
                    request.setAttribute("index", index);
                    request.setAttribute("mapKey", request.getParameter("mapKey"));
                    request.setAttribute("jsonStr", ans);
                    return actionMapping.findForward("showDetailForUpdate");
                } else {
                    return new ActionForward("/cacheObjectManagerAction.do?method=showCacheObjectDetail");
                }
            } else {
                return new ActionForward("/cacheObjectManagerAction.do?method=showCacheObjectDetail");
            }
        } catch (Exception e) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--showDetailForUpdate-0 :"+e.getMessage());
            throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }

    /**
     * 显示缓存对象的record 用于更新数据"
     *
     * */
    public ActionForward updateDBFromCache(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "updateDBFromCache";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
        try {

            String cacheKey = request.getParameter("cacheKey");
            String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
            CacheManagerProxy cacheManagerProxy = null;
            if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
            } else {
                cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
            }

            String index = request.getParameter("index");
            if(index != null && !"".equals(index)) {
                Object gettedCache = cacheManagerProxy.peekForStat(sepKey[0]);
                if (gettedCache instanceof HashMap && ((HashMap)gettedCache).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
                    HashMap cacheValue = (HashMap)gettedCache;
                    Object cacheObject = cacheValue.get(CacheManagerConst.KEY_CACHEDATA_DATA);
                    Object voObject = null;
                    if (cacheObject instanceof ArrayList) {
                        ArrayList objArr = (ArrayList)cacheObject;
                        voObject = objArr.get(Integer.parseInt(index));
                    } else if (cacheObject instanceof Map) {
                    	Map objMap = (Map)cacheObject;
                    	String mapKey = request.getParameter("mapKey");
                    	ArrayList objArr = (ArrayList)objMap.get(mapKey);
                    	if (objArr != null) {
                    		voObject = objArr.get(Integer.parseInt(index));
                    	}
                    } else if (cacheObject instanceof ParamObjectCollection) {
                    	List objArr = ((ParamObjectCollection)cacheObject).getList();
                    	voObject = objArr.get(Integer.parseInt(index));
                    }

                    BeanUtilsBean beanUtilsBean =
                        new BeanUtilsBean(CacheUtil.getConvertUtilsBean(), new PropertyUtilsBean());

                    Object clonedVo = beanUtilsBean.cloneBean(voObject);
                    PropertyDescriptor[] propertyDescriptors = beanUtilsBean.getPropertyUtils().getPropertyDescriptors(clonedVo);

                    for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
                    	String propertyName = propertyDescriptor.getName();
                    	String propertyValue = request.getParameter(propertyName);
                    	if (propertyValue != null && !CacheConst.DATA_NULL_DEFAULT_VALUE.equals(propertyValue)) {
                    		beanUtilsBean.setProperty(clonedVo, propertyName, propertyValue);
                    	}
                    }

                    String updateBeanId = (String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_UPDATEDB_BEANID);
                    String updateBeanMethod = (String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_UPDATEDB_METHOD);
                    String updateBeanAppName = (String)cacheValue.get(CacheManagerConst.KEY_CACHEDATA_UPDATEDB_APPLICATION_NAME);

                    InteractionObjectFactory factory = InteractionObjectFactory.getInstance();
        			AppContext appContext = new AppContextImpl();
        			appContext.setApplicationName(updateBeanAppName);
        			Object pre_bean = factory.getInteractionObject(updateBeanId,appContext);

        			try {
        			    org.apache.commons.beanutils.MethodUtils.invokeMethod(pre_bean, updateBeanMethod, clonedVo);
        			    //pre_bean.getClass().getMethod(updateBeanMethod, voObject.getClass()).invoke(pre_bean, voObject);
        			} catch (Exception ex) {
        				clonedVo = null;
        				throw new Exception("调用更新数据库的方法时发生异常");
        			}

        			cacheManagerProxy.reloadCachedObject(cacheKey);

        			return new ActionForward("/cacheObjectManagerAction.do?method=showCacheObjectDetail");
                } else {

                    return new ActionForward("/cacheObjectManagerAction.do?method=showCacheObjectDetail");
                }
            } else {
                return new ActionForward("/cacheObjectManagerAction.do?method=showCacheObjectDetail");
            }
        } catch (Exception e) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--updateDBFromCache-0 :"+e.getMessage());
        	request.setAttribute("updataError", "更新数据库的过程中发生错误，请联系管理员");
        	return new ActionForward("/cacheObjectManagerAction.do?method=showCacheObjectDetail");
            //throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
    }


    /**
     * 取得可重载缓存对象的列表
     *
     * */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ActionForward showReloadAbleCacheObjectList(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "showReloadAbleCacheObjectList";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

        int totalRows = getTotalRowsFromRequest(request);

        List records=new ArrayList();
        String cacheAd = request.getParameter("cacheAd");
        String cacheObjKey = request.getParameter("cacheObjKey");
        CacheManagerProxy memCacheManager = CacheManagerProxy.getInstanceOfMemcachedProxy();

        CacheManagerProxy ehCacheManager = CacheManagerProxy.getInstanceOfEhCacheProxy();

        ArrayList reloadAbleKey = new ArrayList();
        try {
        	Set cacheKeySetMem = memCacheManager.listCacheKeys();
            for (String keyOfSet : (Set<String>)cacheKeySetMem) {
            	if (cacheObjKey != null && !"".equals(cacheObjKey)){
            		if (keyOfSet.toLowerCase().indexOf(cacheObjKey.toLowerCase()) > -1) {
	            	    Object cacheValue = memCacheManager.peekForStat(keyOfSet);
		                if (cacheValue instanceof HashMap && ((HashMap)cacheValue).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
		                	HashMap cacheValueMap = (HashMap)cacheValue;
		                	if (cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_VALID) != null
		                		    && cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null
		                		    && cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
		                            && !"".equals(((String)cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {
		                		HashMap everyHs = new HashMap();
		                		everyHs.put("cacheKey", keyOfSet+CacheConst.CACHE_KEY_TYPE_SEP+CacheManagerConst.CACHE_TYPE_MEM);
		                		everyHs.put("ObjKey", keyOfSet);
		                		everyHs.put("cacheType", CacheManagerConst.CACHE_TYPE_MEM);
		                		reloadAbleKey.add(everyHs);
		                	}
		                }
            		}
            	} else {
            	    Object cacheValue = memCacheManager.peekForStat(keyOfSet);
	                if (cacheValue instanceof HashMap && ((HashMap)cacheValue).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
	                	HashMap cacheValueMap = (HashMap)cacheValue;
	                	if (cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_VALID) != null
	                		    && cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null
	                		    && cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
	                            && !"".equals(((String)cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {
	                		HashMap everyHs = new HashMap();
	                		everyHs.put("cacheKey", keyOfSet+CacheConst.CACHE_KEY_TYPE_SEP+CacheManagerConst.CACHE_TYPE_MEM);
	                		everyHs.put("ObjKey", keyOfSet);
	                		everyHs.put("cacheType", CacheManagerConst.CACHE_TYPE_MEM);
	                		reloadAbleKey.add(everyHs);
	                	}
	                }
            	}
            }
        } catch(Exception ex ) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--showReloadAbleCacheObjectList-0 :"+ex.getMessage());
        }

        try {
        	Set cacheKeySetEh = ehCacheManager.listCacheKeys();
            for (String keyOfSet : (Set<String>)cacheKeySetEh) {
            	if (cacheObjKey != null && !"".equals(cacheObjKey)){
            		if (keyOfSet.toLowerCase().indexOf(cacheObjKey.toLowerCase()) > -1) {
		            	Object cacheValue = ehCacheManager.peekForStat(keyOfSet);
		                if (cacheValue instanceof HashMap && ((HashMap)cacheValue).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
		                	HashMap cacheValueMap = (HashMap)cacheValue;
		                	if (cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_VALID) != null
		                		    && cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null
		                		    && cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
		                            && !"".equals(((String)cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {
		                		HashMap everyHs = new HashMap();
		                		everyHs.put("cacheKey", keyOfSet+CacheConst.CACHE_KEY_TYPE_SEP+CacheManagerConst.CACHE_TYPE_EH);
		                		everyHs.put("ObjKey", keyOfSet);
		                		everyHs.put("cacheType", CacheManagerConst.CACHE_TYPE_EH);
		                		reloadAbleKey.add(everyHs);
		                	}
		                }
	            	}
	            } else {
	            	Object cacheValue = ehCacheManager.peekForStat(keyOfSet);
	                if (cacheValue instanceof HashMap && ((HashMap)cacheValue).get(CacheManagerConst.KEY_CACHEDATA_VALID) != null) {
	                	HashMap cacheValueMap = (HashMap)cacheValue;
	                	if (cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_VALID) != null
	                		    && cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_BEANID) != null
	                		    && cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_METHOD) != null
	                            && !"".equals(((String)cacheValueMap.get(CacheManagerConst.KEY_CACHEDATA_METHOD)).trim())) {
	                		HashMap everyHs = new HashMap();
	                		everyHs.put("cacheKey", keyOfSet+CacheConst.CACHE_KEY_TYPE_SEP+CacheManagerConst.CACHE_TYPE_EH);
	                		everyHs.put("ObjKey", keyOfSet);
	                		everyHs.put("cacheType", CacheManagerConst.CACHE_TYPE_EH);
	                		reloadAbleKey.add(everyHs);
	    		        }
	                }
	        	}
            }
        } catch(Exception ex ) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--showReloadAbleCacheObjectList-1 :"+ex.getMessage());
        }

        //List resultList = getCachedKey(reloadAbleKey, cacheAd, "");

        if (totalRows < 0) {
            totalRows = reloadAbleKey.size();//从数据库取得总行"
        }

        records = reloadAbleKey;
        request.setAttribute("optrs", records);
        request.setAttribute("totalRows",Integer.valueOf(totalRows));

        return actionMapping.findForward("showReloadAbleCacheObjectList");
    }



    /**
     * 显示重载性能
     *
     * */
    public ActionForward showReloadPerformance(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "showReloadPerformance";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");

        String[] cacheKeys = request.getParameterValues("chkbx_reload");
        ArrayList recordList = new ArrayList();
        Long sumConsumeTime = 0L;
        try {
        	if (cacheKeys != null) {
        	for (String cacheKey : cacheKeys) {
        		String[] sepKey = cacheKey.split(CacheConst.CACHE_KEY_TYPE_SEP);
	            CacheManagerProxy cacheManagerProxy = null;
	            if (CacheManagerConst.CACHE_TYPE_MEM.equals(sepKey[1])) {
	                cacheManagerProxy = CacheManagerProxy.getInstanceOfMemcachedProxy();
	            } else {
	                cacheManagerProxy = CacheManagerProxy.getInstanceOfEhCacheProxy();
	            }

	            HashMap cacheObject = (HashMap)cacheManagerProxy.peekForStat(sepKey[0]);

	            Object cacheObj = null;
	            if (cacheObject != null) {
	            	cacheObj = cacheObject.get(CacheManagerConst.KEY_CACHEDATA_DATA);
	            }

	            HashMap rowMap = new HashMap();
	            int recordNum = 0;
				if (cacheObj instanceof Map) {
					Map objMap = (Map) cacheObj;
					for (Object mapValue : objMap.values()) {
						if (mapValue instanceof List) {
							recordNum = recordNum + ((List)mapValue).size();
						}
					}
				} else if (cacheObj instanceof List) {
					recordNum = recordNum + ((List)cacheObj).size();
				}
				rowMap.put("objKey", sepKey[0]);
				rowMap.put("recNum", String.valueOf(recordNum));
				long beginTime = System.currentTimeMillis();
				//cacheManagerProxy.reloadCachedObject(cacheKey);
				this.refreshCache(request.getParameter("appName"), cacheKey);
				long endTime = System.currentTimeMillis();
				long conSumTime = endTime-beginTime;
				rowMap.put("conSumTime", String.valueOf(conSumTime));
				sumConsumeTime = sumConsumeTime + conSumTime;
				recordList.add(rowMap);
        	}
        	}
        } catch (Exception e) {
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--showReloadPerformance-0 :"+e.getMessage());
            throw new ActionException(e);
        } finally {
            SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": end");
        }
        request.setAttribute("sumConsumeTime", String.valueOf(sumConsumeTime));
        request.setAttribute("optrs", recordList);
        request.setAttribute("totalRows",Integer.valueOf(recordList.size()));
        return actionMapping.findForward("showReloadPerformance");
    }


    /**
     * hostname requires port ie. 192.168.222.2:8080, appName requires /    / ie./crm1/
     * @param hostName
     * @param appName
     * @return
     */
    private CacheService getServiceByHostName(String hostName,String appName){
        HessianProxyFactoryBean factoryBean =  new HessianProxyFactoryBean();
        HessianProxyFactory factory = new HessianProxyFactory();
        CacheService service =null;
        try{
            factoryBean.setServiceUrl("http://"+hostName+ appName+"/remoting/CacheService");
            factoryBean.setServiceInterface(com.neusoft.tdframework.admin.cache.CacheService.class);
            factoryBean.setProxyFactory(factory);
            factoryBean.prepare();
            factoryBean.afterPropertiesSet();
            service = (CacheService)factoryBean.getObject();
        }
        catch(Exception e){
        	SysLog.writeLogs("om",GlobalParameters.ERROR,"CacheObjectManagerAction--getServiceByHostName-0 :"+e.getMessage());
            //e.printStackTrace();
        }
        return service;
    }

    private List getHostNames(){
        AppContainerDAO dao = (AppContainerDAO)getServiceFacade("containerDAO");
        List hostNames = dao.getHostNames();
        //List hostNames = new ArrayList();
        //hostNames.add("10.195.129.33:8080");
        //hostNames.add("10.195.129.34:8080");
        return hostNames;
    }
    
    public ActionForward removeCachedObject(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {
    	
    	String appName = request.getParameter("appName");
        String cacheObjKey = request.getParameter("cacheObjKey");
        String reflashAll = request.getParameter("reflashAll");
        String removeAll = request.getParameter("removeAll");
        String queryKey = request.getParameter("queryKey");
        
    	String[] cacheKeys = request.getParameterValues("chkbx_user");
 
        if (cacheKeys != null && cacheKeys.length > 0) {
            try {
                for(String key : cacheKeys) {
                    if (key != null && !"".equals(key.trim())) {
                    	this.removeCache(appName, key);
                    }
                }
            } catch(Exception ex) {
            	
            }
        } else {
	    	this.removeCache(appName, cacheObjKey);
        }
    	request.setAttribute("isRemoveReturn", "1");
    	request.setAttribute("queryKey", queryKey);
    	return getCacheObjectSumList(actionMapping,
                actionForm, request,
                response);
    	
    }


    /**
     * 测试------------------带有参数的BO缓存
     *
   *

    public ActionForward forTest(ActionMapping actionMapping,
            ActionForm actionForm, HttpServletRequest request,
            HttpServletResponse response) throws ActionException {

        String methodName = "forTest";
        SysLog.writeLogs(CACHE_MODEL_NAME, GlobalParameters.INFO, methodName + ": begin");
		AppContext appContext = new AppContextImpl();
		appContext.setApplicationName("home");
		InteractionObjectFactory factory = InteractionObjectFactory.getInstance();

        CacheObjectManagerBOImpl bo = (CacheObjectManagerBOImpl) factory.getInteractionObject("cacheManagerBO",appContext);
        DBTableObject dBTableObject = new DBTableObject();
        PreCachedVO preCachedVO = new PreCachedVO();
        preCachedVO.setCachedKey("市场营销");
        dBTableObject.setTableName("OM_SYSTEM_T");
        bo.getDBData(dBTableObject, preCachedVO);
        return actionMapping.findForward("forTest");
    }
      */


}
