import { getTodos, createTodo, updateTodo, destroyTodo } from '../lib/todoServices';
import { showMessage} from './messages'

const initialState = {
  todos: [],
  currentTodo: ''
}

export const updateCurrent = (val) => ({
  type: 'CURRENT_UPDATE',
  payload: val
});

export const loadTodos = (todos) => ({
  type: 'TODO_LOAD',
  payload: todos
});

export const addTodo = (todo) => ({
  type: 'TODO_ADD',
  payload: todo
});

export const replaceTodo = (todo) => ({
  type: 'TODO_REPLACE',
  payload: todo
});

export const removeTodo = (id) => ({
  type: 'TODO_REMOVE',
  payload: id
});

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(showMessage('Loading Todos'));
    getTodos()
      .then(todos => dispatch(loadTodos(todos)));
  }
}

export const saveTodo = (name) => {
  return (dispatch) => {
    dispatch(showMessage('Saving Todo'));
    createTodo(name)
      .then(response => dispatch(addTodo(response)))
  }
}

export const toggleTodo = (id) => {
  return (dispatch, getState) => {
    dispatch(showMessage('Updating Todo'));
    const { todos } = getState().todo;
    const todo = todos.find(t => t.id === id);
    const toggled = {...todo, isComplete: !todo.isComplete};

    updateTodo(toggled)
      .then(response => dispatch(replaceTodo(response)))
  }
}

export const deleteTodo = (id) => {
  return (dispatch,) => {
    dispatch(showMessage('Deleting Todo'));
    destroyTodo(id)
      .then(response => dispatch(removeTodo(id)))
  }
}

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(t => !t.isComplete)
    
    case 'completed':
      return todos.filter(t => t.isComplete)
    
    default:
      return todos
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TODO_ADD':
      return {...state, currentTodo: '', todos: state.todos.concat(action.payload)};
    
    case 'TODO_REPLACE':
      return {
        ...state,
        todos: state.todos.map(
          t => t.id === action.payload.id ? action.payload : t
        )
      };
    
    case 'TODO_REMOVE':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };

    case 'TODO_LOAD':
      return {...state, todos: action.payload};
      
    case 'CURRENT_UPDATE':
      return {...state, currentTodo: action.payload}

    default:
      return state;
  }
}