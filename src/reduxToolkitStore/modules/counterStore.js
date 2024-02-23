import {createSlice} from '@reduxjs/toolkit';

// import customAxios from '~/api/http';

const counter = createSlice({
    // 模块名称独一无二
    name: 'counter',
    // 初始数据
    initialState: {
        count: 1,
        channelList: []
    },
    // 修改数据的同步方法
    reducers: {
        modifyCount(state, action) {
            state.count = action.payload;
        },
        setChannelList(state, action) {
            state.channelList = action.payload;
        }
    }
});

const {modifyCount, setChannelList} = counter.actions;

// 异步调用接口，获取数据后用dispatch
const url = 'http://geek.itheima.net/v1_0/channels';
const fetchChannelList = () => {
    return async (dispatch) => {
        // const res = await customAxios.get(url)
        // dispatch(setChannelList(res.data.data.channels))
    };
};

// export导出
export {modifyCount, fetchChannelList};

// 默认导出
const counterReducer = counter.reducer;
export default counterReducer;
