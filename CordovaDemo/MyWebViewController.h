//
//  MyWebViewController.h
//  CordovaDemo
//
//  Created by Lym on 2017/3/28.
//  Copyright © 2017年 Lym. All rights reserved.
//

#import <Cordova/CDVViewController.h>
#import <Cordova/CDVCommandDelegateImpl.h>
#import <Cordova/CDVCommandQueue.h>
#import <UIKit/UIKit.h>

@interface MyWebViewController : CDVViewController

@end

@interface MainCommandDelegate : CDVCommandDelegateImpl
@end

@interface MainCommandQueue : CDVCommandQueue
@end
