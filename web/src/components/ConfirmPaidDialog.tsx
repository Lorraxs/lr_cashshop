import { Box, Button, Text } from 'lr-components';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import CartItem from './CartItem';
import { FaCoins } from 'react-icons/fa';
import { CiMoneyBill } from 'react-icons/ci';
import { MdCancel } from 'react-icons/md';
import { buy, setShowConfirmModal } from '../store/items';
import { TbShoppingCartCopy } from 'react-icons/tb';

const ConfirmPaidDialog = React.forwardRef<HTMLDivElement>((props, ref) => {
  const carts = useSelector((state: RootState) => state.items.carts);
  const dispatch = useDispatch<AppDispatch>();
  const sumCoin = useMemo(() => {
    let sum = 0;
    carts.forEach((cart) => {
      if (cart.paymentMethod === 'coin')
        sum += (cart.item.price.coin || 0) * cart.quantity;
    });
    return sum;
  }, [carts]);
  const sumMoney = useMemo(() => {
    let sum = 0;
    carts.forEach((cart) => {
      if (cart.paymentMethod === 'money')
        sum += (cart.item.price.money || 0) * cart.quantity;
    });
    return sum;
  }, [carts]);
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
      ref={ref}
    >
      <Box
        rWidth={1210}
        rHeight={700}
        rBorderRadius={10}
        rPadding={10}
        display='flex'
        rGap={20}
      >
        <Box
          rWidth={800}
          height={'100%'}
          display='flex'
          flexDirection='column'
          rGap={10}
        >
          <Text
            rFontSize={20}
            rLineHeight={20}
            fontFamily='Roboto'
            fontWeight={600}
          >
            ĐƠN HÀNG
          </Text>
          <Box rHeight={650}>
            <OverlayScrollbarsComponent
              style={{
                width: '100%',
                height: '100%',
              }}
              defer
            >
              <Box
                display='flex'
                flexDirection='column'
                rGap={10}
                width={'100%'}
              >
                {carts.map((cart, index) => {
                  return <CartItem cart={cart} key={index.toString()} />;
                })}
              </Box>
            </OverlayScrollbarsComponent>
          </Box>
        </Box>
        <Box
          rWidth={400}
          height={'100%'}
          display='flex'
          flexDirection='column'
          alignItems='center'
          rGap={10}
        >
          <Box display='flex' flexDirection='column' width={'100%'} rGap={10}>
            <Text
              rFontSize={20}
              rLineHeight={20}
              fontFamily='Roboto'
              fontWeight={600}
              textAlign='right'
            >
              TỔNG TIỀN
            </Text>
            <Box
              width={'100%'}
              rBorderRadius={10}
              backgroundColor='#ffffff21'
              rPadding={10}
              boxSizing='border-box'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <FaCoins color='#e2d200' />
              {sumCoin.toLocaleString()}
            </Box>
            <Box
              width={'100%'}
              rBorderRadius={10}
              backgroundColor='#ffffff21'
              rPadding={10}
              boxSizing='border-box'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <CiMoneyBill />
              {sumMoney.toLocaleString()}
            </Box>
          </Box>
          <Box display='flex' width={'100%'} rGap={10}>
            <Button
              label='THANH TOÁN'
              rHeight={50}
              background={'linear-gradient(110deg, #f7fc00 0%, #ddc701 100%)'}
              fontFamily='Roboto'
              fontWeight={500}
              icon={<TbShoppingCartCopy size={'30'} color='#1f1f1f' />}
              onClick={() => {
                dispatch(buy());
              }}
            />
            <Button
              label='HỦY'
              rHeight={50}
              background={
                'linear-gradient(144deg, rgba(239,35,60,1) 0%, rgba(217,4,41,1) 100%)'
              }
              color='white'
              fontFamily='Roboto'
              fontWeight={500}
              icon={<MdCancel size={'30'} color='white' />}
              onClick={() => {
                dispatch(setShowConfirmModal(false));
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default ConfirmPaidDialog;
