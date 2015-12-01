package com.neusoft.uniflow.web.authorization.purview.beans;

import java.util.Hashtable;
import java.util.Vector;

import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.common.NWException;

public class VersionTree {
	private Hashtable pht = new Hashtable();
	private String[] stubNames;
	private String[] stubKeys;
	private int stubNum = 0;
	private String[][] leafNames;
	private String[][] leafID;
	private int[] leafNum;
	
	public int getStubNum(){
		return this.stubNum;
	}
	public String getStubName(int stubID){
		return stubNames[stubID];
	}
	public int getLeafNumFormStub(int stubID){
		return leafNum[stubID];
	}
	public String getLeafNameByStub(int stubID,int leafID){
		return leafNames[stubID][leafID];
	}
	public String getLeafIDByStub(int stubID,int lID){
		return leafID[stubID][lID];
	}
	

	public VersionTree(Vector objs) throws NWException {
		int k = 0;
		stubNames = new String[objs.size()];
		stubKeys = new String[objs.size()];
		leafNum = new int[objs.size()];
		leafNames = new String[objs.size()][objs.size()];
		leafID = new String[objs.size()][objs.size()];
		for (int i = 0; i < objs.size(); i++) {
			NWActDef actDef = (NWActDef) objs.elementAt(i);
			String procdefid = actDef.getProcDefID();
			String procver = actDef.getProcVersionName();
			String key = procdefid + "#" + procver;
			String procName = actDef.getProcName();
			String name = procName + "[" + procver + "]";
			//System.out.println(key+"----"+name);
			if (!pht.containsKey(key)) {
				pht.put(key, procName);
				stubNames[k] = name;
				stubKeys[k] = key;
				k++;
			}
		}
		stubNum = pht.size();
		//System.out.println("--------stubNum:"+stubNum);
		for (int i = 0; i < stubNum; i++) {
			for (int j = 0; j < objs.size(); j++) {
				NWActDef actDef = (NWActDef) objs.elementAt(j);
				String procdefid = actDef.getProcDefID();
				String procver = actDef.getProcVersionName();
				String key = procdefid + "#" + procver;				
				if (key.equals(stubKeys[i])) {
					leafNames[i][leafNum[i]] = actDef.getName();
					leafID[i][leafNum[i]] = "viewdetail.do?actdefid="+actDef.getID();					
					leafNum[i]++;
				}
			}
		}
		
//		for (int i=0;i<stubNum;i++){
//			System.out.println("-------------------"+leafNum[i]+"--------------------");
//			for(int j=0;j<leafNum[i];j++){
//				System.out.println("("+i+","+j+")"+leafNames[i][j]);
//			}
//		}
	}

}
