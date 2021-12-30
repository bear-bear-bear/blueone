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
    font-weight: 300;
    margin-bottom: 0.2rem !important;
  }

  .ant-card-meta-description {
    font-size: 0.9em;
    font-weight: 300;
    color: #ccc;
  }
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 16px 0;
  font-size: 0.8rem;
  font-weight: 300;
  color: #888;
`;
