Vue.component('item-list', {
  props: {
    items: {
      type: Array,
      required: false
    }
  },
  template:
  `
  <div>
    <div v-for="(item, index) in items" v-bind:item="item" v-bind:index="index" v-bind:key="index">
        {{index + 1 }}. {{ item }}
        <button v-on:click="remove(index)">Remove</button>
    </div>
  </div>
  `
  ,
  methods: {
    remove(index) {
      console.log('pritisnut remove');
      this.items.splice(index, 1);
    }
  }
});


var vm = new Vue({
  el: '#app',
  data: {
    addNewItem: '',
    items: [
      'PHP',
      'JAVA',
      'Python'
    ]
  },
  methods: {
    itemSubmited() {
      if (this.addNewItem.length) {
        this.items.push(this.addNewItem);
        this.addNewItem = '';
      } else {
        alert('The value for new item should not be empty');
      }
    }
  }
});
//console.log('Show vue instance', vm.data);
