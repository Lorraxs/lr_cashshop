import React, { useMemo } from 'react';
import { CartItem as CartItemType } from '../types';
import { Box, Image, Text } from 'lr-components';
import { FaCoins } from 'react-icons/fa';
import { CiMoneyBill } from 'react-icons/ci';

interface Props {
  cart: CartItemType;
}

function CartItem(props: Props) {
  const { cart } = props;
  const price = useMemo(() => {
    const price = cart.item.price[cart.paymentMethod];
    return price || 0;
  }, [cart]);
  const ConcurentIcon = useMemo(() => {
    if (cart.paymentMethod === 'coin') {
      return <FaCoins color='#e2d200' />;
    }
    return <CiMoneyBill />;
  }, [cart]);
  return (
    <Box
      rBorderRadius={10}
      backgroundColor='#ffffff21'
      rPadding={10}
      boxSizing='border-box'
      display='flex'
      justifyContent='space-between'
      width={'100%'}
    >
      <Box display='flex' flexDirection='column' rGap={10}>
        <Image
          src={
            cart.item.image ||
            `nui://ox_inventory/web/images/${cart.item.name}.png`
          }
          objectFit='cover'
          rWidth={100}
          rHeight={100}
          rBorderRadius={10}
          overflow='hidden'
        />
        <Text rFontSize={15}>
          {' '}
          {cart.item.label}({cart.item.name})
        </Text>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        rGap={10}
      >
        <Text rFontSize={15}> {cart.quantity}</Text>
        <Text rFontSize={15}> x </Text>
        <Text rFontSize={15}> {price.toLocaleString()}</Text>
        {ConcurentIcon}
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        rGap={10}
      >
        <Text rFontSize={15}> Thành tiền:</Text>
        <Text rFontSize={15}> {(price * cart.quantity).toLocaleString()}</Text>
        {ConcurentIcon}
      </Box>
    </Box>
  );
}

export default CartItem;
