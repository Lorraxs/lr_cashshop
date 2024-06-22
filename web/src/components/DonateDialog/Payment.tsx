import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { MdCancel } from "react-icons/md";
import { donateActions } from "../../store/donate";
import { Button } from "@nextui-org/react";
import { IoReturnUpBack } from "react-icons/io5";
import { Loading } from "lr-components";
import { MdOutlineDone, MdOutlineError } from "react-icons/md";

function Payment() {
  const store = useSelector((state: RootState) => state.donate);
  const dispatch = useDispatch<AppDispatch>();
  const paymentData = store.paymentData;
  const accountName = `Mai Tran Hoang Long`;
  if (!paymentData) return null;
  return (
    <div className="flex gap-10 flex-col items-center">
      <div className="text-center flex gap-10 ">
        <img
          src={`https://img.vietqr.io/image/970422-0068668826878-compact2.jpg?amount=${
            paymentData.amount + "000"
          }&addInfo=${paymentData.code}&accountName=${accountName}`}
          alt=""
          className="rounded-3xl"
        />
        <div className="text-left bg-white/10 rounded-3xl p-10 backdrop-blur-sm w-[540px]">
          <h1 className="text-2xl font-bold mb-4">HƯỚNG DẪN THANH TOÁN</h1>
          <h2 className="text-xl font-bold mb-4">SCAN MÃ QR</h2>
          <p className="text-lg">
            <span className="text-yellow-400">Bước 1</span>: Scan mã QR bên cạnh
            bằng ứng dụng ngân hàng của bạn
            <br />
            <span className="text-yellow-400">Bước 2</span>: Đợi hệ thống xử lý
            (Sau khoảng 5 phút không nhận được kết quả, vui lòng liên hệ admin)
            <br />
          </p>
          <h2 className="text-xl font-bold my-4">CHUYỂN KHOẢN</h2>
          <p className="text-lg">
            <span className="text-yellow-400">Bước 1</span>: Chuyển khoản đến số{" "}
            <span className="text-red-500 font-bold">0068668826878</span> Ngân
            hàng <span className="text-red-500 font-bold">MBBank</span> Số tiền{" "}
            <span className="text-red-500 font-bold">
              {paymentData.amount * 1000}
            </span>{" "}
            Nội dung{" "}
            <span className="text-red-500 font-bold">{paymentData.code}</span>{" "}
            Chủ tài khoản{" "}
            <span className="text-red-500 font-bold">{accountName}</span>
            <br />
            <span className="text-yellow-400">Bước 2</span>: Đợi hệ thống xử lý
            (Sau khoảng 5 phút không nhận được kết quả, vui lòng liên hệ admin)
            <br />
          </p>
          {store.donateStatus === "PENDING" && (
            <div className="flex flex-col justify-center items-center mt-5 gap-2">
              <Loading />
              <h1 className="text-yellow-500 font-bold">
                ĐANG CHỜ THANH TOÁN ...
              </h1>
            </div>
          )}
          {store.donateStatus === "SUCCESS" && (
            <div className="flex flex-col justify-center items-center text-center mt-5 gap-2">
              <MdOutlineDone className="text-green-500 text-5xl" />
              <h1 className="text-green-500 font-bold">
                ĐÃ NHẬN ĐƯỢC THANH TOÁN. BẠN CÓ THỂ ĐÓNG TRANG NÀY
              </h1>
            </div>
          )}
          {store.donateStatus === "INVALID_AMOUNT" && (
            <div className="flex flex-col justify-center items-center text-center mt-5 gap-2">
              <MdOutlineError className="text-red-500 text-5xl" />
              <h1 className="text-red-500 font-bold">
                SỐ TIỀN ĐÃ GỬI KHÔNG HỢP LỆ. VUI LÒNG LIÊN HỆ ADMIN
              </h1>
            </div>
          )}
          {store.donateStatus === "INVALID_PLAYER" && (
            <div className="flex flex-col justify-center items-center text-center mt-5 gap-2">
              <MdOutlineError className="text-red-500 text-5xl" />
              <h1 className="text-red-500 font-bold">
                KHÔNG TÌM THẤY NGƯỜI CHƠI TRONG HỆ THỐNG. VUI LÒNG LIÊN HỆ ADMIN
              </h1>
            </div>
          )}
        </div>
      </div>
      <h1 className="text-danger-500 font-bold">
        VUI LÒNG KHÔNG ĐÓNG TRANG NÀY CHO ĐẾN KHI HOÀN THÀNH GIAO DỊCH
      </h1>
      <div>
        <Button
          className="btn-warning w-[200px] h-[50px] text-white"
          onClick={() => {
            dispatch(donateActions.setPage("SELECT_AMOUNT"));
          }}
          startContent={<IoReturnUpBack />}
        >
          TRỞ VỀ
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

export default Payment;
