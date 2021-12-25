import type { NextPage } from 'next';
import { useCallback } from 'react';
import type { FormEventHandler } from 'react';
import httpClient from '@utils/axios';
import type { EndPoint } from '@typings';
import useAdmin from '@hooks/useAdmin';

const textFields = [
  'phoneNumber',
  'realname',
  'residentRegistrationNumber',
  'licenseNumber',
  'licenseType',
  'insuranceNumber',
];

const dateFields = ['insuranceExpirationDate'];

const TempUserCreatePage: NextPage = () => {
  const { isAdminLoggedIn } = useAdmin({
    redirectTo: '/login',
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();

    const reqBody = Array.from(e.currentTarget.querySelectorAll('input')).reduce(
      (acc, inputEl) => ({
        ...acc,
        [inputEl.name]: inputEl.value,
      }),
      {} as EndPoint['POST /users']['requestBody'],
    );
    try {
      const createdUser = await httpClient
        .post<EndPoint['POST /users']['responses']['202']>('/users', reqBody)
        .then((res) => res.data);
      console.log('createdUser', createdUser);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleAdminSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    try {
      const admin = await httpClient
        .post('/users/admin', {
          phoneNumber: formData.get('phoneNumber'),
        })
        .then((res) => res.data);
      console.log('admin 생성완료:', admin);
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (!isAdminLoggedIn) return null;
  return (
    <div
      style={{
        display: 'flex',
        padding: '1rem',
        border: '1px solid black',
      }}
    >
      <div>
        <h1>유저 생성</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          style={{
            width: 'fit-content',
            padding: '1.33rem',
          }}
        >
          {textFields.map((field, i) => (
            <div key={field + i}>
              <label
                htmlFor={field}
                style={{
                  width: '200px',
                  display: 'inline-block',
                  marginRight: '1rem',
                  textAlign: 'right',
                }}
              >
                {`${field}: `}
              </label>
              <input type="text" id={field + i} name={field} required />
            </div>
          ))}
          {dateFields.map((field, i) => (
            <div key={field + i}>
              <label
                htmlFor={field}
                style={{
                  width: '200px',
                  display: 'inline-block',
                  marginRight: '1rem',
                  textAlign: 'right',
                }}
              >
                {`${field}: `}
              </label>
              <input type="date" id={field + i} name={field} required />
            </div>
          ))}
          <button
            type="submit"
            style={{
              marginTop: '1rem',
              float: 'right',
            }}
          >
            유저 생성
          </button>
        </form>
      </div>
      <div>
        <h1>어드민 생성</h1>
        <form
          action=""
          onSubmit={handleAdminSubmit}
          style={{
            width: 'fit-content',
            padding: '1.33rem',
          }}
        >
          <div>
            <label
              htmlFor="phoneNumber"
              style={{
                width: '200px',
                display: 'inline-block',
                marginRight: '1rem',
                textAlign: 'right',
              }}
            >
              phoneNumber:
            </label>
            <input type="text" id="phoneNumber" name="phoneNumber" required />
          </div>
          <button
            type="submit"
            style={{
              marginTop: '1rem',
              float: 'right',
            }}
          >
            어드민 생성
          </button>
        </form>
      </div>
    </div>
  );
};

export default TempUserCreatePage;
