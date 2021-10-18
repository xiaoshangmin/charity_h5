<template>
  <div>
    <van-tabs
      v-model="active"
      sticky
      animated
      background="#F2F4F6"
      @click="onClick"
    >
      <van-tab
        v-for="tab in tabs"
        :title="tab.name"
        :key="tab.id"
        :name="tab.id"
        @click="onClick"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="no_more"
          @load="onLoad"
        >
          <div
            class="cell van-hairline--bottom"
            v-for="user in list"
            :key="user.id"
            @click="toDetail(user.id)"
          >
            <div class="thumb">
              <van-image
                :src="user.avatar"
              />
            </div>
            <div class="content">
              <div class="title">{{ user.username }}</div>
              <div class="level">{{ user.charityLevel.name }}</div>
              <div class="enterprise">{{ user.enterprise }}</div>
            </div>
            <div class="icon">
              <van-icon name="arrow" color="#B7B7B7" />
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      p: 0,
      ps: 10,
      levelId: 0,
      no_more: "没有更多了",
      tabs: [],
      list: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    this.getLevelList();
  },
  methods: {
    onClick(name) {
      this.levelId = name;
      this.p = 0;
      this.getUserList();
    },
    toDetail(uid) {
      this.$router.push({
        path: "detail",
        query: { uid:uid },
      });
    },
    getLevelList() {
      this.$http.post("/api/v1/charity/level").then((res) => {
        res = res.data;
        if (res.code != 200) {
          this.$toast(res.error);
          return;
        }
        this.tabs = res.data.list;
        this.levelId = res.data.list[0].id;
      });
    },
    getUserList() {
      let data = {
        page: this.p,
        pageSize: this.ps,
        id: this.levelId,
      };
      this.$http.post("/api/v1/charity/user", data).then((res) => {
        res = res.data;
        if (res.code != 200) {
          this.$toast(res.error);
          return;
        }
        if (res.data.length == 0) {
          this.no_more = "没有更多了";
        }
        if (this.p == 0) {
          this.list = res.data.list;
        } else {
          res.data.list.map((item) => {
            this.list.push(item);
          });
        }
        // 加载状态结束
        this.loading = false;
        if (res.data.totalPage <= this.p) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      this.p++;
      this.getUserList();
    },
  },
};
</script>

<style scoped>
.cell {
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px 16px;
  line-height: 25px;
}
.thumb {
  width: 25%;
  flex: none;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  margin-left: 10px;
}
.title {
  font-weight: 500;
  font-size: 18px;
  color: #222222;
}
.enterprise,
.level {
  font-size: 13px;
  color: #b7b7b7;
}

.icon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>