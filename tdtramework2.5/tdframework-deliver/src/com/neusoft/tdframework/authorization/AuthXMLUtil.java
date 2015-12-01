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
	 * 生成SystemVO的XML数据
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
	 * 生成系统结果集的XML数据
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
	 * 获取菜单的XML数据信息，以生成树状的有上下级关系菜单信息
	 * @param menuColl
	 * @return
	 */
	public static String getMenuCollXML(FrameMenuColl menuColl) {
		
		//数据信息
		StringBuffer stb = new StringBuffer();
		
		//当前循环的行数变量: 
		int loopPoint=0;
	
		FrameMenuVO function = null;
		
		int systemNumber = 0;
		
		String parent_id=null;
		
		//循环取. 如果loopPoint > 行数中断退出
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
			//如果有子节点构造如下内容
			
		stb.append("		<Level1>\n");
		
		parent_id = "Z" + function.getMenuId();
		
		stb.append("			<ParentID>").append(parent_id).append("</ParentID>\n");
	
			//节点下移
			loopPoint++;
				
				//内嵌套循环写sub1
				//取loopPoint的值. 如果layer=1构造则构造
				//如果layer<1, 则写</Leve1></MainMenu>中断循环
				while(true){
				
				if(loopPoint>=menuColl.getRowCount()){
		stb.append("		</Level1>\n");
		stb.append("	</MainMenu>\n");
				break;
				}			
				
				function = menuColl.getMenu(loopPoint);
				
				//如果层数<1, 中断循环
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
					//如果有子节点构造第二层
					if(function.getIfChild()){
						parent_id = "Z" + function.getSystemId() + "_" + function.getMenuId();
		stb.append("				<Level2>\n");
		stb.append("					<ParentID>").append(parent_id).append("</ParentID>\n");
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
							
							//如果有子节点构造第三层
							if(function.getIfChild()){
								parent_id = "Z" + function.getSystemId() + "_" + function.getMenuId();
		stb.append("						<Level3>\n");
		stb.append("							<ParentID>").append(parent_id).append("</ParentID>\n");
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
									
									//如果有子节点构造第四层
									if(function.getIfChild()){
										parent_id = "Z" + function.getSystemId() + "_" + function.getMenuId();
		stb.append("								<Level4>\n");
		stb.append("									<ParentID>").append(parent_id).append("</ParentID>\n");
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
								} //第三级循环结束
						} //第二级循环结束
			}//第一级循环结束
		}//最上层循环结束		
	
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
