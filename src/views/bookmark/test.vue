<template>
  <div id="app">
    {{message}}
  </div>
</template>
<script>
  export default {
    data() {
      return {
        count: 0,
        message: 1234
      }
    },
    methods: {
      load() {
        this.count += 2
      },
      openURL() {
        console.log('this is log')
        // window.open('https://www.baidu.com/s?&wd=' + this.input, '_blank')
      }
    }
  }
</script>
<style>

</style>
