import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

@observer
export class Connect extends React.Component {

  render() {
    return (
      <form>
        <fieldset>
          <label>
            Connect Url
            <input type="text" defaultValue={this.props.state.url} onChange={(e) => this.props.state.setUrl(e.target.value)} />
          </label>
          <button onClick={(e) => {e.preventDefault(); this.props.state.connect()}}>Connect</button>
        </fieldset>
      </form>);
  }
}
