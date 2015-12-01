package com.neusoft.uniflow.web.test.bean;

public class DlTestVar {
	public Object getVarValue(String procinstid, String varName) {
		System.out
				.println("-------------------------DL Test Var Start------------------");
		System.out.println("ProcInst  ID：" + procinstid);
		System.out.println("Var     NAME：" + varName);
		System.out.println("Return Value：OF");
		System.out
				.println("-------------------------DL Test Var End--------------------");
		return "OF";
	}
}