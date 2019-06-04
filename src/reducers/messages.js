export const showMessage = (message) => ({
  type: 'MESSAGE_SHOW',
  payload: message
});

export default function(state = '', action) {
  switch (action.type) {
    case 'MESSAGE_SHOW':
      return action.payload;
    
    case 'TODO_ADD':
    case 'TODO_REPLACE':
    case 'TODO_LOAD':
    case 'TODO_REMOVE':
      return '';

    default:
      return state;
  }
}
