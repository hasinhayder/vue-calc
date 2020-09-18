Vue.createApp({
  data () {
    return {
      del: localStorage.delActive ? localStorage.delActive : false,
      label: '',
      item: '',
      items: [],
      histories: []
    }
  },
  watch: {
    del (value) {
      localStorage.delActive = value
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
    this.updateTotal()
  },
  methods: {
    addItem () {
      let item = this.item.replace(/[^-()\d/*+.]/g, '') //parse the math expression, but sanitize it
      this.item = eval(item)
      if (this.item > 0) {
        this.items.unshift(this.item * 1) //or push - whatever works for you
        this.histories.unshift(item)
      }
      this.updateTotal()
    },
    removeItem (n) {
      this.items.splice(n, 1)
      this.histories.splice(n, 1)
      this.updateTotal()
    },
    undoAddition () {
      if (this.del) {
        this.item == '' ? this.items.shift() : false
        this.updateTotal()
      }
    },
    updateTotal () {
      this.item = ''
      this.label = this.sum == 0 ? '' : 'Total = ' + this.sum
      this.$refs.n.focus()
    }
  }
}).mount('#app')
