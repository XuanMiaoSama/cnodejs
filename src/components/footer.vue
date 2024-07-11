<template>
  <div class="footer">
    <div class="center">
      <p><a href="">RSS</a><span> | </span><a href="">源码地址</a></p>
      <p>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
      <p>服务器搭建在 <a href=""><img src="https://static2.cnodejs.org/public/images/digitalocean.png" alt="" height="60px"></a> ，存储赞助商为 <a href=""><img src="https://static2.cnodejs.org/public/images/qiniu.png" alt="" height="60px"></a></p>
      <p>新手搭建 Node.js 服务器，推荐使用无需备案的 <a class="service" href="https://www.digitalocean.com/">DigitalOcean(https://www.digitalocean.com/)</a></p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="sass">
.footer
  padding: 20px 0px

  .center
    width: 1150px
    margin: 0 auto
    p
      margin-top: 10px
      color: #ababab
      font-size: 14px
      .service:hover
        color: #005580
        text-decoration: underline
      .service
        color: #0088cc
      span
        color: #e2e2e5
      a:hover
        color: #385f8a
      a
        color: #66667a
</style>