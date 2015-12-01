package com.neusoft.uniflow.web.common.trees.beans;

import java.util.Enumeration;
import java.util.Vector;

import javax.servlet.jsp.JspWriter;


public class TreePrinter
{
  public String IMG_SPACE = "space.gif";
  public String IMG_FOLDER = "role.gif";
  public String IMG_FOLDEROPEN = "role.gif";
  public String IMG_JOIN = "space.gif";
  public String IMG_JOINBOTTOM = "space.gif";
  public String IMG_LINE = "space.gif";
  public String IMG_MINUS = "open.gif";
  public String IMG_MINUSBOTTOM = "open.gif";
  public String IMG_PLUS = "close.gif";
  public String IMG_PLUSBOTTOM = "close.gif";

  private OrgTree tree = null;
  public TreePrinter(){}
  public void printTree(OrgTree tree, JspWriter out) throws java.io.IOException
  {
    this.tree = tree;
    if(tree!=null)
	writeNode(tree.getRootNode(), out);
  }
  private void writeNode(OrgNode node,JspWriter out) throws java.io.IOException
  {
    StringBuffer buffer = new StringBuffer();
    //  if(node.getParentNode() == null)
    {
    //画个icon，return
    }
    //********************先画＋―|这些操作展开、合并的符号
    StringBuffer cascadeBuffer = new StringBuffer();
    //画和自己相关部分"+","-"
    if(node.isClicked())//判断节点有没有被点击过
    {
	if(node.hasChildren())//如果被点击过，则判断是否有children
	{
	if(node.isExpanded())//如果有Children，判断是否Expand
	   cascadeBuffer.append(this.printMinus(!node.hasNextSibling(),node.getID()));
	 else
	   cascadeBuffer.append(this.printPlus(!node.hasNextSibling(),node.getID()));
	}
	else//没有children
	cascadeBuffer.append(this.printJoin(!node.hasNextSibling()));
    }
    else//没有被点击过，先画＋
	cascadeBuffer.append(this.printPlus(!node.hasNextSibling(),node.getID()));
    //画和父role相关的，"|"
    for(OrgNode parent = node.getParentNode(); parent!=null; parent = parent.getParentNode())
    {
	if(parent.hasNextSibling())//有后继，画|
	{
	cascadeBuffer.insert(0,this.formatImg(IMG_LINE));
	}
	else
	{
	cascadeBuffer.insert(0,this.formatImg(IMG_SPACE));
	}
    }

    buffer.append(cascadeBuffer.toString());
    //画文件夹符号，表示是否选中
    if(node.getID().equals(this.tree.getOpenNodeID()))
	    buffer.append(this.formatImg(this.IMG_FOLDEROPEN));
    else
	    buffer.append(this.formatImg(this.IMG_FOLDER));

	//画role名，超连接
    buffer.append(formatNameLink(node.getName(),node.getID()));
    /*    if(node.getParentID()==null||node.getParentID().equals(""))
	buffer.append(node.getName());
    else
	buffer.append(formatNameLink(node.getName(),node.getID()));
*/
    //输出当前节点
    buffer.append("<br>\n");
    out.print(buffer.toString());

    //递归调用，画出所有子角色节点
    if(node.isClicked()&&node.hasChildren()&&node.isExpanded())
    {
	Vector children = node.getChildren();
	if (children == null || children.isEmpty())
	return;
	for (Enumeration enumeration = children.elements(); enumeration.hasMoreElements(); ) {
	OrgNode child = (OrgNode) enumeration.nextElement();
	this.writeNode(child, out);
	}
    }
  }

  private String printPlus(boolean isBottom, String nodeID)
  {
    if(isBottom)
	return this.formatImgLink(formatImg(IMG_PLUSBOTTOM),nodeID);
    else
	return this.formatImgLink(formatImg(IMG_PLUS),nodeID);
  }
  private String printJoin(boolean isBottom)
  {
    if(isBottom)
	return formatImg(IMG_JOINBOTTOM);
    else
	return formatImg(IMG_JOIN);
  }
  private String printMinus(boolean isBottom, String nodeID)
  {
    if(isBottom)
	return this.formatImgLink(formatImg(IMG_MINUSBOTTOM),nodeID) ;
    else
	return this.formatImgLink(formatImg(IMG_MINUS),nodeID);
  }
  private String formatImgLink(String img, String nodeID)
  {
    return "<a href='rolelist.do?selectedRole=" + nodeID + "&expand=true&selected=false'>" +
	img + "</a>";
  }
  private String formatImg(String imgName)
  {
    return "<IMG SRC='unieap/pages/workflow/stylesheet/style1/orgtree_img/" + imgName + "' border = '0' />";
  }
  private String formatNameLink(String name, String id)
  {
    StringBuffer buffer = new StringBuffer();
    buffer.append("<a href='rolelist.do?selectedRole=");
    buffer.append(id);
    buffer.append("&expand=false&select=true'");
    if(id.equals(this.tree.getOpenNodeID()))
	buffer.append(" class='v11_r1'");
    else
	buffer.append(" class='header'");
    buffer.append(">");
    buffer.append(name);
    buffer.append("</a>");

    return buffer.toString();
  }

}