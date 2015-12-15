/**
 * Created by pqmagic on 2015/12/7.
 */
var fraService = angular.module("framework.service",[]);
fraService.factory("showMenuService",["$compile",function($compile){
    var strHtml = [];
   var recurs = function(rid, subM) {
       strHtml.push('<ul class="treeview-menu">');
       angular.forEach(subM, function(subMe) {
           if (angular.equals(subMe["fParentMenuId"],rid)) {

               var hasChild = false;
               angular.forEach(subM, function(subMex) {
                   if (angular.equals(subMex["fParentMenuId"],subMe['fMenuId']) && !hasChild) {
                       hasChild = true;
                   }
               });
               if (hasChild) {
            	   strHtml.push('<li><a href="javascript:void(0);"><i class="fa fa-circle-o"></i>'+subMe['fMenuName']+'<i class="fa fa-angle-left pull-right"></i></a>');
               } else {
            	   if (subMe['fPageLink']) {
                       strHtml.push('<li><a href="#'+subMe['fPageLink']+'"><i class="fa fa-circle-o"></i>'+subMe['fMenuName']+'</a>');
            	   } else {
            		   strHtml.push('<li><a href="javascript:void(0);"><i class="fa fa-circle-o"></i>'+subMe['fMenuName']+'</a>');
            	   }
                   
               }

               recurs(subMe['fMenuId'], subM);
               strHtml.push('</li>');

           }

       });
       strHtml.push('</ul>');
   };

   return{
        getMenuHtml : function(rootMenu, subMenu) {

            strHtml.push('    <ul class="sidebar-menu">');

            angular.forEach(rootMenu, function(rmu) {
                //console.log("################### showMenuService !!!!" + rmu['fMenuName']);
                strHtml.push('       <li class="treeview">');
                
                var hasChild = false;
                angular.forEach(subMenu, function(subMex) {
                    if (angular.equals(subMex["fParentMenuId"],rmu['fMenuId']) && !hasChild) {
                        hasChild = true;
                    }
                });
                if (hasChild) {
                	strHtml.push('         <a href="javascript:void(0);">');
                    strHtml.push('             <i class="fa fa-folder"></i> <span>'+rmu['fMenuName']+'</span>');
                    strHtml.push('           <i class="fa fa-angle-left pull-right"></i></a>');
                } else {
                	if(rmu["fPageLink"]) {
                		strHtml.push('         <a href="#'+rmu["fPageLink"]+'">');
                	} else {
                		strHtml.push('         <a href="javascript:void(0);">');
                	}
                	
                    strHtml.push('             <i class="fa fa-folder"></i> <span>'+rmu['fMenuName']+'</span>');
                    strHtml.push('           </a>');
                }

                recurs(rmu['fMenuId'], subMenu);
                strHtml.push('</li>');
            });
            strHtml.push('     </ul>');

            return strHtml.join("");
        }
    }
}]);
