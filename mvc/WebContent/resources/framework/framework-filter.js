/**
 * Created by pqmagic on 2015/12/9.
 */
var appFilter = angular.module('framework.filter', []);

appFilter.filter("subMenuFilter",function(){
    var func = function(data, pro) {
        if (angular.isArray(data)) {
            var rtn = [];
            for (var i =0; i < data.length; i++)  {
//					console.log("############  " + data[i].parentSystem);
//								for (var a in  data[i]) {
//									console.log(">>>>  " + a);
//								}
                if (angular.equals(data[i].fParentMenuId, pro.fMenuId)) {
                    rtn.push(data[i]);
                }
            }
            return rtn;
        }
        return null;
    };
    return func;
});