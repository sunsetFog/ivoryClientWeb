import { createSlice } from 'redux';

/*
教程》应用结构》创建 Slice Reducer 和 Action
createSlice报错   这文件可删了
 */
export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      value: 0
    },
    reducers: {
      increment: state => {
        // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。
        // 并不是真正的改变 state 因为它使用了 immer 库
        // 当 immer 检测到 "draft state" 改变时，会基于这些改变去创建一个新的
        // 不可变的 state
        state.value += 1
      },
      decrement: state => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      }
    }
  })
  
  export const { increment, decrement, incrementByAmount } = counterSlice.actions
  
  export default counterSlice.reducer

// 但是实例化store要用configureStore
// import { configureStore } from '@reduxjs/toolkit'

// import counterStore from './counterStore'

// export default configureStore({
//   reducer: {
//     // 注册子模块
//     counterStore
//   }
// })