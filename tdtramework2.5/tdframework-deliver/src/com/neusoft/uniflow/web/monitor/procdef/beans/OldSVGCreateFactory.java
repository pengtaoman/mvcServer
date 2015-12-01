package com.neusoft.uniflow.web.monitor.procdef.beans;

import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.http.HttpSession;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.def.NWTransition;
import com.neusoft.uniflow.common.NWException;

public class OldSVGCreateFactory {
	public static String tab = System.getProperty("line.separator");
	private Hashtable comps = new Hashtable();
	private Hashtable activitiesXY;
	public static OldSVGCreateFactory svgcreatefac = null;
	private Hashtable activitiesNameHeight = new Hashtable();
	public static OldSVGCreateFactory getInstance(){
		if (svgcreatefac==null)
			return new OldSVGCreateFactory();
		else
			return svgcreatefac;
	}
	public  String createProcessDefine(HttpSession httpsession,NWSession session,String path,String pathimg)throws NWException{
		StringBuffer sb = new StringBuffer();
		int activitiesX[] = (int[]) httpsession.getAttribute("activitiesX");
		int activitiesY[] = (int[]) httpsession.getAttribute("activitiesY");
		int maxX = Integer.parseInt((String)httpsession.getAttribute("maxX"));
		int maxY = Integer.parseInt((String)httpsession.getAttribute("maxY"));
		Hashtable apps = (Hashtable)httpsession.getAttribute("apps");
		activitiesXY = (Hashtable)httpsession.getAttribute("activitiesXY");
		String pidAndVersion = (String)httpsession.getAttribute("process");
		String temp[] = pidAndVersion.split("#");
		if (temp[0]==null || temp[1]==null){
			throw new NWException("无法取得被监控的流程定义！");
		}
		NWProcDef process = session.getProcDef("",temp[0],temp[1], 0);
		Vector transitions = process.openTransitionList();
		Vector activities = process.openActivityList();	
		
		
        sb.append(this.createHeader(maxX,maxY,path));
		try{
			for (int i=0;i<activities.size();i++){
				NWActDef actdef = (NWActDef)activities.elementAt(i);
	            sb.append(this.createActivitie(process,apps,actdef,pathimg,path));  
			}
			for (int i=0;i<activities.size();i++){
				NWActDef actdef = (NWActDef)activities.elementAt(i);
	            sb.append(this.createActivitieName(actdef));  
			}
		    for(int i=0;i<transitions.size();i++){
			    NWTransition trans = (NWTransition)transitions.elementAt(i);
			    sb.append(this.createTransition(trans,session,activitiesX,activitiesY));
		    }
		    if (!comps.isEmpty()){
		       sb.append(this.createCompensation(activities));
		    }   
		}catch(NWException e){
			e.printStackTrace();
		}
		sb.append("</svg>");
		return sb.toString();
	}
	private String createHeader(int maxX,int maxY,String path){
		StringBuffer sb = new StringBuffer();
		sb.append("<svg width=\"").append("100%").append("\" height=\"")
		  .append("100%").append("\" onmousemove=\"findXY(evt)\" ")
		  //.append(" onload=\"addMainMenu('").append(path).append("')\"")
		  .append(" onmousedown=\"initMenu()\"")
		  .append(">").append(tab);
		sb.append("<script language=\"text/javascript\" xlink:href=\"").append(path)
		  .append("/js/ProcDefSvg.js\"/>").append(tab);		
		//sb.append(this.createNemu(path));		
		sb.append("<defs>").append(tab);
		sb.append("<g id=\"arrow1\">").append(tab);
		sb.append("<path d=\"M 0 0 L 3 10 L 6 0 A 3 3 0 0 1 0 0\"").append(tab);
		sb.append("style=\"stroke: #808080; fill:#fdb902\" />").append(tab);
		sb.append("</g>").append(tab);
		sb.append("<g id=\"arrow2\">").append(tab);
		sb.append("<path d=\"M 0 10 L 3 0 L 6 10 A 3 3 0 0 0 0 10\"").append(tab);
		sb.append("style=\"stroke: #808080; fill:#fdb902\" />").append(tab);
		sb.append("</g>").append(tab);
		sb.append("<g id=\"arrow3\">").append(tab);
		sb.append("<path d=\"M 0 0 L 10 3 L 0 6 A 3 3 0 0 0 0 0\"").append(tab);
		sb.append("style=\"stroke: #808080; fill:#fdb902\" />").append(tab);
		sb.append("</g>").append(tab);
		sb.append("<g id=\"arrow4\">").append(tab);
		sb.append("<path d=\"M 10 0 L 0 3 L 10 6 A 3 3 0 0 1 10 0\"").append(tab);
		sb.append("style=\"stroke: #808080; fill:#fdb902\" />").append(tab);
		sb.append("</g>").append(tab);
		sb.append("</defs>").append(tab);
		sb.append("<rect x=\"0\" y=\"0\" width=\"").append(maxX).append("\" height=\"")
		      .append(maxY).append("\"")
		      .append(" style=\"fill:#ffffff;").append(tab);
        sb.append("stroke:#ffffff; stroke-width: 2; stroke-opacity: 0.2;\" />").append(tab);
		return sb.toString();
	}
	private String createActivitie(NWProcDef process,Hashtable apps,NWActDef actdef,String path,String Contextpath)throws NWException{
		   StringBuffer sb = new StringBuffer();
		   String apptype = "";
		   String actPosition = (String) this.activitiesXY.get(actdef.getID());
		   String pos[] = actPosition.split(",");
		   int x = Integer.valueOf(pos[0]).intValue();
		   int y = Integer.valueOf(pos[1]).intValue();
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
		   
		   if (type==0){
			   sb.append("<g onmouseover=\"byRecSelected('0',evt,'").append("rec"+actdef.getID()).append("','")
			     .append(Contextpath).append("')\"").append(tab)
			     .append(" onmouseout=\"unOldRecSelected(evt,'").append("rec"+actdef.getID()).append("','")
               .append(Contextpath).append("')\"").append(tab)
			     .append(" onmousedown=\"openAutoMenu(evt,'")
			     .append(actdef.getID()).append("')\"").append(tab)
			     .append(" id=\"").append(actdef.getID()).append("\">").append(tab);	
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"41\" height=\"41\" style=\"fill:#ffffff;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);
			   String png = "auto.png";
			   if (apptype.equals("Java"))
				   png = "auto3.png";
			   else if (apptype.equals("EXE"))
				   png = "auto4.png";
			   else if (apptype.equals("Dll"))
				   png = "auto5.png";
			   else if (apptype.equals("WebService"))
				   png = "auto6.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"41\" height=\"41\"/>").append(tab);
			   sb.append("</g>").append(tab);
		   }
		   if (type==1){
			   sb.append("<g onmouseover=\"byRecSelected('1',evt,'").append("rec"+actdef.getID()).append("','")
			     .append(Contextpath).append("')\"").append(tab)
			     .append(" onmouseout=\"unOldRecSelected(evt,'").append("rec"+actdef.getID()).append("','")
                 .append(Contextpath).append("')\"").append(tab)
			     .append(" onmousedown=\"openManualMenu(evt,'")
			     .append(actdef.getID()).append("')\"").append(tab)
			     .append(" id=\"").append(actdef.getID()).append("\">").append(tab);					   
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"41\" height=\"41\" style=\"fill:#ffffff;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);				   
			   String png = "manual5.png";
			   if (apptype.equals("url"))
				   png = "manual6.png";
			   else if (apptype.equals("wform"))
				   png = "manual7.png";			   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"41\" height=\"41\"/>").append(tab);
			   sb.append("</g>").append(tab);			   
		   }
		   if (type==2||type==3){
			   sb.append("<g onmouseover=\"byRecSelected('2',evt,'").append("rec"+actdef.getID()).append("','")
			     .append(Contextpath).append("')\"").append(tab)
			     .append(" onmouseout=\"unOldRecSelected(evt,'").append("rec"+actdef.getID()).append("','")
               .append(Contextpath).append("')\"").append(tab)
			     .append(" onclick=\"subproc_onClick('")
			     .append(actdef.getSubprocID()+"#"+actdef.getSubprocVersionName()).append("')\"").append(tab)
			     .append(" id=\"").append(actdef.getID()).append("\">").append(tab);
			   sb.append("<rect x=\"").append(x).append("\" y=\"").append(y)
			     .append("\" width=\"41\" height=\"41\" style=\"fill:#ffffff;\" ")
			     .append("id=\"").append("rec"+actdef.getID()).append("\"/>")
			     .append(tab);	
			   String png = "subproc.png";
			   if (type==3)
				   png = "subproc3.png";				   
			   sb.append("<image xlink:href=\"").append(path).append(png).append("\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"41\" height=\"41\"/>").append(tab);
			   sb.append("</g>").append(tab);	
		   }
		   if (type==4){
			   sb.append("<image xlink:href=\"").append(path).append("event.png\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"41\" height=\"41\"/>").append(tab);
		   }
		   if (type==5){
			   sb.append("<image xlink:href=\"").append(path).append("choice.png\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"25\" height=\"25\"/>").append(tab);
		   }
		   if (type==6||type==7){
			   sb.append("<image xlink:href=\"").append(path).append("parallel.png\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"25\" height=\"25\"/>").append(tab);			   
		   }
		   if (type==8){
			   sb.append("<image xlink:href=\"").append(path).append("start.png\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"25\" height=\"25\"/>").append(tab);
		   }
		   if (type==9){
			   sb.append("<image xlink:href=\"").append(path).append("end.png\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"25\" height=\"25\"/>").append(tab);
		   }
		   
		   if (type==13){
			   String htID = process.getCompenONodeID(actdef.getID());
			   if(comps.containsKey(htID)){
				   String value = (String)comps.get(htID);
				   String newValue = value+"#"+"0,"+(String)this.activitiesXY.get(actdef.getID());
				   comps.put(htID,newValue);
			   }else{
				   String newValue = "0,"+(String)this.activitiesXY.get(actdef.getID());
				   comps.put(htID,newValue); 
			   }
			   sb.append("<image xlink:href=\"").append(path).append("SubCompensationStart.png\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"23\" height=\"23\"/>").append(tab);
		   }
		   if (type==14){
			   String htID = process.getCompenONodeID(actdef.getID());
			   if(comps.containsKey(htID)){
				   String value = (String)comps.get(htID);
				   String newValue = value+"#"+"1,"+(String)this.activitiesXY.get(actdef.getID());
				   comps.put(htID,newValue);
			   }else{
				   String newValue = "1,"+(String)this.activitiesXY.get(actdef.getID());
				   comps.put(htID,newValue); 
			   }
			   sb.append("<image xlink:href=\"").append(path).append("SubCompensationEnd.png\" x=\"").append(x)
			     .append("\" y=\"").append(y).append("\" width=\"23\" height=\"23\"/>").append(tab);
		   }
		   if (type==15){
			   String htID = process.getCompenONodeID(actdef.getID());
			   if(comps.containsKey(htID)){
				   String value = (String)comps.get(htID);
				   String newValue = value+"#"+"2,"+(String)this.activitiesXY.get(actdef.getID());
				   comps.put(htID,newValue);
			   }else{
				   String newValue = "2,"+(String)this.activitiesXY.get(actdef.getID());
				   comps.put(htID,newValue); 
			   }
			   sb.append("<image xlink:href=\"").append(path).append("compensationClose.png\" x=\"").append(x-10)
			     .append("\" y=\"").append(y).append("\" width=\"14\" height=\"14\"/>").append(tab);
		   }
		return sb.toString();
	}
	private String createActivitieName(NWActDef actdef)throws NWException{
		   StringBuffer sb = new StringBuffer();
		   String actPosition = (String) this.activitiesXY.get(actdef.getID());
		   String pos[] = actPosition.split(",");
		   int x = Integer.valueOf(pos[0]).intValue();
		   int y = Integer.valueOf(pos[1]).intValue();
		   int type = actdef.getType();
		   
		   String name = actdef.getName();	
		   if (name.indexOf(">")>0 || name.startsWith(">")) 
			   name = name.replaceAll(">","&gt;");
		   if (name.indexOf("<")>0 || name.startsWith("<")) 
			   name = name.replaceAll("<","&lt;");
		   
		   String[] names = this.translateStrName(name);
		   this.activitiesNameHeight.put(actdef.getID(), String.valueOf(names.length*11));
		   
		   if (type==0){
			   for (int i=0;i<names.length;i++){
				   sb.append("<text x=\"").append(x+41/2).append("\" y=\"")
				     .append(y+51+i*11).append("\" style=\"text-anchor: middle\"")
				     .append(" onmouseover = \"byTxtSelected(evt)\" onmouseout = \"unTxtSelected(evt)\" ")
				     .append("onclick=\"auto_onClick('").append(actdef.getID()).append("')\"")
				     .append(">")
				     .append(names[i]).append("</text>").append(tab);
			   }

		   }
		   if (type==1){
			   for (int i=0;i<names.length;i++){
				   sb.append("<text x=\"").append(x+41/2).append("\" y=\"")
				     .append(y+51+i*11).append("\" style=\"text-anchor: middle\"")
				     .append(" onmouseover = \"byTxtSelected(evt)\" onmouseout = \"unTxtSelected(evt)\" ")
				     .append("onclick=\"manual_onClick('").append(actdef.getID()).append("')\"")
				     .append(">")
				     .append(names[i]).append("</text>").append(tab);	 
			   }
		   }
		   if (type==2||type==3){
			   for (int i=0;i<names.length;i++){
				   sb.append("<text x=\"").append(x+41/2).append("\" y=\"")
				     .append(y+51+i*11).append("\" style=\"text-anchor: middle\"")
				     .append(" onmouseover = \"byTxtSelected(evt)\" onmouseout = \"unTxtSelected(evt)\" ")
				     .append("onclick=\"subproc_onClick('").append(actdef.getSubprocID()+"#"+actdef.getSubprocVersionName()).append("')\"")
				     .append(">")
				     .append(names[i]).append("</text>").append(tab);	 
			   }

		   }
		   if (type==4){
			   for (int i=0;i<names.length;i++){
				   sb.append("<text x=\"").append(x+41/2).append("\" y=\"")
				     .append(y+51+i*11).append("\" style=\"text-anchor: middle\">")
				     .append(names[i]).append("</text>").append(tab);
			   }

		   }
		   if (type==5){
			   for (int i=0;i<names.length;i++){
				   sb.append("<text x=\"").append(x+25/2).append("\" y=\"")
				     .append(y+35+i*11).append("\" style=\"text-anchor: middle\">")
				     .append(names[i]).append("</text>").append(tab);
			   }

		   }
		   if (type==6||type==7){
			   for (int i=0;i<names.length;i++){
				   sb.append("<text x=\"").append(x+25/2).append("\" y=\"")
				     .append(y+35+i*11).append("\" style=\"text-anchor: middle\">")
				     .append(names[i]).append("</text>").append(tab); 
			   }
			   
		   }
		   if (type==8){
			   for (int i=0;i<names.length;i++){
				   sb.append("<text x=\"").append(x+25/2).append("\" y=\"")
				     .append(y+35+i*11).append("\" style=\"text-anchor: middle\">")
				     .append(names[i]).append("</text>").append(tab);
			   }

		   }
		   if (type==9){
			   for (int i=0;i<names.length;i++){
				   sb.append("<text x=\"").append(x+25/2).append("\" y=\"")
				     .append(y+35+i*11).append("\" style=\"text-anchor: middle\">")
				     .append(names[i]).append("</text>").append(tab);
			   }

		   }

		return sb.toString();
	}
	private String createTransition(NWTransition trans,NWSession session,int[] activitiesX,int[] activitiesY)throws NWException{
		StringBuffer sb = new StringBuffer();
		String name = trans.getDescription();
		if (name!=null){
		if (name.indexOf(">")>0 || name.startsWith(">")) 
			name = name.replaceAll(">","&gt;");
		if (name.indexOf("<")>0 || name.startsWith("<")) 
			name = name.replaceAll("<","&lt;");
		}else{
			name="";
		}
		int x1=0,x2=0,xa=0,xd=0,xb=0,xc=0,xr=0;
		int y1=0,y2=0,ya=0,yd=0,yb=0,yc=0,yr=0;
		int arrow = 0;
		//int[] rActivitiesX,rActivitiesY;
		int[] rActivitiesY;
		String preActPosition = (String) this.activitiesXY.get(trans.getPrevActID());
		String[] pos = preActPosition.split(",");
		x1 = Integer.valueOf(pos[0]).intValue();
		y1 = Integer.valueOf(pos[1]).intValue();
		int type1 = Integer.valueOf(pos[2]).intValue();
		String nextActPosition = (String) this.activitiesXY.get(trans.getNextActID());
		String[] npos = nextActPosition.split(",");
		x2 = Integer.valueOf(npos[0]).intValue();	
		y2 = Integer.valueOf(npos[1]).intValue();
		int type2 = Integer.valueOf(npos[2]).intValue();
		//计算rActivitiesX和rActivitiesY
		//rActivitiesX = this.getRActivitiesX(x1,x2,y1,y2,activitiesX,activitiesY);
		rActivitiesY = this.getRActivitiesY(x1,x2,y1,y2,activitiesX,activitiesY);
		//根据算法计算
		if (Math.abs(y2-y1)>41 && y2-y1<=0){			
			arrow = 2;//垂直布局
			if (type1>4 && type1<10){
				xa = x1 + 25/2;
				ya = y1;
			}else if(type1<=4){
				xa = x1 + 41/2;
				ya = y1;
			}else{
				xa = x1 + 23/2;
				ya = y1;
			}
			String height = null;
			if (this.activitiesNameHeight.get(trans.getNextActID())!=null)
				height = (String) this.activitiesNameHeight.get(trans.getNextActID());
			if (type2>4 && type2<10){
				xd = x2 + 25/2;
				if (height!=null)
					yd = y2 + 31 +Integer.parseInt(height);
				else	
					yd = y2 + 42;				
			}else if(type2<=4){
				xd = x2 + 41/2;				
				if (height!=null)
					yd = y2 + 47 +Integer.parseInt(height);
				else	
					yd = y2 + 58;
			}else{
				xd = x2 + 23/2;
				yd = y2 + 30;
			}
		}else if (Math.abs(y2-y1)<=41 && x2-x1>41){
			arrow = 3;//水平布局
			if (type1>4 && type1<10){
				xa = x1 + 25;
				ya = y1 + 25/2;
			}else if(type1<=4){
				xa = x1 + 41;
				ya = y1 + 41/2;
			}else{
				xa = x1 + 23;
				ya = y1 + 23/2;				
			}
			if (type2>4 && type2<10){
				xd = x2 - 7;
				yd = y2 + 25/2;
			}else if(type2<=4){
				xd = x2 - 7;
				yd = y2 + 41/2;
			}else{
				xd = x2 - 7;
				yd = y2 + 23/2;
			}
		}else if (Math.abs(y2-y1)<=41 && Math.abs(x2-x1)>41 && x2-x1<=0){
			arrow = 4;//水平布局
			if (type1>4 && type1<10){
				xa = x1;
				ya = y1 + 25/2;
			}else if(type1<=4){
				xa = x1;
				ya = y1 + 41/2;
			}else{
				xa = x1;
				ya = y1 + 23/2;
			}
			if (type2>4 && type2<10){
				xd = x2 + 32;
				yd = y2 + 25/2;
			}else if(type2<=4){
				xd = x2 + 48;
				yd = y2 + 41/2;
			}else{
				xd = x2 + 30;
				yd = y2 + 23/2;
			}
		}else{
			arrow = 1;//垂直布局
			String height = null;
			if (this.activitiesNameHeight.get(trans.getPrevActID())!=null)
				height = (String) this.activitiesNameHeight.get(trans.getPrevActID());
			if (type1>4 && type1<10){
				xa = x1 + 25/2;
				if (height!=null)
					ya = y1 + 25 +Integer.parseInt(height);
				else	
					ya = y1 + 35;
			}else if(type1<=4){
				xa = x1 + 41/2;
				if (height!=null)
					ya = y1 + 41 +Integer.parseInt(height);
				else	
					ya = y1 + 51;
			}else{
				xa = x1 + 23/2;
				ya = y1 + 23;
			}
			if (type2>4 && type2<10){
				xd = x2 + 25/2;
				yd = y2 - 7;
			}else if(type2<=4){
				xd = x2 + 41/2;
				yd = y2 - 7;
			}else{
				xd = x2 + 23/2;
				yd = y2 - 7;
			}
		}
		
		//简单布局画线
	    if (arrow==1||arrow==2){
			xb = xa;
			if (ya<yd)
				yb=ya+(yd-ya)/2;
			else
				yb=ya-(ya-yd)/2;
			xc=xd;
			yc=yb;
		}else{
			if(xa<xd)
				xb=xa+(xd-xa)/2;
			else
				xb=xa-(xa-xd)/2;
			yb=ya;
			xc=xb;
			yc=yd;			
		}
	    //拐点调整算法
		boolean ifcross = false;
		int arrowtype=0;
		if (arrow==1 || arrow==2){
			for (int i=0;i<rActivitiesY.length;i++){
			  if (rActivitiesY[i]!=0){	
			  if (xa<xd){	
				if (xa-41<=activitiesX[i]
				        && activitiesX[i]<=xd+41 && yb>=activitiesY[i]
				        && activitiesY[i]>=yb-41){
					ifcross = true;
				}else if((ya>yd && activitiesY[i]>=yb+41 && activitiesX[i]>=xa-41
						&& activitiesX[i]<=xa) ||(ya<yd && activitiesY[i]<=yb-41 
								&& activitiesX[i]>=xa-41 && activitiesX[i]<=xa) ){
					ifcross = true;
				}else if((ya>yd && activitiesY[i]<=yc-41 && activitiesX[i]>=xd-41
						&& activitiesX[i]<=xd)||(ya<yd && activitiesY[i]>=yc+41 
								&& activitiesX[i]>=xd-41&& activitiesX[i]<=xd)){
					ifcross = true;
				}
				if (ifcross){
					if (type1>4){
						xa = x1 + 25;
						ya = y1 + 25/2;
					}else{
						xa = x1 + 41;
						ya = y1 + 41/2;
					}
					if (type2>4){
						xd = x2 + 32;
						yd = y2 + 25/2;
					}else{
						xd = x2 + 48;
						yd = y2 + 41/2;
					}
					xb = xa + getRMaxValue(rActivitiesY)+30;
					yb = ya;
					xc = xb;
					yc = yd;
					arrowtype=4;
				}//if (ifcross)
			}else{
				if (xd-41<=activitiesX[i]
					&& activitiesX[i]<=xa+41 && yb>=activitiesY[i]
					&& activitiesY[i]>=yb-41){
					ifcross = true;
				}else if((ya>yd && activitiesY[i]>=yb+41 && activitiesX[i]>=xa-41
						&& activitiesX[i]<=xa) ||(ya<yd && activitiesY[i]<=yb-41 
								&& activitiesX[i]>=xa-41 && activitiesX[i]<=xa)){
					ifcross = true;
				}else if((ya>yd && activitiesY[i]<=yc-41 && activitiesX[i]>=xd-41
						&& activitiesX[i]<=xd)||(ya<yd && activitiesY[i]>=yc+41 
								&& activitiesX[i]>=xd-41&& activitiesX[i]<=xd)){
					ifcross = true;
				}
				if (ifcross){
					if (type1>4){
						xa = x1;
						ya = y1 + 25/2;
					}else{
						xa = x1;
						ya = y1 + 41/2;
					}
					if (type2>4){
						xd = x2 - 7;
						yd = y2 + 25/2;
					}else{
						xd = x2 - 7;
						yd = y2 + 41/2;
					}
					xb = xa + getLMaxValue(rActivitiesY)-30;
					yb = ya;
					xc = xb;
					yc = yd;
					arrowtype=3;
				}//if (ifcross)
			}//if (xa<=xd)
			}}//for
		}//if (arrow==1 || arrow==2)
		if (arrowtype!=0)
		  arrow = arrowtype;
		//箭头位置函数
		if (arrow==1){
		  xr = xd - 3;
		  yr = yd - 3;
		}else if (arrow==2){
		  xr = xd - 3;
		  yr = yd + 3;
		}else if (arrow==3){
		  xr = xd - 3;
		  yr = yd - 3;
		}else if(arrow==4){
		  xr = xd - 7;
		  yr = yd - 3;
		}
//		log(session,trans,arrow);
//		System.out.println("开始："+xa+" "+ya+" 结束："+xd+" "+yd);
//		System.out.println("拐点C："+xc+" "+yc+" 拐点D："+xd+" "+yd);
		sb.append("<polyline points=\"").append(xa).append(" ").append(ya)
		  .append(",").append(xb).append(" ").append(yb).append(",")
		  .append(xc).append(" ").append(yc).append(",").append(xd)
		  .append(" ").append(yd).append("\"").append(tab);
		sb.append("style=\"stroke:#808080; fill: none;\" />").append(tab);
		sb.append("<use xlink:href=\"#arrow").append(arrow)
		  .append("\" x=\"").append(xr).append("\" y=\"").append(yr).append("\"/>").append(tab);
		if (arrow==1 || arrow==2){
			int xt = 0;
			if (xb<xc) xt=xb+(xc-xb)/2; 
			else xt=xc+(xb-xc)/2;
			int yt = yc;
			sb.append("<text x=\"").append(xt).append("\" y=\"")
			  .append(yt-2).append("\" fill=\"#ffba00\" style=\"font-size:11px;text-anchor: middle;\">")
			  .append(name).append("</text>").append(tab);
		}else{
			int xt = xc;
			int yt;
			if (yb<yc) yt=yb+(yc-yb)/2; 
			else yt=yc+(yb-yc)/2;
			sb.append("<text x=\"").append(xt).append("\" y=\"")
			  .append(yt).append("\" fill=\"#ffba00\" style=\"font-size:10px;text-anchor: middle\">")
			  .append(name).append("</text>").append(tab);
		}

		return sb.toString();
	}
	private String createCompensation(Vector activities){
		StringBuffer sb = new StringBuffer();
		int xa,xb,xc,xd,xxa,xxb,xxc,xxd;
		int ya,yb,yc,yd,yya,yyb,yyc,yyd;
		for (int i=0;i<activities.size();i++){
			NWActDef actdef = (NWActDef)activities.elementAt(i);
			if (this.comps.containsKey(actdef.getID())){
				String value = (String)comps.get(actdef.getID());
				String[] temp = value.split("#");
				String[] first = temp[0].split(",");
				String[] second = temp[1].split(",");
				String[] third = temp[2].split(",");
				if (first[0].equals("0")){
					xd = Integer.valueOf(first[1]).intValue();
					yd = Integer.valueOf(first[2]).intValue()+23/2;
				}else if (second[0].equals("0")){
					xd = Integer.valueOf(second[1]).intValue();
					yd = Integer.valueOf(second[2]).intValue()+23/2;
				}else{
					xd = Integer.valueOf(third[1]).intValue();
					yd = Integer.valueOf(third[2]).intValue()+23/2;
				}	
				if (first[0].equals("1")){
					xxd = Integer.valueOf(first[1]).intValue();
					yyd = Integer.valueOf(first[2]).intValue()+23/2;
				}else if (second[0].equals("1")){
					xxd = Integer.valueOf(second[1]).intValue();
					yyd = Integer.valueOf(second[2]).intValue()+23/2;
				}else{
					xxd = Integer.valueOf(third[1]).intValue();
					yyd = Integer.valueOf(third[2]).intValue()+23/2;
				}
				if (first[0].equals("2")){
					xa = Integer.valueOf(first[1]).intValue()+4;
					ya = Integer.valueOf(first[2]).intValue()+2;
					xxa = Integer.valueOf(first[1]).intValue()+4;
					yya = Integer.valueOf(first[2]).intValue()+12;
				}else if (second[0].equals("2")){
					xa = Integer.valueOf(second[1]).intValue()+4;
					ya = Integer.valueOf(second[2]).intValue()+2;
					xxa = Integer.valueOf(second[1]).intValue()+4;
					yya = Integer.valueOf(second[2]).intValue()+12;
				}else{
					xa = Integer.valueOf(third[1]).intValue()+4;
					ya = Integer.valueOf(third[2]).intValue()+2;
					xxa = Integer.valueOf(third[1]).intValue()+4;
					yya = Integer.valueOf(third[2]).intValue()+12;
				}
				if(xa<xd)
					xb=xa+(xd-xa)/2;
				else
					xb=xa-(xa-xd)/2;
				yb=ya;
				xc=xb;
				yc=yd;
				if(xxa<xxd)
					xxb=xxa+(xxd-xxa)/2;
				else
					xxb=xxa-(xxa-xxd)/2;
				yyb=yya;
				xxc=xxb;
				yyc=yyd;

				sb.append("<polyline points=\"").append(xa).append(" ").append(ya)
				  .append(",").append(xb).append(" ").append(yb).append(",")
				  .append(xc).append(" ").append(yc).append(",").append(xd)
				  .append(" ").append(yd).append("\"").append(tab);
				sb.append("style=\"stroke:#808080; fill: none;\" />").append(tab);
				sb.append("<polyline points=\"").append(xxa).append(" ").append(yya)
				  .append(",").append(xxb).append(" ").append(yyb).append(",")
				  .append(xxc).append(" ").append(yyc).append(",").append(xxd)
				  .append(" ").append(yyd).append("\"").append(tab);
				sb.append("style=\"stroke:#808080; fill: none;\" />").append(tab);
			}
		}		
		return sb.toString();
	}
	
