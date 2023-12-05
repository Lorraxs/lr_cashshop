import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig, History, User } from '../../types';
import { isEnvBrowser } from '../../utils/misc';
import { generateHistories } from '../../utils/mockData';
import { fetchNui } from '../../utils/fetchNui';

interface InitialState {
  user: User;
}

export const fetchHistories = createAsyncThunk<
  History[],
  undefined,
  AsyncThunkConfig
>('user/fetchHistories', async (_, thunkAPI) => {
  try {
    const response = await fetchNui<History[]>('fetchHistories');
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: InitialState = {
  user: {
    id: '1',
    name: 'Lorraxs',
    money: 100000,
    coin: 2000,
    histories: isEnvBrowser() ? generateHistories(100) : [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistories.fulfilled, (state, action) => {
      state.user.histories = action.payload;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
