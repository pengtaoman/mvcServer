package com.neusoft.om.omutil;

import com.neusoft.om.dao.dutypower.DutyPowerColl;
import com.neusoft.om.dao.dutypower.DutyPowerVO;
import com.neusoft.om.dao.funcrole.FuncRoleColl;
import com.neusoft.om.dao.funcrole.FuncRoleVO;

/**
 * @author renh
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class ParseFuncString {
	/**
	 * 解析funcStr,返回功能角色结果集funcStr格式 menuId-adminStatus-execStatus;menuId-adminStatus-execStatus
	 * @param roleId
	 * @param funcStr
	 * @return
	 */
	public static FuncRoleColl getParseColl(int roleId, String funcStr){
		String[] funcArray;
		//String[] tmp;
		int x = funcStr.length();
		if(x==0) return null;
		FuncRoleVO vo = null;
		FuncRoleColl coll = new FuncRoleColl();
		//数组
		funcArray = funcStr.split(";");
		int arrayLengh = funcArray.length;
		for(int i=0;i<arrayLengh;i++){
			//tmp = funcArray[i].split("-");
			vo = new FuncRoleVO();
			vo.setRoleId(roleId);
			vo.setMenuId(funcArray[i]);
			vo.setAdminStatus(1);
			vo.setExecStatus(1);
			coll.addFuncRole(vo);
		}
		return coll;
	}
	
	/**
	 * 解析funcStr,返回职务职责范围结果集funcStr格式 menuId-adminStatus-execStatus;menuId-adminStatus-execStatus
	 * @param dutyId
	 * @param funcStr
	 * @return
	 */
	public static DutyPowerColl getDutyPowerColl(int dutyId,String funcStr) {
		String[] funcArray;
		int x = funcStr.length();
		if(x==0) return null;
		DutyPowerVO vo = null;
		DutyPowerColl coll = new DutyPowerColl();
		//数组
		funcArray = funcStr.split(";");
		int arrayLengh = funcArray.length;
		for(int i=0;i<arrayLengh;i++){
			vo = new DutyPowerVO();
			vo.setDutyId(dutyId);
			vo.setMenuId(funcArray[i]);
			vo.setAdminStatus(1);
			vo.setExecStatus(1);
			coll.addDutyPower(vo);
		}
		return coll;
	}
	//test
	public static void main(String args[]){
		
		//System.out.println(getParseColl(1,"180A-1-0;180AA-1-1;").getFuncRole(1).getMenuId());
		//System.out.println(getParseColl(151,"15-1-0;151A-1-0;151A1-1-0;151A2-1-0;151AA-1-0;151AB-1-0;151AC-1-0;151AD-1-0;151AE-1-0;151AF-1-0;151AFA-1-0;151AFB-1-0;151AFC-1-0;151AFD-1-0;151AG-1-0;151AGA-1-0;151AGB-1-0;151AH-1-0;151AHA-1-0;151AHB-1-0;151AI-1-0;151B-1-0;151BA-1-0;151BB-1-0;151BC-1-0;151BD-1-0;151BDA-1-0;151BDB-1-0;151BE-1-0;151BF-1-0;151BFA-1-0;151BFB-1-0;151BG-1-0;151BGA-1-0;151BGB-1-0;151BGC-1-0;16-1-0;160A-1-0;160AA-1-0;160AB-1-0;160AC-1-0;160B-1-0;160BA-1-0;160BB-1-0;160BC-1-0;160C-1-0;160CA-1-0;160CB-1-0;160CC-1-0;160D-1-0;160DA-1-0;160DB-1-0;160E-1-0;160EA-1-0;160EB-1-0;18-1-0;180A-1-0;180AA-1-0;180AB-1-0;180AC-1-0;180B-1-0;180BA-1-0;180BB-1-0;180BC-1-0;180BD-1-0;180C-1-0;180CA-1-0;180CB-1-0;180CC-1-0;180CD-1-0;180D-1-0;180DA-1-0;180DB-1-0;180DC-1-0;180DD-1-0;180E-1-0;180EA-1-0;180F-1-0;180FA-1-0;180GA-1-0;180G-1-0;").getRowCount());
		System.out.println(getDutyPowerColl(11,"150A;150B;150C;").getRowCount());
		
	}
}
