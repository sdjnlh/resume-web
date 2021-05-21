<template lang="pug">
  section.app-main
    transition(name="fade", mode="out-in")
      router-view
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style>
.bg-i {
  background-color: #097eca;
}
</style>
