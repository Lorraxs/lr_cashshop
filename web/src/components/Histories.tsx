import { Box, Image, Text } from 'lr-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { FaCoins } from 'react-icons/fa';
import { CiMoneyBill } from 'react-icons/ci';
import { isEnvBrowser } from '../utils/misc';
import { fetchHistories } from '../store/user';

const dateTimeFormat = new Intl.DateTimeFormat('vi-VN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

function Histories() {
  const histories = useSelector(
    (state: RootState) => state.user.user.histories
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!isEnvBrowser()) {
      dispatch(fetchHistories());
    }
  }, [dispatch]);

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
          {histories.map((history) => {
            return (
              <Box
                key={history.date.toString() + history.item.name}
                rBorderRadius={10}
                backgroundColor='#ffffff21'
                rPadding={10}
                boxSizing='border-box'
                display='flex'
                flexDirection='column'
                rGap={5}
              >
                <Text rFontSize={12}>
                  {dateTimeFormat.format(history.date * 1000)}
                </Text>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Box
                    width={'40%'}
                    display='flex'
                    flexDirection='column'
                    rGap={5}
                  >
                    <Image
                      src={
                        history.item.image ||
                        `nui://ox_inventory/web/images/${history.item.name}.png`
                      }
                      objectFit='cover'
                      rWidth={64}
                      rHeight={64}
                      rBorderRadius={10}
                      overflow='hidden'
                    />
                    <Text rFontSize={12}>{history.item.label}</Text>
                  </Box>
                  <Text
                    rFontSize={16}
                    fontWeight={600}
                    width={'30%'}
                    textAlign='end'
                  >
                    {history.quantity}
                  </Text>
                  <Text
                    rFontSize={16}
                    fontWeight={600}
                    width={'30%'}
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    rGap={10}
                  >
                    {history.total.toLocaleString()}
                    {history.paymentMethod === 'coin' ? (
                      <FaCoins color='#e2d200' />
                    ) : (
                      <CiMoneyBill />
                    )}
                  </Text>
                </Box>
                {/* {JSON.stringify(history)} */}
              </Box>
            );
          })}
        </Box>
      </OverlayScrollbarsComponent>
    </Box>
  );
}

export default Histories;
