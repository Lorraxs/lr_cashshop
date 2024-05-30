import { Box, Text, useMenu } from "lr-components";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import AppButton from "./AppButton";
import { MdHistory } from "react-icons/md";
import styled from "styled-components";
import { TbShoppingCartCopy } from "react-icons/tb";
import Carts from "./Carts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setShowConfirmModal } from "../store/items";
import Histories from "./Histories";

const PaidButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: linear-gradient(
    110deg,
    rgba(0, 252, 55, 0.8) 0%,
    rgba(1, 221, 208, 0.8) 100%
  );
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: linear-gradient(
      110deg,
      rgba(1, 221, 208, 0.8) 0%,
      rgba(0, 252, 55, 0.8) 100%
    );
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }
`;

function UserAction() {
  const menu = useMenu([
    {
      name: "cart",
      label: "Giỏ Hàng",
      icon: <CiShoppingCart size={30} />,
    },
    {
      name: "histories",
      label: "Lịch Sử",
      icon: <MdHistory size={30} />,
    },
  ]);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      display="flex"
      flexDirection="column"
      rBorderRadius={10}
      background={"rgba(135, 80, 253, 0.20)"}
      rWidth={450}
      rHeight={530}
      rPadding={25}
      backdropFilter="blur(5px)"
      boxSizing="border-box"
      rGap={10}
    >
      <Box width={"100%"} display="flex" rHeight={60} rGap={10}>
        {menu.menuItems.map((item, index) => {
          return (
            <AppButton
              rHeight={60}
              rBorderRadius={10}
              rGap={10}
              key={index.toString()}
              active={menu.activeMenu.name === item.name}
              onClick={() => {
                menu.switchMenu(index);
              }}
            >
              {item.icon}
              <Text fontFamily="Roboto">{item.label}</Text>
            </AppButton>
          );
        })}
      </Box>
      <Box width={"100%"} rHeight={menu.activeMenu.name === "cart" ? 347 : 417}>
        {menu.activeMenu.name === "cart" && <Carts />}
        {menu.activeMenu.name === "histories" && <Histories />}
      </Box>
      {menu.activeMenu.name === "cart" && (
        <PaidButton
          width={"100%"}
          rHeight={60}
          rBorderRadius={10}
          rGap={10}
          onClick={() => {
            dispatch(setShowConfirmModal(true));
          }}
        >
          <TbShoppingCartCopy size={"30"} />
          <Text rFontSize={18} rLineHeight={18}>
            THANH TOÁN
          </Text>
        </PaidButton>
      )}
    </Box>
  );
}

export default UserAction;
