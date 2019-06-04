const API_URL = 'http://localhost:8081';

export const getTodos = () => {
  return fetch(API_URL + '/todos')
    .then(response => response.json());
}

export const createTodo = (name) => {
  return fetch(API_URL + '/todos', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, isComplete: false})
  })
    .then(response => response.json());
}

export const updateTodo = (todo) => {
  return fetch(`${API_URL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .then(response => response.json());
}

export const destroyTodo = (id) => {
  return fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
