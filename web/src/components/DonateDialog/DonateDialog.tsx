import { Box, Button, Image, Text } from "lr-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { MdCancel } from "react-icons/md";
import { donateActions } from "../../store/donate";
import SelectAmount from "./SelectAmount";
import Payment from "./Payment";

const DonateDialog = React.forwardRef<HTMLDivElement>((props, ref) => {
  const donateData = useSelector((state: RootState) => state.items.donateData);
  const page = useSelector((state: RootState) => state.donate.page);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const renderBody = () => {
    switch (page) {
      case "SELECT_AMOUNT":
        return <SelectAmount />;
      case "PAYMENT":
        return <Payment />;
      default:
        return null;
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width={"100vw"}
      height={"100vh"}
      backgroundColor="#1f1f1f7a"
      backdropFilter="blur(20px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className="gap-10"
      ref={ref}
    >
      {renderBody()}
      {/* <Text
        fontFamily="Roboto"
        rFontSize={18}
        fontWeight={600}
        color="#f4f600"
        rWidth={600}
        textAlign="center"
      >
        Sau khi chuyển thành công vui lòng lưu lại biên lai và gửi cho admin để
        được cộng tiền vào tài khoản.
      </Text> */}
    </Box>
  );
});

export default DonateDialog;
