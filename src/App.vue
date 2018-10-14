<template>
  <section>
    <router-link to="/page1">二号机</router-link>
    <router-link to="/page2">零号机</router-link>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'App'
}
</script>
