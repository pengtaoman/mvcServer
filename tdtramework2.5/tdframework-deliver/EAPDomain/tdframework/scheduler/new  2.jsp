




<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<title>Insert title here</title>
		


<style>
	@import "/framework/techcomp/ria/unieap/themes/base/css/unieap.css";
	@import "/framework/techcomp/ria/unieap/themes/blue/css/unieap.css";
	@import "/framework/techcomp/ria/base/themes/common.css";
	@import "/framework/techcomp/ria/unieapx/themes/css/query.css";
	@import "/framework/techcomp/ria/unieapx/themes/css/exception.css";
	@import "/framework/techcomp/ria/unieapx/themes/css/MessageCenter.css";
	@import "/framework/techcomp/ria/unieapx/themes/base/css/layout-navigatorcontainer.css";
	@import "/framework/techcomp/ria/unieapx/themes/blue/css/layout-navigatorcontainer.css";
	body{
		margin : 0px;
		visibility : hidden;
	}
</style>
	
<script type="text/javascript" src="/framework/techcomp/ria/dojo/dojo.js" djConfig=" parseOnLoad: true,locale:'zh'" ></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/patch/dojo-patch.js"  charset="utf-8"></script>
<script type="text/javascript" src="/framework/techcomp/ria/dijit/dijit.js"  charset="utf-8"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/patch/loader.js" ></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/patch/boosters.js" ></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/nls/application_zh_CN.js" ></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/nls/application_zh_CN.js" ></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/global.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/cache.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/rpc.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/Form.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/FieldSet.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/TextBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/InlineEditBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/Textarea.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/NumberTextBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/TextBoxWithIcon.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/ComboBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/DateTextBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/ComboBoxTree.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/Button.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/DropDownButton.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/CheckBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/RadioButton.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/CheckBoxGroup.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/RadioButtonGroup.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/FileInput.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/form/FormListBinding.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/form/FormList.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/tree/Tree.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/Container.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/TitlePane.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/TabContainer.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/AdaptiveContainer.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/BorderContainer.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/BorderPane.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/grid/Grid.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/xgrid/Grid.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/dialog/DialogUtil.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/xdialog/xDialogUtil.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/xdialog/xDialog.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/dialog/MessageBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/menu/Menu.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/Tooltip.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/progressbar/ProgressBar.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/base/rpc.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/base/view.js"></script>

<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/HBoxContainer.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/VBoxContainer.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/StackContainer.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/AccordionPane.js" charset="utf-8"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/layout/AccordionContainer.js" charset="utf-8"></script>

<script type="text/javascript" src="/framework/techcomp/ria/unieapx/trace/MessageCenter.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/trace/TraceMessageBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/query/Query.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/query/Binding.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/query/AdvancedQuery.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/form/FormList.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/form/FormListBinding.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/form/MultilineTextBox.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/exception/Handler.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/layout/NavigatorContainer.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/layout/NavigatorController.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieapx/layout/NavigatorPane.js"></script>

<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/NumberSpinner.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/Slider.js"></script>
<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/IpAddress.js"></script>

<!--<script type="text/javascript" src="/framework/techcomp/ria/unieap/form/RichTextEditor.js"></script>-->
<script type="text/javascript" src="/framework/techcomp/ria/base/common.js"></script> 

<script type="text/javascript">
	var dataCenter = new unieap.ds.DataCenter();/*用于单帧菜单，非单帧情况可以不定义*/
	unieap.WEB_APP_NAME = "/framework";
	unieap.locale = "zh_CN";
	unieap.userAccount = "admin";
	unieap.cmpPath = "/framework/bizcomp/bizdata/default.jsp";
	dojo.addOnLoad(function(){
		dojo.style(document.body,"visibility","visible");
	});
	
	if(typeof(RIA_UNIEAPX_I18N)=='undefined'){
		dojo.require("unieapx.nls.application_"+unieap.locale);
	}
	/*存储每个页面中view和viewc的名字，单帧下key为rootNodeId，非单帧下为viewContext*/
  	if(typeof(unieapViewContextHolder) == "undefined"){
		unieapViewContextHolder = {};
	}
</script>
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title></title>
		<script type="text/javascript">
		    if(!window.beginTime){
		        beginTime = new Date().getTime();
		    }
		</script>
		<script type="text/javascript"> /**   
 * @generated
 */
