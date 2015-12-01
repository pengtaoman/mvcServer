/*
 * Created on 2004-12-14
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.tdframework.authorization;

import com.neusoft.tdframework.support.favorite.dao.FavoriteColl;
import com.neusoft.tdframework.support.favorite.dao.FavoriteVO;


/**
 * @author chenzt
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class AuthXMLUtil {
	
	/**
	 * ����SystemVO��XML����
	 * @param vo
	 * @return
	 */
	public static String getSystemXML(SystemVO vo) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<sysInfo>\n");
		buffer.append("<SystemId>").append(vo.getSystemId()).append("</SystemId>\n");
		buffer.append("<SystemName>").append(vo.getSystemName()).append("</SystemName>\n");
		buffer.append("</sysInfo>\n");
		return buffer.toString();
	}
	
	/**
	 * ����ϵͳ�������XML����
	 * @param coll
	 * @return
	 */
	public static String getSystemCollXML(SystemColl coll) {
		if(coll==null || coll.getRowCount()==0) return "<system/>";
		
		StringBuffer buffer = new StringBuffer();
		buffer.append("<system>\n");
		for(int i=0;i<coll.getRowCount();i++) {
			if(i==0) 
				buffer.append("<initId>").append(coll.getSystem(i).getSystemId()).append("</initId>\n");
			buffer.append(getSystemXML(coll.getSystem(i)));
		}
		buffer.append("</system>\n");
		
		return buffer.toString();
	}
	
	/**
	 * ��ȡ�˵���XML������Ϣ����������״�������¼���ϵ�˵���Ϣ
	 * @param menuColl
	 * @return
	 */
	public static String getMenuCollXML(FrameMenuColl menuColl) {
		
		//������Ϣ
		StringBuffer stb = new StringBuffer();
		
		//��ǰѭ������������: 
		int loopPoint=0;
	
		FrameMenuVO function = null;
		
		int systemNumber = 0;
		
		String parent_id=null;
		
		//ѭ��ȡ. ���loopPoint > �����ж��˳�
		while(true){
		
		if(loopPoint>=menuColl.getRowCount()){
		break;
		}
		
		systemNumber = loopPoint;
		
		function = menuColl.getMenu(loopPoint);
		
		stb.append("	<MainMenu>\n");
			
		stb.append("		<ID>Z").append(function.getSystemId()).append(function.getMenuId()).append("</ID>\n");
		stb.append("		<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("		<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("		<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("		<Number>").append(loopPoint).append("</Number>\n");
		stb.append("		<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		//stb.append("		<Selected>").append(function.getIfSelect()).append("</Selected>\n");
		stb.append("		<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");		
			//������ӽڵ㹹����������
			
		stb.append("		<Level1>\n");
		
		parent_id = "Z" + function.getMenuId();
		
		stb.append("			<ParentID>").append(parent_id).append("</ParentID>\n");
	
			//�ڵ�����
			loopPoint++;
				
				//��Ƕ��ѭ��дsub1
				//ȡloopPoint��ֵ. ���layer=1��������
				//���layer<1, ��д</Leve1></MainMenu>�ж�ѭ��
				while(true){
				
				if(loopPoint>=menuColl.getRowCount()){
		stb.append("		</Level1>\n");
		stb.append("	</MainMenu>\n");
				break;
				}			
				
				function = menuColl.getMenu(loopPoint);
				
				//�������<1, �ж�ѭ��
				if(function.getLayer()<1){
		stb.append("		</Level1>\n");
		stb.append("	</MainMenu>\n");
					break;
				}
				
				
		stb.append("			<Sub1>\n");
		stb.append("				<ID>Z").append(function.getSystemId()).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("				<ParentID>").append(parent_id).append("</ParentID>\n");
		stb.append("				<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("				<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("				<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("				<Number>").append(loopPoint).append("</Number>\n");
		stb.append("				<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("				<Type>").append(function.getMenuType()).append("</Type>\n");
		stb.append("				<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("				<Selected>").append(function.getIfSelect()).append("</Selected>\n");
		stb.append("				<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");

					loopPoint++;
					//������ӽڵ㹹��ڶ���
					if(function.getIfChild()){
						parent_id = "Z" + function.getSystemId() + "_" + function.getMenuId();
		stb.append("				<Level2>\n");
		stb.append("					<ParentID>").append(parent_id).append("</ParentID>\n");
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
		stb.append("						<ID>Z").append(function.getSystemId()).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("						<ParentID>").append(parent_id).append("</ParentID>\n");
		stb.append("						<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("						<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("						<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("						<Number>").append(loopPoint).append("</Number>\n");
		stb.append("						<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("						<Type>").append(function.getMenuType()).append("</Type>\n");
		stb.append("						<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("						<Selected>").append(function.getIfSelect()).append("</Selected>\n");
		stb.append("						<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");

							loopPoint++;
							
							//������ӽڵ㹹�������
							if(function.getIfChild()){
								parent_id = "Z" + function.getSystemId() + "_" + function.getMenuId();
		stb.append("						<Level3>\n");
		stb.append("							<ParentID>").append(parent_id).append("</ParentID>\n");
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
		stb.append("								<ID>Z").append(function.getSystemId()).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("								<ParentID>").append(parent_id).append("</ParentID>\n");
		stb.append("								<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("								<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("								<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("								<Number>").append(loopPoint).append("</Number>\n");
		stb.append("								<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("								<Type>").append(function.getMenuType()).append("</Type>\n");
		stb.append("								<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("								<Selected>").append(function.getIfSelect()).append("</Selected>\n");
		stb.append("								<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");							

									loopPoint++;
									
									//������ӽڵ㹹����Ĳ�
									if(function.getIfChild()){
										parent_id = "Z" + function.getSystemId() + "_" + function.getMenuId();
		stb.append("								<Level4>\n");
		stb.append("									<ParentID>").append(parent_id).append("</ParentID>\n");
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
		stb.append("										<ID>Z").append(function.getSystemId()).append("_").append(function.getMenuId()).append("</ID>\n");
		stb.append("										<ParentID>").append(parent_id).append("</ParentID>\n");
		stb.append("										<Name>").append(function.getMenuName()).append("</Name>\n");
		stb.append("										<Page_link>").append(function.getPageLink()).append("</Page_link>\n");
		stb.append("										<IfSun>").append(function.getIfChild()).append("</IfSun>\n");
		stb.append("										<Number>").append(loopPoint).append("</Number>\n");
		stb.append("										<SysNumber>").append(systemNumber).append("</SysNumber>\n");
		stb.append("										<Type>").append(function.getMenuType()).append("</Type>\n");
		stb.append("										<Open_method>").append(function.getOpenMethod()).append("</Open_method>\n");
		stb.append("										<Selected>").append(function.getIfSelect()).append("</Selected>\n");
		stb.append("										<FunctionID>").append(function.getMenuId()).append("</FunctionID>\n");
		stb.append("									</Sub4>\n");	

											loopPoint++;	
										}									
								} //������ѭ������
						} //�ڶ���ѭ������
			}//��һ��ѭ������
		}//���ϲ�ѭ������		
	
		return stb.toString();
	}
	
	
	
	public String getFavoriteXML(FavoriteVO frameFavorite) {
		if(frameFavorite==null) return "";
		
		return null;
	}
	public String getFavoriteCollXML(FavoriteColl coll) {
		
		return null;
	}
}
