/*
 * Created on 2005-2-18
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.neusoft.om.taglibs.menu;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import com.neusoft.om.dao.menu.MenuColl;
import com.neusoft.om.dao.menu.MenuVO;
import com.neusoft.om.omutil.OMRequestParameter;
import com.neusoft.tdframework.web.taglibs.BaseXMLTagLib;

/**
 * @author chenzt
 *
 * �˵���TAGLIB
 * 
 */
public class MenuTree extends BaseXMLTagLib{
	
	MenuColl menuColl = null; 
	
	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#init(javax.servlet.http.HttpServletRequest)
	 */
	protected void init(HttpServletRequest request) {
		menuColl = (MenuColl)request.getAttribute(OMRequestParameter.MENU_TREE);		
	}

	/* (non-Javadoc)
	 * @see com.neusoft.tdframework.web.taglibs.BaseXMLTagLib#createTagBody()
	 */
	protected void createTagBody() throws IOException {
		
		//�ж��Ƿ�Ϊ���Կ���
		if(isDebug()) {
			test();
			return;
		}
		
		if(menuColl==null) return;
		
		//����Ӵ��������﷨�������JSP.
		StringBuffer stb = new StringBuffer();
		StringBuffer allSelect = new StringBuffer();
		StringBuffer allFunction = new StringBuffer();
		
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
		stb.append("		<Name>").append(prepareXML(function.getMenuName())).append("</Name>\n");
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
	if(function.getIfSelectExec()){
		allSelect.append(function.getMenuId()).append(";");
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
		stb.append("				<Name>").append(prepareXML(function.getMenuName())).append("</Name>\n");
		stb.append("				<Page_link>").append(prepareXML(function.getPageLink())).append("</Page_link>\n");
		stb.append("				<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("				<Number>").append(loopPoint).append("</Number>\n");
		stb.append("				<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("				<Type>").append(getMenuType(function.getMenuType())).append("</Type>\n");
		stb.append("				<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("				<SelectedAdmin>").append(function.getIfSelectAdmin()).append("</SelectedAdmin>\n");
		stb.append("				<SelectedExec>").append(function.getIfSelectExec()).append("</SelectedExec>\n");
		stb.append("				<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");
		if(function.getIfSelectExec()){
			//allSelect.append(function.getMenuId()).append("-");
			adminFlag = true;
		}
		if(function.getIfSelectExec()){
			//allSelect.append(function.getMenuId()).append("-");
			execFlag = true;
		}
		if(function.getIfSelectExec()){
			allSelect.append(function.getMenuId()).append(";");
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
		stb.append("						<Name>").append(prepareXML(function.getMenuName())).append("</Name>\n");
		stb.append("						<Page_link>").append(prepareXML(function.getPageLink())).append("</Page_link>\n");
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
		if(function.getIfSelectExec()){
			allSelect.append(function.getMenuId()).append(";");
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
		stb.append("								<Name>").append(prepareXML(function.getMenuName())).append("</Name>\n");
		stb.append("								<Page_link>").append(prepareXML(function.getPageLink())).append("</Page_link>\n");
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
		if(function.getIfSelectExec()){
			allSelect.append(function.getMenuId()).append(";");
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
		stb.append("										<Name>").append(prepareXML(function.getMenuName())).append("</Name>\n");
		stb.append("										<Page_link>").append(prepareXML(function.getPageLink())).append("</Page_link>\n");
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
		if(function.getIfSelectExec()){
			allSelect.append(function.getMenuId()).append(";");
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
		
		write(stb.toString());	
		
	}
	
	private void test() throws IOException {
		StringBuffer buffer = new StringBuffer();

		buffer.append("		<MainMenu>                                                                                                                                      \n");
		buffer.append("		<ID>Z15</ID>                                                                                                                                    \n");
		buffer.append("		<Name>�ͻ�άϵ</Name>                                                                                                                           \n");
		buffer.append("		<Page_link></Page_link>                                                                                                                         \n");
		buffer.append("		<IfSun>true</IfSun>                                                                                                                             \n");
		buffer.append("		<Number>0</Number>                                                                                                                              \n");
		buffer.append("		<SysNumber>0</SysNumber>                                                                                                                        \n");
		buffer.append("		<FunctionID>15</FunctionID>                                                                                                                     \n");
		buffer.append("		<Level1>                                                                                                                                        \n");
		buffer.append("			<ParentID>Z15</ParentID>                                                                                                                    \n");
		buffer.append("			<Sub1>                                                                                                                                      \n");
		buffer.append("				<ID>Z15_151A</ID>                                                                                                                       \n");
		buffer.append("				<ParentID>Z15</ParentID>                                                                                                                \n");
		buffer.append("				<Name>�ճ�����ƽ̨</Name>                                                                                                               \n");
		buffer.append("				<Page_link>null</Page_link>                                                                                                             \n");
		buffer.append("				<IfSun>true</IfSun>                                                                                                                     \n");
		buffer.append("				<Number>1</Number>                                                                                                                      \n");
		buffer.append("				<SysNumber>0</SysNumber>                                                                                                                \n");
		buffer.append("				<Type>menu</Type>                                                                                                                       \n");
		buffer.append("				<Open_method>0</Open_method>                                                                                                            \n");
		buffer.append("				<SelectedAdmin>true</SelectedAdmin>                                                                                                     \n");
		buffer.append("				<SelectedExec>false</SelectedExec>                                                                                                      \n");
		buffer.append("				<FunctionID>151A</FunctionID>                                                                                                           \n");
		buffer.append("				<Level2>                                                                                                                                \n");
		buffer.append("					<ParentID>Z15_151A</ParentID>                                                                                                       \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151A1</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>�ҵĸ��˴�ͻ�</Name>                                                                                                     \n");
		buffer.append("						<Page_link>retain/hcustservicemgr.do?hCustType=1,2,4</Page_link>                                                                \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>2</Number>                                                                                                              \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151A1</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151A2</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>�ҵļ��Ŵ�ͻ�</Name>                                                                                                     \n");
		buffer.append("						<Page_link>retain/hcustservicemgr.do?hCustType=3</Page_link>                                                                    \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>3</Number>                                                                                                              \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151A2</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AA</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>�ҵ�άϵ����</Name>                                                                                                       \n");
		buffer.append("						<Page_link>retain/retaintaskmgr.do</Page_link>                                                                                  \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>4</Number>                                                                                                              \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AA</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AB</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>��־����</Name>                                                                                                           \n");
		buffer.append("						<Page_link>retain/retainlogmgr.do</Page_link>                                                                                   \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>5</Number>                                                                                                              \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AB</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AC</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>�ͻ�����</Name>                                                                                                           \n");
		buffer.append("						<Page_link>views/crmsystem/retain/activitymgr/retaincustrequest/RetainCustRequestMgrMain.jsp</Page_link>                        \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>6</Number>                                                                                                              \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AC</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AD</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>��ϸ�ƻ�����</Name>                                                                                                       \n");
		buffer.append("						<Page_link>retain/retaindetailplanmgr.do</Page_link>                                                                            \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>7</Number>                                                                                                              \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AD</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AE</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>���Ͷ���</Name>                                                                                                           \n");
		buffer.append("						<Page_link>retain/smsend.do</Page_link>                                                                                         \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>8</Number>                                                                                                              \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AE</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AF</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>�ͻ���Ϣ����</Name>                                                                                                       \n");
		buffer.append("						<Page_link>retain/custinterestmgr.do</Page_link>                                                                                \n");
		buffer.append("						<IfSun>true</IfSun>                                                                                                             \n");
		buffer.append("						<Number>9</Number>                                                                                                              \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AF</FunctionID>                                                                                                  \n");
		buffer.append("						<Level3>                                                                                                                        \n");
		buffer.append("							<ParentID>Z15_151A_151AF</ParentID>                                                                                         \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151A_151AF_151AFA</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151A_151AF</ParentID>                                                                                     \n");
		buffer.append("								<Name>�ͻ���Ȥ����</Name>                                                                                               \n");
		buffer.append("								<Page_link>retain/custinterestmgr.do</Page_link>                                                                        \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>10</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151AFA</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151A_151AF_151AFB</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151A_151AF</ParentID>                                                                                     \n");
		buffer.append("								<Name>�ͻ���Ҫ����</Name>                                                                                               \n");
		buffer.append("								<Page_link>views/crmsystem/retain/custimpdatemgr/CustImpDateMgrMain.jsp</Page_link>                                     \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>11</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151AFB</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151A_151AF_151AFC</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151A_151AF</ParentID>                                                                                     \n");
		buffer.append("								<Name>�ͻ��ҳ϶����</Name>                                                                                             \n");
		buffer.append("								<Page_link>retain/custloyaltymgr.do</Page_link>                                                                         \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>12</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151AFC</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151A_151AF_151AFD</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151A_151AF</ParentID>                                                                                     \n");
		buffer.append("								<Name>��άϵ�ͻ�</Name>                                                                                                 \n");
		buffer.append("								<Page_link>retain/retainrefusecustmgr.do</Page_link>                                                                    \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>13</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151AFD</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("						</Level3>                                                                                                                       \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AG</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>��ͻ�����</Name>                                                                                                         \n");
		buffer.append("						<Page_link>retain/custloyaltymgr.do</Page_link>                                                                                 \n");
		buffer.append("						<IfSun>true</IfSun>                                                                                                             \n");
		buffer.append("						<Number>14</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AG</FunctionID>                                                                                                  \n");
		buffer.append("						<Level3>                                                                                                                        \n");
		buffer.append("							<ParentID>Z15_151A_151AG</ParentID>                                                                                         \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151A_151AG_151AGA</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151A_151AG</ParentID>                                                                                     \n");
		buffer.append("								<Name>��ͻ����öȵ���</Name>                                                                                           \n");
		buffer.append("								<Page_link>retain/hcustcreditadjust.do</Page_link>                                                                      \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>15</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151AGA</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151A_151AG_151AGB</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151A_151AG</ParentID>                                                                                     \n");
		buffer.append("								<Name>��ͻ����öȵ���</Name>                                                                                           \n");
		buffer.append("								<Page_link>retain/hcustcreditadjust.do</Page_link>                                                                      \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>16</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151AGB</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("						</Level3>                                                                                                                       \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AH</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>��ͻ����</Name>                                                                                                         \n");
		buffer.append("						<Page_link>retain/hcustcreditadjust.do</Page_link>                                                                              \n");
		buffer.append("						<IfSun>true</IfSun>                                                                                                             \n");
		buffer.append("						<Number>17</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AH</FunctionID>                                                                                                  \n");
		buffer.append("						<Level3>                                                                                                                        \n");
		buffer.append("							<ParentID>Z15_151A_151AH</ParentID>                                                                                         \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151A_151AH_151AHA</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151A_151AH</ParentID>                                                                                     \n");
		buffer.append("								<Name>�ͻ������</Name>                                                                                                 \n");
		buffer.append("								<Page_link>views/crmsystem/retain/hcustratify/custlevratify/CustLevRatifyMain.jsp</Page_link>                           \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>18</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151AHA</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151A_151AH_151AHB</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151A_151AH</ParentID>                                                                                     \n");
		buffer.append("								<Name>ҵ�����</Name>                                                                                                 \n");
		buffer.append("								<Page_link>views/crmsystem/retain/hcustratify/servicelevratify/ServiceLevRatifyMain.jsp</Page_link>                     \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>19</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151AHB</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("						</Level3>                                                                                                                       \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151A_151AI</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151A</ParentID>                                                                                                   \n");
		buffer.append("						<Name>Ԥ�������������</Name>                                                                                                   \n");
		buffer.append("						<Page_link>retain/noticerulemgr.do</Page_link>                                                                                  \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>20</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151AI</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("				</Level2>                                                                                                                               \n");
		buffer.append("			</Sub1>                                                                                                                                     \n");
		buffer.append("			<Sub1>                                                                                                                                      \n");
		buffer.append("				<ID>Z15_151B</ID>                                                                                                                       \n");
		buffer.append("				<ParentID>Z15</ParentID>                                                                                                                \n");
		buffer.append("				<Name>ϵͳ����ƽ̨</Name>                                                                                                               \n");
		buffer.append("				<Page_link>null</Page_link>                                                                                                             \n");
		buffer.append("				<IfSun>true</IfSun>                                                                                                                     \n");
		buffer.append("				<Number>21</Number>                                                                                                                     \n");
		buffer.append("				<SysNumber>0</SysNumber>                                                                                                                \n");
		buffer.append("				<Type>menu</Type>                                                                                                                       \n");
		buffer.append("				<Open_method>0</Open_method>                                                                                                            \n");
		buffer.append("				<SelectedAdmin>true</SelectedAdmin>                                                                                                     \n");
		buffer.append("				<SelectedExec>false</SelectedExec>                                                                                                      \n");
		buffer.append("				<FunctionID>151B</FunctionID>                                                                                                           \n");
		buffer.append("				<Level2>                                                                                                                                \n");
		buffer.append("					<ParentID>Z15_151B</ParentID>                                                                                                       \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151B_151BA</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151B</ParentID>                                                                                                   \n");
		buffer.append("						<Name>άϵ�������</Name>                                                                                                       \n");
		buffer.append("						<Page_link>retain/themeinfomgr.do</Page_link>                                                                                   \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>22</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151BA</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151B_151BB</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151B</ParentID>                                                                                                   \n");
		buffer.append("						<Name>άϵ���Թ���</Name>                                                                                                       \n");
		buffer.append("						<Page_link>retain/retainstrategymgr.do</Page_link>                                                                              \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>23</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151BB</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151B_151BC</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151B</ParentID>                                                                                                   \n");
		buffer.append("						<Name>άϵ�ͻ����</Name>                                                                                                       \n");
		buffer.append("						<Page_link>retain/retaincustomermgr.do</Page_link>                                                                              \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>24</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151BC</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151B_151BD</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151B</ParentID>                                                                                                   \n");
		buffer.append("						<Name>άϵ�������</Name>                                                                                                       \n");
		buffer.append("						<Page_link>null</Page_link>                                                                                                     \n");
		buffer.append("						<IfSun>true</IfSun>                                                                                                             \n");
		buffer.append("						<Number>25</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151BD</FunctionID>                                                                                                  \n");
		buffer.append("						<Level3>                                                                                                                        \n");
		buffer.append("							<ParentID>Z15_151B_151BD</ParentID>                                                                                         \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151B_151BD_151BDA</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151B_151BD</ParentID>                                                                                     \n");
		buffer.append("								<Name>άϵ������������</Name>                                                                                           \n");
		buffer.append("								<Page_link>views/crmsystem/retain/activitymgr/retaintaskassign/RetainTaskBatchAssignMain.jsp</Page_link>                \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>26</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151BDA</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151B_151BD_151BDB</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151B_151BD</ParentID>                                                                                     \n");
		buffer.append("								<Name>άϵ�������</Name>                                                                                               \n");
		buffer.append("								<Page_link>retain/retaintaskmgr.do?operType=reAssignMenuInit</Page_link>                                                \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>27</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151BDB</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("						</Level3>                                                                                                                       \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151B_151BE</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151B</ParentID>                                                                                                   \n");
		buffer.append("						<Name>����ƻ�����</Name>                                                                                                       \n");
		buffer.append("						<Page_link>retain/retainchiefplanmgr.do</Page_link>                                                                             \n");
		buffer.append("						<IfSun>false</IfSun>                                                                                                            \n");
		buffer.append("						<Number>28</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>window</Type>                                                                                                             \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151BE</FunctionID>                                                                                                  \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151B_151BF</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151B</ParentID>                                                                                                   \n");
		buffer.append("						<Name>����ɱ�����</Name>                                                                                                       \n");
		buffer.append("						<Page_link>null</Page_link>                                                                                                     \n");
		buffer.append("						<IfSun>true</IfSun>                                                                                                             \n");
		buffer.append("						<Number>29</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>menu</Type>                                                                                                               \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151BF</FunctionID>                                                                                                  \n");
		buffer.append("						<Level3>                                                                                                                        \n");
		buffer.append("							<ParentID>Z15_151B_151BF</ParentID>                                                                                         \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151B_151BF_151BFA</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151B_151BF</ParentID>                                                                                     \n");
		buffer.append("								<Name>����ɱ�Ԥ��</Name>                                                                                               \n");
		buffer.append("								<Page_link>retain/retaincostbudgetmgr.do</Page_link>                                                                    \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>30</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151BFA</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151B_151BF_151BFB</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151B_151BF</ParentID>                                                                                     \n");
		buffer.append("								<Name>����ɱ��Ǽ�</Name>                                                                                               \n");
		buffer.append("								<Page_link>retain/retaincostregistermgr.do</Page_link>                                                                  \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>31</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151BFB</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("						</Level3>                                                                                                                       \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("					<Sub2>                                                                                                                              \n");
		buffer.append("						<ID>Z15_151B_151BG</ID>                                                                                                         \n");
		buffer.append("						<ParentID>Z15_151B</ParentID>                                                                                                   \n");
		buffer.append("						<Name>�ͻ��������</Name>                                                                                                       \n");
		buffer.append("						<Page_link>null</Page_link>                                                                                                     \n");
		buffer.append("						<IfSun>true</IfSun>                                                                                                             \n");
		buffer.append("						<Number>32</Number>                                                                                                             \n");
		buffer.append("						<SysNumber>0</SysNumber>                                                                                                        \n");
		buffer.append("						<Type>menu</Type>                                                                                                               \n");
		buffer.append("						<Open_method>0</Open_method>                                                                                                    \n");
		buffer.append("						<SelectedAdmin>true</SelectedAdmin>                                                                                             \n");
		buffer.append("						<SelectedExec>true</SelectedExec>                                                                                               \n");
		buffer.append("						<FunctionID>151BG</FunctionID>                                                                                                  \n");
		buffer.append("						<Level3>                                                                                                                        \n");
		buffer.append("							<ParentID>Z15_151B_151BG</ParentID>                                                                                         \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151B_151BG_151BGA</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151B_151BG</ParentID>                                                                                     \n");
		buffer.append("								<Name>�Զ�����</Name>                                                                                                   \n");
		buffer.append("								<Page_link>retain/custassignauto.do</Page_link>                                                                         \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>33</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151BGA</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151B_151BG_151BGB</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151B_151BG</ParentID>                                                                                     \n");
		buffer.append("								<Name>�˹�����</Name>                                                                                                   \n");
		buffer.append("								<Page_link>retain/custassignmgr.do?operType=init</Page_link>                                                            \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>34</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151BGB</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("							<Sub3>                                                                                                                      \n");
		buffer.append("								<ID>Z15_151B_151BG_151BGC</ID>                                                                                          \n");
		buffer.append("								<ParentID>Z15_151B_151BG</ParentID>                                                                                     \n");
		buffer.append("								<Name>�˹�������ͳ��</Name>                                                                                           \n");
		buffer.append("								<Page_link>retain/custassignstat.do?operType=init</Page_link>                                                           \n");
		buffer.append("								<IfSun>false</IfSun>                                                                                                    \n");
		buffer.append("								<Number>35</Number>                                                                                                     \n");
		buffer.append("								<SysNumber>0</SysNumber>                                                                                                \n");
		buffer.append("								<Type>window</Type>                                                                                                     \n");
		buffer.append("								<Open_method>0</Open_method>                                                                                            \n");
		buffer.append("								<SelectedAdmin>true</SelectedAdmin>                                                                                     \n");
		buffer.append("								<SelectedExec>true</SelectedExec>                                                                                       \n");
		buffer.append("								<FunctionID>151BGC</FunctionID>                                                                                         \n");
		buffer.append("							</Sub3>                                                                                                                     \n");
		buffer.append("						</Level3>                                                                                                                       \n");
		buffer.append("					</Sub2>                                                                                                                             \n");
		buffer.append("				</Level2>                                                                                                                               \n");
		buffer.append("			</Sub1>                                                                                                                                     \n");
		buffer.append("		</Level1>                                                                                                                                       \n");
		buffer.append("    <SelectedAdmin>true</SelectedAdmin>                                                                                                              \n");
		buffer.append("    <SelectedExec>true</SelectedExec>                                                                                                                \n");
		buffer.append("	</MainMenu>                                                                                                                                         \n");
		buffer.append("<AllFunction>151A-151A1-151A2-151AA-151AB-151AC-151AD-151AE-151AF-151AFA-151AFB-151AFC-151AFD-151AG-151AGA-151AGB-151AH-151AHA-151AHB-151AI-151B-151BA-151BB-151BC-151BD-151BDA-151BDB-151BE-151BF-151BFA-151BFB-151BG-151BGA-151BGB-151BGC-</AllFunction>\n");
		buffer.append("<AllSelect>15;151A;151A1;151A2;151AA;151AB;151AC;151AD;151AE;151AF;151AFA;151AFB;</AllSelect>\n");
		write(buffer.toString());
	}

	/** @param menu_type */
	private String getMenuType(int menuType)
	{
		if(menuType==0){
			return "button";
		}else if(menuType==1)
			return "window";
		else return "menu";
		
	}
	
	public static void main(String args[]) {
		printTagConfig("menuTree",MenuTree.class);
	}
}
