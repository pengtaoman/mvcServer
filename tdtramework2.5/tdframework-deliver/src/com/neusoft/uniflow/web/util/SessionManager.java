package com.neusoft.uniflow.web.util;

import java.util.Collection;
import java.util.Enumeration;
import java.util.Vector;

import javax.servlet.http.HttpSession;

/**
 * <p>Title: uniflow 3.5 web client</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: neusoft</p>
 * @author not attributable
 * @version 1.0
 */

public class SessionManager
{
  public final static String ERROR = "unieap_workflow_error";
  public final static String CUSTOMATION = "unieap_workflow_customation";
  public final static String PREFERENCE = "unieap_workflow_preference";
  public final static String DESIGNER_MEMBERLIST = "unieap_workflow_designer";
  public final static String BUSINESS_ADMINISTRATOR_MEMBERLIST = "unieap_workflow_business_admin";
  public final static String SYSTEM_ADMINISTRATOR_MEMBERLIST = "unieap_workflow_system_admin";
  public final static String SYSTEM_USER_MEMBERLIST = "unieap_workflow_system_user";
  public final static String EVENTKEY = "unieap_workflow_eventkey";
  public final static String ORGTREE = "unieap_workflow_orgtree";
  public final static String STATISTICS = "unieap_workflow_statistics";
  public final static String BIZ_USERID = "uni_biz_userid";
  public final static String USER = "unieap_workflow_user";
  public final static String BIZWICATEGORY = "unieap_workflow_wi_biz_category";
  public final static String BIZPICATEGORY = "unieap_workflow_pi_biz_category";
  public final static String CATEGORYTREE="unieap_workflow_categorytree";
  public final static String workdayCategoryListree="unieap_workflow_workday_categorylisttree";
  public final static String workdayOrgTree="unieap_workflow_wordayorgtree";
  private static Collection share;
  {
    share = new Vector(2,3);
    share.add(CUSTOMATION);
   }
  public static void reset(HttpSession session)
  {
    for(Enumeration attrNames = session.getAttributeNames();attrNames.hasMoreElements();)
    {
	String name = (String)attrNames.nextElement();
	if(!share.contains(name))
	session.removeAttribute(name);
    }
  }

  public static void reset(HttpSession session, Collection remain)
  {
    for(Enumeration attrNames = session.getAttributeNames();attrNames.hasMoreElements();)
    {
	String name = (String)attrNames.nextElement();
	if((!remain.contains(name))&&(!share.contains(name)))
	session.removeAttribute(name);
    }
  }
 }