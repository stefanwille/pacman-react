import styled from 'styled-components/macro';

const DEFAULT_SIZE = '8px';

const SIZES: { [key: string]: string } = {
  small: '8px',
  middle: '16px',
  large: '24px',
};

const convertSize = (size: string): string => {
  const convertedSize = SIZES[size];
  return convertedSize ?? size;
};

export const HSpace = styled.div<{ size?: string }>`
  width: ${({ size = DEFAULT_SIZE }) => convertSize(size)};
`;

export const VSpace = styled.div<{ size?: string }>`
  height: ${({ size = DEFAULT_SIZE }) => convertSize(size)};
`;
