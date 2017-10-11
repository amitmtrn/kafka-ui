import React from 'react';
import { observer } from 'mobx-react';

@observer
export class SingleTopic extends React.Component {
  render() {
    return (
      <main>
        <form>
          <fieldset>
            <label>
              Send Data
              <input onChange={(e) => this.setState({message: e.target.value})} type="text"/>
            </label>
            <button onClick={(e) => { e.preventDefault(); this.props.state.sendMessage(this.state.message) }}>send</button>
          </fieldset>
        </form>
        <textarea readOnly value={this.props.state.currentMessages}></textarea>
      </main>
    );
  }
}
