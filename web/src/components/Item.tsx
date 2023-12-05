import { Box, Image, Text } from 'lr-components';
import React from 'react';
import { Item as ItemType } from '../types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setSelectedItem } from '../store/items';
import { FaCoins } from 'react-icons/fa';
import { CiMoneyBill } from 'react-icons/ci';

interface Props {
  item: ItemType;
  style?: React.CSSProperties;
}

const Wrapper = styled(Box)`
  background: linear-gradient(
    100deg,
    rgba(143, 76, 254, 1) 0%,
    rgba(70, 112, 249, 1) 100%
  );
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    transition: all 0.3s ease-in-out;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(110deg, #ddc701 0%, #f7fc00 100%);
    left: 0;
    top: 0;
    opacity: 0;
  }
  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;

const Item = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { item, style } = props;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div style={style}>
      <Wrapper
        rWidth={150}
        rHeight={150}
        rBorderRadius={10}
        rPadding={10}
        display='flex'
        rGap={5}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        ref={ref}
        onClick={() => {
          dispatch(setSelectedItem(item));
        }}
      >
        <Box display='flex' width={'100%'} rGap={10}>
          {item.price.coin && (
            <Box
              top={0}
              boxSizing='border-box'
              display='flex'
              right={0}
              rBorderRadius={10}
              rGap={5}
              alignItems='center'
            >
              <Text fontFamily='Roboto' rFontSize={12}>
                {item.price.coin.toLocaleString()}
              </Text>
              <FaCoins color='#e2d200' />
            </Box>
          )}
          {item.price.money && (
            <Box
              top={0}
              boxSizing='border-box'
              display='flex'
              left={0}
              rBorderRadius={10}
              rGap={5}
              alignItems='center'
            >
              <Text fontFamily='Roboto' rFontSize={12}>
                {item.price.money.toLocaleString()}
              </Text>
              <CiMoneyBill />
            </Box>
          )}
        </Box>
        <Image
          src={item.image || `nui://ox_inventory/web/images/${item.name}.png`}
          width={'100%'}
          height={'100%'}
          objectFit='cover'
          rBorderRadius={10}
          overflow='hidden'
          zIndex={99}
        />
        <Box bottom={0} width={'100%'} boxSizing='border-box'>
          <Text fontFamily='Roboto' rFontSize={12}>
            {item.label}
          </Text>
        </Box>
      </Wrapper>
    </div>
  );
});

export default Item;