//	private int[] getXFormActID(NWSession session,String actID)throws NWException{
//		NWActDef actdef = session.getActDef(actID,0);
//		String[] pos = actdef.getPosition().split(",");
//		int[] x = new int[2];
//		x[0]=Integer.valueOf(pos[0]).intValue()+100;
//		x[1]=actdef.getType();
//		return x;
//	}
//	private int getYFormActID(NWSession session,String actID)throws NWException{
//		NWActDef actdef = session.getActDef(actID,0);
//		String[] pos = actdef.getPosition().split(",");
//		int y=0;
//		y=Integer.valueOf(pos[1]).intValue();
//		return y;
//	}
//	private int[] getRActivitiesX(int x1,int x2,int y1,int y2,int[] ActivitiesX,int[] ActivitiesY){
//		int[] rActivitiesX = new int[ActivitiesX.length];
//		for (int i=0;i<rActivitiesX.length;i++) rActivitiesX[i]=0;
//		for (int i=0;i<ActivitiesX.length;i++){
//			if ((x1==ActivitiesX[i] && y1==ActivitiesY[i])||
//					(x2==ActivitiesX[i] && y2==ActivitiesY[i])){
//				
//			}else if ((x1<x2 &&x1<=ActivitiesX[i] && ActivitiesX[i]<=x2) ||
//					(x1>x2 &&x2<=ActivitiesX[i] && ActivitiesX[i]<=x1)){
//				int abs = ActivitiesY[i]-y1;
//				if (abs == 0)
//				  rActivitiesX[i]= 1;
//				else
//				  rActivitiesX[i]= abs;
//			}
//		}				
//		return rActivitiesX;
//	}
	private int[] getRActivitiesY(int x1,int x2,int y1,int y2,int[] ActivitiesX,int[] ActivitiesY){
		int[] rActivitiesY = new int[ActivitiesY.length];
		for (int i=0;i<rActivitiesY.length;i++) rActivitiesY[i]=0;
		for (int i=0;i<ActivitiesY.length;i++){
			if ((x1==ActivitiesX[i] && y1==ActivitiesY[i])||
					(x2==ActivitiesX[i] && y2==ActivitiesY[i])){
				
			}else if ((y1<y2 && y1<=ActivitiesY[i] && ActivitiesY[i]<=y2)||
					(y1>y2 && y2<=ActivitiesY[i] && ActivitiesY[i]<=y1)){
				int abs = ActivitiesX[i]-x1;
				if (abs == 0)
				  rActivitiesY[i]= 1;
				else
				  rActivitiesY[i]= abs;
			}
		}				
		return rActivitiesY;
	}
	private int getRMaxValue(int[] values){
		int max=0;
		for (int i=0;i<values.length;i++){
			if (max<values[i]&&max>=0)
				max = values[i];
		}
		return max;
	}
	private int getLMaxValue(int[] values){
		int max=0;
		for (int i=0;i<values.length;i++){
			if (max>values[i]&&max<=0)
				max = values[i];
		}
		return max;
	}
	//计算名称字符串长度
	private String[] translateStrName(String name){
		String[] names;
		if (name.length()>6){
			int size =name.length()/6;
			if (size*6<name.length()) size=size+1;
			names = new String[size];
			for (int i=0;i<size;i++){
				int e = i*6+6;
				if (e > name.length())
					e = name.length();
				names[i] = name.substring(i*6,e);
			}
		}else{
			names = new String[1];
			names[0]=name;
		}
		return names;
	}
