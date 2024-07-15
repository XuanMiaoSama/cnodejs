<template>
  <div class="author">
    <div class="info">
      <Title>
        <router-link to="/home">
          主页
        </router-link> /
      </Title>
      <div class="center">
        <div>
          <Avatar :author="author"></Avatar>
          <span>{{ author.loginname }}</span>
        </div>
        <p>
          {{ author.score }}积分
        </p>
        <p>{{ collect.length }}个话题收藏</p>
        <p>
          <a :href="'https://github.com/' + author.githubUsername">
            @{{ author.githubUsername }}
          </a>
        </p>
        <span>注册时间 {{ time(author.create_at) }}</span>
      </div>
    </div>
    <div class="createTopic"></div>

  </div>
  <div class="joinTopic">

  </div>
</template>

<script>
import axios from 'axios';
import { diffTime } from '../utils/time.js'

export default {
  data () {
    return {
      author: {},
      collect: []
    }
  },
  methods: {
    getAuthor () {
      axios({
        url: 'https://cnodejs.org/api/v1/user/' + this.$route.params.name,
        method: 'get',
      }).then(res => {
        this.author = res.data.data
      })
    },
    getCollect () {
      axios({
        url: 'https://cnodejs.org/api/v1/topic_collect/' + this.$route.params.name,
        method: 'get',
      }).then(res => {
        this.collect = res.data.data
      })
    },
    diff (time) {
      return diffTime(time)
    }
  }
};
</script>

<style lang="scss" scoped></style>
