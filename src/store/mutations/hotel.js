module.exports = {
  HOTEL(state,payload){
    state.hotel = {...state.hotel,...payload}
  },
  ROOMNUMBERLIST(state,payload){
    state.roomNumberList = [...payload]
  }
}
