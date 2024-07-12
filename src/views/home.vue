<template>
  <div class="home" id="home">
    <Title>
      <template #default>
        <ul class="menu">
          <li @click="tab = key" v-for="(item, key) in menu" :key="key"
              :class="{ active: key == tab }">
            {{ item }}
          </li>
        </ul>
      </template>
    </Title>
    <List v-for="item in list" :key="item.id" :info="item"></List>
    <el-pagination v-model:current-page="page" background layout="prev, pager, next"
                   :page-count="10" />
  </div>
</template>

<script>
import axios from "axios";
import cat from "../utils/cat";


export default {
  watch: {
    tab () {
      this.page = 1
      this.getData()
    },
    page () {
      this.getData()
    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      axios({
        url: "https://cnodejs.org/api/v1/topics",
        method: "get",
        params: {
          tab: this.tab,
          page: this.page,
          limit: this.limit
        }
      }).then(res => {
        console.log(res.data.data);
        this.list = res.data.data;
      });
    }
  },
  data () {
    return {
      list: [],
      limit: 40,
      page: 1,
      tab: "all",
      menu: cat
    };
  }
};
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
}

.home ::v-deep .el-pagination .el-pager li.is-active {
  background: #80bd01;
}

.home ::v-deep .el-pagination .el-pager li:hover {
  color: #77848e
}

.el-pagination {
  margin: 10px;
}

.home {
  background: #fff;
  padding-bottom: 1px;

  .menu {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #80bd01;

    li {
      padding: 2px 5px;
      border-radius: 5px;
      margin: 0 10px;
      cursor: pointer;
    }

    .active {
      color: #fff;
      background: #80bd01;
    }

    li:hover {
      color: #005580;
    }
  }

}
</style>
