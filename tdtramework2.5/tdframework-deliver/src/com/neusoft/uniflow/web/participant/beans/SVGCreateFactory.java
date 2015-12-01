package com.neusoft.uniflow.web.participant.beans;

import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWTransition;
import com.neusoft.uniflow.common.NWException;

public class SVGCreateFactory {
	public final static String tab = System.getProperty("line.separator");
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
	
	public static SVGCreateFactory svgcreatefac = null;
	public static SVGCreateFactory getInstance(){
		if (svgcreatefac==null)
			svgcreatefac = new SVGCreateFactory();
		return svgcreatefac;
	}

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
		
		//2009-08-06 Yu Yang Remark 
		//为了对齐并发体设置的硬补偿
		int parallel_compensation_x = 18;
		int parallel_compensation_y = 10;
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
			   sb.append("<g onmousedown=\"setParticipant('")
				 .append(actdef.getID()).append("')\"")
				 .append(tab)
				 .append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
				 .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
				 .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
				 .append(tab);	
				   
			   
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
		   if (type==20 || type==13 || type==21 || type==14){
			   String png = "inner.png";	
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"50\" height=\"5\"/>").append(tab);

		   }
//		   //分支结束节点
//		   if (type==21 || type==14){
//			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
//			     .append("\" width=\"48\" height=\"21\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
//			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
//			     .append(tab);				   				   
//			   sb.append("<text x=\"").append(x+8).append("\" y=\"")
//			     .append(y+17).append("\" style=\"text-anchor: left\">")
//			     .append("结束").append("</text>").append(tab);
//		   }
		   

		return sb.toString();
	}
	private String createActivitie(NWProcDef process,Hashtable apps,NWActDef actdef,String path,String Contextpath,int hs_type,int parallel_compensation_x,int parallel_compensation_y)throws NWException{
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
			   sb.append("<g onmousedown=\"setParticipant('")
				 .append(actdef.getID()).append("')\"")
				 .append(tab)
				 .append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
				 .append("\" width=\"").append(l).append("\" height=\"25\" rx=\"3\" ry=\"3\" style=\"fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;\" ")
				 .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
				 .append(tab);	
				   
			   
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
	
	private String createTransition(NWTransition trans, int parallel_compensation_x, int parallel_compensation_y)throws NWException{
		StringBuffer sb = new StringBuffer();
		String startactid = trans.getPrevActID();
		String endactid = trans.getNextActID();
		NWActDef s_act = (NWActDef)acts.get(startactid);
		NWActDef e_act = (NWActDef)acts.get(endactid);
		int s_type = s_act.getType();
		int e_type = e_act.getType();
		int x1,x2,y1,y2,l1,l2;

		if (s_type<=11&&e_type<=11){//正常节点-〉正常节点
			String startP = "0,0,0";
			String endP = "0,0,0";
			if (noParentNodes.containsKey(startactid)&&noParentNodes.containsKey(endactid)){
				startP = (String)noParentNodes.get(startactid);
				endP = (String)noParentNodes.get(endactid);
			}
			if (this.hasParentNodes.containsKey(startactid)&&hasParentNodes.containsKey(endactid)){
				startP = (String)hasParentNodes.get(startactid);
				endP = (String)hasParentNodes.get(endactid);
			}
			String[] sp = startP.split(",");
			String[] ep = endP.split(",");
			x1 = Integer.parseInt(sp[0]);
			y1 = Integer.parseInt(sp[1]);
			l1 = Integer.parseInt(sp[2]);
			x2 = Integer.parseInt(ep[0]);
			y2 = Integer.parseInt(ep[1]);
			l2 = Integer.parseInt(ep[2]);
			if (y2-y1<14+25){//6个点:a,b,c,d,e,f
				int ax = x1 + l1/2;
				int ay = y1 + 25;
				int bx = ax;
				int by = y1 + 25 + 11;
				int cx;
				int cy = by;
				if (x1>x2){
					cx = x1 - (x1-x2)/2;
				}else{
					cx = x1 + (x2-x1)/2;
				}
				int dx = cx;
				int dy = y2 - 11;
				int ex = x2 + l2/2;
				int ey = dy;
				int fx = ex;
				int fy = y2;
				int rx = fx -6;
				int ry = fy -4;
				
				sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy, parallel_compensation_x+rx, parallel_compensation_y+ry));

				
			}else{//4个点:a.b,c,d
				int ax = x1 + l1/2;
				int ay = y1 + 25;
				int bx = ax;
				int by = ay + (y2-ay)/2;
				int cx = x2 + l2/2;
				int cy = by;
				int dx = cx;
				int dy = y2-3;
				int rx = dx -6;
				int ry = dy -4;
				
				sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
			}
		}
		if ((s_type<=11&&e_type==16)){//正常节点-〉并发单元体
			String first1 = "0,0,0";
			if (noParentNodes.containsKey(startactid)){
				first1 = (String)noParentNodes.get(startactid);
			}
			if (this.hasParentNodes.containsKey(startactid)){
				first1 = (String)hasParentNodes.get(startactid);
			}
			String second1 = (String)this.parallel_unitXY.get(endactid);
			String[] f1 = first1.split(",");
			String[] s1 = second1.split(",");
			x1 = Integer.parseInt(f1[0]);
			y1 = Integer.parseInt(f1[1]);
			l1 = Integer.parseInt(f1[2]);
			x2 = Integer.parseInt(s1[0]);
			y2 = Integer.parseInt(s1[1]);
			l2 = Integer.parseInt(s1[2]);
			if (y2-y1<8+12+25){//6个点:a,b,c,d,e,f
				int ax = x1 + l1/2;
				int ay = y1 + 25;
				int bx = ax;
				int by = y1 + 25 + 11;
				int cx;
				int cy = by;
				if (x1>x2){
					cx = x1 - (x1-x2)/2;
				}else{
					cx = x1 + (x2-x1)/2;
				}
				int dx = cx;
				int dy = y2 - 11;
				int ex = x2 + l2/2;
				int ey = dy;
				int fx = ex;
				int fy = y2;
				int rx = fx -6;
				int ry = fy -4;
				sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy-12, parallel_compensation_x+rx, parallel_compensation_y+ry-12));
			}else{//4个点:a.b,c,d
					int ax = x1 + l1/2;
					int ay = y1 + 25;
					int bx = ax;
					int by = ay + (y2-ay)/2;
					int cx = x2 + l2/2;
					int cy = by;
					int dx = cx;
					int dy = y2-3;
					int rx = dx -6;
					int ry = dy -4;
				sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy-12, parallel_compensation_x+rx, parallel_compensation_y+ry-12));
			}	
		}
		if ((s_type==16&&e_type<=11)){//并发单元体-〉正常节点
			String first1 = (String)this.parallel_unitXY.get(startactid);
			String second1 = "0,0,0";
			if (noParentNodes.containsKey(endactid)){
				second1 = (String)noParentNodes.get(endactid);
			}
			if (this.hasParentNodes.containsKey(endactid)){
				second1 = (String)hasParentNodes.get(endactid);
			}
			
			String[] f1 = first1.split(",");
			String[] s1 = second1.split(",");
			x1 = Integer.parseInt(f1[0]);
			y1 = Integer.parseInt(f1[1]);
			l1 = Integer.parseInt(f1[2]);
			int h1 = Integer.parseInt(f1[3])+4;
			x2 = Integer.parseInt(s1[0]);
			y2 = Integer.parseInt(s1[1]);
			l2 = Integer.parseInt(s1[2]);
			if (y2-y1<8+h1){//6个点:a,b,c,d,e,f
				int ax = x1 + l1/2;
				int ay = y1 + h1;
				int bx = ax;
				int by = y1 + h1 + 11;
				int cx;
				int cy = by;
				if (x1>x2){
					cx = x1 - (x1-x2)/2;
				}else{
					cx = x1 + (x2-x1)/2;
				}
				int dx = cx;
				int dy = y2 - 11;
				int ex = x2 + l2/2;
				int ey = dy;
				int fx = ex;
				int fy = y2;
				int rx = fx -6;
				int ry = fy -4;
				
				sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy, parallel_compensation_x+rx, parallel_compensation_y+ry));
				
			}else{//4个点:a.b,c,d
				int ax = x1 + l1/2;
				int ay = y1 + h1;
				int bx = ax;
				int by = ay + (y2-ay)/2;
				int cx = x2 + l2/2;
				int cy = by;
				int dx = cx;
				int dy = y2-3;
				int rx = dx -6;
				int ry = dy -4;
				
				sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
				

			}	

		}
		if ((s_type==16&&e_type==16)){//并发单元体-〉并发单元体
			String first1 = (String)this.parallel_unitXY.get(startactid);
			String second1 = (String)this.parallel_unitXY.get(endactid);			
			String[] f1 = first1.split(",");
			String[] s1 = second1.split(",");
			x1 = Integer.parseInt(f1[0]);
			y1 = Integer.parseInt(f1[1]);
			l1 = Integer.parseInt(f1[2]);
			int h1 = Integer.parseInt(f1[3])+4;
			x2 = Integer.parseInt(s1[0]);
			y2 = Integer.parseInt(s1[1]);
			l2 = Integer.parseInt(s1[2]);
			if (y2-y1<8+h1){//6个点:a,b,c,d,e,f
				int ax = x1 + l1/2;
				int ay = y1 + h1;
				int bx = ax;
				int by = y1 + h1 + 11;
				int cx;
				int cy = by;
				if (x1>x2){
					cx = x1 - (x1-x2)/2;
				}else{
					cx = x1 + (x2-x1)/2;
				}
				int dx = cx;
				int dy = y2 - 11;
				int ex = x2 + l2/2;
				int ey = dy;
				int fx = ex;
				int fy = y2-12;
				int rx = fx -6;
				int ry = fy -4;
				
				sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy, parallel_compensation_x+rx, parallel_compensation_y+ry));
				
			}else{//4个点:a.b,c,d
				int ax = x1 + l1/2;
				int ay = y1 + h1;
				int bx = ax;
				int by = ay + (y2-ay)/2;
				int cx = x2 + l2/2;
				int cy = by;
				int dx = cx;
				int dy = y2-3-12;
				int rx = dx -6;
				int ry = dy -4;
				
				sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
			}	

		}
		if ((s_type==16&& e_type==21)){//并发单元体-〉分支结束节点
			String first1 = (String)this.parallel_unitXY.get(startactid);
			String second1 = (String)this.hasParentNodes.get(endactid);
			String[] f1 = first1.split(",");
			String[] s1 = second1.split(",");
			x1 = Integer.parseInt(f1[0]);
			y1 = Integer.parseInt(f1[1]);
			l1 = Integer.parseInt(f1[2]);
			int h1 = Integer.parseInt(f1[3])+4;
			x2 = Integer.parseInt(s1[0]);
			y2 = Integer.parseInt(s1[1]);
			l2 = 50;
			if (y2-y1<8+h1){//6个点:a,b,c,d,e,f
				int ax = x1 + l1/2;
				int ay = y1 + h1;
				int bx = ax;
				int by = y1 + h1 + 11;
				int cx;
				int cy = by;
				if (x1>x2){
					cx = x1 - (x1-x2)/2;
				}else{
					cx = x1 + (x2-x1)/2;
				}
				int dx = cx;
				int dy = y2 - 11;
				int ex = x2 + l2/2;
				int ey = dy;
				int fx = ex;
				int fy = y2;
				int rx = fx -6;
				int ry = fy -4;
				
				sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy, parallel_compensation_x+rx, parallel_compensation_y+ry));
				
			}else{//4个点:a.b,c,d
				int ax = x1 + l1/2;
				int ay = y1 + h1;
				int bx = ax;
				int by = ay + (y2-ay)/2;
				int cx = x2 + l2/2;
				int cy = by;
				int dx = cx;
				int dy = y2-3;
				int rx = dx -6;
				int ry = dy -4;
				
				sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
			}	

		}
		if (s_type==20){//分支内开始
				if (e_type==21 || e_type==14){//分支内结束-〉分支内结束
					String first1 = (String)hasParentNodes.get(startactid);
					String second1 = (String)hasParentNodes.get(endactid);
					String[] f1 = first1.split(",");
					String[] s1 = second1.split(",");
					x1 = Integer.parseInt(f1[0]);
					y1 = Integer.parseInt(f1[1]);
					l1 = 50;
					x2 = Integer.parseInt(s1[0]);
					y2 = Integer.parseInt(s1[1]);
					l2 = 50;
					if (y2-y1<8+5){//6个点:a,b,c,d,e,f
						int ax = x1 + l1/2;
						int ay = y1 + 5;
						int bx = ax;
						int by = y1 + 5 + 11;
						int cx;
						int cy = by;
						if (x1>x2){
							cx = x1 - (x1-x2)/2;
						}else{
							cx = x1 + (x2-x1)/2;
						}
						int dx = cx;
						int dy = y2 - 11;
						int ex = x2 + l2/2;
						int ey = dy;
						int fx = ex;
						int fy = y2;
						int rx = fx -6;
						int ry = fy -4;
						
						sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy, parallel_compensation_x+rx, parallel_compensation_y+ry));
						
					}else{//4个点:a.b,c,d
						int ax = x1 + l1/2;
						int ay = y1 + 5;
						int bx = ax;
						int by = ay + (y2-ay)/2;
						int cx = x2 + l2/2;
						int cy = by;
						int dx = cx;
						int dy = y2-3;
						int rx = dx -6;
						int ry = dy -4;
						
						sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
					}
				}else if (e_type<=11){//分支内开始-〉分支内其它
					String first1 = (String)hasParentNodes.get(startactid);
					String second1 = (String)hasParentNodes.get(endactid);
					String[] f1 = first1.split(",");
					String[] s1 = second1.split(",");
					x1 = Integer.parseInt(f1[0]);
					y1 = Integer.parseInt(f1[1]);
					l1 = 50;
					x2 = Integer.parseInt(s1[0]);
					y2 = Integer.parseInt(s1[1]);
					l2 = Integer.parseInt(s1[2]);
					if (y2-y1<8+5){//6个点:a,b,c,d,e,f
						int ax = x1 + l1/2;
						int ay = y1 + 5;
						int bx = ax;
						int by = y1 + 5 + 11;
						int cx;
						int cy = by;
						if (x1>x2){
							cx = x1 - (x1-x2)/2;
						}else{
							cx = x1 + (x2-x1)/2;
						}
						int dx = cx;
						int dy = y2 - 11;
						int ex = x2 + l2/2;
						int ey = dy;
						int fx = ex;
						int fy = y2;
						int rx = fx -6;
						int ry = fy -4;
						
						sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy, parallel_compensation_x+rx, parallel_compensation_y+ry));
						
					}else{//4个点:a.b,c,d
						int ax = x1 + l1/2;
						int ay = y1 + 5;
						int bx = ax;
						int by = ay + (y2-ay)/2;
						int cx = x2 + l2/2;
						int cy = by;
						int dx = cx;
						int dy = y2-3;
						int rx = dx -6;
						int ry = dy -4;
						
						sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
					}
				} else if (e_type==16){//分支内开始-〉分支内并发
					String first1 = (String)hasParentNodes.get(startactid);
					String second1 = (String)this.parallel_unitXY.get(endactid);
					String[] f1 = first1.split(",");
					String[] s1 = second1.split(",");
					x1 = Integer.parseInt(f1[0]);
					y1 = Integer.parseInt(f1[1]);
					l1 = 50;
					x2 = Integer.parseInt(s1[0]);
					y2 = Integer.parseInt(s1[1]);
					l2 = Integer.parseInt(s1[2]);
					if (y2-y1<8+12+5){//6个点:a,b,c,d,e,f
						int ax = x1 + l1/2;
						int ay = y1 + 5;
						int bx = ax;
						int by = y1 + 5 + 11;
						int cx;
						int cy = by;
						if (x1>x2){
							cx = x1 - (x1-x2)/2;
						}else{
							cx = x1 + (x2-x1)/2;
						}
						int dx = cx;
						int dy = y2 - 11;
						int ex = x2 + l2/2;
						int ey = dy;
						int fx = ex;
						int fy = y2;
						int rx = fx -6;
						int ry = fy -4;
						
						sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy, parallel_compensation_x+rx, parallel_compensation_y+ry));
						
					}else{//4个点:a.b,c,d
						int ax = x1 + l1/2;
						int ay = y1 + 5;
						int bx = ax;
						int by = ay + (y2-ay)/2;
						int cx = x2 + l2/2;
						int cy = by;
						int dx = cx;
						int dy = y2-3;
						int rx = dx -6;
						int ry = dy -4;
						
						sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy-12, parallel_compensation_x+rx, parallel_compensation_y+ry-12));
					}	
				}
			}
			if (e_type==21 && (s_type<=11)){//分支内其它-〉分支内结束
				String first1 = (String)hasParentNodes.get(startactid);
				String second1 = (String)hasParentNodes.get(endactid);
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				y1 = Integer.parseInt(f1[1]);
				l1 = Integer.parseInt(f1[2]);
				x2 = Integer.parseInt(s1[0]);
				y2 = Integer.parseInt(s1[1]);
				l2 = 50;
				if (y2-y1<8+25){//6个点:a,b,c,d,e,f
					int ax = x1 + l1/2;
					int ay = y1 + 25;
					int bx = ax;
					int by = y1 + 25 + 11;
					int cx;
					int cy = by;
					if (x1>x2){
						cx = x1 - (x1-x2)/2;
					}else{
						cx = x1 + (x2-x1)/2;
					}
					int dx = cx;
					int dy = y2 - 11;
					int ex = x2 + l2/2;
					int ey = dy;
					int fx = ex;
					int fy = y2;
					int rx = fx -6;
					int ry = fy -4;
					
					sb.append(this.createTransition6piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+by, parallel_compensation_x+cx, parallel_compensation_y+cy, parallel_compensation_x+dx, parallel_compensation_y+dy, parallel_compensation_x+ex, parallel_compensation_y+ey, parallel_compensation_x+fx, parallel_compensation_y+fy, parallel_compensation_x+rx, parallel_compensation_y+ry));
					
				}else{//4个点:a.b,c,d
					int ax = x1 + l1/2;
					int ay = y1 + 25;
					int bx = ax;
					int by = ay + (y2-ay)/2;
					int cx = x2 + l2/2;
					int cy = by;
					int dx = cx;
					int dy = y2-3;
					int rx = dx -6;
					int ry = dy -4;
					
					sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
				}
			}
			
			if (s_type == 17){//并发体开始节点
				
				NWActDef actdef = (NWActDef)acts.get(startactid);
				String first1 = (String)this.parallel_unitXY.get(actdef.getParentActDefID());
				String second1 = (String)this.parallel_branchXY.get(endactid);
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				y1 = Integer.parseInt(f1[1]);
				l1 = Integer.parseInt(f1[2]);
				
				x2 = Integer.parseInt(s1[0]);
				y2 = Integer.parseInt(s1[1]);
				l2 = Integer.parseInt(s1[2]);
				
				int ax = x1 + l1/2;
				int ay = y1 + 12 +20;
				int bx = ax;
				int by = ay + (y2-ay)/2;
				int cx = x2 + l2/2;
				int cy = by;
				int dx = cx;
				int dy = y2-3;
				int rx = dx -6;
				int ry = dy -4;

				sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
			}
			if (e_type == 18){//并发体结束节点
				String first1 = (String)this.parallel_branchXY.get(startactid);
				NWActDef actdef = (NWActDef)acts.get(endactid);
				String second1 = (String)this.parallel_unitXY.get(actdef.getParentActDefID());
				String[] f1 = first1.split(",");
				String[] s1 = second1.split(",");
				x1 = Integer.parseInt(f1[0]);
				int h1 = Integer.parseInt(f1[3]);
				y1 = Integer.parseInt(f1[1])+h1;
				l1 = Integer.parseInt(f1[2]);
				
				x2 = Integer.parseInt(s1[0]);
				int h2 = Integer.parseInt(s1[3]);
				y2 = Integer.parseInt(s1[1]) + h2 -15;
				l2 = Integer.parseInt(s1[2]);
				
				int ax = x1 + l1/2;
				int ay = y1;
				int bx = ax;
				int by = ay + (y2-ay)/2;
				int cx = x2 + l2/2;
				int cy = by;
				int dx = cx;
				int dy = y2-3;
				int rx = dx -6;
				int ry = dy -4;
				
				sb.append(this.createTransition4piont(trans,parallel_compensation_x+ax, parallel_compensation_y+ay, parallel_compensation_x+bx, parallel_compensation_y+ by, parallel_compensation_x + cx, parallel_compensation_y + cy, parallel_compensation_x+ dx, parallel_compensation_y+dy, parallel_compensation_x+rx, parallel_compensation_y+ry));
			}

		return sb.toString();
	}
	private String createTransition4piont(NWTransition trans,int ax,int ay,int bx,int by,int cx,int cy,int dx,int dy,int rx,int ry){
		StringBuffer sb = new StringBuffer();
		sb.append("<polyline points=\"").append(ax-1).append(" ").append(ay).append(",");
		if (bx>cx){
			sb.append(bx-1).append(" ").append(by - 1).append(",")
			  .append(cx-1).append(" ").append(cy - 1).append(",");
		}else{
			sb.append(bx-1).append(" ").append(by + 1).append(",")
			  .append(cx-1).append(" ").append(cy + 1).append(",");	
		}

		sb.append(dx-1).append(" ").append(dy).append("\" style=\"fill:none;stroke-width:0.9;stroke:#eec5fd\"></polyline> ").append(tab);
		sb.append("<polyline points=\"").append(ax).append(" ").append(ay).append(",")
		.append(bx).append(" ").append(by).append(",")
		.append(cx).append(" ").append(cy).append(",")
		.append(dx).append(" ").append(dy).append("\" style=\"fill:none;stroke-width:1.2;stroke:#49006b\"></polyline> ").append(tab);
		sb.append("<polyline points=\"").append(ax+1).append(" ").append(ay).append(",");
		if (bx>cx){
			sb.append(bx+1).append(" ").append(by + 1).append(",")
			  .append(cx+1).append(" ").append(cy + 1).append(",");
		}else{
			sb.append(bx+1).append(" ").append(by - 1).append(",")
			  .append(cx+1).append(" ").append(cy - 1).append(",");	
		}
		sb.append(dx+1).append(" ").append(dy).append("\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ").append(tab);		
		sb.append("<use xlink:href=\"#arrow\" x=\"").append(rx).append("\" y=\"").append(ry).append("\"/>").append(tab);
		
		//绘制传输线上的描述
		if (trans.getDescription()!=null && !trans.getDescription().equals("")){
			String name = trans.getDescription();
			int l = this.caclNameStrLength(trans.getDescription());
			if (name.indexOf(">")>0 || name.startsWith(">")) 
				name = name.replaceAll(">","&gt;");
			if (name.indexOf("<")>0 || name.startsWith("<")) 
				name = name.replaceAll("<","&lt;");
			int tdx = 0;
			int tdy = 0;
			if (cx > bx) 
				tdx = bx + (cx - bx)/2-l/2; 
			else
				tdx = cx + (bx - cx)/2-l/2; 
			tdy = by - 6;
			sb.append("<rect x=\"").append(tdx).append("\" y=\"").append(tdy)
			  .append("\" width=\"").append(l).append("\" height=\"12\"  style=\"fill:#de90fe;\" ").append("/>")
			  .append(tab);				   	
			sb.append("<text x=\"").append(tdx).append("\" y=\"")
			     .append(tdy+11).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);	
			
			
		}
		
		return sb.toString();
	}
	private String createTransition6piont(NWTransition trans,int ax,int ay,int bx,int by,int cx,int cy,int dx,int dy,int ex,int ey,int fx,int fy,int rx,int ry){
		StringBuffer sb = new StringBuffer();
		sb.append("<polyline points=\"").append(ax-1).append(" ").append(ay).append(",");
		if (bx>cx){
			sb.append(bx-1).append(" ").append(by - 1).append(",")
			  .append(cx+1).append(" ").append(cy - 1).append(",");
		}else{
			sb.append(bx-1).append(" ").append(by + 1).append(",")
			  .append(cx+1).append(" ").append(cy + 1).append(",");	
		}
		if (dx>ex){
			sb.append(dx+1).append(" ").append(dy - 1).append(",")
			  .append(ex-1).append(" ").append(ey - 1).append(",");
		}else{
			sb.append(dx+1).append(" ").append(dy + 1).append(",")
			  .append(ex-1).append(" ").append(ey + 1).append(",");	
		}

		sb.append(fx-1).append(" ").append(fy).append("\" style=\"fill:none;stroke-width:0.9;stroke:#eec5fd\"></polyline> ").append(tab);
		sb.append("<polyline points=\"").append(ax).append(" ").append(ay).append(",")
		.append(bx).append(" ").append(by).append(",")
		.append(cx).append(" ").append(cy).append(",")
		.append(dx).append(" ").append(dy).append(",")
		.append(ex).append(" ").append(ey).append(",")
		.append(fx).append(" ").append(fy).append("\" style=\"fill:none;stroke-width:1.2;stroke:#49006b\"></polyline> ").append(tab);
		sb.append("<polyline points=\"").append(ax+1).append(" ").append(ay).append(",");
		if (bx>cx){
			sb.append(bx+1).append(" ").append(by + 1).append(",")
			  .append(cx-1).append(" ").append(cy + 1).append(",");
		}else{
			sb.append(bx+1).append(" ").append(by - 1).append(",")
			  .append(cx-1).append(" ").append(cy - 1).append(",");	
		}
		if (dx>ex){
			sb.append(dx-1).append(" ").append(dy + 1).append(",")
			  .append(ex+1).append(" ").append(ey + 1).append(",");
		}else{
			sb.append(dx-1).append(" ").append(dy - 1).append(",")
			  .append(ex+1).append(" ").append(ey - 1).append(",");	
		}

		sb.append(fx+1).append(" ").append(fy).append("\" style=\"fill:none;stroke-width:0.9;stroke:#de90fe\"></polyline> ").append(tab);

		sb.append("<use xlink:href=\"#arrow\" x=\"").append(rx).append("\" y=\"").append(ry).append("\"/>").append(tab);
		
		//绘制传输线上的描述
		if (trans.getDescription()!=null && !trans.getDescription().equals("")){
			String name = trans.getDescription();
			int l = this.caclNameStrLength(trans.getDescription());
			if (name.indexOf(">")>0 || name.startsWith(">")) 
				name = name.replaceAll(">","&gt;");
			if (name.indexOf("<")>0 || name.startsWith("<")) 
				name = name.replaceAll("<","&lt;");
			int tdx = 0;
			int tdy = 0;
			tdx = tdx - l/2;
			if (cy > dy) 
				tdy = dy + (cy - dy)/2-6; 
			else
				tdx = cy + (dy - cy)/2-6; 
			sb.append("<rect x=\"").append(tdx).append("\" y=\"").append(tdy)
			  .append("\" width=\"").append(l).append("\" height=\"12\"  style=\"fill:#de90fe;\" ").append("/>")
			  .append(tab);				   	
			sb.append("<text x=\"").append(tdx).append("\" y=\"")
			     .append(tdy+11).append("\" style=\"text-anchor: left\">")
			     .append(name).append("</text>").append(tab);	
			
			
		}
		
		return sb.toString();
	}
	//计算名称字符串长度
	private int caclNameStrLength(String nameStr){
		int length = 0;
		length = nameStr.getBytes().length * 6;
		return length;
	}
			
}
