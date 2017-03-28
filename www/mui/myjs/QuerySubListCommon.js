//querySelect.html与querySubList.html共用的方法
var QuerySubListCommon = {
	/**
	 * 去除行里的<h>标题，解决显示过大的问题
	 */
	funConvertListRowTitle : function(title) {
		var str = title;
		if (!str) {
			str = "";
		}
		str = str.replace(/<h\d/gi, "<span");
		str = str.replace(/<\/h\d>/gi, "</span>");
		return str;
	},
	/**
	 * 获取查询条件对应的json array
	 */
	getQueryConditionAry : function() {
		var queryConditionRtn = [];
		// 原始查询条件，client预设的查询条件，主要用于人员选择器控件，可以6定制查询条件
		var queryCondition0 = initData['queryCondition0'];
		if (queryCondition0 && queryCondition0.length > 0) {
			queryConditionRtn = queryConditionRtn.concat(queryCondition0);
		}
		// 服务端返回的查询条件
		var queryCondition = initData['queryCondition'];
		if (queryCondition && queryCondition.length > 0) {
			queryConditionRtn = queryConditionRtn.concat(queryCondition);
		}
		// alert(JSON.stringify(queryConditionRtn));
		return queryConditionRtn;
	},
	/**
	 * 进入查询条件页
	 */
	gotoQueryConditionPage : function() {
		var params = {};
		params["jsonStrQueryCondition"] = JSON.stringify(QuerySubListCommon
				.getQueryConditionAry());
		params["jsonStrQueryParams"] = JSON.stringify(QuerySubListCommon.getQueryParamMap());

		properWebPage
				.nativeExec(
						'OaTpl',
						'queryChangeQueryCondition',
						[ params ],
						function(rtn) {
							if (rtn.jsonStrQueryParams) {
								initData['jsonStrQueryParams'] = rtn.jsonStrQueryParams;
								initData['queryParams'] = JSON
										.parse(initData['jsonStrQueryParams']);
								page1PulldownRefresh();// 加载数据
							} else {
								console.log(rtn);
							}
						}, function(e) {
							console.log(e);
						});
	},
	/**
	 * 获取查询条件对应的参数集合
	 */
	getQueryParamMap:function (){
		var m={};
		//请求服务器时，当前的查询条件参数
		var queryParams=initData['queryParams'];
		if(queryParams){
			$.extend(m,queryParams);
		}
		return m;
	},
	/**
	 * 分页加载列表
	 */
	getDataList:function(callback,errCallback){
		var requestArgs={
				"params":{}
		};
		if(initData['submit_path']){
			requestArgs['path']=initData['submit_path'];
		}else{
			requestArgs['path']="webController/getSystemMsgList";
		}
		var params=requestArgs['params'];
		params['pageSize']=pageSize;
		params['pageNo']=currentPageNo;
		params['serviceName']=initData['serviceName'];
		params['default_tab']=initData['defaultTab'];
		$.extend(params,QuerySubListCommon.getQueryParamMap());
		//alert(JSON.stringify(params));
		properWebPage.requestServer(requestArgs,function(data){
			//alert(JSON.stringify(data));
			callback(data);
		},errCallback);
	}
};
