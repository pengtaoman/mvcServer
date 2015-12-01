dojo.provide("unieap.nls.application_en_US");

RIA_I18N={
	
		/////--------------------Form Widgets------------------------///////////
		
		form:{
			calendar : {
				//周日
				full_Sunday : "Sunday",
				//周一
				full_Monday : "Monday",
				//周二
				full_Tuesday:"Tuesday",
				//周三
				full_Wednesday:"Wednesday",
				//周四
				full_Thursday:"Thursday",
				//周五
				full_Firday:"Friday",
				//周六
				full_Saturday:"Saturday",
				//日
				short_Sunday:"Su",
				//一
				short_Monday:"Mo",
				//二
				short_Tuesday:"Tu",
				//三
				short_Wednesday:"We",
				//四
				short_Thursday:"Th",
				//五
				short_Firday:"Fr",
				//六
				short_Saturday:"Sa",
				
				//一月
				full_January:"January",
				//二月
				full_February:"February",
				//三月
				full_March:"March",
				//四月
				full_April:"April",
				//五月
				full_May:"May",
				//六月
				full_June:"June",
				//七月
				full_July:"July",
				//八月
				full_August:"August",
				//九月
				full_September:"September",
				//十月
				full_October:"October",
				//十一月
				full_November:"November",
				//十二月
				full_December:"December",
				
				//一月
				short_January:"Jan",
				//二月
				short_February:"Feb",
				//三月
				short_March:"Mar",
				//四月
				short_April:"Apr",
				//五月
				short_May:"May",
				//六月
				short_June:"Jun",
				//七月
				short_July:"Jul",
				//八月
				short_August:"Aug",
				//九月
				short_September:"Sep",
				//十月
				short_October:"Oct",
				//十一月
				short_November:"Nov",
				//十二月
				short_December:"Dec",
				
				//关于
				about :"About",
				//上一年
				prev_year : "Prev year",
				//上个月
				prev_month: "Prev month",
				//到今天
			    go_today :"Go Today",
			    //下个月
			    next_month:"Next month",
			    //下一年
			    next_year:"Next year",
			    //选择日期
			    sel_date:"Select Date",
			    //拖动
				drag_to_move:"Drag to Move",
				//(今天)
				part_today :"(Today)",
				
				//%s为这周的第一天
				day_first:"Display %s first",
				
				//关闭
				close:"Close",
				//今天
				today:"Today",
				//(按着Shift键)单击或拖动改变值
				time_part:"Shift(-)Click or drag to change value",
				
				def_date_format:"%Y-%m-%d",
				
				tt_date_format:"%A, %b %e",
				
				//周
				wk:"wk",
				//时间：
				time:"Time:"
			},
			combobox : {
					//位于comboboxpopup文件中
					//代码值
					codeValue:"codevalue",
					//代码标题
					codeName:"codename"
			},

			fileinput : {
					//浏览
					browser:"Browse...",
					//取消
					cancel:"Cancel",
					//只允许上传文件后缀名为
					fileInvalidFormer:"Only the file with the following extension(s):",
					//的文件
					fileInvalidLatter:" can be uploaded",
					//提示信息
					info:"Prompt Info"
			},

			form : {
					//校验提示
					validateMsg:"Invalid Message"
			},

			formWidgetValidator : {
					//输入不合法!
					errorMsg:"The value of this field is invalid!",
					//该输入项的值不能为空！
					nullError:"This field is required!",
					//该输入项的最大长度为
					maxLengthError:"The maximum length for this field is ",
					//该输入项的最小长度为
					minLengthError:"The minimum length for this field is "
			},
			
			dateTextBox:{
				//位于文件unieap.form.DateDisplayFormatter中，用于指定日期的默认格式
				dataFormat:"MM/dd/yyyy"
			},
			
			numberTextBox:{
				//位于unieap.form.NumberTextBoxValidator中，用于提示只能输入数字
				errorMsg:'The value of this field is not a valid number!'
			}
			
		},
		
		
		//-----------------------Grid Widget-----------------------------//
		
		grid:{
			'export':{
				//服务端导出
				serverExport:'Server',
				//客户端导出
				clientExport:'Client',
				//导出选中记录
				selectedExport:'Selected'
			},
			
			individual:{
				//设置
				settings:'Settings',
				//重置
				reset:'Reset',
				//个性化设置
				title:'Individual Settings',
				//显示
				visible:'Visible',
				//锁定
				lock:'Lock',
				//列名
				column:'Column',
				//上移
				moveup:'Up',
				//下移
				movedown:'Down',
				//保存
				save:'Save',
				//应用
				apply:'Apply'
				
			},
			
			paging:{
				//本页共{0}条记录  共{1}条记录
				template:'Pagesize:{0},Total:{1}',
				//页
				page:' Page ',
				//保存修改?
				saveModified:'Save modified?',
				//放弃修改？"
				discardModified:'Discard modified?',
				//第一页
				firstPage:'First',
				//上一页
				prevPage:'Previous',
				//下一页
				nextPage:'Next',
				//最后一页
				lastPage:'Last'
				
			},
			
			group:{
				//请选择进行分组的列
				tip:'Please choose columns to group',
				//分组统计
				statistics:'Statistics',
				//最大值
				max:'Max',
				//最小值
				min:'Min',
				//合计值
				sum:'Sum',
				//平均值
				avg:'Avg',
				//清除统计
				clear:'Clear',
				
				//提交分组信息
				sumbitGroup:"Submit group info",
				//移除分组列
				removeColumn:"Remove group column",
				
				//空
				noValue:"No value"
				
			},
			
			filter:{
				//过滤
				filter:'Filter',
				//清除本列过滤
				clearColumn:'Clear Column',
				//清除表格过滤
				clearGrid:'Clear Grid',
				//设置列过滤条件
				configure:'Filtering column \"${0}\"',
				//等于
				eq:'Equal',
				//不等于
				neq:'Not equal',
				//大于
				gt:'Geater than',
				//大于等于
				gte:'Greater than or equal',
				//小于
				lt:'Less than',
				//小于等于
				lte:'Less equal or equal',
				//包含
				include:'Like',
				//不包含:
				exclude:'Not like',
				//为空
				empty:'Null',
				//不为空
				notempty:'Not null',
				//与
				and:'And',
				//或
				or:'Or',
				//确定
				confirm:"Confirm",
				//取消
				cancel:"Cancel"
			},
			
			toolbar:{
				//每页
				perPage:"Per page",
				//条
				items:"row(s)",
				//个性化
				individual:"Individual",
				//打印
				print:"Print"
			}
			
			
			
			
			
			
		},
		
		/////-----------------------Layout Widgets------------------------///////////
		layout:{
			contentPane:{
				//正在装入...
				loading:"Loading..."
			},
			tabController:{
				//关闭
				close:"Close"
			}
		},
		
		////-------------------------Dialog Widget----------------------///////////
		dialog:{
			dialog:{
				//对话框
				title : "Dialog",
				//最大化
				maximinze:"Maximinze",
				//关闭
				close:"Close",
				//restore down
				restore:"Restore down"
			},
			messageBox:{
				//确定
				confirm:"Confirm",
				//取消
				cancel:"Cancel",
				//您是否确认？
				confirmText:"Are you sure to do that?",
				//确认框
				confirmTitle:"Confirm",
				//是
				yes:"Yes",
				//否
				no:"No",
				//信息提示
				infoText:"Information",
				//自动关闭确认框
				autoClose:"Auto-Close MessageBox",
				//请输入内容：
				inputContent:"Please enter your content:",
				//输入提示框
				promptDialog:"Prompt"
				
			}
		},
		
		////-------------------------util----------------------///////////
		util:{
			debug:{
				//非json格式数据
				notJson:"The data doesn't have a json structure",
				//Json数据结构
				jsonData:"Json structure data"
			},
			
			installplugin:{
				//脚本解析引擎
				script:"JavaScript parsing engine",
				//客户端缓存插件
				gears:"Client-side caching plug-in"
			},
			
			util:{
				//最大值
				max:"Max",
				//最小值
				min:"Min",
				//平均值
				avg:"Avg",
				//合计值
				sum:"Sum",
				//终止事件！
				stopEvent:"Stop Event!",
				
				//正在装载数据...
				loading:"Loading data...",
				
				//关闭
				close:"Close",
				
				//请正确设置dojoType属性。
				dojoTypeError:"Please set correct dojoType property.",
					
				defaultDateFormat:"MM/dd/yyyy"
			}
		},
		
		////-------------------------tooltip----------------------///////////
		tooltip:{
			//内容正在加载，请稍候…
			loading:"Loading data..."
		},
		
		////-------------------------rpc----------------------///////////
		rpc:{
			//会话过期,请重新登录
			sessionOut:"Your session has expired,please login again.",
			
			//请求数据成功！但回调方法出错；请检查自定义load回调函数。
			loadError:"Request data successfully! However,an error occurs in callback function.",
			
			//错误提示
			errorTip:"Error",
			
			//请求操作失败
			errorMessage:"The requested operation failed",
			
			//成功提示
			success:"Success",
			
			//请求操作成功
			successMessage:"The requested operation is successful",
			
			//导出的布局信息为空！
			layoutInfoEmpty:"The layout infomation of export is empty!",
			
			
			//确定
			confirmButton:"Confirm",
			//提示信息
			info:"Prompt Info",
			//由于数据资源文件配置出错,程序不执行打印操作。
			printError:"for the configuration error of resource file,the program cann't perform printing operation.",
			
			//获取信息失败
			getInfoError:"Failed to load data",
			
			//保存信息失败
			saveError:"Failed to save",
			
			//正在装载缓存数据...
			loadingCache:"Loading cached data...",
			//装载缓存数据失败。
			loadCacheError:"Failed to load cached data."
			
		},
		
		////-------------------------xgrid----------------------///////////
		xgrid:{
			individual:{
				//保存
				save:'Save',
				//重置
				reset:'Reset'
			},
			
			menu:{
				//锁定
				lockColumn:"Lock",
				//解锁
				unlockColumn:"Unlock",
				//展现列
				columns:"Columns"
			}
		}
		
}