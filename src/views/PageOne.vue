<template>
  <h1 class="blue">{{ test }}</h1>
</template>

<script>
export default {
  name: 'PageTwo',

  data () {
    return {
      test: '明日香'
    }
  }
}
</script>

<style scoped>
.blue {
  color: blue;
}
</style>
