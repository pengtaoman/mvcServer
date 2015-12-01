package com.neusoft.om.omutil;
import java.util.StringTokenizer;
import java.util.Vector;

import com.neusoft.unieap.comp.menu.MenuComponent;
import com.neusoft.unieap.comp.menu.MenuRepository;
//import com.neusoft.unieap.example.permissionconf.pagepermission.MenuToJsp;
public class OMMenuTreeHelper {
    //private MenuRepository repository = null;
	public MenuRepository repository = null;	
    private String appImage = "menu.gif";
    private int[] m_aryLineType = new int[100];
    public String role = null;
	public String roleName=null;
	private String appname=null;
	private boolean isPagePurviewSet=false;
	public void setRoleName(String str){
			this.roleName=str;
	}
	public String getRoleName(){
			   return roleName;
	  }
    public void setRole(String str){
        this.role = str;
    }

    public String getRole(){
        return role;
    }
    /**
     * @return Returns the appname.
     */
    public String getAppname() {
        return appname;
    }
    /**
     * @param appname The appname to set.
     */
    public void setAppname(String appname) {
        this.appname = appname;
    }
	public OMMenuTreeHelper(MenuRepository repository){
    	this.repository = repository;
    }
	public OMMenuTreeHelper(MenuRepository repository ,boolean isPagePurviewSet){
    	this.repository = repository;
    	this.isPagePurviewSet=isPagePurviewSet;
    }
	
	

    public MenuRepository getMenuRepository(){
      return repository;
    }


    public String renderHTML(){

       StringBuffer m_strContent = new StringBuffer();

       m_strContent.append("\n<script language=\"JavaScript\">\n<!--\n");
       m_strContent.append("function loadData()\n{\n\t");
       m_strContent.append("treeData = new Collection();\n\t");
       m_strContent.append("var node;");
       m_strContent.append("\n\ttreeData.add(new RootNode(0, \"菜单 ");
       m_strContent.append("\", \"").append(appImage).append("\"));");

       MenuComponent[] menus = getMenuRepository().getMenus();
       int n = menus.length;
              
       for(int i = 0; i < menus.length; i++){
           m_aryLineType[0] = (i == (n - 1) ? 0 : 1);
		   rendNode(m_strContent, menus[i]);
		  
           MenuComponent[] ms = menus[i].getMenuComponents();
//           System.out.println(menus[i].getName()+" "+ms.length);
          if(ms != null || ms.length > 0)

              rendNode(m_strContent, ms);
		  
       }
       m_strContent.append("\n}\n"); 
       m_strContent.append("defaultImageURL=\"").append("../views/common/images/menutree/\";\n");
       m_strContent.append("img01.src = defaultImageURL + \"purview.gif\";\n");
       m_strContent.append("img02.src = defaultImageURL + \"nonpurview.gif\";\n");
       m_strContent.append("start();");
       m_strContent.append("\n//-->\n</script>");

       return m_strContent.toString();

   }

   protected void rendNode(StringBuffer strBuf, MenuComponent menu){
       strBuf.append("\n\tnode=new TreeNode(");
       strBuf.append("\"");
       strBuf.append(menu.getName());
       strBuf.append("\"");
       strBuf.append(",");
       if(menu.getParent() == null){
           strBuf.append("0");
       } else{
           strBuf.append("\"");
           strBuf.append(menu.getParent().getName());
           strBuf.append("\"");
       }
       strBuf.append(",");
       strBuf.append("\"");
       strBuf.append(menu.getTitle());
       strBuf.append("\", \"");
       //if(repository.getPermission(null).isAllowedByRole(getRole(),menu)){
       if(menu.getRoles().intern()=="1".intern()){
           strBuf.append("purview.gif");
           strBuf.append("\"");
           strBuf.append(",");
           strBuf.append("1");
       }
       else{
           strBuf.append("nonpurview.gif");
           strBuf.append("\"");
           strBuf.append(",");
           strBuf.append("0");
       }
       strBuf.append(",");
       strBuf.append("\"");
       strBuf.append("\"");
       strBuf.append(",");
       strBuf.append("\"");
       strBuf.append("\"");
       strBuf.append(",");
       strBuf.append("\"");
       if(menu.isLeaf()){
           strBuf.append("leaf");
       } else{
           strBuf.append("folder");
       }
       strBuf.append("\", ");
       strBuf.append(menu.getMenuComponents().length);
       strBuf.append(",");
       if(isPagePurviewSet==true){
       //if(false){
    	   strBuf.append("true");
//    	   strBuf.append(",\"");
//    	   strBuf.append(menu.getLocation());
//    	   strBuf.append("\"");
       }else strBuf.append("false");
       strBuf.append(");\n");
       int i;
       
	   for(i = 0; i < menu.getLayer()-1; i++){
		   strBuf.append("\n\tnode.addline(\"");
           strBuf.append(m_aryLineType[i] == 1 ? "tree_line.gif" : "tree_transp.gif");
           strBuf.append("\");");
       }
	   
       int n = menu.getMenuComponents().length;
       if(n > 0){
       	   strBuf.append("\n\tnode.addnodeline(\"");
           strBuf.append(m_aryLineType[i] == 1 ? "tree_plus.gif" : "tree_plusl.gif");
           strBuf.append("\");");
           strBuf.append("\n\tnode.addnodeline(\"");
           strBuf.append(m_aryLineType[i] == 1 ? "tree_minus.gif" : "tree_minusl.gif");
           strBuf.append("\");");
       } else{
		   strBuf.append("\n\tnode.addnodeline(\"");
           strBuf.append(m_aryLineType[i] == 1 ? "tree_blank.gif" : "tree_blankl.gif");
           strBuf.append("\");");
       }

       strBuf.append("\n\ttreeData.add(node);");
//        for (i = 0; i < n; i ++)
//        {
//            m_aryLineType[menu.getLayer()] = (i == (n - 1) ? 0 : 1);
//
//        }

   }

