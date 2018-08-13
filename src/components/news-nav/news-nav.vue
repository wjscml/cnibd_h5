<template>
<div class="news-nav" ref="navWrapper" :class="{'isFixed': isFixed}">
  <div class="nav-content" ref="navContent">
    <div class="nav-btn" v-for="(navItem, index) in newsNav" :key="index" @click="change(index)" ref="navBtn">
      <span :class="{'nav-s':type===index}">{{navItem}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
