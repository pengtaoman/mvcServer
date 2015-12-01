package com.neusoft.uniflow.web.webdesign.modifyProcinst.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWParticipantDetail;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.AO.ProcInstAO;
import com.neusoft.uniflow.web.toollistener.Util.NWGUIDGenerator;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ModifyProcAction extends Action{
	private String userId;
	public ActionForward execute(ActionMapping mapping,
			 ActionForm form,
			 HttpServletRequest request,
			 HttpServletResponse response){
		
		HttpSession session=request.getSession();
		String procinstid=request.getParameter("procInstID");
		userId =(String)session.getAttribute(SessionManager.BIZ_USERID);
		NWSession nwsession=WorkflowManager.getNWSession();
		
		try{
				NWProcInst procinst=nwsession.getProcInst(userId, procinstid);
				NWProcDef procdef=procinst.getProcDef();
				String versionName = NWGUIDGenerator.getInstance().getID();
				boolean isExist=procdef.isVersionNameExists(versionName);
				if( !procinst.isDupTmp() ){
					ProcInstAO ao = ProcInstAO.getInstance();
					ao.createNewVersion(procinst,versionName);
				} 
				if(isExist){
					session.setAttribute(SessionManager.ERROR, "process version is already exist");
					return mapping.findForward("error");
				}
				boolean editable = isEditable(procinst,nwsession);
				boolean operatable = isCreatorModifyOperator(procinst,nwsession);
				request.setAttribute("editable", String.valueOf(editable));
				request.setAttribute("isNewVersion", "true");
				request.setAttribute("procinstID", procinst.getProcInstID());
				request.setAttribute("selectedID", procinst.getProcDefID());
				request.setAttribute("selectedVersion", procinst.getProcDef().getVersionName());
				request.setAttribute("operatable", String.valueOf(operatable));

					Vector curActIds = procinst.openActInstIDList(2);
					String curActId="";
					String curActAfterTran = "";
					if(curActIds != null){
						for(int i=0;i<curActIds.size();i++){
							String curActIdTemp = nwsession.getActInst("", (String)curActIds.get(i)).getActDefID();
							Vector afterTranId = procinst.openAfterTransList((String)curActIds.get(i));
							for(int j=0;j<afterTranId.size();j++){
								curActAfterTran = curActAfterTran + afterTranId.get(j) + ";";
							}
							
							curActId = curActId + curActIdTemp +";";
							break;
						}
					}
					int n = 0;
					if(!curActId.equals("")){
						n = curActId.length();
						curActId = curActId.substring(0, n-1);
					}
					
					if(!curActAfterTran.equals("")){
						n = curActAfterTran.length();
						curActAfterTran = curActAfterTran.substring(0, n-1);
					}
					
					
					request.setAttribute("curActId", curActId);
					request.setAttribute("curActAfterTran", curActAfterTran);
			} catch (Exception e) {
				e.printStackTrace();
				session.setAttribute(SessionManager.ERROR, new UniException(e));
				return mapping.findForward("error");
			}
			return mapping.findForward("toFlex");
		
	}
	
	private boolean isCreatorModifyOperator(NWProcInst procinst,NWSession nwsession) throws Exception{
		boolean flag = false;
		//If current node is creator node
		Vector curActIds = procinst.openActInstIDList(2);
		if(null!=curActIds&&curActIds.size()>0){
			NWActInst actInst = nwsession.getActInst("", (String)curActIds.get(0));
			String preActInstId = actInst.getPreActInstID();
			int nodeType = nwsession.getActInst(null, preActInstId).getType();
			if(nodeType == 8 && userId.equals(procinst.getCreater())){
				flag = true;
			}
		}
		return flag;
	}
	
	private boolean isEditable(NWProcInst procinst,NWSession nwsession) throws Exception{
		boolean flag = false;
		Vector monitors = procinst.openMonitorList();
		if(null!=monitors){
			NWOrg org = WorkflowManager.getNWOrg(); 
			for(int i=0;i<monitors.size();i++){
				NWParticipantDetail participant = (NWParticipantDetail) monitors.get(i);
					//特权人是人员
					if(participant.getEntityType()==0){
						if(userId.equals(participant.getEntityID())){
							flag = true;
							return flag;
						}
					}
					//特权人是角色
					else if(participant.getEntityType()==1){
						NWRole role = org.getRole(participant.getEntityID());
						Vector persons = role.openMemberList();
						if(null!=persons){
							for(int j=0;j<persons.size();j++){
								NWPerson person = (NWPerson) persons.get(j);
								if(userId.equals(person.getID())){
									flag = true;
									return flag;
								}
							}
						}
						
					}
			}
		}
		//If current node has authority to modify process.
		if(!flag){
			Vector curActIds = procinst.openActInstIDList(2);
			if(null!=curActIds&&curActIds.size()>0){
				NWActInst actInst = nwsession.getActInst("", (String)curActIds.get(0));
				String canModifyFlow = actInst.getExtendProperty("canModifyFlow");
				if(null!=canModifyFlow&&canModifyFlow.equals("true")){
					Vector operators = actInst.getActDef().openParticipantList();
					if(null!=operators){
						NWOrg org = WorkflowManager.getNWOrg(); 
						for(int i=0;i<operators.size();i++){
							NWParticipantEntity participant = (NWParticipantEntity) operators.get(i);
							//如果主送判断是否有权限，抄送无权限修改流程
							if(participant.getActionType()==1){
								//处理人是流程起草人
								if(participant.getEntityType()==2
										&& userId.equals(procinst.getCreater())){
									flag = true;
									return flag;
								}
								//处理人是人员
								else if(participant.getEntityType()==0){
									if(userId.equals(participant.getEntityID())){
										flag = true;
										return flag;
									}
								}
								//处理人是角色
								else if(participant.getEntityType()==1){
									NWRole role = org.getRole(participant.getEntityID());
									Vector persons = role.openMemberList();
									if(null!=persons){
										for(int j=0;j<persons.size();j++){
											NWPerson person = (NWPerson) persons.get(j);
											if(userId.equals(person.getID())){
												flag = true;
												return flag;
											}
										}
									}
									
								}
								
							}
						}
						
					}
					
				}
			}
		}
		//if current user is super administrator.
		if(!flag){
			//to do...
		}

		return flag;
	}
}
