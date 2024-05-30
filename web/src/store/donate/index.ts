import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../../types";
import { fetchNui } from "../../utils/fetchNui";
import { IPaymentCode } from "../../types/payment.type";
import { isEnvBrowser } from "../../utils/misc";

interface State {
  page: "SELECT_AMOUNT" | "PAYMENT" | "CONFIRMATION";
  amount: string;
  show: boolean;
  paymentData?: IPaymentCode;
  donateStatus: "PENDING" | "SUCCESS" | "INVALID_AMOUNT" | "INVALID_PLAYER";
}

const initialState: State = {
  page: "SELECT_AMOUNT",
  amount: "0",
  show: false,
  donateStatus: "PENDING",
};

export const startPayment = createAsyncThunk<
  IPaymentCode,
  void,
  AsyncThunkConfig
>("donate/startPayment", async (_, { dispatch, getState, rejectWithValue }) => {
  const amount = Number(getState().donate.amount);
  if (isEnvBrowser()) {
    return {
      code: "123456",
      source: 1,
      amount: amount,
    };
  }
  if (amount <= 0) {
    return rejectWithValue("Amount must be greater than 0");
  }
  if (isNaN(amount)) {
    return rejectWithValue("Amount must be a number");
  }
  const data = await fetchNui<IPaymentCode>("GetCode", { amount: amount });
  return data;
});

const donateSlice = createSlice({
  name: "donate",
  initialState,
  reducers: {
    selectAmount: (state, action: PayloadAction<string>) => {
      state.page = "PAYMENT";
      state.amount = action.payload;
    },
    backToSelectAmount: (state) => {
      state.page = "SELECT_AMOUNT";
    },
    backToPayment: (state) => {
      state.page = "PAYMENT";
    },
    setPage: (state, action: PayloadAction<State["page"]>) => {
      state.page = action.payload;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    confirm: (state) => {
      state.page = "CONFIRMATION";
    },
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
      state.page = "SELECT_AMOUNT";
      state.donateStatus = "PENDING";
    },
    setDonateStatus: (state, action: PayloadAction<State["donateStatus"]>) => {
      state.donateStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startPayment.fulfilled, (state, action) => {
      state.paymentData = action.payload;
      state.page = "PAYMENT";
      state.donateStatus = "PENDING";
    });
  },
});

export const donateActions = donateSlice.actions;
export default donateSlice.reducer;
