import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import http from "../../api/http";
const initialState = {
  record: {
    id: 0,
    content: "",
    writer: "",
    title: "",
  },
  records: [],
  isLoading: false, //통신시 true 로 끝날시 다시 false
  isSuccess: false,
  error: null, //통신 실패시 보낼 값 담음
};
export const __getRecord = createAsyncThunk(
  "GET_RECORD", //이거 이름이 같으면 안됨?
  async (payload, thunkAPI) => {
    try {
      const { data } = await http.get(`/records/${payload}`); //
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __getRecords = createAsyncThunk(
  "GET_RECORDS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:3001/records"); //
      console.log(data);
      console.log("getRecords부분");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __addRecord = createAsyncThunk(
  "ADD_RECORD",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/records",
        payload
      ); //Write에서 보낸 값을 payload가 보냄
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const __deleteRecord = createAsyncThunk(
  "DELETE_RECORD",
  async (payload, thunkAPI) => {
    try {
      axios.delete(`http://localhost:3001/records/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateRecord = createAsyncThunk(
  "UPDATE_RECORD",
  async (payload, thunkAPI) => {
    try {
      axios.patch(`http://localhost:3001/records/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    clearRecord: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [__getRecords.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getRecords.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.records = action.payload; // Store에 있는 records에 서버에서 가져온 records를 넣습니다.
    },
    [__getRecords.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__addRecord.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addRecord.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.records.push(action.payload);
    },
    [__addRecord.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteRecord.fulfilled]: (state, action) => {
      const target = state.records.findIndex(
        (comment) => comment.id === action.payload
      );

      state.records.splice(target, 1);
    },
    [__deleteRecord.rejected]: () => {},
    [__deleteRecord.pending]: () => {},
    [__getRecord.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.record = action.payload;
    },
    [__getRecord.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getRecord.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateRecord.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.record = action.payload;
    },
    [__updateRecord.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateRecord.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearRecord } = recordsSlice.actions;
export default recordsSlice.reducer;
