<template>
  <div class="main-container">
    <TheSidebar />
    <!-- Content -->
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheSidebar from './TheSidebar'

export default {
  components: {
    TheSidebar
  }
}
</script>

<style lang="scss">
.main-container {
  display: flex;
}
</style>
