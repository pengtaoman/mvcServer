package com.neusoft.uniflow.web.participant.actions;

import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWParticipantEntity;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWRelData;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.participant.beans.ActDefbean;
import com.neusoft.uniflow.web.participant.beans.VarPartiBean;
import com.neusoft.uniflow.web.participant.forms.SetActPartiForm;

public class SetActPartiAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		SetActPartiForm setActpartiform = (SetActPartiForm) form;
		String actID = request.getParameter("activityid");
		NWSession nwsession = WorkflowManager.getNWSession();
		if (actID != null && !actID.equals("")){
			setActpartiform.setActPartiId(actID);
		}
		
		try {
			NWActDef nwactdef = nwsession.getActDef(setActpartiform
					.getActPartiId(), 0);
			setActpartiform.setName(nwactdef.getName());
			String action = setActpartiform.getAction();
			if (action != null && action.equals("update")) {
				Vector particientitylist = new Vector();
				String[] procreator = setActpartiform.getProCreator();// 流程创建者相关
				int procreatorlength = procreator.length;
				if (procreatorlength > 0) {
					for (int i = 0; i < procreatorlength; i++) {
						NWParticipantEntity ptcpEntity = nwactdef
								.createParticipant();
						switch (Integer.parseInt(procreator[i])) {
						case 1:
							ptcpEntity
									.setEntityType(NWParticipantEntity.PTCPTENTITY_TYPE_INSTCREATOR);
							break;
						case 2:
							ptcpEntity
									.setEntityType(NWParticipantEntity.PTCPTENTITY_TYPE_INSTCREATORSUPER);
							break;
						case 3:
							ptcpEntity
									.setEntityType(NWParticipantEntity.PTCPTENTITY_TYPE_PREVPTCPT);
							break;
						case 4:
							ptcpEntity
									.setEntityType(NWParticipantEntity.PTCPTENTITY_TYPE_PREVPTCPTSUPER);
							break;
						}
						if (ptcpEntity != null) {
							particientitylist.add(ptcpEntity);
						}
					}
				}
				String[] manactor = setActpartiform.getManactor();// 节点参与者
				int manactorlength = manactor.length;
				if (manactorlength > 0) {
					for (int i = 0; i < manactorlength; i++) {
						NWParticipantEntity ptcpEntity = nwactdef
								.createParticipant();
						ptcpEntity.setEntityID(manactor[i]);
						ptcpEntity
								.setEntityType(NWParticipantEntity.PTCPTENTITY_TYPE_ACTIVITY);
						particientitylist.add(ptcpEntity);
					}
				}
				String[] varlist = setActpartiform.getVarpartis();// 变量
				int varlistlength = varlist.length;
				if (varlistlength > 0) {
					for (int i = 0; i < varlistlength; i++) {
						NWParticipantEntity ptcpEntity = nwactdef
								.createParticipant();
						ptcpEntity.setEntityID(varlist[i]);
						ptcpEntity
								.setEntityType(NWParticipantEntity.PTCPTENTITY_TYPE_VARIABLE);
						particientitylist.add(ptcpEntity);
					}
				}
				String[] rolelist = setActpartiform.getRoleActparti();// 角色参与者列表
				int rolelistlength = rolelist.length;
				if (rolelistlength > 0) {
					for (int i = 0; i < rolelistlength; i++) {
						NWParticipantEntity ptcpEntity = nwactdef
								.createParticipant();
						ptcpEntity.setEntityID(rolelist[i]);
						ptcpEntity
								.setEntityType(NWParticipantEntity.PTCPTENTITY_TYPE_ROLE);
						particientitylist.add(ptcpEntity);
					}
				}
				String[] personactlist = setActpartiform.getPersonActParti();// 人员参与者列表
				int personactlistlength = personactlist.length;
				if (personactlistlength > 0) {
					for (int i = 0; i < personactlistlength; i++) {
						NWParticipantEntity ptcpEntity = nwactdef
								.createParticipant();
						ptcpEntity.setEntityID(personactlist[i]);
						ptcpEntity
								.setEntityType(NWParticipantEntity.PTCPTENTITY_TYPE_PERSON);
						particientitylist.add(ptcpEntity);
					}
				}
				setActpartiform.setAction("");
				if(particientitylist!=null){
					this.setParticipantEntity(particientitylist, nwactdef);//保存参与者
				}
			}//end if
			
			Vector ptcptEntity = this.getEdParticipant(nwactdef.openParticipantList());
			
			String userid = (String) session
					.getAttribute(SessionManager.BIZ_USERID);

			String[] proCreator = getproCreator(ptcptEntity);
			setActpartiform.setProCreator(proCreator);
			//request.setAttribute("proCreator", proCreator);

			// 参与者类型为变量
			Vector varlist = this.openVarActlist(nwactdef, nwsession, userid);
			setActpartiform.setVarPartisList(varlist);
			String varPartis[] = getSelectVarlist(ptcptEntity);
			setActpartiform.setVarpartis(varPartis);

			// 手动节点
			Vector actDefList = openAllActDefList(nwactdef, nwsession, userid);
			setActpartiform.setActDefList(actDefList);
			String manactor[] = getSelctmanactor(ptcptEntity);
			setActpartiform.setManactor(manactor);

			// 人员参与者
			Vector personact = getAllPersonAct(ptcptEntity, WorkflowManager
					.getNWOrg());
			setActpartiform.setActpartilist(personact);

			// 角色参与者
			Vector roleActpartilist = getAllRoleAct(ptcptEntity, WorkflowManager
					.getNWOrg());
			setActpartiform.setRoleActpartilist(roleActpartilist);

			request.setAttribute("rolelist", roleActpartilist);
			request.setAttribute("personlist", personact);

		} catch (Exception e) {
			e.printStackTrace();
			session.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
		return mapping.findForward("success");
	}
	/**
	 * 取得流程定义上的所有手动参与者
	 * */
	public Vector openAllActDefList(NWActDef nwactdef, NWSession nwsession,
			String userid) throws NWException {
		Vector manualAct = new Vector();
		Vector allAct = new Vector();
		String processid = nwactdef.getProcDefID();
		String version = nwactdef.getProcVersionName();
		NWProcDef nwprocdef = nwsession.getProcDef(userid, processid, version,0);
		allAct = nwprocdef.openActivityList();
		int size = allAct.size();
		for (int i = 0; i<size; i++) {
			NWActDef nwact = (NWActDef) allAct.elementAt(i);
			if (nwact.getType() == NWActDef.ACT_TYPE_MANUAL && !nwact.getID().equals(nwactdef.getID())) {
				ActDefbean actdefbean = new ActDefbean();
				actdefbean.setId(nwact.getID());
				actdefbean.setName(nwact.getName());
				manualAct.add(actdefbean);
			}
		}
		
		return manualAct;
	}

	public String[] getSelctmanactor(Vector ptcptEntitylist) {
		Vector manactorlist = new Vector();
		int ptcptsize = ptcptEntitylist.size();
		for (int i = 0; i < ptcptsize; i++) {
			NWParticipantEntity participantentity = (NWParticipantEntity) ptcptEntitylist
					.elementAt(i);
			if (participantentity.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_ACTIVITY) {
				manactorlist.add(participantentity);
			}
		}
		String manactor[] = new String[manactorlist.size()];
		for (int i = 0; i < manactorlist.size(); i++) {
			manactor[i] = ((NWParticipantEntity) manactorlist.elementAt(i))
					.getEntityID();
		}
		return manactor;
	}
	
	/**
	 * 从节点参与者列表取得人员参与者
	 * */
	public Vector getAllPersonAct(Vector ptcptEntityList, NWOrg nworg)
			throws Exception {
		Vector allpersonact = new Vector();
		int size = ptcptEntityList.size();
		for (int i = 0; i < size; i++) {
			NWParticipantEntity participantentity = (NWParticipantEntity) ptcptEntityList
					.elementAt(i);
			if (participantentity.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_PERSON) {
				NWPerson person = nworg.getPerson(participantentity.getEntityID());
				if (person != null) {
					String name = "";
					if (person.getName()!=null && !person.getName().equals(""))
						name = person.getName();
					else if(person.getAccount()!=null && !person.getAccount().equals(""))
						name= person.getAccount();
					allpersonact.add(new LabelValueBean(name,person.getID()));
				}else{
					allpersonact.add(new LabelValueBean(participantentity.getEntityID(),participantentity.getEntityID()));
				}
			}
		}
		return allpersonact;
	}

	/**
	 * 从节点参与者列表中取得角色参与者
	 * */
	public Vector getAllRoleAct(Vector ptcptEntityList, NWOrg nworg)
			throws Exception {
		Vector roleact = new Vector();
		int size = ptcptEntityList.size();
		for (int i = 0; i < size; i++) {
			NWParticipantEntity participantentity = (NWParticipantEntity) ptcptEntityList
					.elementAt(i);
			if (participantentity.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_ROLE) {
				NWRole nwrole = nworg.getRole(participantentity.getEntityID());
				if (nwrole != null) {
					String name = "";
					if (nwrole.getName()!=null && !nwrole.getName().equals(""))
						name = nwrole.getName();
					roleact.add(new LabelValueBean(name, nwrole.getID()));
				}else{
					roleact.add(new LabelValueBean(participantentity.getEntityID(),participantentity.getEntityID()));
				}
			}
		}
		return roleact;
	}

	public String[] getproCreator(Vector ptcptEntityList) {
		String procreator[] = new String[4];
		String returnprocreator[] = new String[4];
		int ptcptsize = ptcptEntityList.size();
		int count = 0;
		for (int i = 0; i < ptcptsize; i++) {
			NWParticipantEntity participantentity = (NWParticipantEntity) ptcptEntityList
					.elementAt(i);
			if (participantentity.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_INSTCREATOR) {
				procreator[0] = "1";
			} else if (participantentity.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_INSTCREATORSUPER) {
				procreator[1] = "2";
			} else if (participantentity.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_PREVPTCPT) {
				procreator[2] = "3";
			} else if (participantentity.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_PREVPTCPTSUPER) {
				procreator[3] = "4";
			}
		}
		for (int i = 0; i < 4; i++) {
			if (procreator[i] != null) {
				returnprocreator[count++] = procreator[i];
			}
		}
		return returnprocreator;
	}
	
	/**
	 * get the list of var on a process  model through the act define
	 * */

	public Vector openVarActlist(NWActDef actdef, NWSession nwsession,
			String userid) throws NWException {
		Vector varlist = new Vector();
		Vector strvarlist = new Vector();
		String processid = actdef.getProcDefID();
		String version = actdef.getProcVersionName();
		NWProcDef nwprocdef = nwsession.getProcDef(userid, processid, version,0);
		varlist = nwprocdef.openRelDataList();
		int size = varlist.size();
		for (int i = 0; i < size; i++) {
			NWRelData nwreldata = (NWRelData) varlist.elementAt(i);
			if (nwreldata.getType() == NWRelData.RELDATA_TYPE_STRING) {
				VarPartiBean varpartibean = new VarPartiBean();
				varpartibean.setId(nwreldata.getID());
				varpartibean.setName(nwreldata.getName());
				varpartibean.setType(nwreldata.getType());
				strvarlist.add(varpartibean);
			}
		}
		return strvarlist;
	}

	public String[] getSelectVarlist(Vector ptcptEntityList) {
		Vector varparti = new Vector();
		int partisize = ptcptEntityList.size();
		for (int i = 0; i < partisize; i++) {
			NWParticipantEntity nwparticipantentity = (NWParticipantEntity) ptcptEntityList
					.elementAt(i);
			if (nwparticipantentity.getEntityType() == NWParticipantEntity.PTCPTENTITY_TYPE_VARIABLE) {
				varparti.add(nwparticipantentity);
			}
		}
		partisize = varparti.size();
		String varPartis[] = new String[partisize];
		for (int i = 0; i < partisize; i++) {
			varPartis[i] = ((NWParticipantEntity) varparti.elementAt(i))
					.getEntityID();
		}
		return varPartis;
	}
	/**
	 * 通过参与者列表筛选出所有主送参与者
	 * */
	public Vector getEdParticipant(Vector pcptEntityList){
		Vector participant=new Vector();
		int size=pcptEntityList.size();
		for(int i=0;i<size;i++){
			NWParticipantEntity nwparticipantentity=(NWParticipantEntity)pcptEntityList.elementAt(i);
			if(nwparticipantentity.getActionType()==1){
				participant.add(nwparticipantentity);
			}
		}
		return participant;
	}
	public void removeAllEdParticipants(NWActDef nwactdef) throws NWException{
		Vector v=this.getEdParticipant(nwactdef.openParticipantList());
		int size=v.size();
		for(int i=0;i<size;i++){
			NWParticipantEntity nwparticipantentity=(NWParticipantEntity)v.elementAt(i);
			nwactdef.removeParticipant(nwparticipantentity);
		}
	}
	public void setParticipantEntity(Vector participantlist, NWActDef nwactdef)
			throws Exception {
		int size = participantlist.size();
		this.removeAllEdParticipants(nwactdef);
		for (int i = 0; i < size; i++) {
			NWParticipantEntity nwparticipantentity=(NWParticipantEntity) participantlist.elementAt(i);
			nwparticipantentity.setActionType(1);
			nwactdef.addParticipant(nwparticipantentity);
		}
	}
}