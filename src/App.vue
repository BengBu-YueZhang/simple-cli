<template>
  <section>
    <hello-world></hello-world>
    <router-link to="/page1">二号机</router-link>
    <router-link to="/page2">零号机</router-link>
    <router-view></router-view>
  </section>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld
  }
}
</script>
