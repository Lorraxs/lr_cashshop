import { Box, Button, Image, Text } from 'lr-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { MdCancel } from 'react-icons/md';
import { setShowDonateModal } from '../store/items';

const DonateDialog = React.forwardRef<HTMLDivElement>((props, ref) => {
  const donateData = useSelector((state: RootState) => state.items.donateData);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      width={'100vw'}
      height={'100vh'}
      backgroundColor='#1f1f1f7a'
      backdropFilter='blur(20px)'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      rGap={15}
      ref={ref}
    >
      <Box display='flex' rGap={10}>
        {donateData.map((item, index) => {
          return (
            <Box
              key={index.toString()}
              rWidth={300}
              backgroundColor='#ffffff21'
              rBorderRadius={10}
              rPadding={[10, 20]}
              boxSizing='border-box'
              display='flex'
              flexDirection='column'
              alignItems='center'
              rGap={5}
            >
              <Image src={item.bankIcon || ''} rWidth={200} rHeight={100} />
              <Box width={'100%'} display='flex' justifyContent='space-between'>
                <Text fontFamily='Roboto' rFontSize={15}>
                  Chủ TK:
                </Text>
                <Text fontFamily='Roboto' rFontSize={15} fontWeight={600}>
                  {item.accountName}
                </Text>
              </Box>
              <Box width={'100%'} display='flex' justifyContent='space-between'>
                <Text fontFamily='Roboto' rFontSize={15}>
                  Số Tài Khoản:
                </Text>
                <Text fontFamily='Roboto' rFontSize={15} fontWeight={600}>
                  {item.accountNumber}
                </Text>
              </Box>
              <Box width={'100%'} display='flex' justifyContent='space-between'>
                <Text fontFamily='Roboto' rFontSize={15}>
                  Ngân Hàng:
                </Text>
                <Text fontFamily='Roboto' rFontSize={15} fontWeight={600}>
                  {item.bankName}
                </Text>
              </Box>
              <Box width={'100%'} display='flex' justifyContent='space-between'>
                <Text fontFamily='Roboto' rFontSize={15}>
                  Nội dung:
                </Text>
                <Text fontFamily='Roboto' rFontSize={15} fontWeight={600}>
                  DONATE ID-{user.id}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Text
        fontFamily='Roboto'
        rFontSize={18}
        fontWeight={600}
        color='#f4f600'
        rWidth={600}
        textAlign='center'
      >
        Sau khi chuyển thành công vui lòng lưu lại biên lai và gửi cho admin để
        được cộng tiền vào tài khoản.
      </Text>
      <Button
        label='ĐÓNG'
        rHeight={50}
        background={
          'linear-gradient(144deg, rgba(239,35,60,1) 0%, rgba(217,4,41,1) 100%)'
        }
        color='white'
        fontFamily='Roboto'
        fontWeight={500}
        icon={<MdCancel size={'30'} color='white' />}
        onClick={() => {
          dispatch(setShowDonateModal(false));
        }}
      />
    </Box>
  );
});

export default DonateDialog;
