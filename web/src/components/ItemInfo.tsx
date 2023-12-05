import { Box, Button, Image, Input, Text } from 'lr-components';
import React, { useMemo, useState } from 'react';
import { Item } from '../types';
import { MdCancel } from 'react-icons/md';
import { FaCartArrowDown } from 'react-icons/fa';
import { CiMoneyBill } from 'react-icons/ci';
import { FaCoins } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addCartItem, clearSelectedItem } from '../store/items';
import Select from './Select';

interface Props {
  item: Item;
}

function ItemInfo(props: Props) {
  const { item } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    item.price.coin ? 'coin' : 'money'
  );
  const [quantity, setQuantity] = useState<number | null>(null);
  const priceOptions = useMemo(() => {
    const options = [];
    if (item.price.coin) {
      options.push({
        label: 'Tiền xu',
        value: 'coin',
      });
    }
    if (item.price.money) {
      options.push({
        label: 'Tiền mặt',
        value: 'money',
      });
    }
    return options;
  }, [item]);
  return (
    <Box display='flex' rGap={10}>
      <Box rWidth={300} display='flex' flexDirection='column' rGap={10}>
        <Box
          rBorderRadius={10}
          display='flex'
          justifyContent='center'
          alignItems='center'
          backgroundColor='#ffffff21'
          width={'100%'}
          rPadding={10}
          boxSizing='border-box'
        >
          <Text rFontSize={15} fontWeight={600}>
            {item.label}({item.name})
          </Text>
        </Box>
        <Box
          rBorderRadius={10}
          display='flex'
          justifyContent='center'
          alignItems='center'
          backgroundColor='#ffffff21'
          width={'100%'}
          rPadding={10}
          boxSizing='border-box'
        >
          <Text rFontSize={15}>{item.description}</Text>
        </Box>
        <Box
          rBorderRadius={10}
          display='flex'
          justifyContent='center'
          flexDirection='column'
          backgroundColor='#ffffff21'
          width={'100%'}
          rPadding={10}
          boxSizing='border-box'
          rGap={10}
        >
          <Text rFontSize={15} fontWeight={600} fontFamily='Roboto'>
            Giá
          </Text>
          {item.price.coin && (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              color='#ddc701'
              width={'100%'}
            >
              <FaCoins size={'18'} />
              <Text
                rFontSize={15}
                fontWeight={600}
                rLineHeight={18}
                fontFamily='Roboto'
              >
                {item.price.coin.toLocaleString()}
              </Text>
            </Box>
          )}
          {item.price.money && (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              width={'100%'}
            >
              <CiMoneyBill size={'18'} />
              <Text rFontSize={15} fontWeight={600} rLineHeight={18}>
                {item.price.money.toLocaleString()}
              </Text>
            </Box>
          )}
        </Box>
        <Box
          rBorderRadius={10}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          backgroundColor='#ffffff21'
          width={'100%'}
          rPadding={10}
          boxSizing='border-box'
          rGap={10}
        >
          <Text rFontSize={15} fontWeight={600}>
            Số lượng còn lại
          </Text>
          <Text rFontSize={15}>{item.stock !== -1 ? item.stock : '∞'}</Text>
        </Box>
      </Box>
      <Box rWidth={300} display='flex' flexDirection='column' rGap={10}>
        <Image
          src={item.image || `nui://ox_inventory/web/images/${item.name}.png`}
          objectFit='cover'
          rWidth={300}
          rHeight={300}
          rBorderRadius={10}
          overflow='hidden'
        />
        <Box
          rBorderRadius={10}
          display='flex'
          justifyContent='space-between'
          backgroundColor='#ffffff21'
          width={'100%'}
          rPadding={10}
          boxSizing='border-box'
          flexDirection='column'
          rGap={10}
        >
          <Text rFontSize={15} fontWeight={600}>
            Phương thức thanh toán
          </Text>
        </Box>
        <Select
          options={priceOptions}
          value={selectedPaymentMethod}
          onChange={(e) => {
            setSelectedPaymentMethod(e.target.value);
          }}
        />
        <Input
          placeholder='Nhập số lượng'
          width={'100%'}
          type='number'
          value={quantity || undefined}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value));
          }}
        />
        <Box display='flex' rGap={10}>
          <Button
            label='Thêm vào giỏ hàng'
            rHeight={50}
            background={'linear-gradient(110deg, #f7fc00 0%, #ddc701 100%)'}
            fontFamily='Roboto'
            fontWeight={500}
            icon={<FaCartArrowDown size={'30'} color='#1f1f1f' />}
            onClick={() => {
              dispatch(
                addCartItem({
                  item: item,
                  quantity: quantity || 1,
                  paymentMethod: selectedPaymentMethod as 'coin' | 'money',
                })
              );
              dispatch(clearSelectedItem());
            }}
          />
          <Button
            label='Hủy'
            rHeight={50}
            background={
              'linear-gradient(144deg, rgba(239,35,60,1) 0%, rgba(217,4,41,1) 100%)'
            }
            color='white'
            fontFamily='Roboto'
            fontWeight={500}
            icon={<MdCancel size={'30'} color='white' />}
            onClick={() => {
              dispatch(clearSelectedItem());
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ItemInfo;
