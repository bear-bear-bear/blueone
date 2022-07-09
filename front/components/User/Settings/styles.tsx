import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from 'antd';

export const StyleCustomWrapper = styled.div`
  .ant-list-header {
    border-bottom: none;
    margin-bottom: 0.33rem;
  }

  .ant-list-items {
    background: #1c1c1c;
    padding-left: 16px;
    border-top: 1px solid #303030;
    border-bottom: 1px solid #303030;
  }

  .ant-list-item {
    border-bottom: none !important;

    :not(:first-of-type) {
      border-top: 1px solid #303030;
    }

    * {
      color: #fafafa;
      font-weight: 300;
      font-size: 16px;
    }
  }
`;

export const formCustomStyles = css`
  .pw-change-form__item {
    margin-bottom: 12px;

    .ant-form-item-label {
      label {
        font-size: 16px !important;
      }
    }

    .ant-form-item-control {
    }
  }
`;

export const StyledCard = styled(Card)`
  background: #1c1c1c !important;
  border: none;
  border-top: 1px solid #303030;
  border-bottom: 1px solid #303030;

  .ant-card-body {
    padding: 16px;
  }

  .ant-card-meta-title {
    color: #fafafa;
    font-size: 16px;
    margin-bottom: 0.2rem !important;
  }

  .ant-card-meta-description {
    font-weight: 300;
    color: #ccc;
  }
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 16px 0;
  font-size: 14px;
  font-weight: 300;
  color: #888;
`;
