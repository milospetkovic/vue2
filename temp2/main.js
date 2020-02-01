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
  <div v-for="item in items">

      {{ item }}

  </div>
</div>
`
});


var vm = new Vue({
  el: '#app',
  data: {
    items: [
      'PHP',
      'JAVA',
      'Python'
    ]
  },
  methods: {
    itemSubmited() {
      this.items.push();
    }
  }
});

console.log('Prikazi vue instance', vm.data);
