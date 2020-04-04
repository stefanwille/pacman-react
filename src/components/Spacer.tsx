import styled from 'styled-components/macro';

const DEFAULT_SIZE = '8px';

const SIZE_MAPPING: { [key: string]: string } = {
  small: '8px',
  middle: '16px',
  large: '24px',
};

const mapSize = (size: string): string => {
  const mappedSize = SIZE_MAPPING[size];
  return mappedSize ?? size;
};

export const HSpace = styled.div<{ size?: string }>`
  width: ${({ size = DEFAULT_SIZE }) => mapSize(size)};
`;

export const VSpace = styled.div<{ size?: string }>`
  height: ${({ size = DEFAULT_SIZE }) => mapSize(size)};
`;
