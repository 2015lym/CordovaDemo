const K_SYSTEMID="systemId";
const K_TITLE="title";
const V_SYSTEMID_todo="bpm"; //待办工作
const V_SYSTEMID_query="query";//查询
const V_SYSTEMID_queryDetail="queryDetail"; //查询详细
const V_SYSTEMID_opinionFeedback="opinionFeedback";//意见反馈
const V_SYSTEMID_imChat="im_chat";//意见反馈

const IM_CHAT_TYPE_SingleChat=0;//单聊
const IM_CHAT_TYPE_GroupChat=1;//群聊

function ProperWebPage(){};

/**
 * 获取设备类型
 */
ProperWebPage.prototype.getDeviceType=function(){
	var ua = navigator.userAgent.toLowerCase();	
	var deviceType=null;
	if (/iphone|ipad|ipod/.test(ua)) {
	    deviceType="ios";
	} else if (/android/.test(ua)) {
		 deviceType="android";	
	}else{
		deviceType="web";
	}
	return deviceType;
};
ProperWebPage.prototype.nativeExec=function(pluginName,actionName,aryArgs,func_succ,func_fail){
	if(!func_succ){
		func_succ=function(data){
			console.log(data);
		}
	}
	if(!func_fail){
		func_fail=function(err){
			console.log(err);
		}
	}
	if(!aryArgs){
		aryArgs=[];
	}
	if(cordova&&cordova.exec){
		cordova.exec(func_succ,func_fail, pluginName, actionName, aryArgs);	
	}
	
};
ProperWebPage.prototype.init=function(){
	
	var js=document.scripts;
	var jsPath;
	for(var i=js.length;i>0;i--){
	 if(js[i-1].src.indexOf("ProperWebPage.js")>-1){
	   jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")+1);
	 }
	}
	var deviceType=this.getDeviceType();
	var cordovaJsPath=jsPath+deviceType+"/cordova.js";
	var scriptFile = document.createElement('script');
	scriptFile.setAttribute("type","text/javascript");
	scriptFile.setAttribute("src",cordovaJsPath);
	document.getElementsByTagName("head")[0].appendChild(scriptFile);
	console.log(cordovaJsPath);
};
ProperWebPage.prototype.closeWebPage=function(){
	this.nativeExec('WebPage', 'closeWebPage', [],function(data) {
		console.log('closeWebPage success');
	});	
};
ProperWebPage.prototype.getInitParam=function(func_succ,func_fail){
	this.nativeExec('WebPage', 'getInitParam', [],func_succ,func_fail);	
};
ProperWebPage.prototype.requestServer=function(params,func_succ,func_fail){
	this.nativeExec('WebPage', 'requestServer', [params],func_succ,func_fail);	
};
ProperWebPage.prototype.showLoading=function(func_succ,func_fail){
	this.nativeExec('WebPage', 'showLoading', [],func_succ,func_fail);	
};
ProperWebPage.prototype.hideLoading=function(func_succ,func_fail){
	this.nativeExec('WebPage', 'hideLoading', [],func_succ,func_fail);	
};
ProperWebPage.prototype.showToast=function(str,fun_succ,fun_fail){
//	if(mui&&mui.toast){
//		mui.toast(str);
//	}else{
//		
//	}
	this.nativeExec('WebPage', 'showToast', [{"msg":str}],fun_succ,fun_fail);
};
//url:
//http://xxx或https://xxx 用浏览器打开
//tel:xxx 播打电话
//mailto:xxx 发邮件
//sms:xxxx 发送短信
//copy:xxxx 复制xxxx
ProperWebPage.prototype.openUrlInBrowser=function(url,fun_succ,fun_fail){
	this.nativeExec('WebPage', 'openUrlInBrowser', [{"url":url}],fun_succ,fun_fail);
};
ProperWebPage.prototype.openTheApp=function(json,fun_succ,fun_fail){
	this.nativeExec('WebPage', 'openTheApp', [json],fun_succ,fun_fail);
};
//选择照片多张
//max int: 多少张图片 
ProperWebPage.prototype.takePictures=function(json,fun_succ,fun_fail){
	this.nativeExec('WebPage', 'takePictures', [json],fun_succ,fun_fail);
};



window.properWebPage = new ProperWebPage();
window.properWebPage.init();


String.prototype.startWith=function(str){     
	  var reg=new RegExp("^"+str);     
	  return reg.test(this);        
}
String.prototype.endWith=function(str){     
	var reg=new RegExp(str+"$");     
	return reg.test(this);        
}
String.prototype.isFileType=function(ext){
	return this.toUpperCase().endWith(ext.toUpperCase());
}
String.prototype.isAbsoluteUrl=function(){
	return this.toUpperCase().startWith("HTTPS://")||this.toUpperCase().startWith("HTTP://")||this.toUpperCase().startWith("FILE://");
}