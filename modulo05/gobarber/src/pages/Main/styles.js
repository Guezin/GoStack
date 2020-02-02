import styled from 'styled-components';
import pagination from "react-js-pagination";

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => props.error ? 'red' : '#eee'};
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    box-shadow: ${props => props.error && '0px 1px 10px red'};
    transition: box-shadow 0.4s;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  border-radius: 4px;
  padding: 0 15px;
  margin-left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }

  }
`;

export const Pagination = styled(pagination)`
  border: 1px solid black;
`;
