import styled from '@emotion/styled';
import { Form, Input } from 'antd';

export const InputFormItem = styled(Form.Item)`
  margin-bottom: 0.66rem;
`;

export const ButtonFormItem = styled(Form.Item)`
  margin-top: 2rem;
  margin-bottom: 0;
`;

export const NumericInput = styled(Input)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
