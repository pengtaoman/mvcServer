/**
 * Created by pqmagic on 2015/12/30.
 */
/**
 * Created by pqmagic on 2015/12/28.
 */
"use strict";
define(["application-configuration"]
    , function (app) {
        app.register.directive('ngThumb', ['$window', function($window) {
            var helper = {
                    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
                    isFile: function(item) {
                        return angular.isObject(item) && item instanceof $window.File;
                    },
                    isImage: function(file) {
                        var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                };

                return {
                    restrict: 'A',
                    template: '<canvas/>',
                    link: function(scope, element, attributes) {
                        if (!helper.support) return;

                        var params = scope.$eval(attributes.ngThumb);

                        if (!helper.isFile(params.file)) return;
                        if (!helper.isImage(params.file)) return;

                        var canvas = element.find('canvas');
                        var reader = new FileReader();

                        reader.onload = onLoadFile;
                        reader.readAsDataURL(params.file);

                        function onLoadFile(event) {
                            var img = new Image();
                            img.onload = onLoadImage;
                            img.src = event.target.result;
                        }

                        function onLoadImage() {
                            var width = params.width || this.width / this.height * params.height;
                            var height = params.height || this.height / this.width * params.width;
                            canvas.attr({ width: width, height: height });
                            canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                        }
                    }
                };
            }]);
        
        app.register.directive('crmFileUpload', ['FileUploader', function(FileUploader) {
        	console.log(">>>>>>>>>>>>>>>>>>>>app.register.directive crmFileUpload>>>>>>>>>>>>>> " + FileUploader);
            return {
                restrict: "E",
                // require: "ngModel",
                scope: {
                	customFilters:"@uploadFilters",
                	formData:"@formData",
                	uploader:"=uploader"
                },
                templateUrl: jsContextPath + "resources/framework/directives/templates/file-upload-template.html",

                compile: function ($scope, $element, $attr) {

                	return function($scope, $element, $attr){
                		
                		var uploader = $scope.uploader;
                		console.log("###### file upload $attr.isMultiple : " + $attr.isMultiple);
	                    console.log("###### file upload $attr.fileSizeLimit : " + $attr.fileSizeLimit);
	                    console.log("###### file upload $attr.fileNumberLimit : " +$attr.fileNumberLimit);
	                    console.log("###### file upload $attr.showImagePreview : " +$attr.showImagePreview);
	                    console.log("###### file upload $attr.fileTypeLimit : " +$attr.fileTypeLimit);
	                    console.log("###### file upload $attr.showBottomButtons : " +$attr.showBottomButtons);
	                    console.log("###### file upload $attr.removeAfterUpload : " +$attr.removeAfterUpload);
	                    console.log("###### file upload $attr.autoUploadAfterSelect : " +$attr.autoUploadAfterSelect);
	                    
	                    console.log("###### file upload form data : " +angular.toJson($scope.formData));
	                    console.log("###### file upload form data : " +$scope.formData);
	                    console.log("###### file upload form data : " +angular.fromJson($scope.formData));
	                    
	                    $scope.reqFormdata = angular.fromJson($scope.formData);
	                    console.log("###### file upload form data : " +$scope.reqFormdata.all);
	                    
	                    if($attr.removeAfterUpload == 'true'){
	                    	uploader.removeAfterUpload = true;
	                    } else {
	                    	uploader.removeAfterUpload = false;
	                    }
	                    
	                    if($attr.autoUploadAfterSelect == 'true'){
	                    	uploader.autoUpload = true;
	                    } else {
	                    	uploader.autoUpload = false;
	                    }
	                    
	                    
	                    if($attr.showImagePreview == 'true'){
	                    	$scope.showImagePreview = true;
	                    	$scope.isMultiple = false;
	                    	uploader.filters.push({
		                        name: 'directiveCountFilterForImage',
		                        errorMsg:'',
		                        fn: function(item /* {File|FileLikeObject} */, options) {
		                        	uploader.clearQueue(); 
		                            return true;
		                        }
		                    });
	                    } else {
	                    	$scope.showImagePreview = false;
	                    	if ($attr.isMultiple == 'true') {
	                    		$scope.isMultiple=true;
	                    	} else {
	                    		$scope.isMultiple=false;
	                    	}
	                    	
	                    }
	                    if ($attr.showBottomButtons == 'true') {
	                    	$scope.showBottomButtons=true;
                    	} else {
                    		$scope.showBottomButtons=false;
                    	}
	                    
	                    if ($attr.fileSizeLimit) {
		                    uploader.filters.push({
		                        name: 'directiveSizeFilter',
		                        errorMsg:'文件大小超过指定范围.',
		                        fn: function(item /* {File|FileLikeObject} */, options) {
		                        	console.log("########### upload file size : " + item.size);
		                        	return item.size < $attr.fileSizeLimit*1024*1024;
		                        }
		                    });
	                    }
	                    
	                    if ($attr.fileNumberLimit) {
		                    uploader.filters.push({
		                        name: 'directiveCountFilter',
		                        errorMsg:'文件数量超过指定范围.',
		                        fn: function(item /* {File|FileLikeObject} */, options) {
		                            return uploader.queue.length < $attr.fileNumberLimit;
		                        }
		                    });
	                    }
	                    if ($attr.fileTypeLimit) {
		                    uploader.filters.push({
		                        name: 'directiveTypeFilter',
		                        errorMsg:'文件类型不是指定的文件类型.',
		                        fn: function(item /* {File|FileLikeObject} */, options) {
		                        	if (item.name.split('.')[1]){
		                        		var type = item.name.split('.')[1];
		                        		return $attr.fileTypeLimit.indexOf(type) != -1
		                        	} else {
		                        		return false;
		                        	}
		                        }
		                    });
	                    }
	                    
	                    if ($scope.customFilters) {
	                    	for (var filter in $scope.customFilters) {
	                    		uploader.filters.push(filter);
	                    	}
	                    }
	
	
	                  uploader.onWhenAddingFileFailed = function(item /* {File|FileLikeObject} */, filter, options) {
	
	                  	$scope.fileUploadMessage=item.name + ":" + filter.errorMsg;
	                  };
	                  uploader.onAfterAddingFile = function(fileItem) {
	                      $scope.fileUploadMessage="";
	                  };
	                  uploader.onAfterAddingAll = function(addedFileItems) {
	                       
	                  };
	                  uploader.onBeforeUploadItem = function(item) {
	                  	item.formData.push($scope.reqFormdata);
	
	                  };
	                  uploader.onProgressItem = function(fileItem, progress) {
	                      
	                  };
	                  uploader.onProgressAll = function(progress) {
	                      
	                  };
	                  uploader.onSuccessItem = function(fileItem, response, status, headers) {
	                    console.log("######## file upload server response : " + response);
	                  	if (response != "OK") {
	                  		fileItem.isSuccess = false;
	                  		fileItem.isError = true;
	                  		fileItem.progress = 0;
	                  		uploader.progress = 0;
	                  		uploader.onProgressAll(0);
	                  	}
	                  };
	                  uploader.onErrorItem = function(fileItem, response, status, headers) {
	                	  console.log("######## file upload server onErrorItem : " + response);
	                  };
	                  uploader.onCancelItem = function(fileItem, response, status, headers) {
	
	                  };
	                  uploader.onCompleteItem = function(fileItem, response, status, headers) {
	
	                  };
	                  uploader.onCompleteAll = function() {
	
	                  };
                	}
                }
            }
        }]);
}
);
