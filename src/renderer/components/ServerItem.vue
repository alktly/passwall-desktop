<template>
  <div class="server-item" :class="{ '--active': active }" @click="$emit('click')">
    <!-- Avatar -->
    <div class="server-item-avatar">
      <CompanyLogoItem :url="data.url" />
    </div>
    <!-- Summary -->
    <div class="server-item-summary">
      <span v-text="data.title" class="url" />
      <!-- <span v-text="data.username" class="username" /> -->
    </div>
    <!-- Detail -->
    <button class="server-item-detail">
      <VIcon name="chevron-right" size="14" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ServerItem',

  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.server-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background-color: black;
  cursor: pointer;
  border-bottom: 1px solid black;

  &.--active {
    background: $color-gray-600;
  }

  &-avatar {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: $color-gray-400;
    margin-left: $spacer-3;
  }

  &-summary {
    color: #fff;
    margin: 0 auto 0 $spacer-3;
    display: flex;
    flex-direction: column;

    .url {
      font-weight: 600;
      font-size: $font-size-normal;
      line-height: 16px;
    }

    .username {
      font-weight: normal;
      font-size: $font-size-mini;
      line-height: 16px;
    }
  }

  &-detail {
    margin: 0 $spacer-3 0 auto;
    color: $color-gray-300;
  }
}
</style>
