package com.neusoft.om.taglibs;

import javax.servlet.jsp.tagext.Tag;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;
import java.io.*;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/** <p>Title:构造树状功能信息显示的TAGLIB</p>
  * <p>Description: 构造树状功能信息显示的XML数据格式</p>
  * <p>Copyright: Copyright (c) 2002</p>
  * <p>Company: neusoft</p>
  * 
  * @author chenzt
  * @version 1.0 */
public class MenuTag implements Tag
{
	private PageContext pageContext = null;
	private Tag parent = null;
	private MenuColl menuColl = null;
	
	/** @param menu_type */
	private String getMenuType(int menuType)
	{
		if(menuType==0){
			return "button";
		}else if(menuType==1)
			return "window";
		else return "menu";
		
	}
	
	/** 构造函数. */
	public MenuTag()
	{}
	
	/** 设置JSP页面上下文
	 * 
	 * @param pc */
	public void setPageContext(PageContext pc)
	{
	pageContext = pc;
	}
	
	/** 设置包含这个标记的标记 */
	public Tag getParent()
	{
	return parent;}
	
	/** 说明包含这个标记的标记的相关信息
	 * 
	 * @param t */
	public void setParent(Tag t)
	{
	this.parent=t;}
	
	/** 标记开始的时候运行
	 * 
	 * @exception JspException */
	public int doStartTag() throws JspException
	{
	return SKIP_BODY; //无正文;
	}
	
