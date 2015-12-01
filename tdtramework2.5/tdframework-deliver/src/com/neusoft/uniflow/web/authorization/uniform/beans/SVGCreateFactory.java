package com.neusoft.uniflow.web.authorization.uniform.beans;

import java.awt.Point;
import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWTransition;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.util.*;
import com.neusoft.uniflow.web.util.MathUtil;


public class SVGCreateFactory {
	public static String tab = System.getProperty("line.separator");
	private Hashtable acts = new Hashtable();

	private int maxX = 0;
	private int maxY = 0;
	//存放坐标和大小 x,y,l
	private Hashtable noParentNodes = new Hashtable();//父亲节点为流程的节点坐标
	private Hashtable hasParentNodes = new Hashtable();//父亲节点为节点的节点坐标
	private Hashtable firstLevelParallel_unit = new Hashtable();//第一层并发（父亲节点为流程）坐标

	private Hashtable parallel_unitXY = new Hashtable();//并发单元体绝对坐标
	private Hashtable parallel_branchXY = new Hashtable();//并发分支绝对坐标
	//存放各个体的关系
	private Hashtable parallel_unit = new Hashtable();//并发体-节点关系数组 key 并发体ID value 并发体的子节点ID
	private Hashtable parallel_branch = new Hashtable();//分支-节点关系数组 key 分支ID value 分支的子节点ID
	
	private String[] positions;// 获取某个传输线所有的拐点坐标（by zhaozhg）

	private VisualActiveNode activeNode=VisualActiveNode.getInstance();
	
