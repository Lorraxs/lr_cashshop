import { Box, Image } from "lr-components";
import React from "react";
import UserInfo from "./UserInfo";
import UserAction from "./UserAction";

const User = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      rWidth={450}
      rHeight={980}
      rGap={25}
      ref={ref}
    >
      <Image src="./images/logo.gif" rHeight={140} rWidth={198} />
      <UserInfo />
      <UserAction />
    </Box>
  );
});

export default User;
