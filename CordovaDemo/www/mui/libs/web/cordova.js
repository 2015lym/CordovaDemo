console.log('web/cordova.js');
var cordova={
		"exec":function(fun_succ,fun_fail,pluginName,actionName){
			console.log("exec:"+pluginName+"."+actionName);
		}
};
