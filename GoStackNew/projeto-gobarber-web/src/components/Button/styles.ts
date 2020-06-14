import styled from 'styled-components';
import { shade } from 'polished';
import { css } from '@emotion/core';

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;

export const pacmanStyles = css`
  display: block;
  width: 30px;
  height: 30px;
  margin-left: 43%;
`;
