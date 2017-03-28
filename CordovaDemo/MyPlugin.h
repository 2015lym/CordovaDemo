//
//  MyPlugin.h
//  CordovaDemo
//
//  Created by Lym on 2017/3/28.
//  Copyright © 2017年 Lym. All rights reserved.
//

#import <Cordova/CDV.h>

@interface MyPlugin : CDVPlugin

- (void)test:(CDVInvokedUrlCommand*)command;

@end
