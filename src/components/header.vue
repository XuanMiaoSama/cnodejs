<template>
  <div class="header">
    <div class="center">
      <div class="left">
        <router-link to="/home" class="logo">
          <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="">
        </router-link>
        <input type="text" name="" id="">
        <img src="https://static2.cnodejs.org/public/images/search.e53b380a.hashed.png" alt="" class="search">
      </div>
      <ul class="right">
        <li v-for="item in routes">
          <router-link :to="item.path">
            {{ item.meta.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { routes } from '../router/index.js'
export default {
  created () {
    console.log(this.$route)
    console.log(this.routes)
  },
  data () {
    return {
      routes: routes.filter(item => item.isNav)
    }
  },
}
</script>

<style scoped>
.header {
  height: 50px;
  background: #444;
}
.header .center {
  height: 100%;
  width: 1150px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header .left {
  display: flex;
  align-items: center;
  position: relative;
}

.header .left .search {
  position: absolute;
  left: 144px;
  top: 5px;
}

.header .logo img {
  height: 28px;
  margin-top: -6px;
  margin-right: 20px;
}

.header .left input {
  border-radius: 50px;
  background-color: #888888;
  height: 26px;
  width: 230px;
  text-indent: 24px;
  transition: 0.5s ease;
  margin-top: 2px;
}

.header .left input:hover {
  background-color: #fff;
}

.header .left input:focus {
  background-color: #fff;
  /* 横向 纵向 模糊 颜色 */
  box-shadow: 0px 0px 3px -1px cyan;
}

.header .right {
  display: flex;
  align-items: center;
}

.header .right li {
  margin: 0 16px;
}

.header .right a {
  font-size: 14px;
  color: #cccccc;
}

.header .right a:hover {
  color: #fff;
}
</style>