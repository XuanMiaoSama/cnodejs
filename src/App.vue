<template>
  <div>
    <Header></Header>
    <main>
      <div class="main">
        <div class="section">
          <router-view>
            <template #default="{ Component }">
              <keep-alive exclude="detail">
                <component :is="Component" />
              </keep-alive>
            </template>
          </router-view>
        </div>
        <div class="aside"></div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.aside {
  background: blue;
}
</style>