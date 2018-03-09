# FlashEvent
 FlashEvent 小程序页面间的通信工具<br>  
 FlashEvent 在小程序中 能够简化各页面间的通信，让代码书写变得简单，能有效的解耦事件发送方和接收方，能避免复杂和容易出错的依赖性和生命周期问题。


 使用方式：<br>  
 =====
 前置：将FlashEvent.js导入到项目的utils文件中<br>  
 
 1、接收方js代码中<br>  
 -----
   &nbsp;&nbsp;&nbsp;1.1 引入该类，如：let flashEvent = require('你的路径/utils/FlashEvent.js');<br>  
   &nbsp;&nbsp;&nbsp;1.2 注册FlashEvent，如：在onLoad中<br>  
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flashEvent.register(flashEvent.EVENT_KEYS.FIRST_EVENT, this, function (data) {<br>  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.setData({ eventCallBack: data })<br>  
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>  
   &nbsp;&nbsp;&nbsp;1.3 注销FlashEvent，如：在onUnload中调用 flashEvent.unregister(flashEvent.EVENT_KEYS.FIRST_EVENT, this);<br>  
  
 2、发送方js代码中<br>  
 -----
   &nbsp;&nbsp;&nbsp;2.1 引入该类，如：let flashEvent = require('你的路径/utils/FlashEvent.js');<br>  
   &nbsp;&nbsp;&nbsp;2.2 发送事件，如：flashEvent.post(flashEvent.EVENT_KEYS.FIRST_EVENT, '发送的数据');<br>  
 
