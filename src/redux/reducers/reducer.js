
const initState = {
  DeptData: [],
  MatData: [],
  UNitData: [],
  isLogin: false,
  trData: []
}


const reducer = (state = initState, action) => {
  const newState = { ...state }
  // console.log(action.type)
  const { data } = action
  switch (action.type) {
    case 'GET_DEPT_DATA':
      for (let i = 0; i < data.length; i += 1) {
        data[i].isCheck = true
      }
      newState.DeptData = action.data
      break
    case 'GET_MAT_DATA':
      newState.MatData = action.data
      break
    case 'GET_UNIT_DATA':
      newState.UnitData = action.data
      break
    case 'LOGIN_STATUS':
      newState.isLogin = action.isLogin
      break
    case 'UPDATE_TABLE':
      newState.DisplayTr = action.trData
      break
    default:
      break
  }
  // console.log(newState)
  return newState
}

export default reducer
