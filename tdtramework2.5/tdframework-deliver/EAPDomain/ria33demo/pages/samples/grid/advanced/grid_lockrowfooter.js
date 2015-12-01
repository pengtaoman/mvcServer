dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

var ds = {
    header: {
        code: 0,
        message: {
            title: "null",
            detail: "null"
        }
    },
    body: {
        parameters: {},
        dataStores: {
            empLockDataStore: {
                metaData: {
                    attr_empno: {
                        dataType: 4
                    },
                    NAME: {
                        dataType: 12
                    },
                    attr_hiredate: {
                        dataType: 93
                    },
                    attr_deptno: {
                        dataType: 4
                    },
                    attr_sal: {
                        dataType: 6
                    }
                },
                pageSize: 30,
                pageNumber: 1,
                recordCount: 30,
                dataSetName: "ria.empDataStore",
                name: "empDataStore",
                order: "",
                condition: "",
                statistics: {
                    attr_sal: {
                        max: '50000',
                        min: '1080'
                    }
                },
                rowSet: [{
                    attr_empno: "250",
                    NAME: "杨作仲",
                    attr_job: "项目经理",
                    attr_sal: "1080",
                    attr_deptno: "10"
                }, {
                    attr_empno: "319",
                    NAME: "赵斌",
                    attr_job: "软件工程师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "50000",
                    attr_deptno: "10"
                }, {
                    attr_empno: "216",
                    NAME: "陈旭杰",
                    attr_job: "软件工程师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "3200",
                    attr_deptno: "40",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "100",
                    NAME: "张卫滨",
                    attr_job: "RIA主架构师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "5432",
                    attr_deptno: "30",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "10000",
                    NAME: "赵磊",
                    attr_job: "产品经理",
                    attr_hiredate: "1205917947270",
                    attr_sal: "2222",
                    attr_deptno: "30",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "250",
                    NAME: "杨作仲2号",
                    attr_job: "项目经理",
                    attr_sal: "1080",
                    attr_deptno: "10"
                }, {
                    attr_empno: "319",
                    NAME: "赵斌2号",
                    attr_job: "软件工程师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "50000",
                    attr_deptno: "10"
                }, {
                    attr_empno: "216",
                    NAME: "陈旭杰2号",
                    attr_job: "软件工程师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "3200",
                    attr_deptno: "40",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "100",
                    NAME: "张卫滨2号",
                    attr_job: "RIA主架构师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "5432",
                    attr_deptno: "30",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "10000",
                    NAME: "赵磊2号",
                    attr_job: "产品经理",
                    attr_hiredate: "1205917947270",
                    attr_sal: "2222",
                    attr_deptno: "30",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "250",
                    NAME: "杨作仲3号",
                    attr_job: "项目经理",
                    attr_sal: "1080",
                    attr_deptno: "10"
                }, {
                    attr_empno: "319",
                    NAME: "赵斌3号",
                    attr_job: "软件工程师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "50000",
                    attr_deptno: "10"
                }, {
                    attr_empno: "216",
                    NAME: "陈旭杰3号",
                    attr_job: "软件工程师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "3200",
                    attr_deptno: "40",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "100",
                    NAME: "张卫滨3号",
                    attr_job: "RIA主架构师",
                    attr_hiredate: "1205917947270",
                    attr_sal: "5432",
                    attr_deptno: "30",
                    attr_unitid: "0711281110"
                }, {
                    attr_empno: "10000",
                    NAME: "赵磊3号",
                    attr_job: "产品经理",
                    attr_hiredate: "1205917947270",
                    attr_sal: "2222",
                    attr_deptno: "30",
                    attr_unitid: "0711281110"
                }]
            }
        }
    }
};
dataCenter = new unieap.ds.DataCenter(ds);

var getLockedRow = function(){
    return [{
        attr_sal: '小计: 25555'
    }, {
        attr_sal: '合计: 25555'
    }];
}
function getData(){
    return '自定义数据！';
}

var myContext = {
    testContext: '上下文！'
};