dojo.provide("aab.employee.pt008_0.Processor");
dojo.declare("aab.employee.pt008_0.Processor", unieap.view.Processor, {
    getParameterList: function (parametersInfo, _load, _error) {



        var time = new Date();
        var processor_begin = time.getTime();

        var pattern = this.pattern;

        var view = this.view;
        var dataCenter = view.dataCenter;
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore(dataCenter.getDataStore("_advancedQueryConditionStore"));
        dc.setParameter('dcID', 'aab');

        for (var _para in this.getParameterList) {
            var _paraValue = this.getParameterList[_para];
            if (_para == "_pattern") {
                pattern = _paraValue;
            }
            else {
                dc.setParameter(_para, _paraValue);
            }

            delete this.getParameterList[_para];
        }



        dc.addDataStore("parametersInfo", parametersInfo);

        dc.setParameter("_parameters", "parametersInfo");
        dc.setParameter("_parameterTypes", "pojo");

        dc.setParameter("_boId", "bizdata_bizdataCommonBO_bo");
        dc.setParameter("_methodName", "query");
        dc.setParameter("_methodParameterTypes", "java.util.Map");

        //记录分页
        var pageNumber = this.getParameterList.pageNumber;
        var pageSize = this.getParameterList.pageSize;
        if (!pageNumber && !pageSize) {
            pageNumber = 1;
            pageSize = 10;
        }
        dc.setParameter("_pageNumber", pageNumber);
        dc.setParameter("_pageSize", pageSize);
        dc.setParameter("_calcRecordCount", true);



        console.log("开始执行" + dc.getParameter("_boId") + "的" + dc.getParameter("_methodName") + "方法" + "[" + unieap.userAccount + " " + view.processor.checkTime(time.getHours()) + ":" + view.processor.checkTime(time.getMinutes()) + ":" + view.processor.checkTime(time.getSeconds()) + ":" + view.processor.checkTime(time.getMilliseconds(), 1) + "]" + "...");



        var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";

        // 增加请求之前的切入点
        if (doBeforeRequest(dc, view, "getParameterList")) {
            return unieap.Action.requestData({
                url: path,
                dc: dataCenter,
                sync: true,
                load: function (dc) {
                    // 增加请求成功回调之前的切入点
                    if (doBeforeSuccessResponse(dc, view, "getParameterList")) {
                        _load && _load(dc);

                        //记录分页信息				
                        var serverExport = dataCenter.getHeaderAttribute("getParameterList") == "serverExport" ? true : false;
                        var dataStores = dc.getDataStores();
                        var processorInfo = {};
                        processorInfo['view'] = 'pt008_0';
                        processorInfo['name'] = 'getParameterList';
                        processorInfo['parameters'] = [parametersInfo === '' ? "" : unieap.toJson(parametersInfo)];
                        for (var key in dataStores) {
                            var _ds = dataStores[key];
                            _ds.setParameter('processor', processorInfo);
                            if (serverExport) {

                                if (dataCenter.getDataStore("_advancedQueryConditionStore")) {
                                    _ds.setParameter("_advancedQueryConditionStore", dataCenter.getDataStore("_advancedQueryConditionStore").toJson());
                                }

                                _ds.setParameter("parametersInfo", parametersInfo.toJson());

                                _ds.setParameter("_parameters", "parametersInfo");
                                _ds.setParameter("_parameterTypes", "pojo");

                                _ds.setParameter("_boId", "bizdata_bizdataCommonBO_bo");
                                _ds.setParameter("_methodName", "query");
                                _ds.setParameter("_methodParameterTypes", "java.util.Map");

                            }
                        }
                        view.getParameterListSuccess(dc);
                        view.processor.logProcessorInterval("getParameterList", processor_begin, dataCenter);
                    }
                    // 增加请求成功回调之后的切入点
                    doAfterSuccessResponse(dc, view, "getParameterList");
                },
                error: function (xhr) {
                    // 增加请求失败回调之前的切入点
                    if (doBeforeFailedResponse(dc, view, "getParameterList")) {
                        _error && _error(xhr);

                        _exceptionProcess(xhr);

                    }
                    // 增加请求成功回调之后的切入点
                    doAfterFailedResponse(dc, view, "getParameterList");
                }
            }, this.collect(dc, pattern));
        }

    },
    deleteParameters: function (parameter, _load, _error) {



        var time = new Date();
        var processor_begin = time.getTime();

        var pattern = this.pattern;

        var view = this.view;
        var dataCenter = view.dataCenter;
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore(dataCenter.getDataStore("_advancedQueryConditionStore"));
        dc.setParameter('dcID', 'aab');

        for (var _para in this.deleteParameters) {
            var _paraValue = this.deleteParameters[_para];
            if (_para == "_pattern") {
                pattern = _paraValue;
            }
            else {
                dc.setParameter(_para, _paraValue);
            }

            delete this.deleteParameters[_para];
        }



        dc.addDataStore("parameter", parameter);

        dc.setParameter("_parameters", "parameter");
        dc.setParameter("_parameterTypes", "pojo");

        dc.setParameter("_boId", "bizdata_bizdataCommonBO_bo");
        dc.setParameter("_methodName", "delete");
        dc.setParameter("_methodParameterTypes", "java.util.Map");



        console.log("开始执行" + dc.getParameter("_boId") + "的" + dc.getParameter("_methodName") + "方法" + "[" + unieap.userAccount + " " + view.processor.checkTime(time.getHours()) + ":" + view.processor.checkTime(time.getMinutes()) + ":" + view.processor.checkTime(time.getSeconds()) + ":" + view.processor.checkTime(time.getMilliseconds(), 1) + "]" + "...");



        var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";

        // 增加请求之前的切入点
        if (doBeforeRequest(dc, view, "deleteParameters")) {
            return unieap.Action.requestData({
                url: path,
                dc: dataCenter,
                sync: true,
                load: function (dc) {
                    // 增加请求成功回调之前的切入点
                    if (doBeforeSuccessResponse(dc, view, "deleteParameters")) {
                        _load && _load(dc);
                        view.deleteParametersSuccess(dc);
                        view.processor.logProcessorInterval("deleteParameters", processor_begin, dataCenter);
                    }
                    // 增加请求成功回调之后的切入点
                    doAfterSuccessResponse(dc, view, "deleteParameters");
                },
                error: function (xhr) {
                    // 增加请求失败回调之前的切入点
                    if (doBeforeFailedResponse(dc, view, "deleteParameters")) {
                        _error && _error(xhr);

                        _exceptionProcess(xhr);

                    }
                    // 增加请求成功回调之后的切入点
                    doAfterFailedResponse(dc, view, "deleteParameters");
                }
            }, this.collect(dc, pattern));
        }

    },
    addParameter: function (parameter, _load, _error) {



        var time = new Date();
        var processor_begin = time.getTime();

        var pattern = this.pattern;

        var view = this.view;
        var dataCenter = view.dataCenter;
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore(dataCenter.getDataStore("_advancedQueryConditionStore"));
        dc.setParameter('dcID', 'aab');

        for (var _para in this.addParameter) {
            var _paraValue = this.addParameter[_para];
            if (_para == "_pattern") {
                pattern = _paraValue;
            }
            else {
                dc.setParameter(_para, _paraValue);
            }

            delete this.addParameter[_para];
        }



        dc.addDataStore("parameter", parameter);

        dc.setParameter("_parameters", "parameter");
        dc.setParameter("_parameterTypes", "pojo");

        dc.setParameter("_boId", "bizdata_bizdataCommonBO_bo");
        dc.setParameter("_methodName", "update");
        dc.setParameter("_methodParameterTypes", "java.util.Map");



        console.log("开始执行" + dc.getParameter("_boId") + "的" + dc.getParameter("_methodName") + "方法" + "[" + unieap.userAccount + " " + view.processor.checkTime(time.getHours()) + ":" + view.processor.checkTime(time.getMinutes()) + ":" + view.processor.checkTime(time.getSeconds()) + ":" + view.processor.checkTime(time.getMilliseconds(), 1) + "]" + "...");



        var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";

        // 增加请求之前的切入点
        if (doBeforeRequest(dc, view, "addParameter")) {
            return unieap.Action.requestData({
                url: path,
                dc: dataCenter,
                sync: true,
                load: function (dc) {
                    // 增加请求成功回调之前的切入点
                    if (doBeforeSuccessResponse(dc, view, "addParameter")) {
                        _load && _load(dc);
                        view.addParameterSuccess(dc);
                        view.processor.logProcessorInterval("addParameter", processor_begin, dataCenter);
                    }
                    // 增加请求成功回调之后的切入点
                    doAfterSuccessResponse(dc, view, "addParameter");
                },
                error: function (xhr) {
                    // 增加请求失败回调之前的切入点
                    if (doBeforeFailedResponse(dc, view, "addParameter")) {
                        _error && _error(xhr);

                        _exceptionProcess(xhr);

                    }
                    // 增加请求成功回调之后的切入点
                    doAfterFailedResponse(dc, view, "addParameter");
                }
            }, this.collect(dc, pattern));
        }

    },
    updateParam: function (parameter, _load, _error) {



        var time = new Date();
        var processor_begin = time.getTime();

        var pattern = this.pattern;

        var view = this.view;
        var dataCenter = view.dataCenter;
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore(dataCenter.getDataStore("_advancedQueryConditionStore"));
        dc.setParameter('dcID', 'aab');

        for (var _para in this.updateParam) {
            var _paraValue = this.updateParam[_para];
            if (_para == "_pattern") {
                pattern = _paraValue;
            }
            else {
                dc.setParameter(_para, _paraValue);
            }

            delete this.updateParam[_para];
        }



        dc.addDataStore("parameter", parameter);

        dc.setParameter("_parameters", "parameter");
        dc.setParameter("_parameterTypes", "pojo");

        dc.setParameter("_boId", "bizdata_bizdataCommonBO_bo");
        dc.setParameter("_methodName", "update");
        dc.setParameter("_methodParameterTypes", "java.util.Map");



        console.log("开始执行" + dc.getParameter("_boId") + "的" + dc.getParameter("_methodName") + "方法" + "[" + unieap.userAccount + " " + view.processor.checkTime(time.getHours()) + ":" + view.processor.checkTime(time.getMinutes()) + ":" + view.processor.checkTime(time.getSeconds()) + ":" + view.processor.checkTime(time.getMilliseconds(), 1) + "]" + "...");



        var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";

        // 增加请求之前的切入点
        if (doBeforeRequest(dc, view, "updateParam")) {
            return unieap.Action.requestData({
                url: path,
                dc: dataCenter,
                sync: true,
                load: function (dc) {
                    // 增加请求成功回调之前的切入点
                    if (doBeforeSuccessResponse(dc, view, "updateParam")) {
                        _load && _load(dc);
                        view.updateParamSuccess(dc);
                        view.processor.logProcessorInterval("updateParam", processor_begin, dataCenter);
                    }
                    // 增加请求成功回调之后的切入点
                    doAfterSuccessResponse(dc, view, "updateParam");
                },
                error: function (xhr) {
                    // 增加请求失败回调之前的切入点
                    if (doBeforeFailedResponse(dc, view, "updateParam")) {
                        _error && _error(xhr);

                        _exceptionProcess(xhr);

                    }
                    // 增加请求成功回调之后的切入点
                    doAfterFailedResponse(dc, view, "updateParam");
                }
            }, this.collect(dc, pattern));
        }

    },
    deleteAll: function (parameter, _load, _error) {



        var time = new Date();
        var processor_begin = time.getTime();

        var pattern = this.pattern;

        var view = this.view;
        var dataCenter = view.dataCenter;
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore(dataCenter.getDataStore("_advancedQueryConditionStore"));
        dc.setParameter('dcID', 'aab');

        for (var _para in this.deleteAll) {
            var _paraValue = this.deleteAll[_para];
            if (_para == "_pattern") {
                pattern = _paraValue;
            }
            else {
                dc.setParameter(_para, _paraValue);
            }

            delete this.deleteAll[_para];
        }



        dc.addDataStore("parameter", parameter);

        dc.setParameter("_parameters", "parameter");
        dc.setParameter("_parameterTypes", "pojoList");

        dc.setParameter("_boId", "bizdata_bizdataCommonBO_bo");
        dc.setParameter("_methodName", "deleteAll");
        dc.setParameter("_methodParameterTypes", "java.util.List");



        console.log("开始执行" + dc.getParameter("_boId") + "的" + dc.getParameter("_methodName") + "方法" + "[" + unieap.userAccount + " " + view.processor.checkTime(time.getHours()) + ":" + view.processor.checkTime(time.getMinutes()) + ":" + view.processor.checkTime(time.getSeconds()) + ":" + view.processor.checkTime(time.getMilliseconds(), 1) + "]" + "...");



        var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";

        // 增加请求之前的切入点
        if (doBeforeRequest(dc, view, "deleteAll")) {
            return unieap.Action.requestData({
                url: path,
                dc: dataCenter,
                sync: true,
                load: function (dc) {
                    // 增加请求成功回调之前的切入点
                    if (doBeforeSuccessResponse(dc, view, "deleteAll")) {
                        _load && _load(dc);
                        view.deleteAllSuccess(dc);
                        view.processor.logProcessorInterval("deleteAll", processor_begin, dataCenter);
                    }
                    // 增加请求成功回调之后的切入点
                    doAfterSuccessResponse(dc, view, "deleteAll");
                },
                error: function (xhr) {
                    // 增加请求失败回调之前的切入点
                    if (doBeforeFailedResponse(dc, view, "deleteAll")) {
                        _error && _error(xhr);

                        _exceptionProcess(xhr);

                    }
                    // 增加请求成功回调之后的切入点
                    doAfterFailedResponse(dc, view, "deleteAll");
                }
            }, this.collect(dc, pattern));
        }

    }

    ,
    logProcessorInterval: function (methodName, processor_begin, dataCenter) {
        var interval = new Date().getTime() - beginTime;
        var processor_interval = new Date().getTime() - processor_begin;
        console.log(methodName + " :" + processor_interval + "ms");
        console.log("interval :" + interval + "ms");
        dataCenter.setParameter("_processor_interval", interval + "ms");
    },
    checkTime: function (i, j) {
        if (j) {
            i = '0000' + i;
            return i.substr(i.length - 4);
        }
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

}); </script>
		
		<script type="text/javascript"> /**
 *  
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pt008_0", function () {

    var rowIndex;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_aab.employee.pt008_0.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getParameterListSuccess: getParameterListSuccess,
                deleteParametersSuccess: deleteParametersSuccess,
                modifyPara: modifyPara,
                deletePara: deletePara,
                modifyParaRet: modifyParaRet,
                addParaRet: addParaRet,
                deleteAllSuccess: deleteAllSuccess,
                NewButton1_onClick: NewButton1_onClick,
                NewButton2_onClick: NewButton2_onClick,
                NewButton3_onClick: NewButton3_onClick,
                NewButton4_onClick: NewButton4_onClick,
                NewButton5_onClick: NewButton5_onClick,
                rowIndex: rowIndex
            });

            this.processor = new aab.employee.pt008_0.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('baseinfo_Grid')) {
                var baseinfo_Grid = new unieap.ds.DataStore('baseinfo_Grid');
                baseinfo_Grid.setParameter("_bizdataObjectName", "baseinfo");

                dataCenter.addDataStore(baseinfo_Grid);
            }

            if (!dataCenter.getDataStore('baseinfo_Form')) {
                var baseinfo_Form = new unieap.ds.DataStore('baseinfo_Form');
                baseinfo_Form.setParameter("_bizdataObjectName", "baseinfo");
                baseinfo_Form.setParameter("_queryOperators", {
                    'ID': 'like',
                    'NAME': 'like'
                });
                dataCenter.addDataStore(baseinfo_Form);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("NewButton1"), "onClick", this.NewButton1_onClick);

            this.connect(unieap.byId("NewButton2"), "onClick", this.NewButton2_onClick);

            this.connect(unieap.byId("NewButton3"), "onClick", this.NewButton3_onClick);

            this.connect(unieap.byId("NewButton4"), "onClick", this.NewButton4_onClick);

            this.connect(unieap.byId("NewButton5"), "onClick", this.NewButton5_onClick);

        },


        page_load: function () {
            this.inherited(arguments);
            view.navigator.onComplete("修改", modifyParaRet);
            view.navigator.onComplete("新增", addParaRet);
        }


    });

    function getParameterListSuccess(dc) {
        view.grid.setDataStore('grid1', dc.getDataStore('result'));
    }

    function deleteParametersSuccess(dc) {
        MessageBox.alert({
            title: '信息对话框',
            message: '删除成功!'
        });
        dataCenter.addHeaderAttribute('getParameterList', 'serverExport');
        view.processor.getParameterList(view.form.getDataStore('form1'));
    }

    function modifyPara(inrowIndex) {
        var ds = view.grid.getRow('grid1', inrowIndex);
        rowIndex = inrowIndex;
        var pars = {
            'viewId': dataCenter.getParameter('_bizdataViewId'),
            'viewName': 'pt008_1'
        };
        view.navigator.forward('bizcomp', 'bizdata', '', '修改', ds, pars);
    }

    function deletePara(rowIndex) {
        var ds = view.grid.getRow('grid1', rowIndex);
        MessageBox.confirm({
            onComplete: function confirmReturn(value) {
                if (value == true) {
                    view.processor.deleteParameters(ds);
                }
                else {
                    return;
                }
            },
            iconCloseComplete: true,
            message: '您是否确认删除?'
        });
    }

    function modifyParaRet(ds) {
        view.grid.updateRow('grid1', ds, rowIndex);
    }

    function addParaRet(ds) {
        view.grid.insertRows('grid1', ds);
    }

    function deleteAllSuccess(dc) {
        MessageBox.alert({
            title: '信息对话框',
            message: '批量删除成功!'
        });
        dataCenter.addHeaderAttribute('getParameterList', 'serverExport');
        view.processor.getParameterList(view.form.getDataStore('form1'));
    }

    function NewButton1_onClick(event) {
        var pars = {
            'viewId': dataCenter.getParameter('_bizdataViewId'),
            'viewName': 'pt008_1'
        };
        view.navigator.forward('bizcomp', 'bizdata', '', '新增', null, pars);
    }

    function NewButton2_onClick(event) {
        var inRowIndexs = unieap.byId('grid1').getManager('SelectionManager').getSelectedRowIndexs();
        var rowIndex = -1;
        if (inRowIndexs == undefined || inRowIndexs.length != 1) {
            MessageBox.alert({
                title: '信息对话框',
                message: '请选择一项!'
            });
            return false;
        }
        else {
            rowIndex = inRowIndexs[0];
        }
        var ds = view.grid.getRow('grid1', rowIndex);
        var pars = {
            'viewId': dataCenter.getParameter('_bizdataViewId'),
            'viewName': 'pt008_1'
        };
        view.navigator.forward('bizcomp', 'bizdata', '', '修改', ds, pars);
    }

    function NewButton3_onClick(event) {
        var inRowIndexs = unieap.byId('grid1').getManager('SelectionManager').getSelectedRowIndexs();
        var rowIndex = -1;
        if (inRowIndexs == undefined || inRowIndexs.length != 1) {
            MessageBox.alert({
                title: '信息对话框',
                message: '请选择一项!'
            });
            return false;
        }
        else {
            rowIndex = inRowIndexs[0];
        }
        var ds = view.grid.getRow('grid1', rowIndex);
        MessageBox.confirm({
            onComplete: function confirmReturn(value) {
                if (value == true) {
                    view.processor.deleteParameters(ds);
                }
                else {
                    return;
                }
            },
            iconCloseComplete: true,
            message: '您是否确认删除?'
        });
    }

    function NewButton4_onClick(event) {
        var inRowIndexs = unieap.byId('grid1').getManager('SelectionManager').getSelectedRowIndexs();
        if (inRowIndexs == undefined || inRowIndexs.length == 0) {
            MessageBox.alert({
                title: '信息对话框',
                message: '请至少选择一项!'
            });
            return false;
        }
        else {
            MessageBox.confirm({
                onComplete: function confirmReturn(value) {
                    if (value == true) {
                        view.processor.deleteAll(view.grid.getRows('grid1'));
                    }
                    else {
                        return;
                    }
                },
                iconCloseComplete: true,
                message: '您是否确认删除?'
            });
        }
    }

    function NewButton5_onClick(event) {
        dataCenter.addHeaderAttribute('getParameterList', 'serverExport');
        view.processor.getParameterList(view.form.getDataStore('form1'));
    }

    var view = new _aab.employee.pt008_0.View();
    view.init();

    return view;
}) </script>
		
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pt008_0.page_initEvents&&dojo.hitch(pt008_0,pt008_0.page_initEvents)();
				pt008_0.page_load&&dojo.hitch(pt008_0,pt008_0.page_load)();
				
			});
			
		</script>
		
	
	<script type="text/javascript">debugger;dataCenter.setParameter("_bizdataViewId","8a84ad893ea73304013ea756550c000a");</script>
	</head>
	<body class="unieap">
		
	<s:i18n name="aab.package">
    <div dojoType='unieap.layout.AdaptiveContainer'>
        <div dojoType='unieap.layout.AdaptivePane' width='auto'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='form1_titlePane_qCondition'
            title='查询条件' width='100%'>
                <div id='_bizdataFormDiv' type='buttons'>
                    <table id='ToolBarInfo' width='100%' style="table-layout:fixed;">
                        <colgroup>
                            <col></col>
                            <col></col>
                            <col width='145px'></col>
                            <col width='145px'></col>
                            <col width='145px'></col>
                            <col width='145px'></col>
                            <col width='145px'></col>
                        </colgroup>
                        <tbody>
                            <tr height='30px'>
                                <td></td>
                                <td></td>
                                <td>
                                    <div dojoType='unieap.form.Button' id='NewButton1' label='新增' width='140px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' id='NewButton2' label='修改' width='140px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' id='NewButton3' label='删除' width='140px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' id='NewButton4' label='批量删除' width='140px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' id='NewButton5' label='查询' width='140px'></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div dojoType='unieap.form.Form' id='form1' binding="{store:'baseinfo_Form'}">
                    <table id='form1_tableLayout' width='100%' style="table-layout:fixed;">
                        <colgroup>
                            <col width='13%'></col>
                            <col width='20%'></col>
                            <col width='13%'></col>
                            <col width='20%'></col>
                            <col width='13%'></col>
                            <col width='20%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form1_1_tr'>
                                <td id='ID_label_td' rowSpan='1'>
                                    <label id='ID_label'>编号</label>
                                </td>
                                <td colSpan='1' id='ID_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='ID' width='100%' binding="{name:'ID'}"></div>
                                </td>
                                <td id='NAME_label_td' rowSpan='1'>
                                    <label id='NAME_label'>姓名</label>
                                </td>
                                <td colSpan='1' id='NAME_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='NAME' width='100%' binding="{name:'NAME'}"></div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.AdaptivePane' width='auto'></div>
        <div dojoType='unieap.layout.AdaptivePane' height='100%' autoHeight='true'
        width='auto'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%'
            id='grid1_titlePane_qResult' title='查询结果'>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'baseinfo_Grid'}"
                selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                    <toolbar></toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_ID' label='编号' name='ID'
                            width='100px'></cell>
                            <cell dataType='number' enable='false' id='cell_AGE' label='年龄'
                            name='AGE' width='100px'></cell>
                            <cell dataType='date' enable='false' id='cell_BIRTH' label='出生日期'
                            name='BIRTH' width='100px' displayFormatter="{dataFormat:'yyyy-MM-dd',declaredClass:'unieap.form.DateDisplayFormatter'}"></cell>
                            <cell dataType='number' enable='false' id='cell_WAGE' label='工资'
                            name='WAGE' width='100px'></cell>
                            <cell dataType='code' enable='false' id='cell_SEX' label='性别' name='SEX'
                            width='100px' decoder="{store:'core_genderType'}"></cell>
                            <cell dataType='string' enable='false' id='cell_NAME' label='姓名'
                            name='NAME' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_dept.ID' label='部门编号'
                            name='dept.ID' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_dept.NAME' label='部门名称'
                            name='dept.NAME' width='100px'></cell>
                            <cell dataType='number' enable='false' id='cell_dept.EMPLOYEE_NUM'
                            label='人数' name='dept.EMPLOYEE_NUM' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_depth.ID' label='公司编码'
                            name='depth.ID' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_depth.NAME' label='公司名称'
                            name='depth.NAME' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_PHONE' label='手机号码'
                            name='PHONE' width='100px'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
	
	</body>
</html>