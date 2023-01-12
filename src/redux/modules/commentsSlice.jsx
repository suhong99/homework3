import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getCommentsThunk = createAsyncThunk(
  "GET_COMMENTS",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_RECORDS}/comments`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __getCommnetsByRecordId = createAsyncThunk(
  "GET_COMMENT_BY_RECORD_ID",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_RECORDS}/comments?recordId=${arg}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async ({ recordId, commentId }, thunkAPI) => {
    try {
      console.log(recordId, commentId);
      const data = await axios.delete(
        `${process.env.REACT_APP_RECORDS}/${commentId}`
      );
      if (data.status === 200) {
        thunkAPI.dispatch(__getCommnetsByRecordId(recordId));
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      axios.patch(`${process.env.REACT_APP_RECORDS}/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_RECORDS}`,
        arg
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  comments: {
    data: [],
    isLoading: false,
    error: null,
  },
  commentsByRecordId: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearRecord: (state) => {
      state.comments = null;
    },
  },
  extraReducers: {
    // 전체 댓글 조회
    [__getCommentsThunk.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [__getCommentsThunk.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.data = action.payload;
    },
    [__getCommentsThunk.rejected]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    },

    // 댓글 조회 (RecordId)
    [__getCommnetsByRecordId.pending]: (state) => {
      state.commentsByRecordId.isLoading = true;
    },
    [__getCommnetsByRecordId.fulfilled]: (state, action) => {
      state.commentsByRecordId.isLoading = false;
      state.commentsByRecordId.data = action.payload;
    },
    [__getCommnetsByRecordId.rejected]: (state, action) => {
      state.commentsByRecordId.isLoading = false;
      state.commentsByRecordId.error = action.payload;
    },

    // 댓글 삭제
    [__deleteComment.pending]: (state) => {
      state.commentsByRecordId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByRecordId.isLoading = false;
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByRecordId.isLoading = false;
      state.commentsByRecordId.error = action.payload;
    },

    // 댓글 수정
    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByRecordId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.isLoading = false;
      state.commentsByRecordId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 댓글 추가
    [__addComment.pending]: (state) => {
      state.commentsByRecordId.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.commentsByRecordId.isLoading = false;
      state.commentsByRecordId.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByRecordId.isLoading = false;
      state.commentsByRecordId.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
