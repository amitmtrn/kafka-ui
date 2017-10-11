import React from 'react';
import { observer } from 'mobx-react';

@observer
export class TopicsMenu extends React.Component {
  render() {
    return (
      <div>
        <menu>
          {this.props.state.topics.map((topic) => {
            return <a href="#" key={topic} onClick={() => this.props.state.changeTopic(topic)}> {topic} </a>;
            })}
          </menu>
      </div>
    );
  }
}
