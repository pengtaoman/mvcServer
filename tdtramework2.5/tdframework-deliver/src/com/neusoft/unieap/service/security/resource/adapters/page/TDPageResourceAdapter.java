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
 * Page��Դ������ʵ����
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
                        this.getResourceType().getID(), "writely", "��д"));
        vt.add(new com.neusoft.unieap.service.security.resource.impl.PermissionImpl(
                        this.getResourceType().getID(), "readonly", "ֻ��"));
        vt.add(new com.neusoft.unieap.service.security.resource.impl.PermissionImpl(
                        this.getResourceType().getID(), "hidden", "����"));
        vt.add(new com.neusoft.unieap.service.security.resource.impl.PermissionImpl(
                        this.getResourceType().getID(), "disabled", "���ɼ�"));
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
                        "writely", "��д");
                return per;
            }
        }
        iter = hm.keySet().iterator();
        while (iter.hasNext()) {
            if (((String) iter.next().toString()).equals("readonly")) {
                per = new PermissionImpl(this.getResourceType().getID(),
                        "readonly", "ֻ��");
                return per;
            }
        }
        iter = hm.keySet().iterator();
        while (iter.hasNext()) {
            if (((String) iter.next().toString()).equals("hidden")) {
                per = new PermissionImpl(this.getResourceType().getID(),
                        "hidden", "����");
                return per;
            }
        }
        iter = hm.keySet().iterator();
        while (iter.hasNext()) {
            String permis = (String) iter.next().toString();//������Ʋ���Ȩ��ʱΪ���ɼ�
            if (permis.equals("disabled") || permis.equals("nosetpermission")) {
                per = new PermissionImpl(this.getResourceType().getID(),
                        "disabled", "���ɼ�");
                return per;
            }
        }
        return per;
    }

    /**
     * ȡ��ҳ�漶����Դֵ teturn ��Դ��vector
     */
    public Vector getResources() {
        return getResources("");
    }

    /**
     * ȡ��ҳ�漶����Դֵ(��Ӧ����أ� teturn ��Դ��vector
     */
    public Vector getResources(String appName) {
        pagesTree.clear();
        File webroot = new File(EAPConfig.web_root_path);

        PagesTreeGenerater ptg = new PagesTreeGenerater();
        pagesTree=ptg.generateTree(webroot,appName);
        return pagesTree;
    } 
}
