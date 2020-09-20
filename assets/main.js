Vue.createApp({
  data () {
    return {
      del: localStorage.delActive ? localStorage.delActive : false,
      label: '',
      item: '',
      items: []
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
    this.focus();
    document.getElementById("loader").style.display="none";
  },
  methods: {
    addItem () {
      this.item = eval(this.item.replace(/[^-()\d/*+.]/g, '')) //parse the math expression, but sanitize it
      if (!isNaN(this.item) && this.item!=0) {
        this.items.unshift(this.item * 1) //or push - whatever works for you
      }
      this.item = ''
    },
    removeItem (n) {
      this.items.splice(n, 1)
    },
    undoAddition () {
      if (this.del) {
        this.item == '' ? this.items.shift() : false
        this.focus()
      }
    },
    focus () {
      this.item = ''
      this.$refs.n.focus()
    }
  }
}).mount('#app')
