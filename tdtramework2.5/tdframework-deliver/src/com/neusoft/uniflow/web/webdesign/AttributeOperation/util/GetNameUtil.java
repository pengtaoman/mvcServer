package com.neusoft.uniflow.web.webdesign.AttributeOperation.util;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class GetNameUtil {
	public static String getAppName(String appId, HttpServletRequest request) {
		String appName = "";
		if (appId != null) {
			NWSession session = WorkflowManager.getNWSession();
			if (session != null) {
				try {
					if (appId.indexOf(",") != -1) {
						String[] ids = appId.split(",");
						for (int i=0; i<ids.length; i++) {
							NWApplication nwApp = session.getApplication(ids[i]);
							if (nwApp != null) {
								appName += nwApp.getName() + ",";
							}
						}
						appName = appName.substring(0, appName.length()-1);
					} else {
						NWApplication nwApp = session.getApplication(appId);
						if (nwApp != null) {
							appName = nwApp.getName();
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		}
		if(appName.length()==0) appName = appId;
		return appName;
	}

	public static String getSubprocName(String procDefID, String versionName,
			HttpServletRequest request) {
		String procDefName = procDefID;
		if (procDefID != null) {
			NWSession session = WorkflowManager.getNWSession();
			if (session != null) {
				try {
					NWProcDef procDef = session.getProcDef("",
							procDefID, 0);
					if (procDef != null) {
						procDefName = procDef.getName();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		}
		return procDefName;
	}
	
	public static String getParticipantName(String partiId,String partiType, HttpServletRequest request)
	{
		String participantName = "";
		if(partiId!=null&&partiType!=null)
		{
			NWOrg org = UniflowManager.getNWOrg();
			//手动节点参与人类型：人员
			if(partiType.equals("0"))
			{
				try{
					NWPerson person = org.getPerson(partiId);
					if(person!=null)
					{
						participantName = person.getName()==null?partiId:person.getName();
					}
				}
				catch(Exception e)
				{
					
				}
			}
			//手动节点参与人类型：角色
			else if(partiType.equals("1"))
			{
				try{
					NWRole role = org.getRole(partiId);
					if(role!=null)
					{
						participantName = role.getName()==null?partiId:role.getName();
					}
				}
				catch(Exception e)
				{
					
				}
			}
			//手动节点参与人类型：变量 (美的项目中Flex可以直接从流程获得，不需要服务器解析)
			else if(partiType.equals("8"))
			{
				participantName = partiId;
			}
			//手动节点参与人类型：预定义
			else if(partiType.equals("10"))
			{
				if("2".equals(partiId))
				{
					participantName = "实例创建者";
				}
			}
			// 自定义
			//手动节点参与人类型：职种
			else if(partiType.equals("FF"))
			{
				participantName = partiId;
			}
		}
		return participantName;
	}
}
