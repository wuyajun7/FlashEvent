/**
 * FlashEvent 页面间的通信工具
 * FlashEvent 能够简化各页面间的通信，让代码书写变得简单，
 * 能有效的解耦事件发送方和接收方，能避免复杂和容易出错的依赖性和生命周期问题。
 * 
 * 使用方式：
 * 
 * 1、接收方js代码中
 *  1.1 引入该类，如：let flashEvent = require('你的路径/utils/FlashEvent.js');
 *  1.2 注册FlashEvent，如：在onLoad中
 *    flashEvent.register(flashEvent.EVENT_KEYS.FIRST_EVENT, this, function (data) {
 *       this.setData({
 *         eventCallBack: data
 *       })
 *    })
 *  1.3 注销FlashEvent，如：在onUnload中调用 flashEvent.unregister(flashEvent.EVENT_KEYS.FIRST_EVENT, this);
 * 2、发送方js代码中
 *  2.1 引入该类，如：let flashEvent = require('你的路径/utils/FlashEvent.js');
 *  2.2 发送事件，如：flashEvent.post(flashEvent.EVENT_KEYS.FIRST_EVENT, '发送的数据');
 */

// 事件定义 方便维护管理 - 新事件添加到此处
const EVENT_KEYS = {
  FIRST_EVENT: "FIRST_EVENT"
}

// 存储组合后的事件
var eventData = {};

/**
 * register 注册事件：再Page
 * key 事件名
 * context 上下文-当前page的this
 * callback 事件回调
 */
function register(key, context, callback) {
  var eventInfo = [context, callback];
  var callbacks = eventData[key];

  if (Array.isArray(callbacks)) {
    callbacks.push(eventInfo);
  } else {
    eventData[key] = [eventInfo];
  }
}

/**
 * unregister 注销事件
 * key 事件名
 * context 上下文-当前page的this
 */
function unregister(key, context) {
  var callbacks = eventData[key];
  if (Array.isArray(callbacks)) {
    eventData[key] = callbacks.filter((eventInfo) => {
      return eventInfo[0] != context;
    })
  }
}

/**
 * post 发送事件
 * key 事件名
 * data 传递的数据
 */
function post(key, data) {
  var callbacks = eventData[key];

  if (Array.isArray(callbacks)) {
    callbacks.map((eventInfo) => {
      var context = eventInfo[0];
      var callback = eventInfo[1];

      callback.call(context, data);
    })
  }
}

// 导出代码
module.exports = {
  EVENT_KEYS: EVENT_KEYS,
  register: register,
  unregister: unregister,
  post: post
}

