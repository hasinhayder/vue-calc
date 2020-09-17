Vue.createApp({
  data () {
    return {
      label: '',
      item: '',
      items: []
    }
  },
  computed: {
    sum () {
      return this.items.length > 0
        ? this.items.reduce((o, n) => (o = o + n))
        : 0
    }
  },
  mounted () {
    this.$refs.n.focus()
  },
  methods: {
    addNumber () {
      this.item = eval(this.item.replace(/[^-()\d/*+.]/g, '')) //parse the math expression, but sanitize it
      if (this.item > 0) {
        this.items.unshift(this.item * 1) //or push - whatever works for you
      }
      this.updateTotal()
    },
    removeItem (n) {
      this.items.splice(n, 1)
      this.$refs.n.focus()
      this.updateTotal()
    },
    shiftNumber () {
      this.item == '' ? this.items.shift() : false
      this.updateTotal()
    },
    updateTotal () {
      this.item = ''
      this.label = this.sum == 0 ? '' : 'Total = ' + this.sum
    },
    itemUpdate(item, key) {
      if (item == '') {
        this.removeItem(key)
      } else {
        item = eval(item.replace(/[^-()\d/*+.]/g, ''));
        this.items[key] = item;
        this.updateTotal();
      }
    }
  }
}).mount('#app')