//	private String createNemu(String path){
//		StringBuffer sb = new StringBuffer(512);
//		sb.append("<script type=\"text/javascript\">").append("<![CDATA[").append(tab);
//		sb.append("getURL(\"").append(path).append("/workflow/js/SVGMenu.xml\", fileLoaded);").append(tab);
//        sb.append("function fileLoaded (data) {").append(tab);
//        sb.append("if(data.success) {").append(tab);
//		sb.append("var newMenuRoot=parseXML(data.content,contextMenu);") .append(tab);
//		sb.append("contextMenu.replaceChild(newMenuRoot,contextMenu.getDocumentElement());").append(tab); 
//		sb.append("}").append(tab).append("}").append(tab).append("]]></script>").append(tab);   		
//		return sb.toString();
//	}
//	private void log(NWSession session,NWTransition trans,int arrow){
//		try{
//		   System.out.println("Transition Name:"+trans.getName());
//		   System.out.println("Prev Act Name:"+session.getActDef(trans.getPrevActID(),0).getName()+
//				   " Position:"+session.getActDef(trans.getPrevActID(),0).getPosition());
//		   System.out.println("Next Act Name:"+session.getActDef(trans.getNextActID(),0).getName()+
//				   " Position:"+session.getActDef(trans.getNextActID(),0).getPosition());
//		   System.out.println("Arrow type:"+arrow);
//		   System.out.println("-------------------------------------------------------------------");
//		}catch(NWException e){
//			
//		}
//		
//	}
			
}