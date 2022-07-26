import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../common/providers/LanguageContext';
import { useRouter } from 'next/router';
import useAuthState from '../common/hooks/useAuthState';
import Notiflix from 'notiflix';
import AuthContainer from '../containers/AuthContainer';
import LoginForm from '../features/auth/templates/LoginForm';
import CommonHead from '../common/components/CommonHead';
import { gql, useMutation } from '@apollo/client';
import cookieCutter from 'cookie-cutter';
import cookie from "cookie";

const LOGIN = gql`
mutation ($email: String!, $pwd: String!) { 
  supplierLogin(input: { email: $email, pwd: $pwd }) { 
    code, msg, auth_token 
  } 
}
`;

function Login() {
  const language = useContext(LanguageContext);
  const [formData, setFormData] = useState({ email: '', pwd: '' });
  const { addAuth } = useAuthState();
  const router = useRouter();
  const [supplierLogin, { loading, error, data, reset }] = useMutation(LOGIN);

  useEffect(() => {
    if (data) {
      Notiflix.Loading.remove();
      reset();
      if (data.supplierLogin.code === 200) {
        let today = new Date();
        today.setHours(today.getHours() + 6);
        cookieCutter.set('auth_token', data.supplierLogin.auth_token, { path: '/', expires: today });
        addAuth({ status: 'success', error: null, user: data.supplierLogin.auth_token });
        router.replace('/supplier-home');
      } else {
        Notiflix.Notify.failure(data.supplierLogin.msg, { position: "left-bottom", });
      }
    }
  }, [data]);

  if (loading) {
    Notiflix.Loading.hourglass();
  }

  if (error) {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure('Something went wrong. Please try again.', { position: "left-bottom", });
    reset()
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const onHandleSubmit = (e) => {
    // console.log(formData);
    supplierLogin({ variables: { ...formData } });
    e.preventDefault();
  }

  return (
    <>
      <CommonHead title="Surplusss - Sign In" />
      <AuthContainer {...{
        header: 'Welcome',
        subHeader: 'Enter your email and password to get started',
        showIcon: true
      }}>
        <LoginForm {...{ onHandleSubmit, onInputChange, formData }}></LoginForm>
      </AuthContainer>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  if (cookies['auth_token']) {
    return {
      redirect: {
        destination: '/supplier-home',
        permanent: false,
      },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Login

