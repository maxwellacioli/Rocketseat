import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import * as Actions from './actions';

function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      console.tron.error('Usuário não é prestador de serviço');
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(Actions.signInSuccess(token, user));

    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados.');
    yield put(Actions.signFailure());
  }
}

function* singUp({ payload }) {
  try {
    const { name, email, password } = payload;

    const response = yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: true,
    });

    const { id, provider } = response.data;

    toast.success('Usuário cadastro com sucesso.');
    yield put(Actions.signUpSuccess(id, name, email, provider));

    history.push('/');
  } catch (err) {
    toast.error(`Já existe um usuário com o email inserido`);

    yield put(Actions.signFailure());
  }
}

function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', singIn),
  takeLatest('@auth/SIGN_UP_REQUEST', singUp),
]);
