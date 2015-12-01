package com.neusoft.uniflow.web.authorization.uniform.actions;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;


import com.neusoft.org.NWOrg;
import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.authorization.uniform.beans.RoleTreeHelper;
import com.neusoft.uniflow.web.util.WorkflowManager;
/**
 * @author 
 * 将得到的角色，人员信息保存到哈希表中并返回
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class ParticipantsAction extends Action{

        private Vector rolestree=new Vector();
        private Vector  users=new Vector(30);
        private Vector others=new Vector(10);
        private String strForm = "";
        private RoleTreeHelper roleTreeHelper=null ;
        public ActionForward execute(ActionMapping map, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception{
			String activityid = request.getParameter("activityid");
			String formid = request.getParameter("formid");
			String participants = request.getParameter("participants");
			roleTreeHelper = new RoleTreeHelper();
			roleTreeHelper = new RoleTreeHelper();
			this.vectorClear();
            getRoles(participants,activityid);  
          	Vector vroleTree =roleTreeHelper.getRoleTree("node",rolestree);
            Vector vPersonTree = roleTreeHelper.getPersonTree("nodeP",users);
			Vector vOtherPartiTree = roleTreeHelper.getOtherPartiTree("other",others);
            request.setAttribute("roles",vroleTree);
            request.setAttribute("users",vPersonTree);
			request.setAttribute("others",vOtherPartiTree);
			request.setAttribute("activityid",activityid);
			request.setAttribute("actparti",strForm);
			request.setAttribute("formid",formid);
            return map.findForward("success");
        }

        private void getRoles(String participants,String activityId){
            NWOrg orgMgr = WorkflowManager.getNWOrg();
			String[] partis = participants.split(";");
			StringBuffer str = new StringBuffer(10);
			NWSession nwsession=WorkflowManager.getNWSession();
			try {
				NWActDef actDef=nwsession.getActDef(activityId, 0);
				if(actDef!=null){
					others.addElement(actDef.getID()+"&"+actDef.getName());
					str.append(actDef.getName()).append(",").append(actDef.getID()).append(";");
				}
			} catch (NWException e1) {
				e1.printStackTrace();
			}
		    for(int i=0; i<partis.length;i++){
				String[] parti = partis[i].split(",");
				if(parti[0].equals("0")){
					try{
					   //System.out.println(parti[1]);
					   NWPerson psn = orgMgr.getPerson(parti[1]);
					   if(psn!=null) {
						  users.addElement(psn.getID()+"&"+psn.getAccount());
						  str.append(psn.getAccount()).append(",").append(psn.getID()).append(";");
					   }
					}catch(Exception e){ 
						e.printStackTrace();
					}
					continue;
			    }
				if(parti[0].equals("1")){
					try{
		           	NWRole role = orgMgr.getRole(parti[1]);
						if (role!=null) {
							rolestree.addElement(role.getID()+"&"+role.getName());
							str.append(role.getName()).append(",").append(role.getID()).append(";");
						}
					}catch(Exception e){
						e.printStackTrace();
					}
					continue;
                }
				if(parti[0].equals("2")){
					others.add("2&");
					str.append("2;");
					continue;
				}
				if(parti[0].equals("3")){
					others.add("3&");
					str.append("3;");
					continue;
				}
				if(parti[0].equals("4")){
					others.add("4&");
					str.append("4;");
					continue;
				}
				if(parti[0].equals("5")){
					others.add("5&");
					str.append("5;");
					continue;
				}
				if(parti[0].equals("7")){
					if(parti.length==2) {
						 others.add("7&" + parti[1]);
						 str.append("7;");
					}
 					continue;
				}
				if(parti[0].equals("8")){
					if(parti.length==2) {
						others.add("8&" + parti[1]);
						str.append("8;");
					}
					continue;
				}
			}
		    strForm = str.toString();
		    //System.out.println("strForm  "+strForm);
      }
		private void vectorClear(){
			users.clear();
            rolestree.clear();
            others.clear();
	}
}