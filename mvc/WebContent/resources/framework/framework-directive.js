/**
 * Created by pqmagic on 2015/12/9.
 */
var appDirect = angular.module('framework.directive', []);
function createDirective(name){
    return function(){
        return {
            restrict: 'E',
            compile: function(tElem, tAttrs){
                //console.log(name + ': compile => ' + tElem.html());
                return {
                    pre: function(scope, iElem, iAttrs){
                        //console.log(name + ': pre link => ' + iElem.html());
                    },
                    post: function(scope, iElem, iAttrs){
                        //console.log("###### directive :" + scope.$id);
                        //for (var a in scope) {
                        //console.log("###### directive :" + a);
                        //}
                        //console.log(name + ': post link => ' + iElem.html());
                        scope.name="aliBABABABABAB";
                    }
                }
            }
        }
    }
}
//appDirect.directive('levelOne', createDirective('levelOne'));
//appDirect.directive('levelTwo', createDirective('levelTwo'));
appDirect.directive('levelThree', createDirective('levelThree'));


appDirect.factory('RecursionHelper', ['$compile', function($compile){
    return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: function(element, link){
            console.log("############  RecursionHelper compile : " + element);
            // Normalize the link parameter
            if(angular.isFunction(link)){
                link = { post: link };
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            console.log("############  RecursionHelper compile : " + contents);
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function(scope, element){
                    // Compile the contents
                    if(!compiledContents){
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function(clone){
                        element.append(clone);
                    });

                    // Call the post-linking function, if any
                    if(link && link.post){
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}]);


appDirect.directive("myTree", function(RecursionHelper) {
    return {
        restrict: "E",
        scope: {family: '='},
        template:
        '<p>{{ family.name }}</p>'+
        '<ul>' +
        '<li ng-repeat="child in family.children">' +
        '<my-tree family="child"></my-tree>' +
        '</li>' +
        '</ul>',
        compile: function(element) {
            return RecursionHelper.compile(element);
        }
    };
});


//appDirect.directive("myMenu", function($compile, $http) {
//    var strHtml = [];
//    strHtml.push("<li ng-repeat='rootm in rootMenu'>{{rootm.fMenuName}}</li>");
//    strHtml.push("<li ng-repeat='subm in submenu|subMenuFilter:rootm'><a href='#'>{{subm.fMenuName}}</a></li>");
//    var strH = strHtml.join("");
//    //console.log(":::::  directive $scope" + scope.rootMenu);
//    return {
//        restrict: "E",
//        scope: true,
//        template: strH,
//        compile: function(tElement, tAttr) {
//
//            var contents = tElement.contents().remove();
//            var compiledContents;
//            return function(scope, iElement, iAttr) {
//                //console.log(">>>>>>>>>>>>>>>>>>> compile myMenu scope rootMenu : " +  angular.toJson(scope.rootMenu));
//                //console.log(">>>>>>>>>>>>>>>>>>> compile myMenu iAttr : " +  angular.toJson(iAttr));
//                //if(!compiledContents) {
//                //    compiledContents = $compile(contents);
//                //}
//                //compiledContents(scope, function(clone, scope) {
//                //    iElement.append(clone);
//                //});
//                //post: function(scope, element){
//                //    console.log(">>>>>>>>>>>>>>>>>>> compile post scope rootMenu : " +  angular.toJson(scope.rootMenu));
//                //}
//            };
//        }
//    };
//});