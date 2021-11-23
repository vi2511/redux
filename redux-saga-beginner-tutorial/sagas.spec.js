import test from 'tape' //pacote npm para testes https://www.npmjs.com/package/tape
import { put, call } from 'redux-saga/effects'
import { incrementAsync, delay } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync() //função generator

  assert.deepEqual(
    gen.next().value, // para chamar o próximo passo da função geradora 'yield'
    call(delay, 1000), //valor esperado
    'incrementAsync Saga must call delay(1000)' // mensagem caso o valor não seja o esperado
  )

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
})