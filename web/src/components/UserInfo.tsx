import { Box, Text } from 'lr-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { CiMoneyBill } from 'react-icons/ci';
import { FaCoins } from 'react-icons/fa';
import styled from 'styled-components';
import { setShowDonateModal } from '../store/items';

const DonateBtn = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: linear-gradient(110deg, #f7fc00 0%, #ddc701 100%);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: linear-gradient(110deg, #ddc701 0%, #f7fc00 100%);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }
`;

function UserInfo() {
  const userStore = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      rBorderRadius={10}
      background={'rgba(135, 80, 253, 0.20)'}
      rWidth={450}
      rPadding={25}
      backdropFilter='blur(5px)'
      boxSizing='border-box'
    >
      <Text rFontSize={32} rLineHeight={32} rHeight={50} fontFamily='Roboto'>
        {userStore.user.name}
      </Text>
      <Box rWidth={400} display='flex' rHeight={50}>
        <Box rWidth={50} rHeight={50} rPadding={10} boxSizing='border-box'>
          <CiMoneyBill size={'30'} />
        </Box>
        <Text
          rWidth={300}
          textAlign='center'
          display='flex'
          justifyContent='center'
          alignItems='center'
          rFontSize={18}
        >
          {userStore.user.money.toLocaleString()}
        </Text>
      </Box>
      <Box rWidth={400} display='flex' rHeight={50}>
        <Box rWidth={50} rHeight={50} rPadding={10} boxSizing='border-box'>
          <FaCoins size={'30'} />
        </Box>
        <Text
          rWidth={300}
          textAlign='center'
          display='flex'
          justifyContent='center'
          alignItems='center'
          rFontSize={18}
          color='#FCC500'
        >
          {userStore.user.coin.toLocaleString()}
        </Text>
      </Box>
      <DonateBtn
        rHeight={60}
        rGap={10}
        rBorderRadius={10}
        onClick={() => {
          dispatch(setShowDonateModal(true));
        }}
      >
        <CiMoneyBill size={'30'} color='#1f1f1f' />
        <Text rFontSize={18} rLineHeight={18} color='#1f1f1f'>
          Donate
        </Text>
      </DonateBtn>
    </Box>
  );
}

export default UserInfo;
