import styled from 'styled-components/macro';

const DEFAULT_SIZE = '8px';

const SIZE_MAPPING: { [key: string]: string } = {
  small: '8px',
  medium: '16px',
  large: '24px',
};

type Size = 'small' | 'middle' | 'large' | string;
const mappedSize = (size: Size): string => SIZE_MAPPING[size] ?? size;

export const HSpace = styled.div<{ size?: Size }>`
  width: ${({ size = DEFAULT_SIZE }) => mappedSize(size)};
`;

export const VSpace = styled.div<{ size?: Size }>`
  height: ${({ size = DEFAULT_SIZE }) => mappedSize(size)};
`;
