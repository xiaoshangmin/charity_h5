<template>
  <div>
    <div class="header">
      <div class="content">
        <div class="title">{{ userInfo.username }}</div>
        <div class="level">{{ userInfo.charityLevel.name }}</div>
        <div class="enterprise">{{ userInfo.enterprise }}</div>
      </div>
      <div class="thumb">
        <van-image :src="userInfo.avatar" />
      </div>
    </div>

    <div class="userinfo">
      <div class="label">个人简介</div>
      <div class="info">
        {{ userInfo.description }}
      </div>
    </div>

    <div class="enterprise-info">
      <div class="label">企业/机构介绍</div>
      <div class="info">
        <span v-html="userInfo.content"></span> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        charityLevel:{},
      },
      uid: 0,
    };
  },
  created() {
    this.uid = this.$route.query.uid;
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$http.get("/api/v1/charity/detail/" + this.uid).then((res) => {
        res = res.data;
        console.log(res);
        if (res.code != 200) {
          this.$toast(res.error);
          return;
        }
        this.userInfo = res.data;
      });
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  width: 100%;
  line-height: 25px;
  justify-content: flex-end;
}
.thumb {
  width: 25%;
  flex: none;
  margin: 10px 16px;
  /* border: 1px solid #e7e7e7; */
  border-radius: 5px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 10px;
}
.title {
  font-weight: 600;
  font-size: 18px;
  color: #222222;
}
.enterprise,
.level {
  font-size: 13px;
  color: #b7b7b7;
}
.userinfo,
.enterprise-info {
  font-size: 13px;
  margin: 10px 10px;
  line-height: 22px;
}
.userinfo {
  margin-bottom: 20px;
}
.label {
  text-align: left;
  font-weight: 600;
  font-size: 15px;
}
.info {
  text-align: left;
}
</style>