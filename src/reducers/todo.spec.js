import reducer from './todo'
import { testNameToKey } from 'jest-snapshot/build/utils';

describe('Todo Reducer', () => {
  
  test('returns a state object', () => {
    const result = reducer(undefined, {type: 'ANYTHING'})
    expect(result).toBeDefined();
  });

  test('adds a todo', () => {
    const initialState = {
      todos: []
    }

    const expectedState = {
      todos: [
        {
          id: 4,
          name: 'Test Todo',
          isComplete: false
        }
      ]
    }

    const action = {
      type: 'TODO_ADD',
      payload: {
        id: 4,
        name: 'Test Todo',
        isComplete: false
      }
    }
    const result = reducer(initialState, action)
    expect(result).toEqual(expectedState);
  })
});