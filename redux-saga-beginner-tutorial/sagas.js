import { put, takeEvery, all, call } from 'redux-saga/effects'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
    console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
// fará o incremento
export function* incrementAsync() {
    yield call(delay, 1000)  // Tanto o call quanto o put retornar um objeto javascript com infomações
    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
// o take every irá 'escutar' o INCREMENT_ASYNC e fará a função incrementAsync
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
// irá unir todas as funções que utilizam o saga
export default function* rootSaga() {
    yield all([
      helloSaga(),
      watchIncrementAsync()
    ])
  }