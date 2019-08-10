import React from 'react';
import connectRedux from '../redux/connect';

// pure component
class AddTodo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <input value={inputValue} onChange={e => this.setState({ inputValue: e.target.value })} />
        <button onClick={e => this.props.addTodo(inputValue)}>Add Todo</button>
      </div>
    );
  }
}

export default connectRedux(AddTodo);
