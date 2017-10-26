/**
 * Created by lisj on 2017/8/2.
 */
module.exports = {
  ISYUNBACONNECTED(state,payload){
    state.yunbaConnected = payload
  },
  DEVICEID(state, payload) {
    state.deviceId = payload
  }
};
