import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import * as CartActions from './actions';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  yield put(CartActions.addToCartSucess(response.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
