package com.neusoft.uniflow.web.monitor.procinst.beans;

import java.util.Vector;

import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWParam;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWRelData;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.api.res.NWEvent;
import com.neusoft.uniflow.engine.operator.Operator;
import com.neusoft.uniflow.web.util.CommonInfoManager;
import com.neusoft.uniflow.web.util.ParseOperatorFromActDef;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class Transtion {
	
	public static Vector changeToBean(Vector workitemList, NWSession session,
			HttpSession httpsession) {
		Vector workitembeanList = new Vector();
		WorkItemBean workitembean;
		try {
			for (int i = 0; i < workitemList.size(); i++) {
				NWWorkItem workitem = (NWWorkItem) workitemList.elementAt(i);
				workitembean = new WorkItemBean();
				workitembean.setId(workitem.getWorkItemID());
				workitembean.setName(workitem.getName());

				String actid = workitem.getActInstID();
				NWActInst actinst = session.getActInst(session.getUserID(),
						actid);
				String actname = actinst.getName();
				workitembean.setActname(actname);

				workitembean.setCurstate(CommonInfoManager.getStateStr(workitem
						.getCurState(), httpsession));

				workitembean.setCreatetime(CommonInfoManager
						.getDateStr(workitem.getStartTime()));
				workitembean.setCompletetime(CommonInfoManager
						.getDateStr(workitem.getCompleteTime()));
				String username="";
				if(workitem.getUserType()==NWParticipantEntity.PTCPTENTITY_TYPE_PERSON)
					username = WorkflowManager.getNWOrg().getPerson(workitem.getUserID()).getName();
				else
					username=WorkflowManager.getNWOrg().getRole(workitem.getUserID()).getName();
				workitembean.setUsername(username);

				workitembeanList.add(workitembean);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return workitembeanList;
	}

	public static Vector changeToEventBean(NWEvent event, Vector Params,
			NWProcInst procinst) {
		Vector list = new Vector();
		EventVarBean bean;
		try {
			for (int i = 0; i < Params.size(); i++) {
				NWParam param = (NWParam) Params.elementAt(i);
				bean = new EventVarBean();
				String inVar = param.getVar1ID();
				if (inVar != null) {
					if (procinst != null) {
						NWProcDef procdef = procinst.getProcDef();
						NWRelData rd = procdef.getRelData(inVar);
						if (rd != null)
							inVar = rd.getName();
					}
					bean.setInVar(inVar);
				} else {
					bean.setInVar("");
				}

				String outVar = param.getVar2ID();
				if (outVar != null)
					bean.setOutVar(event.getVar(outVar).getName());
				else
					bean.setOutVar("");
				if (param.getDirection() == 0)
					bean.setDirect("<--");
				else if (param.getDirection() == 1)
					bean.setDirect("-->");
				else if (param.getDirection() == 2)
					bean.setDirect("<->");
				list.add(bean);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

//根据节点定义ID获取办理人
	public static Vector changeActDefToWorkitemBean(String actdefID,String procinstID,HttpSession httpsession) throws Exception
	{
		Vector workItemBeans=new Vector();
		Vector operators=ParseOperatorFromActDef.getOperators(procinstID, actdefID);//operators中保存着该节点中所有的办理人以及办理人的类型。
		WorkItemBean workitembean;
		Operator operator;
		for (int i=0;i<operators.size();i++)
		{
			operator=(Operator)operators.get(i);
			workitembean=new WorkItemBean();
			workitembean.setUsername(CommonInfoManager.getUserInfo(operator.getID(), operator.getType()));
			workitembean.setCurstate("未执行");
			workitembean.setCompletetime("--");
			
			
			
			workItemBeans.add(workitembean);
			
			
		}
		return workItemBeans;
	}
	
	
	
}