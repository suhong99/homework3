import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  records: [],
  isLoading: false, //통신시 true 로 끝날시 다시 false
  error: null, //통신 실패시 보낼 값 담음
};

export const __getRecords = createAsyncThunk(
  "getRecords",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/records");
      console.log(data);
      console.log(data.data);
      console.log(thunkAPI.fulfillWithValue(data.data));

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {},
  extraReducers: {
    [__getRecords.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getRecords.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.records = action.payload; // Store에 있는 records에 서버에서 가져온 records를 넣습니다.
    },
    [__getRecords.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const {} = recordsSlice.actions;
export default recordsSlice.reducer;