	/** 标记结束的时候开始运行
	 * 
	 * @exception JspException */
	public int doEndTag() throws JspException
	{
	
		//功能对象结果集
		MenuColl menuColl = this.getMenuColl();
		
		if(menuColl==null || menuColl.getRowCount()==0){
			return EVAL_PAGE;
		}
		
		//在添加代码生成语法并输出到JSP.
		StringBuffer stb = new StringBuffer();
		StringBuffer allSelect = new StringBuffer("");
		StringBuffer allFunction = new StringBuffer("");
		
		//当前循环的行数变量: 
		int loopPoint=0;
	
		MenuVO function = null;
		
		int systemNumber = 0;
		
		String parent_id1=null;
		String parent_id2=null;
		String parent_id3=null;
		String parent_id4=null;
		
		//循环取. 如果loopPoint > 行数中断退出
		while(true){
		
		if(loopPoint>=menuColl.getRowCount()){
		break;
		}
		
		systemNumber = loopPoint;
		boolean adminFlag = false;
		boolean execFlag = false;
		
		function = menuColl.getMenu(loopPoint);
		
		stb.append("	<MainMenu>\n");
			
		stb.append("		<ID>Z").append(function.getMenuId()).append("</ID>\n");
		stb.append("		<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("		<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("		<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("		<Number>").append(loopPoint).append("</Number>\n");
		stb.append("		<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		//stb.append("		<Selected>").append(function.getIfSelect()).append("</Selected>\n");
		stb.append("		<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");		
			//如果有子节点构造如下内容
	//renh add
	if(function.getIfSelectAdmin()){
		//allSelect.append(function.getMenuId()).append("-");
		adminFlag = true;
	}
	if(function.getIfSelectExec()){
		//allSelect.append(function.getMenuId()).append("-");
		execFlag = true;
	}
	if(function.getIfSelectAdmin()||function.getIfSelectExec()){
		allSelect.append(function.getMenuId()).append("-").append(function.getAdminStatus()).append("-").append(function.getExecStatus()).append(";");
	}
	//add end
		stb.append("		<Level1>\n");
		
		parent_id1 = "Z" + function.getMenuId();
		
		stb.append("			<ParentID>").append(parent_id1).append("</ParentID>\n");
	
			//节点下移
			loopPoint++;
				
				//内嵌套循环写sub1
				//取loopPoint的值. 如果layer=1构造则构造
				//如果layer<1, 则写</Leve1></MainMenu>中断循环
				while(true){
				
				if(loopPoint>=menuColl.getRowCount()){
		stb.append("		</Level1>\n");
		stb.append("    <SelectedAdmin>").append(adminFlag).append("</SelectedAdmin>\n");
		stb.append("    <SelectedExec>").append(execFlag).append("</SelectedExec>\n");
		stb.append("	</MainMenu>\n");
				break;
				}			
				
				function = menuColl.getMenu(loopPoint);
				
				//如果层数<1, 中断循环
				if(function.getLayer()<1){
		stb.append("		</Level1>\n");
		stb.append("    <SelectedAdmin>").append(adminFlag).append("</SelectedAdmin>\n");
		stb.append("    <SelectedExec>").append(execFlag).append("</SelectedExec>\n");
		stb.append("	</MainMenu>\n");
					break;
				}
				
				
		stb.append("			<Sub1>\n");
		stb.append("				<ID>").append(parent_id1).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("				<ParentID>").append(parent_id1).append("</ParentID>\n");
		stb.append("				<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("				<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("				<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("				<Number>").append(loopPoint).append("</Number>\n");
		stb.append("				<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("				<Type>").append(getMenuType(function.getMenuType())).append("</Type>\n");
		stb.append("				<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("				<SelectedAdmin>").append(function.getIfSelectAdmin()).append("</SelectedAdmin>\n");
		stb.append("				<SelectedExec>").append(function.getIfSelectExec()).append("</SelectedExec>\n");
		stb.append("				<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");
		if(function.getIfSelectAdmin()){
			//allSelect.append(function.getMenuId()).append("-");
			adminFlag = true;
		}
		if(function.getIfSelectExec()){
			//allSelect.append(function.getMenuId()).append("-");
			execFlag = true;
		}
		if(function.getIfSelectAdmin()||function.getIfSelectAdmin()){
			allSelect.append(function.getMenuId()).append("-").append(function.getAdminStatus()).append("-").append(function.getExecStatus()).append(";");
		}
		allFunction.append(function.getMenuId()).append("-");
					loopPoint++;
					//如果有子节点构造第二层
					if(function.getIfChild()){
						parent_id2 = parent_id1 + "_" + function.getMenuId();
		stb.append("				<Level2>\n");
		stb.append("					<ParentID>").append(parent_id2).append("</ParentID>\n");
					}else{
		stb.append("			</Sub1>\n");
						continue;					
					}	
						//循环构造第二层数据
						//如果层数<2, 写</Level2></Sub1> 退出循环
						while(true){
	
						if(loopPoint>=menuColl.getRowCount()){
		stb.append("				</Level2>\n");
		stb.append("			</Sub1>\n");
						break;
						}			
						
						function = menuColl.getMenu(loopPoint);
									
						if(function.getLayer()<2){
		stb.append("				</Level2>\n");
		stb.append("			</Sub1>\n");
							break;
						}
						
						function = menuColl.getMenu(loopPoint);
		stb.append("					<Sub2>\n");
		stb.append("						<ID>").append(parent_id2).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("						<ParentID>").append(parent_id2).append("</ParentID>\n");
		stb.append("						<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("						<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("						<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("						<Number>").append(loopPoint).append("</Number>\n");
		stb.append("						<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("						<Type>").append(getMenuType(function.getMenuType())).append("</Type>\n");
		stb.append("						<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("						<SelectedAdmin>").append(function.getIfSelectAdmin()).append("</SelectedAdmin>\n");
		stb.append("						<SelectedExec>").append(function.getIfSelectExec()).append("</SelectedExec>\n");
		stb.append("						<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");
		if(function.getIfSelectAdmin()){
			//allSelect.append(function.getMenuId()).append("-");
			adminFlag = true;
		}
		if(function.getIfSelectExec()){
			//allSelect.append(function.getMenuId()).append("-");
			execFlag = true;
		}
		if(function.getIfSelectAdmin()||function.getIfSelectExec()){
			allSelect.append(function.getMenuId()).append("-").append(function.getAdminStatus()).append("-").append(function.getExecStatus()).append(";");
		}
		allFunction.append(function.getMenuId()).append("-");
							loopPoint++;
							
							//如果有子节点构造第三层
							if(function.getIfChild()){
								parent_id3 = parent_id2 + "_" + function.getMenuId();
		stb.append("						<Level3>\n");
		stb.append("							<ParentID>").append(parent_id3).append("</ParentID>\n");
							}else{
		stb.append("					</Sub2>\n");
								continue;							
							}
								//循环构造第二层数据
								//如果层数<3, 写</Level3></Sub2> 退出循环
								while(true){
								if(loopPoint>=menuColl.getRowCount()){
		stb.append("						</Level3>\n");
		stb.append("					</Sub2>\n");
								break;
								}			
								
								function = menuColl.getMenu(loopPoint);
									
								if(function.getLayer()<3){
		stb.append("						</Level3>\n");
		stb.append("					</Sub2>\n");
									break;
								}
								
								
		stb.append("							<Sub3>\n");
		//stb.append("								<ID>Z").append(function.getSystemId()).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("								<ID>").append(parent_id3).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("								<ParentID>").append(parent_id3).append("</ParentID>\n");
		stb.append("								<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("								<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("								<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("								<Number>").append(loopPoint).append("</Number>\n");
		stb.append("								<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("								<Type>").append(getMenuType(function.getMenuType())).append("</Type>\n");
		stb.append("								<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("								<SelectedAdmin>").append(function.getIfSelectAdmin()).append("</SelectedAdmin>\n");
		stb.append("								<SelectedExec>").append(function.getIfSelectExec()).append("</SelectedExec>\n");
		stb.append("								<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");							
		if(function.getIfSelectAdmin()){
			//allSelect.append(function.getMenuId()).append("-");
			adminFlag = true;
		}
		if(function.getIfSelectExec()){
			//allSelect.append(function.getMenuId()).append("-");
			execFlag = true;
		}
		if(function.getIfSelectAdmin()||function.getIfSelectExec()){
			allSelect.append(function.getMenuId()).append("-").append(function.getAdminStatus()).append("-").append(function.getExecStatus()).append(";");
		}
		allFunction.append(function.getMenuId()).append("-");
									loopPoint++;
									
									//如果有子节点构造第四层
									if(function.getIfChild()){
										parent_id4 = parent_id3 + "_" + function.getMenuId();
		stb.append("								<Level4>\n");
		stb.append("									<ParentID>").append(parent_id4).append("</ParentID>\n");
									}else{
		stb.append("							</Sub3>\n");								
									continue;
									}
										//循环构造第二层数据
										//如果层数<4, 写</Level4></Sub3> 退出循环
										while(true){
										if(loopPoint>=menuColl.getRowCount()){
		stb.append("								</Level4>\n");
		stb.append("							</Sub3>\n");
										break;
										}			
										
										function = menuColl.getMenu(loopPoint);
											
										if(function.getLayer()<4){
		stb.append("								</Level4>\n");
		stb.append("							</Sub3>\n");
											break;
										}
										
		stb.append("									<Sub4>\n");
		//stb.append("										<ID>Z").append(function.getSystemId()).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("										<ID>").append(parent_id4).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("										<ParentID>").append(parent_id4).append("</ParentID>\n");
		stb.append("										<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("										<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("										<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("										<Number>").append(loopPoint).append("</Number>\n");
		stb.append("										<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("										<Type>").append(getMenuType(function.getMenuType())).append("</Type>\n");
		stb.append("										<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("										<SelectedAdmin>").append(function.getIfSelectAdmin()).append("</SelectedAdmin>\n");
		stb.append("										<SelectedExec>").append(function.getIfSelectExec()).append("</SelectedExec>\n");
		stb.append("										<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");
		if(function.getIfSelectAdmin()){
			//allSelect.append(function.getMenuId()).append("-");
			adminFlag = true;
		}
		if(function.getIfSelectExec()){
			//allSelect.append(function.getMenuId()).append("-");
			execFlag = true;
		}
		if(function.getIfSelectAdmin()||function.getIfSelectExec()){
			allSelect.append(function.getMenuId()).append("-").append(function.getAdminStatus()).append("-").append(function.getExecStatus()).append(";");
		}
		allFunction.append(function.getMenuId()).append("-");
		stb.append("									</Sub4>\n");	
											loopPoint++;	
										}									
								} //第三级循环结束
						} //第二级循环结束
			}//第一级循环结束
		}//最上层循环结束
		
		stb.append("<AllFunction>");
		stb.append(allFunction.toString());
		stb.append("</AllFunction>\n");
				
		stb.append("<AllSelect>");
		stb.append(allSelect.toString());
		stb.append("</AllSelect>\n");
		
		//输出到JSP
		try {
		pageContext.getOut().write(stb.toString());
				} catch (IOException ioexception) {
		throw new JspException("IO Error: " + ioexception.getMessage());
				}
		
		        
		return EVAL_PAGE; 
	
	}
	
	/** 获取属性数据 */
	public MenuColl getMenuColl()
	{
	return menuColl;}
	
	/** 设置属性数据
	 * 
	 * @param menuColl */
	public void setMenuColl(MenuColl menuColl)
	{
	this.menuColl = menuColl;}
	
	/** 执行标记内容完毕后执行. Release */
	public void release()
	{
	}

}

