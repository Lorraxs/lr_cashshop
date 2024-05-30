import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import donate, { donateActions, startPayment } from "../../store/donate";
import { FaCoins } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const PreAmounts = [100, 200, 300, 500, 1000, 2000, 5000, 10000];

function SelectAmount() {
  const store = useSelector((state: RootState) => state.donate);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="w-[500px] flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        CHỌN SỐ TIỀN DONATE
      </h1>
      <div className=" py-10">
        <div className="flex gap-5 flex-wrap justify-center">
          {PreAmounts.map((amount) => (
            <Button
              key={amount.toString()}
              size="sm"
              onClick={() =>
                dispatch(donateActions.setAmount(amount.toString()))
              }
              color="warning"
              className="btn-select-amount font-bold text-lg p-5 px-10 text-white w-[200px] h-[75px] flex items-center justify-center"
              endContent={<FaCoins />}
            >
              {amount}
            </Button>
          ))}
        </div>
      </div>
      <Input
        label="Số coin"
        type="number"
        className="w-[400px] h-[50px]"
        variant="flat"
        value={store.amount}
        onChange={(e) => {
          dispatch(donateActions.setAmount(e.target.value));
        }}
      />
      <div className="flex ">
        <Button
          className="btn-donate-next w-[200px] h-[50px]"
          onClick={() => {
            dispatch(startPayment());
          }}
        >
          THANH TOÁN
        </Button>
        <Button
          className="btn-danger w-[200px] h-[50px] text-white"
          onClick={() => {
            dispatch(donateActions.setShow(false));
          }}
          startContent={<MdCancel />}
        >
          HỦY
        </Button>
      </div>
    </div>
  );
}

export default SelectAmount;
