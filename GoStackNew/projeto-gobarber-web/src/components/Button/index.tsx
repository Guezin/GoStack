import React, { ButtonHTMLAttributes } from 'react';
import { ClipLoader } from 'react-spinners';

import { Container, pacmanStyles } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? (
      <ClipLoader
        size={10}
        css={pacmanStyles}
        loading={loading}
        color={'black'}
      />
    ) : (
      children
    )}
  </Container>
);

export default Button;
