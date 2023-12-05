import { Box, Image, Text } from 'lr-components';
import React from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { decreaseCartItem, increaseCartItem } from '../store/items';
import { motion, AnimatePresence } from 'framer-motion';

const CustomButton = styled(Box)`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const MotionBox = motion(Box);

function Carts() {
  const carts = useSelector((state: RootState) => state.items.carts);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box width={'100%'} height={'100%'}>
      <OverlayScrollbarsComponent
        style={{
          width: '100%',
          height: '100%',
        }}
        defer
      >
        <Box display='flex' flexDirection='column' rGap={10}>
          <AnimatePresence mode='sync'>
            {carts.map((cart) => {
              return (
                <MotionBox
                  rBorderRadius={10}
                  backgroundColor='#ffffff21'
                  key={cart.id}
                  rPadding={10}
                  boxSizing='border-box'
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.0, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ ease: 'easeInOut' }}
                >
                  <Box
                    display='flex'
                    width={'100%'}
                    alignItems='flex-start'
                    justifyContent='space-between'
                  >
                    <Box
                      display='flex'
                      flexDirection='column'
                      height={'100%'}
                      rGap={5}
                    >
                      <Text
                        rFontSize={15}
                        fontWeight={600}
                        borderLeft={'solid #8b4efe 2px'}
                        rPadding={[0, 0, 0, 5]}
                      >
                        {cart.item.label}({cart.item.name})
                      </Text>
                      <Text
                        rFontSize={15}
                        borderLeft={'solid #8b4efe 2px'}
                        rPadding={[0, 0, 0, 5]}
                      >
                        Phương thức thanh toán:{' '}
                        {cart.paymentMethod === 'coin' ? 'Coin' : 'Tiền Ingame'}
                      </Text>
                      <Text
                        rFontSize={15}
                        justifySelf='flex-end'
                        borderLeft={'solid #8b4efe 2px'}
                        rPadding={[0, 0, 0, 5]}
                        color='#f4f500'
                        fontWeight={600}
                      >
                        Thành tiền:{' '}
                        {(
                          cart.quantity *
                          (cart.item.price[cart.paymentMethod] || 0)
                        ).toLocaleString()}
                        {cart.paymentMethod === 'coin'
                          ? ' Coin'
                          : ' Tiền Ingame'}
                      </Text>
                    </Box>
                    <Box
                      display='flex'
                      flexDirection='column'
                      rGap={10}
                      alignItems='center'
                    >
                      <Image
                        src={
                          cart.item.image ||
                          `nui://ox_inventory/web/images/${cart.item.name}.png`
                        }
                        objectFit='cover'
                        rWidth={64}
                        rHeight={64}
                        rBorderRadius={10}
                        overflow='hidden'
                      />
                      <Box display='flex' alignItems='center' rGap={10}>
                        <CustomButton
                          background={`linear-gradient(
                        100deg,
                        rgba(143, 76, 254, 1) 0%,
                        rgba(70, 112, 249, 1) 100%
                      )`}
                          rWidth={30}
                          rHeight={30}
                          rBorderRadius={50}
                          display='flex'
                          justifyContent='center'
                          alignItems='center'
                          onClick={() => {
                            dispatch(increaseCartItem(cart.id));
                          }}
                        >
                          <IoAdd size={20} />
                        </CustomButton>
                        <Text rFontSize={15}>{cart.quantity}</Text>
                        <CustomButton
                          background={`linear-gradient(
                        100deg,
                        rgba(143, 76, 254, 1) 0%,
                        rgba(70, 112, 249, 1) 100%
                      )`}
                          rWidth={30}
                          rHeight={30}
                          rBorderRadius={50}
                          display='flex'
                          justifyContent='center'
                          alignItems='center'
                          onClick={() => {
                            dispatch(decreaseCartItem(cart.id));
                          }}
                        >
                          <IoRemoveOutline size={20} />
                        </CustomButton>
                      </Box>
                    </Box>
                  </Box>
                </MotionBox>
              );
            })}
          </AnimatePresence>
        </Box>
      </OverlayScrollbarsComponent>
    </Box>
  );
}

export default Carts;
