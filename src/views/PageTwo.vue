<template>
  <h1 class="red">{{ test }}</h1>
</template>

<script>
export default {
  name: 'PageTwo',

  data () {
    return {
      test: '绫波丽'
    }
  }
}
</script>

<style scoped>
.red {
  color: red;
}
</style>