   protected void rendNode(StringBuffer temp, MenuComponent[] menus){

       for(int i = 0; i < menus.length; i++){
//    	   int length = menus[i].getMenuComponents().length;
//    	   System.out.println(menus[i].getName()+ " "+ menus[i].getLayer());
       	  m_aryLineType[menus[i].getLayer()-1] = (i == (menus.length - 1) ? 0 : 1);
		  if(menus[i].isLeaf())
               rendNode(temp, menus[i]);
           else{
               rendNode(temp, menus[i]);
               rendNode(temp, menus[i].getMenuComponents());
           }
       }
   }

   /*
   * 将字符串转换为Vector
   */
   public static Vector strToVector(String str, String delim) {
       Vector vec = new Vector();
       StringTokenizer strToken = new StringTokenizer(str,delim);
       if (strToken != null) {
           while (strToken.hasMoreElements()) {
               vec.add(strToken.nextElement().toString());
         }
       }
       return vec;
     }

   public void setRight(String menuname,String flag){
       Vector vecmenu = null;
       Vector vecflag = null;

       vecmenu=strToVector(menuname, "\b");
       vecflag=strToVector(flag, "\b");
       if (vecmenu != null || vecmenu.size() != 0) {
            for (int i = 0; i < vecmenu.size(); i++) {
                MenuComponent menu;
                menu=(MenuComponent)getMenuRepository().getMenuFromAll((String)vecmenu.elementAt(i));
                if(vecflag.elementAt(i).equals("1")){
                    menu.setRoles(isSubString(menu));
//                    PlatStore.jspRoleMap.put(menu.getLocation(),menu.getRoles());
                }
                else{
                    menu.setRoles(delSubString(menu));
//                    PlatStore.jspRoleMap.put(menu.getLocation(),menu.getRoles());

                }
            }
       }
   }


//del role
   private String delSubString(MenuComponent menu){
      Vector vecRole = null;
      String temp=null;
      int j=0;
      if(menu.getRoles() != null && !menu.getRoles().equals("")){
          vecRole = strToVector(menu.getRoles(), " ");
          for(int i = 0; i < vecRole.size(); i++){
              if(vecRole.elementAt(i).equals(getRole())){
                  vecRole.removeElementAt(i);
              }
          }
          for(int k = 0; k < vecRole.size(); k++){
                  if(j == 0){
                      temp = (String)vecRole.elementAt(k);
                  } else{
                      temp += " " + (String)vecRole.elementAt(k);
                  }
                  j++;
              }
              return temp;
      }
      else{
          return null;
      }

  }


//add role
   private String isSubString(MenuComponent menu){
       Vector vecRole = null;
      
       if(menu.getRoles() != null && !menu.getRoles().equals("")){
           vecRole = strToVector(menu.getRoles(), " ");

               for(int i = 0; i < vecRole.size(); i++){
                   if(vecRole.elementAt(i).equals(getRole())){
                       return menu.getRoles();
                   }
               }
               return menu.getRoles() + " " + getRole();
       }
       else{
           return getRole();
       }
   }
}

