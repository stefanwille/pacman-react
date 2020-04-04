import styled from 'styled-components/macro';

const SIZES: { [key: string]: string } = {
  small: '8px',
  middle: '16px',
  large: '24px',
};

const convertSize = (size: string): string => {
  const convertedSize = SIZES[size];
  if (convertedSize) {
    return convertedSize;
  } else {
    return size;
  }
};

export const HSpace = styled.div<{ size?: string }>`
  width: ${({ size = '8px' }) => convertSize(size)};
`;

export const VSpace = styled.div<{ size?: string }>`
  height: ${({ size = '8px' }) => convertSize(size)};
`;
