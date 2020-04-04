import styled from 'styled-components/macro';

export const Spacer = styled.div<{ height?: string }>`
  height: ${({ height = '16px' }) => height};
`;
