import { Box, Text } from 'lr-components';
import React from 'react';

interface Props {
  name: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

function CheckBox(props: Props) {
  const { label, active, onClick } = props;

  return (
    <Box
      onClick={onClick}
      display='flex'
      rPadding={[0, 10]}
      alignItems='center'
      rGap={10}
      cursor='pointer'
    >
      {active ? (
        <Box rWidth={24} rHeight={24}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <rect
              x='0.5'
              y='0.5'
              width='23'
              height='23'
              rx='3.5'
              fill='#8F4CFE'
            />
            <rect
              x='0.5'
              y='0.5'
              width='23'
              height='23'
              rx='3.5'
              stroke='#8F4CFE'
            />
            <path
              d='M9.54998 18L3.84998 12.3L5.27498 10.875L9.54998 15.15L18.725 5.97501L20.15 7.40001L9.54998 18Z'
              fill='white'
            />
          </svg>
        </Box>
      ) : (
        <Box rWidth={24} rHeight={24}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <rect
              x='0.5'
              y='0.5'
              width='23'
              height='23'
              rx='3.5'
              stroke='#5d2caa'
              strokeWidth={'2'}
            />
          </svg>
        </Box>
      )}
      <Text fontFamily='Roboto' rFontSize={18} rLineHeight={18}>
        {label}
      </Text>
    </Box>
  );
}

export default CheckBox;
