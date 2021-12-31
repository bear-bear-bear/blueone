import { Dispatch, SetStateAction, useCallback } from 'react';
import useSWRImmutable from 'swr/immutable';
import { Global } from '@emotion/react';
import { Form, Input, FormProps, message, FormInstance } from 'antd';
import type { ColProps } from 'antd/lib/grid/col';
import httpClient from '@utils/axios';
import { axiosFetcher } from '@utils/swr';
import type { EndPoint } from '@typings';
import * as S from './styles';

type User = EndPoint['GET /user']['responses']['200'];
type RequestBody = EndPoint['POST /user/password']['requestBody'];
type Response = EndPoint['POST /user/password']['responses']['204'];
type Props = {
  form: FormInstance<RequestBody>;
  closeModal: () => void;
  setSubmitLoading: Dispatch<SetStateAction<boolean>>;
};

const layout: { [ColName: string]: ColProps } = {
  labelCol: { span: 4 },
  wrapperCol: { flex: 'auto' },
};

const validateMessages = {
  required: '필수 입력 값입니다.',
};

const PasswordChangeForm = ({ form, setSubmitLoading, closeModal }: Props) => {
  const { data: user } = useSWRImmutable<User>('/user', axiosFetcher);

  const onFormFinish: FormProps<RequestBody>['onFinish'] = useCallback(
    async (values) => {
      const reqBody: RequestBody = {
        password: values.password,
      };

      setSubmitLoading(true);
      try {
        await httpClient.post<Response>('/user/password', reqBody).then((res) => res.data);
        closeModal();
        message.success('비밀번호가 변경되었어요.');
      } catch (err) {
        message.error('서버에 문제가 있는 것 같아요! 사장님에게 문의해주세요.');
        console.error(err);
      }
      setSubmitLoading(false);
    },
    [user, closeModal, setSubmitLoading],
  );

  return (
    <Form form={form} onFinish={onFormFinish} validateMessages={validateMessages} size="middle" {...layout}>
      <Global styles={S.formCustomStyles} />
      <Form.Item name="password" label="새 비밀번호" rules={[{ required: true }]} className="pw-change-form__item">
        <Input.Password autoComplete="off" size="large" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="비밀번호 확인"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
            },
          }),
        ]}
        className="pw-change-form__item"
      >
        <Input.Password size="large" />
      </Form.Item>
    </Form>
  );
};

export default PasswordChangeForm;
