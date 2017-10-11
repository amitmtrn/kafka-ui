import React from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { state } from './store/state';

import { Connect } from './components/connect';
import { SingleTopic } from './components/single-topic';
import { TopicsMenu } from './components/topics-menu';

export default class App extends React.Component {
  render() {
    return (<div>
      <h1>Kafka ui</h1>

      <Connect state={state} />
      <TopicsMenu state={state} />
      <SingleTopic state={state} />
    </div>);
  }
}
