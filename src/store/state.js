import { observable, action, computed } from 'mobx';
import { Producer, Client, Consumer } from 'kafka-node';
import * as _ from 'lodash';

class State {
  @observable url = '192.168.33.10:2181';
  @observable messages = {};
  @observable currentTopic = '';
  @observable topics = [];

  getConnectionDetails() {
    return this.connectionDetails;
  }

  @action.bound setUrl(newUrl) {
    this.url = newUrl;
  }

  @action sendMessage(message) {
    this.producer.send([{ topic: this.currentTopic, messages: message }], (err, data) => {
      
    });
  }

  @action.bound changeTopic(newTopic) {
    this.currentTopic = newTopic;
  }

  @computed get currentMessages() {
    if(this.currentTopic.length > 0)
      return this.messages[this.currentTopic];

    return '';
  }

  connect() {
    this.client = new Client(this.url);
    this.client.once('connect', () => {
    this.client.loadMetadataForTopics([], action.bound((err, results) => {
      if (err)
        return console.error(err);

        const topics = _.keys(results[1].metadata);
        const index = topics.indexOf('__consumer_offsets');
        if (index !== -1) {
            topics.splice(index, 1);
        }

      this.topics = topics;
      this.currentTopic = this.topics.length > 0 ? this.topics[0] : '';
      this.messages = _.reduce(this.topics, (res, topic) => {
        res[topic] = '';

        return res;
      }, {});
      this.consumer = new Consumer(this.client, this.topics.map((topic) => {return { topic, offset: 0 }}), {fromOffset: true});
      this.consumer.on('message', action.bound(message => {
        this.messages[message.topic] += message.value + '\n';
      }));
    }));
  });

  this.producer = new Producer(this.client);
  }

}

export const state = new State();
