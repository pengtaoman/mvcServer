"use strict";
define(["application-configuration"], function (app) {
	app.register.filter("cartStatus",function () {
		return function (input) {
            switch (input) {
                case 0:
                    return '待生成';
                case 1:
                    return '审批退回';
                case 2:
                    return '待审批';
                case 3:
                    return '待发送';
                case 4:
                    return '待确认';
                case 5:
                    return '完成';
                case 6:
                    return '作废';
                default:
                    return '未知: ' + input;
            }
        };
	});
});