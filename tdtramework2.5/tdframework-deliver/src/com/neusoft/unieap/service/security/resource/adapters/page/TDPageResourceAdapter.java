/*
 * Created on 2006-6-19
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.unieap.service.security.resource.adapters.page;

/**
 * @author zhangjn
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

import com.neusoft.unieap.config.EAPConfig;
import com.neusoft.unieap.service.security.SecurityFactory;
import com.neusoft.unieap.service.security.authorization.Permission;
import com.neusoft.unieap.service.security.resource.ResourceType;
import com.neusoft.unieap.service.security.resource.SecurityResource;
import com.neusoft.unieap.service.security.resource.impl.PermissionImpl;
import com.neusoft.unieap.service.security.resource.impl.ResourceTypeImpl;
import com.neusoft.unieap.service.security.resource.impl.SecurityResourceImpl;
import com.neusoft.unieap.service.security.resource.adapters.page.*;

/**
 * Page资源适配器实现类
 * 
 * @author zhoujj
 *  
 */
public class TDPageResourceAdapter implements
        com.neusoft.unieap.service.security.resource.adapters.ResourceAdapter {

    //private String appname;

    private Vector vt;

    private Vector pagesTree = new Vector();

    private ResourceType rt;

    public TDPageResourceAdapter() {
        rt = new ResourceTypeImpl("page", "page");
        vt = new Vector();
        vt.add(new com.neusoft.unieap.service.security.resource.impl.PermissionImpl(
                        this.getResourceType().getID(), "writely", "可写"));
        vt.add(new com.neusoft.unieap.service.security.resource.impl.PermissionImpl(
                        this.getResourceType().getID(), "readonly", "只读"));
        vt.add(new com.neusoft.unieap.service.security.resource.impl.PermissionImpl(
                        this.getResourceType().getID(), "hidden", "隐藏"));
        vt.add(new com.neusoft.unieap.service.security.resource.impl.PermissionImpl(
                        this.getResourceType().getID(), "disabled", "不可见"));
    }

    /*
     * (non-Javadoc)
     * 
     * @see com.neusoft.unieap.security.resource.ResourceAdapter#getResourceByID(com.neusoft.unieap.security.resource.ResourceType,
     *      java.lang.String)
     */
    public SecurityResource getResourceByID(String id) {
    	SecurityResource sr=null;
    	SecurityResource srtemp=null;
    	Iterator iterResources =  pagesTree.iterator();
    	while( iterResources.hasNext()) {
    		srtemp = (SecurityResource) iterResources.next();
    		if(srtemp.getID().equals(id)){
    			sr=new SecurityResourceImpl(id, srtemp.toString(), srtemp.getParentID());
    		}
    	}
    	return sr;
    }

    /*
     * (non-Javadoc)
     * 
     * @see com.neusoft.unieap.security.resource.adapters.ResourceAdapter#getPermissions()
     */
    public Vector getPermissions() {
        return vt;
    }

    /*
     * (non-Javadoc)
     * 
     * @see com.neusoft.unieap.security.resource.adapters.ResourceAdapter#getPermissionByID(java.lang.String)
     */
    public Permission getPermissionByID(String id) {
        for (Iterator vt1 = vt.iterator(); vt.iterator().hasNext();) {
            Permission element = (Permission) vt1.next();
            if (element.getID().equals(id))
                return element;
        }
        return null;
    }

    /*
     * (non-Javadoc)
     * 
     * @see com.neusoft.unieap.security.resource.adapters.ResourceAdapter#getResourceTypeID()
     */
    public ResourceType getResourceType() {
        return this.rt;
    }

    public Permission getRoleUsingPermission(String securityid) {
        Vector pers = null;
        Permission per = null;
        Map hm = new HashMap();
        pers = SecurityFactory.getInstance().getPermissionStatus("page",
                securityid);
        for (Iterator iter = pers.iterator(); iter.hasNext();) {
            Permission element = (Permission) iter.next();
            hm.put(element.getID(), element.getID());
        }

        Iterator iter = hm.keySet().iterator();

        while (iter.hasNext()) {
            String permis = (String) iter.next().toString();
            if(permis.equals("writely")){
                per = new PermissionImpl(this.getResourceType().getID(),
                        "writely", "可写");
                return per;
            }
        }
        iter = hm.keySet().iterator();
        while (iter.hasNext()) {
            if (((String) iter.next().toString()).equals("readonly")) {
                per = new PermissionImpl(this.getResourceType().getID(),
                        "readonly", "只读");
                return per;
            }
        }
        iter = hm.keySet().iterator();
        while (iter.hasNext()) {
            if (((String) iter.next().toString()).equals("hidden")) {
                per = new PermissionImpl(this.getResourceType().getID(),
                        "hidden", "隐藏");
                return per;
            }
        }
        iter = hm.keySet().iterator();
        while (iter.hasNext()) {
            String permis = (String) iter.next().toString();//这里控制不设权限时为不可见
            if (permis.equals("disabled") || permis.equals("nosetpermission")) {
                per = new PermissionImpl(this.getResourceType().getID(),
                        "disabled", "不可见");
                return per;
            }
        }
        return per;
    }

    /**
     * 取得页面级的资源值 teturn 资源树vector
     */
    public Vector getResources() {
        return getResources("");
    }

    /**
     * 取得页面级的资源值(与应用相关） teturn 资源树vector
     */
    public Vector getResources(String appName) {
        pagesTree.clear();
        File webroot = new File(EAPConfig.web_root_path);

        PagesTreeGenerater ptg = new PagesTreeGenerater();
        pagesTree=ptg.generateTree(webroot,appName);
        return pagesTree;
    } 
}
