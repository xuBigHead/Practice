<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-button type="text" icon="el-icon-folder-opened">
        <el-dropdown>
          <span class="el-dropdown-link">影视资源</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>BiliBili</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩</el-dropdown-item>
            <el-dropdown-item>电影天堂</el-dropdown-item>
            <el-dropdown-item>
              <div>
                <el-button type="text" @click="openURL()">人人影视</el-button>
                <el-button type="text" icon="el-icon-delete" circle/>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided>黑夜影视</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
    </el-col>
    <el-col :span="8"><div class="grid-content bg-purple">2</div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">3</div></el-col>
  </el-row>
</template>
<script>
export default {
  methods: {
    openURL() {
      console.log('this is log')
      window.open('https://www.baidu.com/s?&wd=' + this.input, '_blank')
    }
  }
}
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
