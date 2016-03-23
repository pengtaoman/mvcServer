/**
 * Created by pqmagic on 2015/12/7.
 */
"use strict";
define(["application-configuration"
   ], function (app) {
    app.register.controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {
    	
    	console.log(">>>>>>>>>>>>>>>>>>>>>>>>AAAAAAAAAAAAAAA FileUploader" + FileUploader);
        var uploader = $scope.uploader = new FileUploader({
            url: '/mvc/main/filesUpload'
            //,removeAfterUpload:true
            //,autoUpload:true
        });
        uploader.filters.push({
            name: 'directiveSizeFilter',
            errorMsg:'文件大小超过指定范围.',
            fn: function(item /*{File|FileLikeObject}*/, options) {
            	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> uploader.queueLimit options " + item.size);
            	if (item.size > 2*1024*1024){
            		return false;
            	}
                return this.queue.length < 10;
            }
        });
        
        uploader.filters.push({
            name: 'directiveCountFilter',
            errorMsg:'文件数量超过指定范围.',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });
        
        uploader.filters.push({
            name: 'directiveTypeFilter',
            errorMsg:'文件类型不是指定的文件类型.',
            fn: function(item /*{File|FileLikeObject}*/, options) {
            	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>CCCCCCCCCCCCCC" + item.type);
            	console.log(">>>>>>>>>>>>>>>>>>>>>>>>AAAAAAAAAAAAAAA" + "pnp img gif rar iso".indexOf("xls"));
            	if (item.name.split('.')[1]){
            		var type = item.name.split('.')[1];
            		console.log(">>>>>>>>>>type  >" + type);
            	} else {
            		return false;
            	}
            }
        });


        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
//            console.info('onWhenAddingFileFailed', item, filter, options);
//        	console.log("onWhenAddingFileFailed>>>>>>>>>>>>>>>>>>>>>>item.name : " + item.name);
//        	console.log("onWhenAddingFileFailed>>>>>>>>>>>>>>>>>>>>>>filter : " + filter.errorMsg);
//        	console.log("onWhenAddingFileFailed>>>>>>>>>>>>>>>>>>>>>>options : " + options);
        	console.log("onWhenAddingFileFailed>>>>>>>>>>>>>>>>>>>>>>fn : " + filter.fn);
        	console.log("onWhenAddingFileFailed>>>>>>>>>>>>>>>>>>>>>>errorMsg : " + filter.errorMsg);
        	$scope.fileUploadMessage=item.name + ":" + filter.fn.errorMsg;
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            $scope.fileUploadMessage="";
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
        	item.formData.push({all: '23232323'});
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            //console.info('onSuccessItem', fileItem, response, status, headers);
//        	console.log("onSuccessItem>>>>>>>>>>>>>>>>>>>>>>response : " + response);
//        	for (var a in fileItem) {
//        		console.log("onSuccessItem>>>>>>>>>>>>>>>>>>>>>>fileItem.name : " + a);
//        	}
        	if (response != "OK") {
        		fileItem.isSuccess = false;
        		fileItem.isError = true;
        		fileItem.progress = 0;
        		uploader.progress = 0;
        		uploader.onProgressAll(0);
        	}
//        	console.log("onSuccessItem>>>>>>>>>>>>>>>>>>>>>>status : " + status);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
//            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
//            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
//            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
//            console.info('onCompleteAll');
//            $scope.fileUploadMessage="文件全部上传完毕.";
        };

        console.info('uploader', uploader);
    }]);
    
    
//    app.register.directive('ngThumb', ['$window', function($window) {
//        var helper = {
//            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
//            isFile: function(item) {
//                return angular.isObject(item) && item instanceof $window.File;
//            },
//            isImage: function(file) {
//                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
//                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
//            }
//        };
//
//        return {
//            restrict: 'A',
//            template: '<canvas/>',
//            link: function(scope, element, attributes) {
//                if (!helper.support) return;
//
//                var params = scope.$eval(attributes.ngThumb);
//
//                if (!helper.isFile(params.file)) return;
//                if (!helper.isImage(params.file)) return;
//
//                var canvas = element.find('canvas');
//                var reader = new FileReader();
//
//                reader.onload = onLoadFile;
//                reader.readAsDataURL(params.file);
//
//                function onLoadFile(event) {
//                    var img = new Image();
//                    img.onload = onLoadImage;
//                    img.src = event.target.result;
//                }
//
//                function onLoadImage() {
//                    var width = params.width || this.width / this.height * params.height;
//                    var height = params.height || this.height / this.width * params.width;
//                    canvas.attr({ width: width, height: height });
//                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
//                }
//            }
//        };
//    }]);
});