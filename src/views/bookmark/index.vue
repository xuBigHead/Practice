<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-button type="text" icon="el-icon-folder-opened">
        <el-dropdown>
          <span class="el-dropdown-link">影视资源</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>BiliBili</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩1</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩2</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩3</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩4</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩5</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩6</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩7</el-dropdown-item>
            <el-dropdown-item>嘀哩嘀哩8</el-dropdown-item>
            <el-dropdown-item>电影天堂9</el-dropdown-item>
            <el-dropdown-item>
              <div>
                <el-button type="text" @click="openURL()">人人影视</el-button>
                <el-button type="text" icon="el-icon-delete" circle/>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>
                <el-button type="text" @mouseenter.native="openURL()">黑夜影视</el-button>
                <el-button type="text" icon="el-icon-delete" circle/>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided>添加新书签</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button>
    </el-col>
    <el-col :span="8"><el-button type="text" icon="el-icon-folder-opened">
      <el-dropdown>
        <span class="el-dropdown-link">影视资源</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item> <ul v-infinite-scroll="load" class="infinite-list" style="overflow:auto">
            <li class="infinite-list-item" >1</li>
            <li class="infinite-list-item" >1</li>
            <li class="infinite-list-item" >1</li>
            <li class="infinite-list-item" >1</li>
            <li class="infinite-list-item" >1</li>
          </ul></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-button></el-col>
    <el-col :span="8"><el-button type="text" icon="el-icon-folder-opened" @mouseenter.native="openURL">游戏资源</el-button></el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    load() {
      this.count += 2
    },
    openURL() {
      console.log('this is log')
      // window.open('https://www.baidu.com/s?&wd=' + this.input, '_blank')
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