	public static SVGCreateFactory svgcreatefac = null;
	public static SVGCreateFactory getInstance(){
		if (svgcreatefac==null)
			return new SVGCreateFactory();
		else
			return svgcreatefac;
	}
	//
	public  String createProcessDefine(HttpSession httpsession,NWSession session,String path,String pathimg)throws NWException{
		StringBuffer sb = new StringBuffer();
		String pidAndVersion = (String)httpsession.getAttribute("process");
		String temp[] = pidAndVersion.split("#");
		if (temp[0]==null || temp[1]==null){
			throw new NWException("无法取得被监控的流程定义！");
		}
		NWProcDef process = session.getProcDef("",temp[0],temp[1], 0);
		Vector transitions = process.openTransitionList();
		Vector activities = process.openActivityList();	
		
		Hashtable apps = (Hashtable)httpsession.getAttribute("apps");
		SVGTranstion tran = (SVGTranstion)httpsession.getAttribute("workflow-svgtranstion");
		
		acts = tran.getActs();
		maxX = tran.getMaxX();
		maxY = tran.getMaxY();
		noParentNodes = tran.getNoParentNodes();//父亲节点为流程的节点坐标
		hasParentNodes = tran.getHasParentNodes();//父亲节点为节点的节点坐标
		firstLevelParallel_unit = tran.getFirstLevelParallel_unit();//第一层并发（父亲节点为流程）坐标
      
		parallel_unitXY = tran.getParallel_unitXY();//并发单元体绝对坐标
		parallel_branchXY = tran.getParallel_branchXY();//并发分支绝对坐标

		parallel_unit = tran.getParallel_unit();//并发体-节点关系数组 key 并发体ID value 并发体的子节点ID
		parallel_branch = tran.getParallel_branch();//分支-节点关系数组 key 分支ID value 分支的子节点ID
        
		//2009-08-06 Yu Yang Remark 
		//为了对齐并发体设置的硬补偿
		int parallel_compensation_x = 20;
		int parallel_compensation_y = 10;
		
		try{

			sb.append(this.createHeader(path));
		    if (!noParentNodes.isEmpty()){	
				for (int i=0;i<activities.size();i++){
					NWActDef actdef = (NWActDef)activities.elementAt(i);
		            if (noParentNodes.containsKey(actdef.getID())){
		            	sb.append(this.createActivitie(process,apps,actdef,pathimg,path,0)); 
		            }
				}

			}
		    if (!this.firstLevelParallel_unit.isEmpty()){
				for (int i=0;i<activities.size();i++){
					NWActDef actdef = (NWActDef)activities.elementAt(i);
		            if (firstLevelParallel_unit.containsKey(actdef.getID())){
		            	sb.append(this.createParallelUnit(actdef.getID(),pathimg,parallel_compensation_x,parallel_compensation_y));			       		            	
		            }
				}			       
			}

		    if (!hasParentNodes.isEmpty()){	
				for (int i=0;i<activities.size();i++){
					NWActDef actdef = (NWActDef)activities.elementAt(i);
		            if (hasParentNodes.containsKey(actdef.getID())){
		            	sb.append(this.createActivitie(process,apps,actdef,pathimg,path,1,parallel_compensation_x,parallel_compensation_y)); 
		            }
				}

			} 
 			
		    for(int i=0;i<transitions.size();i++){
			    NWTransition trans = (NWTransition)transitions.elementAt(i);
			    sb.append(this.createTransition(trans,parallel_compensation_x,parallel_compensation_y));
		    }
  
		}catch(Exception e){
			e.printStackTrace();
		}
		sb.append("</svg>");
		return sb.toString();
	}
	private String createHeader(String path){
		StringBuffer sb = new StringBuffer();
		sb.append("<svg width=\"").append("100%").append("\" height=\"")
		  .append("100%").append("\" onmousemove=\"findXY(evt)\" ")
		  .append(" onmousedown=\"initMenu()\"")
		  .append(">").append(tab);
		sb.append("<script language=\"text/javascript\" xlink:href=\"").append(path)
		  .append("/js/ProcDefSvg.js\"/>").append(tab);			
		sb.append("<defs>").append(tab);
	    sb.append("<linearGradient id=\"linerec1\">").append(tab);
		sb.append("<stop offset=\"0%\" stop-color=\"white\"/>").append(tab);
		sb.append("<stop offset=\"100%\" stop-color=\"#F0F0F0\"/>").append(tab);
		sb.append("</linearGradient>").append(tab);
		
	    sb.append("<linearGradient id=\"linerec2\" gradientTransform=\"rotate(90)\">").append(tab);
		sb.append("<stop offset=\"0%\" stop-color=\"white\"/>").append(tab);
		sb.append("<stop offset=\"100%\" stop-color=\"#F0F0F0\"/>").append(tab);
		sb.append("</linearGradient>").append(tab);

		sb.append("<g id=\"arrow\">").append(tab);
		sb.append("<path d=\"M 0 0 L 1 0 L 5 4 L 7 4 L 11 0 L 12 0\" style=\"stroke-width:1;stroke:#eec5fd;fill:none\" />").append(tab);
		sb.append("<path d=\"M 1 1 L 6 6 L 11 1 \" style=\"stroke-width:1;stroke:#49006b;fill:none\" />").append(tab);
		sb.append("<path d=\"M 0 1 L 5 6\" style=\"stroke-width:1;stroke:#de90fe;fill:none\" />").append(tab);
		sb.append("<path d=\"M 7 6 L 12 1 \" style=\"stroke-width:1;stroke:#de90fe;fill:none\" />").append(tab);
		sb.append("</g>").append(tab);
		
		sb.append("</defs>").append(tab);
		sb.append("<rect x=\"0\" y=\"0\" width=\"").append(maxX).append("\" height=\"")
		      .append(maxY).append("\"")
		      .append(" style=\"fill:#ffffff;").append(tab);
        sb.append("stroke:#ffffff; stroke-width: 2; stroke-opacity: 0.2;\" />").append(tab);
		return sb.toString();
	}
	private String createActivitie(NWProcDef process,Hashtable apps,NWActDef actdef,String path,String Contextpath,int hs_type)throws NWException{
		   StringBuffer sb = new StringBuffer();
		   String apptype = "";
		   String actPosition;
		   if (hs_type == 0)
			   actPosition = (String)noParentNodes.get(actdef.getID());
		   else
			   actPosition = (String)hasParentNodes.get(actdef.getID());

		   String pos[] = actPosition.split(",");
		   int x = Integer.valueOf(pos[0]).intValue();
		   int y = Integer.valueOf(pos[1]).intValue();
		   int l = Integer.valueOf(pos[2]).intValue();
		   int type = actdef.getType();
		   
		   String name = actdef.getName();	
		   if (name.indexOf(">")>0 || name.startsWith(">")) 
			   name = name.replaceAll(">","&gt;");
		   if (name.indexOf("<")>0 || name.startsWith("<")) 
			   name = name.replaceAll("<","&lt;");
		   
		   if (actdef.getAppID()!=null &&!actdef.getAppID().equals("")){
			      apptype = (String)apps.get(actdef.getAppID());
			      if (apptype == null)
			    	  apptype = "";
		   }
		   //自动节点		   
		   if (type==0){
			   sb.append("<g  id=\"").append(actdef.getID()).append("\">").append(tab);	
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" rx=\"3\" ry=\"3\" height=\"25\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);
			   String png = "auto.png";			   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);			   
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);
			   sb.append("</g>").append(tab);
		   }
		   //手动节点
		   if (type==1){
			   if (apptype.equals("url")){
				   sb.append("<g onmousedown=\"setActAppID('")
				     .append(actdef.getID()).append("')\"")
				     .append(tab);
				   sb.append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
				   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
				     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
				     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
				     .append(tab);	
			   }else if (apptype.equals("wform")){				   
				   sb.append("<g onmousedown=\"setActAppID('")
				     .append(actdef.getID()).append("')\"")
				     .append(tab)
				     .append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
				   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
				     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:#de90fe;stroke-width:1;stroke:#B4B2B4;\" ")
				     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
				     .append(tab);	
	
			   }else{
				   sb.append("<g onmousedown=\"setActAppID('")
				     .append(actdef.getID()).append("')\"")
				     .append(tab);
				   sb.append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
				   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
				     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
				     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
				     .append(tab);		
			   }				   
			   
			   String png = "manual.png";
		   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);		
			   sb.append("</g>").append(tab);
		   }
		   //子流程节点
		   if (type==2||type==3){
			   sb.append("<g id=\"").append(actdef.getID()).append("\">").append(tab);
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);	
			   
			   String png = "subproc.png";	
			   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);	
			   
			   sb.append("</g>").append(tab);
		   }
		   //事件节点
		   if (type==4){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "event.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);

		   }
		   //选择节点
		   if (type==5){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "choice.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);
		   }
		   //开始节点
		   if (type==8){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "start.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);
		   }
		   //结束节点
		   if (type==9){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "end.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);
		   }
		   //分支开始节点
		   if (type==20 || type==21){
			   String png = "inner.png";	
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"50\" height=\"5\"/>").append(tab);

		   }
		   

		return sb.toString();
	}
	
	private String createActivitie(NWProcDef process,Hashtable apps,NWActDef actdef,String path,String Contextpath,int hs_type,int parallel_compensation_x, int parallel_compensation_y)throws NWException{
		   StringBuffer sb = new StringBuffer();
		   String apptype = "";
		   String actPosition;
		   if (hs_type == 0)
			   actPosition = (String)noParentNodes.get(actdef.getID());
		   else
			   actPosition = (String)hasParentNodes.get(actdef.getID());

		   String pos[] = actPosition.split(",");
		   int x = Integer.valueOf(pos[0]).intValue() + parallel_compensation_x;
		   int y = Integer.valueOf(pos[1]).intValue() + parallel_compensation_y;
		   int l = Integer.valueOf(pos[2]).intValue();
		   int type = actdef.getType();
		   
		   String name = actdef.getName();	
		   if (name.indexOf(">")>0 || name.startsWith(">")) 
			   name = name.replaceAll(">","&gt;");
		   if (name.indexOf("<")>0 || name.startsWith("<")) 
			   name = name.replaceAll("<","&lt;");
		   
		   if (actdef.getAppID()!=null &&!actdef.getAppID().equals("")){
			      apptype = (String)apps.get(actdef.getAppID());
			      if (apptype == null)
			    	  apptype = "";
		   }
		   //自动节点		   
		   if (type==0){
			   sb.append("<g  id=\"").append(actdef.getID()).append("\">").append(tab);	
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" rx=\"3\" ry=\"3\" height=\"25\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);
			   String png = "auto.png";			   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);			   
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);
			   sb.append("</g>").append(tab);
		   }
		   //手动节点
		   if (type==1){
			   if (apptype.equals("url")){
				   sb.append("<g onmousedown=\"setActAppID('")
				     .append(actdef.getID()).append("')\"")
				     .append(tab);
				   sb.append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
				   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
				     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
				     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
				     .append(tab);	
			   }else if (apptype.equals("wform")){				   
				   sb.append("<g onmousedown=\"setActAppID('")
				     .append(actdef.getID()).append("')\"")
				     .append(tab)
				     .append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
				   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
				     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:#de90fe;stroke-width:1;stroke:#B4B2B4;\" ")
				     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
				     .append(tab);	
	
			   }else{
				   sb.append("<g onmousedown=\"setActAppID('")
				     .append(actdef.getID()).append("')\"")
				     .append(tab);
				   sb.append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
				   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
				     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
				     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
				     .append(tab);		
			   }				   
			   
			   String png = "manual.png";
		   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);		
			   sb.append("</g>").append(tab);
		   }
		   //子流程节点
		   if (type==2||type==3){
			   sb.append("<g id=\"").append(actdef.getID()).append("\">").append(tab);
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);	
			   
			   String png = "subproc.png";	
			   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);	
			   
			   sb.append("</g>").append(tab);
		   }
		   //事件节点
		   if (type==4){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "event.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);

		   }
		   //选择节点
		   if (type==5){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "choice.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);
		   }
		   //开始节点
		   if (type==8){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "start.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);
		   }
		   //结束节点
		   if (type==9){
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "end.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x+8)
			     .append("\" y=\"").append(y+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
			   sb.append("<text x=\"").append(x+30).append("\" y=\"")
			     .append(y+17).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);
		   }
		   //分支开始节点
		   if (type==20 || type==21){
			   String png = "inner.png";	
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"50\" height=\"5\"/>").append(tab);

		   }
		   

		return sb.toString();
	}
	private String createParallelUnit(String unit_id,String path, int parallel_compensation_x, int parallel_compensation_y)throws Exception{
		StringBuffer sb = new StringBuffer();
		String value = (String) parallel_unitXY.get(unit_id);
		String[] values = value.split(",");
		int x = Integer.valueOf(values[0]).intValue() + parallel_compensation_x;
		int y = Integer.valueOf(values[1]).intValue() + parallel_compensation_y;
		//TODO 人为加上5px
		int w = Integer.valueOf(values[2]).intValue() + 5;
		int h = Integer.valueOf(values[3]).intValue();
		
		parallel_unitXY.put(unit_id, x + "," + y + "," + w + "," + h);
		
		sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
		  .append("\" width=\"").append(w).append("\" height=\"").append(h)
		  .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec2);stroke-width:1;stroke:#B4B2B4;\" ")
		  .append("/>").append(tab);
		
		NWActDef actdef = (NWActDef) acts.get(unit_id);
		int l = 8 + 16 + 6 + caclNameStrLength(actdef.getName()) + 12;
		int ax = x + w/2 -l/2;
		int ay = y-12;
		
			
		sb.append("<rect x=\"").append(ax).append("\" y=\"").append(ay)
		  .append("\" width=\"").append(l).append("\" height=\"").append("25")
		  .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
		  .append("/>").append(tab);	
		
		String png = "parallel.png";	
		String name = actdef.getName();	
		sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(ax+8)
		  .append("\" y=\"").append(ay+6).append("\" width=\"16\" height=\"16\"/>").append(tab);	
		sb.append("<text x=\"").append(ax+30).append("\" y=\"")
		  .append(ay+17).append("\" style=\"text-anchor: left\">")
		  .append(name).append("</text>").append(tab);
		
		
		int ix1 = x+w/2-4;
		int iy1 = y+12;
		
		String ipng = "expand.gif";
		sb.append("<image xlink:href=\"").append(path).append(ipng).append("\" x=\"").append(ix1)
		  .append("\" y=\"").append(iy1).append("\" width=\"9\" height=\"9\"/>").append(tab);
		
		int ix2 = x+w/2-4;
		int iy2 = y+h-4;
		
	
		sb.append("<image xlink:href=\"").append(path).append(ipng).append("\" x=\"").append(ix2)
		  .append("\" y=\"").append(iy2).append("\" width=\"9\" height=\"9\"/>").append(tab);
		
    	String branches = (String) parallel_unit.get(unit_id);
    	String[] bs = branches.split(",");
    	for (int j=0;j<bs.length;j++){
			NWActDef act = (NWActDef)acts.get(bs[j]);
			if (act.getType()==19 && parallel_branchXY.containsKey(bs[j])){
	            	sb.append(this.createParallelBranch(bs[j],path,parallel_compensation_x,parallel_compensation_y));
	        }
		}
		
		return sb.toString();
	}
	private String createParallelBranch(String branch_id ,String path, int parallel_compensation_x, int parallel_compensation_y) throws Exception{
		StringBuffer sb = new StringBuffer();
		String value = (String) parallel_branchXY.get(branch_id);
		String[] values = value.split(",");
		int x = Integer.valueOf(values[0]).intValue() + parallel_compensation_x;
		int y = Integer.valueOf(values[1]).intValue() + parallel_compensation_y;
		int w = Integer.valueOf(values[2]).intValue();
		int h = Integer.valueOf(values[3]).intValue();

		parallel_branchXY.put(branch_id,x + "," + y + "," + w + "," + h);
		
		sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
		  .append("\" width=\"").append(w).append("\" height=\"").append(h)
		  .append("\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec2);stroke-width:1;stroke:#B4B2B4;\" ")
		  .append("/>").append(tab);
		
    	String nodes = (String) parallel_branch.get(branch_id);
    	String[] ns = nodes.split(",");
    	for (int j=0;j<ns.length;j++){
			NWActDef act = (NWActDef)acts.get(ns[j]);
			if (act.getType()==16 && parallel_unitXY.containsKey(ns[j])){
	            	sb.append(this.createParallelUnit(ns[j],path,parallel_compensation_x,parallel_compensation_y));
	        }
		}
		
		return sb.toString();
	}
	
	private String createTransition(NWTransition trans,int parallel_compensation_x,int parallel_compensation_y) throws NWException {
		boolean flag=false;//判断传输线是否在并发分支内
		StringBuffer sb = new StringBuffer();
		String startactid = trans.getPrevActID();
		String endactid = trans.getNextActID();
		NWActDef s_act = (NWActDef) acts.get(startactid);
		NWActDef e_act = (NWActDef) acts.get(endactid);
		int s_type = s_act.getType();
		int e_type = e_act.getType();
		String parentDef=s_act.getParentActDefID();
		NWActDef parentAct=(NWActDef)acts.get(parentDef);
		if(parentAct!=null)
		{
			int type=parentAct.getType();
			if(type==19)
				flag=true;
		}
		
		int x1, x2, y1, y2, l1, l2,h1,h2;
		positions = trans.getPosition().split(";");// 获取该传输线的所有拐点坐标 （by zhaozhg
													// 2000805020）
		if (s_type <= 11 && e_type <= 11) {// 正常节点-〉正常节点
			String startP = "0,0,0";
			String endP = "0,0,0";
			if (noParentNodes.containsKey(startactid)
					&& noParentNodes.containsKey(endactid)) {
				startP = (String) noParentNodes.get(startactid);
				endP = (String) noParentNodes.get(endactid);
			}
			if (this.hasParentNodes.containsKey(startactid)
					&& hasParentNodes.containsKey(endactid)) {
				startP = (String) hasParentNodes.get(startactid);
				endP = (String) hasParentNodes.get(endactid);
			}
			String[] sp = startP.split(",");
			String[] ep = endP.split(",");
			x1 = Integer.parseInt(sp[0]);
			y1 = Integer.parseInt(sp[1]);
			l1 = Integer.parseInt(sp[2]);
			x2 = Integer.parseInt(ep[0]);
			y2 = Integer.parseInt(ep[1]);
			l2 = Integer.parseInt(ep[2]);

			if(flag==false)
				sb.append(this.creatPolyTransition(trans,x1, y1, x2, y2, l1, l2,
						25, 25));
				else
					sb.append(this.createAutoTransiton(trans, x1, y1, x2, y2, l1, l2, 25, 25,parallel_compensation_x,parallel_compensation_y));

		}

		if ((s_type <= 11 && e_type == 16)) {// 正常节点-〉并发单元体
			String first1 = "0,0,0";
			if (noParentNodes.containsKey(startactid)) {
				first1 = (String) noParentNodes.get(startactid);
			}
			if (this.hasParentNodes.containsKey(startactid)) {
				first1 = (String) hasParentNodes.get(startactid);
			}
			String second1 = (String) this.parallel_unitXY.get(endactid);
			String[] f1 = first1.split(",");
			String[] s1 = second1.split(",");
			x1 = Integer.parseInt(f1[0]);
			y1 = Integer.parseInt(f1[1]);
			l1 = Integer.parseInt(f1[2]);
			x2 = Integer.parseInt(s1[0]);
			y2 = Integer.parseInt(s1[1]);
			l2 = Integer.parseInt(s1[2]);
			h2 = Integer.parseInt(s1[3]) + 4;
			if(flag==false)
				sb.append(this.creatPolyTransition(trans,x1, y1, x2, y2-12, l1, l2,
						25, h2));
				else
					sb.append(this.createAutoTransiton(trans,x1, y1, x2, y2-12, l1, l2,
							25, h2,parallel_compensation_x,parallel_compensation_y));
		}
		if ((s_type == 16 && e_type <= 11)) {// 并发单元体-〉正常节点
			String first1 = (String) this.parallel_unitXY.get(startactid);
			String second1 = "0,0,0";
			if (noParentNodes.containsKey(endactid)) {
				second1 = (String) noParentNodes.get(endactid);
			}
			if (this.hasParentNodes.containsKey(endactid)) {
				second1 = (String) hasParentNodes.get(endactid);
			}

			String[] f1 = first1.split(",");
			String[] s1 = second1.split(",");
			x1 = Integer.parseInt(f1[0]);
			y1 = Integer.parseInt(f1[1]);
			l1 = Integer.parseInt(f1[2]);
			h1 = Integer.parseInt(f1[3]) + 4;
			x2 = Integer.parseInt(s1[0]);
			y2 = Integer.parseInt(s1[1]);
			l2 = Integer.parseInt(s1[2]);

			if(flag==false)
				sb.append(this.creatPolyTransition(trans,x1, y1-12, x2, y2, l1, l2,
						h1+12, 25));
				else
					sb.append(this.createAutoTransiton(trans,x1, y1-12, x2, y2, l1, l2,
							h1+12, 25,parallel_compensation_x,parallel_compensation_y));

		}
		if ((s_type == 16 && e_type == 16)) {// 并发单元体-〉并发单元体
			String first1 = (String) this.parallel_unitXY.get(startactid);
			String second1 = (String) this.parallel_unitXY.get(endactid);
			String[] f1 = first1.split(",");
			String[] s1 = second1.split(",");
			x1 = Integer.parseInt(f1[0]);
			y1 = Integer.parseInt(f1[1]);
			l1 = Integer.parseInt(f1[2]);
			h1 = Integer.parseInt(f1[3]) + 4;
			h2 = Integer.parseInt(s1[3]) + 4;
			x2 = Integer.parseInt(s1[0]);
			y2 = Integer.parseInt(s1[1]);
			l2 = Integer.parseInt(s1[2]);

			if(flag==false)
				sb.append(this.creatPolyTransition(trans, x1, y1, x2, y2-12, l1, l2,
						h1, h2));
				else
					sb.append(this.createAutoTransiton(trans, x1, y1, x2, y2-12, l1, l2,
							h1, h2,parallel_compensation_x,parallel_compensation_y));

		}
		if ((s_type == 16 && e_type == 21)) {// 并发单元体-〉分支结束节点
			String first1 = (String) this.parallel_unitXY.get(startactid);
			String second1 = (String) this.hasParentNodes.get(endactid);
			String[] f1 = first1.split(",");
			String[] s1 = second1.split(",");
			x1 = Integer.parseInt(f1[0]);
			y1 = Integer.parseInt(f1[1]);
			l1 = Integer.parseInt(f1[2]);
			h1 = Integer.parseInt(f1[3]) + 4;
			x2 = Integer.parseInt(s1[0]);
			y2 = Integer.parseInt(s1[1]);
			l2 = 50;

			sb.append(this.createAutoTransiton(trans, x1, y1, x2, y2, l1, l2,
					h1, 25,parallel_compensation_x,parallel_compensation_y));

		}
		if (s_type == 20) {// 分支内开始
			if (e_type == 21) {// 分支内结束-〉分支内结束
				String first1 = (String) hasParentNodes.get(startactid);
				String second1 = (String) hasParentNodes.get(endactid);
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				y1 = Integer.parseInt(f1[1]);
				l1 = 50;
				x2 = Integer.parseInt(s1[0]);
				y2 = Integer.parseInt(s1[1]);
				l2 = 50;
				sb.append(this.creatPolyTransition( trans,x1, y1-8, x2, y2, l1,
						l2, 0, 0));

			} else if (e_type <= 11) {// 分支内开始-〉分支内其它
				String first1 = (String) hasParentNodes.get(startactid);
				String second1 = (String) hasParentNodes.get(endactid);
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				y1 = Integer.parseInt(f1[1]);
				l1 = 50;
				x2 = Integer.parseInt(s1[0]);
				y2 = Integer.parseInt(s1[1]);
				l2 = Integer.parseInt(s1[2]);
				sb.append(this.createAutoTransiton(trans, x1, y1, x2, y2, l1, l2, 4, 0,parallel_compensation_x,parallel_compensation_y));
			} else if (e_type == 16) {// 分支内开始-〉分支内并发
				String first1 = (String) hasParentNodes.get(startactid);
				String second1 = (String) this.parallel_unitXY.get(endactid);
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				y1 = Integer.parseInt(f1[1]);
				l1 = 50;
				x2 = Integer.parseInt(s1[0]);
				y2 = Integer.parseInt(s1[1]);
				l2 = Integer.parseInt(s1[2]);
				h2=Integer.parseInt(s1[3]);
				sb.append(this.createAutoTransiton(trans, x1, y1, x2, y2-20, l1,
						l2, 4, h2,parallel_compensation_x,parallel_compensation_y));
			}
		}
			if ((e_type == 21) && (s_type <= 11)) {// 分支内其它-〉分支内结束
				String first1 = (String) hasParentNodes.get(startactid);
				String second1 = (String) hasParentNodes.get(endactid);
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				y1 = Integer.parseInt(f1[1]);
				l1 = Integer.parseInt(f1[2]);
				x2 = Integer.parseInt(s1[0]);
				y2 = Integer.parseInt(s1[1]);
				l2 = 50;
				
				sb.append(this.createAutoTransiton(trans,x1, y1, x2, y2, l1,l2, 25, 0,parallel_compensation_x,parallel_compensation_y));
			}

			if (s_type == 17) {// 并发体开始节点

				NWActDef actdef = (NWActDef) acts.get(startactid);
				String first1 = (String) this.parallel_unitXY.get(actdef
						.getParentActDefID());                          
				String second1 = (String) this.parallel_branchXY.get(endactid);
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				y1 = Integer.parseInt(f1[1]);
				l1 = Integer.parseInt(f1[2]);

				x2 = Integer.parseInt(s1[0]);
				y2 = Integer.parseInt(s1[1]);
				l2 = Integer.parseInt(s1[2]);
				sb.append(this.creatFixTransition(trans,x1, y1, x2, y2, l1,
						l2, 50, 0));
			}

			if (e_type == 18) {// 并发体结束节点        
				String first1 = (String) this.parallel_branchXY.get(startactid);
				NWActDef actdef = (NWActDef) acts.get(endactid);
				String second1 = (String) this.parallel_unitXY.get(actdef.getParentActDefID());
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				h1 = Integer.parseInt(f1[3]);
				y1 = Integer.parseInt(f1[1]) + h1;
				l1 = Integer.parseInt(f1[2]);
				x2 = Integer.parseInt(s1[0]);
				h2 = Integer.parseInt(s1[3]);
				y2 = Integer.parseInt(s1[1]) + h2 - 15;
				l2 = Integer.parseInt(s1[2]);
				sb.append(this.creatFixTransition( trans,x1, y1, x2, y2, l1,l2, 0, 0));
			}
			
			
		return sb.toString();
	}


	//主要针对并发体分支内部的传输线自动布局。
	private String createAutoTransiton(NWTransition trans, int x1, int y1,
			int x2, int y2, int l1, int l2, int h1, int h2, int parallel_compensation_x, int parallel_compensation_y)
	{

		float dx = x1-x2;
		float dy = y1-y2;
		float dwidth = (dx > 0)? l2 : l1;
		float dheight = (dy > 0)?  h2 : h1;
        String direction = "";		
		if(Math.abs(dx) < dwidth){
			   direction = "v";
		}else if(Math.abs(dy) < dheight){
			   direction = "h";
		}
		int x1offset = 0;
		int y1offset = 0;
		int x2offset = 0;
		int y2offset = 0;
		if(direction != "v" && direction != "h"){
		    if(Math.abs(dx)>Math.abs(dy)){
		    	direction = "h";
			}
			else{
				direction = "v";
			}
		}
		if(direction == "v"){
		   x1offset = l1/2;
		   x2offset = l2/2;
		   //When end node above start node.
		   if(dy > 0){
		         y2offset = h2 + 1;
				 y1offset = -1;
		   }
		   else{
		         y2offset = -1;
				 y1offset = h1 + 1;
		   }
		}else
		if(direction == "h"){
		   if(dx < 0){
			    x1offset = l1 + 1 ;
			    x2offset = -1 ;
		   }else{
			    x1offset = -1 ;
			    x2offset = l2 + 1;
		   } 
		   y1offset = h1/2;
		   y2offset = h2/2;
		}
		
		// add 50 to it, so the link appears to be from the center of the node image
		int xa = x1 + x1offset;
		int ya = y1 + y1offset;
		int xd = x2 + x2offset;
		int yd = y2 + y2offset;
		int xb ,yb ,xc ,yc;
		if(direction == "v"){
		   xb = xa;
		   yb = Math.abs(ya-yd)/2 + (ya<yd?ya:yd);
		   xc = xd;
		   yc = yb;
		}else{
		   xb = Math.abs(xa-xd)/2 + (xa<xd?xa:xd);
		   yb = ya;
		   xc = xb;
		   yc = yd;
		}
		
		positions=new String[2];
		positions[0] = (xb + parallel_compensation_x) + "," + (yb + parallel_compensation_y);
		positions[1] = (xc + parallel_compensation_x) + "," + (yc + parallel_compensation_y);
		
		return this.createAllPolyTransiton(trans, xa + parallel_compensation_x ,ya  + parallel_compensation_y, xd  + parallel_compensation_x, yd +  + parallel_compensation_y, true);
		
		
	}
	
	// 如果节点间的线存在自适应，则调用该方法。added by zhaozhg 20080520

	private String creatPolyTransition(NWTransition trans, int x1, int y1,
			int x2, int y2, int l1, int l2, int h1, int h2) {

		// added by zhaozhg 20080520
		float ax = 0, ay = 0, bx = 0, by = 0;//, rx = 0, ry = 0;
		int firstX = x2+l2/2, lastX = x1 +l1/2, firstY = y2 +h2/2, lastY = y1 + h1/2;// 3是个虚数，没有任何意义仅仅是让tempX在某个范围内
		if (!positions[0].equals("")) {
			firstX = get(0, 0);
			firstY = get(0, 1);
			lastX = get(positions.length - 1, 0);
			lastY = get(positions.length - 1, 1);

		}
		activeNode=this.encapsulate(x1, y1, l1, h1);
		ax=getLocation(activeNode,new Point(firstX,firstY)).x;
		ay=getLocation(activeNode,new Point(firstX,firstY)).y;
		activeNode=this.encapsulate(x2, y2, l2, h2);
		bx=getLocation(activeNode,new Point(lastX,lastY)).x;
		by=getLocation(activeNode,new Point(lastX,lastY)).y;
		
		return this.createAllPolyTransiton(trans, ax, ay, bx, by,false);
	}
	
	//根据起始和终止坐标画出传输线,还要参考拐点positions
	private String createAllPolyTransiton(NWTransition trans, float ax, float ay,
			float bx, float by,boolean isInParallel)
	{
		StringBuffer sb = new StringBuffer();
		sb.append("<polyline points=\"");
		sb.append(ax).append(",").append(ay).append(" ");
		if (!positions[0].equals(""))
			for (int i = 0; i < positions.length; i++) {
				//2009-07-20 YuYang remark
				sb.append(get(i, 0)).append(",").append(get(i, 1)).append(" ");
			}

		sb.append(bx).append(",").append(by);
		sb.append("\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ").append(tab);
		
		if (!positions[0].equals(""))
		{
			int k=positions.length-1;
			if(!isInParallel) sb.append(this.creatArrow(trans, get(k,0) - 15, get(k,1) - 15, (int)bx, (int)by));
			else sb.append(this.creatArrow(trans, get(k,0), get(k,1), (int)bx, (int)by));
		}
		else
			sb.append(this.creatArrow(trans, (int)ax, (int)ay, (int)bx, (int)by));
		
		//通过拐点的个数画出描述
		if(!positions[0].equals(""))
		{
			int inte=positions.length/2;
			int mod=positions.length%2;
			if (mod==1)
			{
				ax=bx=get(inte,0);
				ay=by=get(inte,1);
			}
			else
			{
				ax=get(inte-1,0);
				ay=get(inte-1,1);
				bx=get(inte,0);
				by=get(inte,1);
			}
		}
		sb.append(this.creatDescription(trans,ax,ay,bx,by));
		return sb.toString();
	}
	
	//在某些地方(例如并发体中)锚点是固定的，此时不需要考虑锚点的问题。
	private String creatFixTransition( NWTransition trans,int x1, int y1,
			int x2, int y2, int l1, int l2, int h1, int h2)
	{
		String startactid = trans.getPrevActID();
		String endactid = trans.getNextActID();
		NWActDef s_act = (NWActDef) acts.get(startactid);
		NWActDef e_act = (NWActDef) acts.get(endactid);
		int s_type = s_act.getType();
		int e_type = e_act.getType();
		
		
		float ax = 0, ay = 0, bx = 0, by = 0, rx = 0, ry = 0;
		ax=x1+l1/2;
		ay=y1+h1/2;
		bx=x2+l2/2;
		by=y2;
		rx = bx - 6;
		ry = by - 4;
		StringBuffer sb = new StringBuffer();
		sb.append("<polyline points=\"");
		sb.append(ax).append(",").append(ay).append(" ");
		//判断是并发的开始节点还是结束节点
		if (s_type==17)
			sb.append(bx).append(",").append(ay).append(" ");
		if(e_type==18)
			sb.append(ax).append(",").append(by).append(" ");
		
		sb.append(bx).append(",").append(by);
		sb
				.append(
						"\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ")
				.append(tab);
		if (s_type==17)
		sb.append(this.creatArrow(trans, (int)bx, (int)ay, (int)bx, (int)by));
		if(e_type==18)
			sb.append(this.creatArrow(trans, (int)ax, (int)by, (int)bx, (int)by));
		sb.append(this.creatDescription(trans,ax,ay,bx,by));
		
		
		
		return sb.toString();
	}
	
	//计算名称字符串长度
	private int caclNameStrLength(String nameStr){
		int length = 0;
		length = nameStr.getBytes().length * 6;
		return length;
	}
		
	// 获取某个特点坐标的特定维度的指 x表示取第几个坐标，y 表示取该坐标第几个数 ，在二维坐标中不能大于1.added by zhaozhg
	// 20080520
	private int get(int x, int y) {

		String num = positions[x];
		String[] number = num.split(",");
		if (y < 2)
			return Integer.parseInt(number[y]);
		else
			return 0;
	}
	
	private VisualActiveNode encapsulate(int x,int y,int len,int heigth)
	{
		activeNode.setX(x);
		activeNode.setY(y);
		activeNode.setLength(len);
		activeNode.setHeigth(heigth);
		return activeNode;
	}
	//通过引用节点坐标获取锚点坐标
	private Point getLocation(VisualActiveNode source,Point refer)
	{
		
		float centerX=source.getX()+source.getLength()*0.5f;
		float centerY=source.getY()+source.getHeigth()*0.5f;
		float dx = refer.x - centerX;
		float dy = refer.y - centerY;
		
		if(Math.abs(dx)>Math.abs(dy)){
			if((source.getX()+source.getLength())<refer.x)
				centerX += 0.5f*source.getLength();
			else if (source.getX()>refer.x)
				centerX -= 0.5f*source.getLength();
			else
			{
				
				if(refer.y>(source.getY()+source.getHeigth()/2))
					centerY += 0.5f*source.getHeigth();
				else
					centerY -= 0.5f*source.getHeigth();
			}
		}
		else{
			if((source.getY()+source.getHeigth())<refer.y)
				
				centerY += 0.5f*source.getHeigth();
			else if(source.getY()>refer.y)
				centerY -= 0.5f*source.getHeigth();
			else
			{
				if(refer.x<source.getX())
					centerX -= 0.5f*source.getLength();
				else if(refer.x>(source.getX()+source.getLength()))
					centerX += 0.5f*source.getLength();
				else
				{
					if(refer.y>(source.getY()+source.getHeigth()/2))
						centerY += 0.5f*source.getHeigth();
					else
						centerY -= 0.5f*source.getHeigth();
				}
			}
			
		}
	
		return new Point(Math.round(centerX), Math.round(centerY));
		
	}
	
	//获取传输线的描述
	private String creatDescription(NWTransition trans,float ax,float ay,float bx,float by)
	{
		// 绘制传输线上的描述
		StringBuffer sb = new StringBuffer();
		if (trans.getDescription() != null&& !trans.getDescription().equals("")) {
			String name = trans.getDescription();
			int l = this.caclNameStrLength(trans.getDescription());
			if (name.indexOf(">") > 0 || name.startsWith(">"))
				name = name.replaceAll(">", "&gt;");
			if (name.indexOf("<") > 0 || name.startsWith("<"))
				name = name.replaceAll("<", "&lt;");
			float tdx = 0;
			float tdy = 0;
			tdx = tdx - l / 2;
			if (by > ay)
				tdy = ay + (by - ay) / 2 - 6;
			else
				tdy = by + (ay - by) / 2 - 6;
			if (ax > bx) 
				tdx = bx + (ax - bx)/2-l/2; 
			else
				tdx = ax + (bx - ax)/2-l/2; 
			
			sb.append("<rect x=\"").append(tdx).append("\" y=\"").append(tdy)
					.append("\" width=\"").append(l).append(
							"\" height=\"12\"  style=\"fill:#de90fe;\" ")
					.append("/>").append(tab);
			sb.append("<text x=\"").append(tdx).append("\" y=\"").append(
					tdy + 11).append("\" style=\"text-anchor: left\">").append(
					name).append("</text>").append(tab);
		}
		return sb.toString();
	}
	private String creatArrow(NWTransition trans,int ax,int  ay,int bx,int by)
	{
		StringBuffer sb=new StringBuffer();
		Point p1=new Point(ax,ay);
		Point p2=new Point(bx,by);
		Point a1=MathUtil.getLPoint(p1,p2);
		Point a2=MathUtil.getRPoint(p1,p2);
		sb.append("<polyline points=\"");
		sb.append(p2.x).append(",").append(p2.y).append(" ");
		sb.append(a1.x).append(",").append(a1.y);
		sb.append("\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ").append(tab);
		sb.append("<polyline points=\"");
		sb.append(p2.x).append(",").append(p2.y).append(" ");
		sb.append(a2.x).append(",").append(a2.y);
		sb.append("\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ").append(tab);
		return sb.toString();
	}
	
	
}



//新建一个activeNodeVisual类，该类保存节点的坐标以及长度和宽度
class VisualActiveNode
{
	private int x,y;
	private int length,heigth;
	static VisualActiveNode activeNode;
	static VisualActiveNode getInstance()
	{
		if (activeNode==null)
			return new VisualActiveNode();
		else
			return activeNode;
	}
	public void setX(int x)
	{
		this.x=x;
	}
	public void setY(int y)
	{
		this.y=y;
	}
	public int getX()
	{
		return x;
	}
	
	public int getY()
	{
		return y;
	}
	
	public void setLength(int len)
	{
		this.length=len;
	}
	public void setHeigth(int hei)
	{
		this.heigth=hei;
	}
	public int getLength()
	{
		return this.length;
		
	}
	public int getHeigth()
	{
		return this.heigth;
	}
}