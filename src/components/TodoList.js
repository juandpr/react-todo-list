import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodos, toggleTodo, deleteTodo, getVisibleTodos } from '../reducers/todo'

const TodoItem = ({id, name, isComplete, toggleTodo, deleteTodo}) => (
  <li>
    <span className="delete-item">
      <button onClick={() => deleteTodo(id)}>X</button>
    </span>
    <input type="checkbox" defaultChecked={isComplete} onChange={() => toggleTodo(id)} /> {name}
  </li>
)

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo}/>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state, ownProps) => ({todos: getVisibleTodos(state.todo.todos, ownProps.filter)}),
  {fetchTodos, toggleTodo, deleteTodo}
)(TodoList)
