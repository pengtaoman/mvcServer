package com.neusoft.uniflow.web.authorization.uniform.beans;

import java.util.Vector;
/**
 * @author shangzf@neusoft.com
 * 得到传入节点的子节点，并将其构造成js语句返回jsp程序.
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public class RoleTreeHelper {

	private Vector roleTree = new Vector();
    private Vector personTree = new Vector(20);
	private Vector otherTree = new Vector(6);
	private String strElement="";
	private int parent=1;
	public Vector getRoleTree(String node,Vector rolesTree){
	  roleTree.clear();
	  int indexloc =0;
	  parent=2;
	  String[] strRoleInfo =new String[2];
	  for(int i=0;i<rolesTree.size();i++){
		strElement = (String)rolesTree.elementAt(i);
		indexloc = strElement.indexOf("&");
		strRoleInfo[0] = strElement.substring(0,indexloc);
		strRoleInfo[1] = strElement.substring(indexloc+1);
		parent++;
		roleTree.add("tree.add(" + parent + ",2,\"" + strRoleInfo[1]+"\",\"javascript:clickOnNode('"+strElement+"&1')\",null,Icon.rolenode.src)");
	  }
	  return roleTree;
	}
	public Vector getPersonTree(String node,Vector Persons){
		personTree.clear();
		int perCount=2000;
		int indexloc =0;
	    String[] strRoleInfo =new String[2];
	    for(int i=0;i<Persons.size();i++){
	        strElement = (String)Persons.elementAt(i);
	        indexloc = strElement.indexOf("&");
	        strRoleInfo[0] = strElement.substring(0,indexloc);
	        strRoleInfo[1] = strElement.substring(indexloc+1);
			  personTree.add("tree.add(" + (perCount++) + ",1000,\"" + strRoleInfo[1]+"\",\"javascript:clickOnNode(\'"+strElement+"&0\')\",null,Icon.person.src)");
		}

		return personTree;
	}
	public Vector getOtherPartiTree(String node,Vector otherPartiTree){
	  otherTree.clear();
      int indexloc =0;
      parent=4000;
      String[] strRoleInfo =new String[2];
      for(int i=0;i<otherPartiTree.size();i++){
	  strElement = (String)otherPartiTree.elementAt(i);
	  indexloc = strElement.indexOf("&");
	  strRoleInfo[0] = strElement.substring(0,indexloc);
	  strRoleInfo[1] = strElement.substring(indexloc+1);
	  parent++;
	  if(strRoleInfo[0].equals("2"))
		  otherTree.add("tree.add(" + parent + ",3000,\"实例创建者\",\"javascript:clickOnNode('2&2&2')\",null,Icon.leaf.src)");
      if(strRoleInfo[0].equals("3"))
		  otherTree.add("tree.add(" + parent + ",3000,\"实例创建者的上级\",\"javascript:clickOnNode('3&3&3')\",null,Icon.leaf.src)");
      if(strRoleInfo[0].equals("4"))
		  otherTree.add("tree.add(" + parent + ",3000,\"上一节点的参与者\",\"javascript:clickOnNode('4&4&4')\",null,Icon.leaf.src)");
	  if(strRoleInfo[0].equals("5"))
		  otherTree.add("tree.add(" + parent + ",3000,\"上一节点参与者的上级\",\"javascript:clickOnNode('5&5&5')\",null,Icon.leaf.src)");
	  if(strRoleInfo[0].equals("7")){
		  otherTree.add("tree.add(4000,3000,\"某一节点\",\"javascript:void(0)\",null,Icon.other.src)");
		  otherTree.add("tree.add(6000,4000,\""+strRoleInfo[1]+"\",\"javascript:clickOnNode('7&7&7')\",null,Icon.leaf.src)");
	  }
	  if(strRoleInfo[0].equals("8")){
		  otherTree.add("tree.add(5000,3000,\"变量\",\"javascript:void(0)\",null,Icon.other.src)");
		  otherTree.add("tree.add(7000,5000,\""+strRoleInfo[1]+"\",\"javascript:clickOnNode('8&8&8')\",null,Icon.leaf.src)");
	}

  }
  return otherTree;
}

}