package com.neusoft.om.taglibs;

import javax.servlet.jsp.tagext.Tag;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;
import java.io.*;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

/** <p>Title:������״������Ϣ��ʾ��TAGLIB</p>
  * <p>Description: ������״������Ϣ��ʾ��XML���ݸ�ʽ</p>
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
	
	/** ���캯��. */
	public MenuTag()
	{}
	
	/** ����JSPҳ��������
	 * 
	 * @param pc */
	public void setPageContext(PageContext pc)
	{
	pageContext = pc;
	}
	
	/** ���ð��������ǵı�� */
	public Tag getParent()
	{
	return parent;}
	
	/** ˵�����������ǵı�ǵ������Ϣ
	 * 
	 * @param t */
	public void setParent(Tag t)
	{
	this.parent=t;}
	
	/** ��ǿ�ʼ��ʱ������
	 * 
	 * @exception JspException */
	public int doStartTag() throws JspException
	{
	return SKIP_BODY; //������;
	}
	
	/** ��ǽ�����ʱ��ʼ����
	 * 
	 * @exception JspException */
	public int doEndTag() throws JspException
	{
	
		//���ܶ�������
		MenuColl menuColl = this.getMenuColl();
		
		if(menuColl==null || menuColl.getRowCount()==0){
			return EVAL_PAGE;
		}
		
		//����Ӵ��������﷨�������JSP.
		StringBuffer stb = new StringBuffer();
		StringBuffer allSelect = new StringBuffer("");
		StringBuffer allFunction = new StringBuffer("");
		
		//��ǰѭ������������: 
		int loopPoint=0;
	
		MenuVO function = null;
		
		int systemNumber = 0;
		
		String parent_id1=null;
		String parent_id2=null;
		String parent_id3=null;
		String parent_id4=null;
		
		//ѭ��ȡ. ���loopPoint > �����ж��˳�
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
			//������ӽڵ㹹����������
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
	
			//�ڵ�����
			loopPoint++;
				
				//��Ƕ��ѭ��дsub1
				//ȡloopPoint��ֵ. ���layer=1��������
				//���layer<1, ��д</Leve1></MainMenu>�ж�ѭ��
				while(true){
				
				if(loopPoint>=menuColl.getRowCount()){
		stb.append("		</Level1>\n");
		stb.append("    <SelectedAdmin>").append(adminFlag).append("</SelectedAdmin>\n");
		stb.append("    <SelectedExec>").append(execFlag).append("</SelectedExec>\n");
		stb.append("	</MainMenu>\n");
				break;
				}			
				
				function = menuColl.getMenu(loopPoint);
				
				//�������<1, �ж�ѭ��
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
					//������ӽڵ㹹��ڶ���
					if(function.getIfChild()){
						parent_id2 = parent_id1 + "_" + function.getMenuId();
		stb.append("				<Level2>\n");
		stb.append("					<ParentID>").append(parent_id2).append("</ParentID>\n");
					}else{
		stb.append("			</Sub1>\n");
						continue;					
					}	
						//ѭ������ڶ�������
						//�������<2, д</Level2></Sub1> �˳�ѭ��
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
							
							//������ӽڵ㹹�������
							if(function.getIfChild()){
								parent_id3 = parent_id2 + "_" + function.getMenuId();
		stb.append("						<Level3>\n");
		stb.append("							<ParentID>").append(parent_id3).append("</ParentID>\n");
							}else{
		stb.append("					</Sub2>\n");
								continue;							
							}
								//ѭ������ڶ�������
								//�������<3, д</Level3></Sub2> �˳�ѭ��
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
									
									//������ӽڵ㹹����Ĳ�
									if(function.getIfChild()){
										parent_id4 = parent_id3 + "_" + function.getMenuId();
		stb.append("								<Level4>\n");
		stb.append("									<ParentID>").append(parent_id4).append("</ParentID>\n");
									}else{
		stb.append("							</Sub3>\n");								
									continue;
									}
										//ѭ������ڶ�������
										//�������<4, д</Level4></Sub3> �˳�ѭ��
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
								} //������ѭ������
						} //�ڶ���ѭ������
			}//��һ��ѭ������
		}//���ϲ�ѭ������
		
		stb.append("<AllFunction>");
		stb.append(allFunction.toString());
		stb.append("</AllFunction>\n");
				
		stb.append("<AllSelect>");
		stb.append(allSelect.toString());
		stb.append("</AllSelect>\n");
		
		//�����JSP
		try {
		pageContext.getOut().write(stb.toString());
				} catch (IOException ioexception) {
		throw new JspException("IO Error: " + ioexception.getMessage());
				}
		
		        
		return EVAL_PAGE; 
	
	}
	
	/** ��ȡ�������� */
	public MenuColl getMenuColl()
	{
	return menuColl;}
	
	/** ������������
	 * 
	 * @param menuColl */
	public void setMenuColl(MenuColl menuColl)
	{
	this.menuColl = menuColl;}
	
	/** ִ�б��������Ϻ�ִ��. Release */
	public void release()
	{
	}

}

