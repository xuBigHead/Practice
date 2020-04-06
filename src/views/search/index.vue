<template>
  <div class="app-container" id="search-index">
    <!-- 搜索引擎集合 -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <h1 style="text-align: center;font-family: Comic Sans MS">SEARCH</h1>
          <div align-center style="text-align: center;">
            <el-input placeholder="请输入内容" v-model="input" clearable class="searchInput" @keyup.enter.native="search(1)">
              <el-button slot="append" icon="el-icon-search" @click="changeSecretCode"></el-button>
            </el-input>
            <br>
            <br>
            <el-row class>
              <el-button @click="search(0)" id="googleSearch">谷歌搜索</el-button>
              <el-button @click="search(1)" id="baiduSearch">百度搜索</el-button>
              <el-button @click="search(2)" id="bingSearch">必应搜索</el-button>
              <el-button @click="search(3)" id="mijiSearch">秘迹搜索</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 收藏书签列表 -->
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <div class="grid-content bg-purple">
          <el-tabs :tab-position="tabPosition" align-center style="height: 375px" type="border-card"
                   @tab-click="tabClick" v-model="activeTab">
            <el-tab-pane label="书签栏">
              <!-- <div>this is echarts</div> -->
              <div style="float: left">
                <el-button v-if="editMode" type="text" @click="saveBookmarkClassify">添加书签类型&nbsp;&nbsp;</el-button>
                <br>
                <el-button v-if="editMode" type="text" @click="deleteAllBookmark">删除所有书签&nbsp;&nbsp;</el-button>
                <br>
                <!-- <el-button v-if="editMode" type="text" @click="showChart">显示书签图标&nbsp;&nbsp;</el-button>
                <br>-->
                <el-upload class="upload-demo" action="http://39.108.87.253:8002/tools/net-book-mark/importBookMarkFile"
                           :limit="1"
                           :on-success="onSuccess" :on-progress="onUploading" :disabled="btnDisabled">
                  <el-button v-if="editMode" type="text">导入书签列表&nbsp;&nbsp;</el-button>
                </el-upload>
              </div>
              <div class="chart-container" style="height:345px;width:80%;float: right;">
                <div id="chartId" class="chart" style="height:333px;width:80%;"/>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="bookmarkClassify.title" v-for="bookmarkClassify in this.bookmarkClassifyList"
                         :key="bookmarkClassify.id" :name="bookmarkClassify.id">
              <div v-for="bookmark in bookmarkList" :key="bookmark.id">
                <div>
                  <a :href="bookmark.url" target="_blank"
                     style="position: relative;top: 11px;">{{bookmark.title}}</a>
                  <el-button type="text" style="position: absolute;right: 8%;" v-if="editMode"
                             @click="updateBookmark(bookmark.title,bookmark.url,bookmark.id,bookmarkClassify.id)">编辑
                  </el-button>
                  <el-button type="text" style="position: absolute;right: 2%;" v-if="editMode"
                             @click="deleteBookmark(bookmark.title,bookmark.id)">删除
                  </el-button>
                </div>
                <hr class="hr">
              </div>
            </el-tab-pane>
          </el-tabs>
          <div style="position: absolute;top: 333px;right: 10.5%" v-if="bookmarkClassify.id">
            <el-button v-if="editMode" type="text"
                       @click="updateBookmarkClassify(bookmarkClassify.id,bookmarkClassify.title)">编辑书签类型&nbsp;&nbsp;
            </el-button>
            <el-button v-if="editMode" type="text"
                       @click="deleteBookmarkClassify(bookmarkClassify.id,bookmarkClassify.title)">删除书签类型&nbsp;&nbsp;
            </el-button>
            <el-button v-if="editMode" type="text"
                       @click="saveBookmark(bookmarkClassify.id)">添加新书签
            </el-button>
          </div>
          <el-pagination :current-page="current" :page-size="size" :total="total" background
                         style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper"
                         @current-change="bookmarkBarOrGetBookmarkList" id="el-pagination"
                         v-if="bookmarkClassify.id"/>
        </div>
      </el-col>
    </el-row>
    <!-- 删除所有书签 -->
    <el-dialog :visible.sync="deleteAllDialog" width="30%" center>
      <span style="color:red">确认删除所有书签吗？该操作不可恢复！！！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDeleteAllDialog">取 消</el-button>
        <el-button type="primary" @click="deleteAllBookmarkConfirm" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除书签弹框 -->
    <el-dialog :visible.sync="deleteDialog" width="30%" center>
      确认删除
      <span style="color: red">{{bookMarkName}}</span>吗？
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDeleteDialog">取 消</el-button>
        <el-button type="primary" @click="deleteBookmarkConfirm" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加或修改书签弹框 -->
    <el-dialog :title="updateOrSave?'修改书签':'添加书签'" :visible.sync="updateDialog">
      <el-form :model="bookmark">
        <el-form-item label="书签名称" :label-width="formLabelWidth">
          <el-input v-model="bookmark.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书签URL" :label-width="formLabelWidth">
          <el-input v-model="bookmark.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetUpdateDialog">取 消</el-button>
        <el-button type="primary" @click="updateBookmarkConfirm" :disabled="btnDisabled">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除书签类型弹框 -->
    <el-dialog :visible.sync="deleteTypeDialog" width="30%" center>
      确认删除
      <span style="color: red">{{bookmarkClassify.title}}</span>吗？
      <br>此操作将会删除该书签类型下所有的书签！！！
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetTypeDialog">取 消</el-button>
        <el-button type="primary" @click="deleteBookmarkClassifyConfirm" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加或修改书签类型弹框 -->
    <el-dialog :title="updateOrSave?'修改书签类型':'添加书签类型'" :visible.sync="updateTypeDialog">
      <el-form :model="bookmarkClassify">
        <el-form-item label="书签类型名称" :label-width="formLabelWidth">
          <el-input v-model="bookmarkClassify.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetTypeDialog">取 消</el-button>
        <el-button type="primary" @click="updateBookmarkClassifyConfirm" :disabled="btnDisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import bookmark from '@/api/bookmark/Bookmark'
  import bookmarkClassify from '@/api/bookmark/BookmarkClassify'

  export default {
    data() {
      return {
        listLoading: false,
        activeTab: '',
        current: 1,
        size: 8,
        total: 0,
        input: '',
        tabPosition: 'left',
        bookmarkList: [],
        bookmarkTitle: '',
        bookmarkId: '',
        bookmarkClassifyList: [],
        bookmarkClassifyId: '',
        searchObj: {
          title: '',
          classifyId: '0',
          current: 1,
          size: 8
        },
        targetName: '',
        activeName: '',
        editMode: true, // 编辑模式，为true表示进入编辑模式
        deleteDialog: false,
        updateDialog: false,
        deleteAllDialog: false,
        deleteTypeDialog: false,
        updateTypeDialog: false, // 用于表示是否显示修改书签类型弹框
        updateOrSave: false, // 用于判断是修改操作还是添加操作
        bookmark: {
          id: '',
          title: '',
          url: '',
          classifyId: ''
        },
        bookmarkClassify: {
          id: '',
          title: ''
        },
        formLabelWidth: '120px',
        btnDisabled: false
      }
    },
    watch: {
      bookmarkClassifyList: function() {
        this.$nextTick(function() {
          this.showChart()
        })
      }
    },
    created() {
      this.getBookmarkClassifyList()
    },
    // mounted (){
    //   this.showChart()
    // },

    methods: {
      // 输入密码，根据密码产生不同事件
      changeSecretCode() {
        if (this.input === 'edit') {
          this.editMode = true
        } else if (this.input === 'surprise') {
          alert('我爱爱萍')
        } else {
          this.editMode = false
        }
      },
      // 分页时判断是书签栏还是书签列表
      bookmarkBarOrGetBookmarkList(current) {
        this.current = current
        if (this.searchObj.classifyId === 0) {
          this.getBookmarkClassifyList()
        } else {
          this.getBookmarkList()
        }
      },
      getBookmarkList() { // 获取书签分页列表
        this.listLoading = true
        this.searchObj.size = this.size
        this.searchObj.current = this.current
        bookmark
          .list(this.searchObj)
          .then(response => {
            this.bookmarkList = response.data.records
            this.total = response.data.total
            this.listLoading = false
          })
          .catch(error => {
            console.log(error)
            this.$message({
              type: 'failed',
              message: '获取书签列表失败'
            })
          })
      },
      getBookmarkClassifyList() { // 获取书签类型列表
        bookmarkClassify
          .getBookmarkClassifyList()
          .then(response => {
            console.log(response.data)
            this.bookmarkClassifyList = response.data
          })
          .catch(error => {
            console.log(error)
            this.$message({
              type: 'failed',
              message: '添加书签类型列表失败'
            })
          })
      },
      // 切换标签页时设置书签类型的id
      tabClick(tab) {
        this.searchObj.classifyId = tab.paneName
        this.bookmarkClassify.id = tab.name
        this.bookmarkClassify.title = tab.label
        // 根据id获取历史记录或书签列表
        this.bookmarkBarOrGetBookmarkList()
      },
      // 打开删除书签对话框
      deleteBookmark(name, id) {
        this.deleteDialog = true
        this.bookMarkName = name
        this.bookMarkId = id
      },
      // 确认删除书签
      deleteBookmarkConfirm() {
        this.btnDisabled = true
        // 删除书签时如果总书签数对每页书签数取余为一，则跳转到前一页
        if (this.total % this.limit === 1) {
          this.page = this.page - 1
        }
        bookmark
          .deleteBookmarkById(this.bookMarkId)
          .then(response => {
            this.deleteDialog = false
            this.getBookmarkList()
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.btnDisabled = false
          })
          .catch(error => {
            console.log(error)
            this.deleteDialog = false
            this.$message({
              type: 'error',
              message: '删除书签失败'
            })
            this.btnDisabled = false
          })
      },
      // 点击删除书签弹框取消按钮初始化弹框条件
      resetDeleteDialog() {
        this.deleteDialog = false
        this.bookMarkName = ''
        this.bookMarkId = ''
      },
      updateBookmark(title, url, id, classifyId) {
        this.updateDialog = true
        this.bookmark.title = title
        this.bookmark.url = url
        this.bookmark.id = id
        this.bookmark.classifyId = classifyId
        this.updateOrSave = true
      },
      updateBookmarkConfirm() {
        // updateOrSave为true表示是修改书签操作，为false表示是添加书签操作
        if (this.updateOrSave) {
          if (this.bookmark.title.length > 50) {
            this.$message({
              type: 'error',
              message: '修改后书签名称长度不能超过50个字母'
            })
          } else {
            this.btnDisabled = true
            bookmark
              .updateBookmarkById(this.bookmark)
              .then(response => {
                this.getBookmarkList()
                this.$message({
                  type: 'success',
                  message:  response.msg
                })
                this.resetUpdateDialog()
              })
              .catch(error => {
                console.log(error)
                this.$message({
                  type: 'error',
                  message: '修改书签失败'
                })
                this.btnDisabled = false
              })
          }
        } else {
          if (this.bookmark.title.length > 50) {
            this.$message({
              type: 'error',
              message: '添加书签名称长度不能超过50个字母'
            })
          } else {
            this.btnDisabled = true
            console.log(this.total)
            // 如果添加书签时总数刚好是每页书签个数的整数倍，则跳转到下一页
            if (this.total % this.limit === 0) {
              this.page = this.page + 1
              console.log(this.page)
            }
            bookmark
              .save(this.bookmark)
              .then(response => {
                this.getBookmarkList()
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.resetUpdateDialog()
              })
              .catch(error => {
                console.log(error)
                this.$message({
                  type: 'error',
                  message: '添加书签失败'
                })
                this.btnDisabled = false
              })
          }
        }
      },
      saveBookmark(id) {
        this.bookmark.classifyId = id
        this.updateDialog = true
        this.$notify.info({
          title: '添加书签提示',
          dangerouslyUseHTMLString: true,
          message: '可在【书签名称】中输入如下格式数据来直接添加书签<br/><span style="color: red;">###书签名称###书签URL</span>'
        })
      },
      resetUpdateDialog() {
        this.updateDialog = false
        this.bookmark.title = ''
        this.bookmark.url = ''
        this.bookmark.id = ''
        this.bookmark.classifyId = ''
        this.updateOrSave = false
        this.btnDisabled = false
      },
      saveBookmarkClassify() {
        this.updateTypeDialog = true
        this.bookmarkClassify.title = ''
      },
      resetTypeDialog() {
        this.updateOrSave = false
        this.updateTypeDialog = false
        this.deleteTypeDialog = false
        this.btnDisabled = false
      },
      updateBookmarkClassifyConfirm() {
        if (this.updateOrSave) {
          // 修改书签类型
          if (this.bookmarkClassify.title.length > 15) {
            this.$message({
              type: 'error',
              message: '修改后书签类型名称长度不能超过15个字母'
            })
          } else {
            this.btnDisabled = true
            bookmarkClassify
              .updateBookmarkClassifyById(this.bookmarkClassify)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.resetTypeDialog()
                this.getBookmarkClassifyList()
              })
              .catch(error => {
                console.log(error)
                this.$message({
                  type: 'error',
                  message: '修改书签类型失败'
                })
                this.btnDisabled = false
              })
          }
        } else {
          // 添加书签类型
          // 判断书签类型名称长度，超过15个字母则显示错误信息
          if (this.bookmarkClassify.title.length > 15) {
            this.$message({
              type: 'error',
              message: '添加书签类型名称长度不能超过15个字母'
            })
          } else {
            this.btnDisabled = true
            bookmarkClassify
              .saveBookmarkClassify(this.bookmarkClassify)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.resetTypeDialog()
                this.getBookmarkClassifyList()
              })
              .catch(error => {
                console.log(error)
                this.$message({
                  type: 'error',
                  message: '添加书签类型失败'
                })
                this.btnDisabled = false
              })
          }
        }
      },
      deleteBookmarkClassifyConfirm() {
        this.btnDisabled = true
        // 删除书签类型
        bookmarkClassify
          .deleteBookmarkClassifyById(this.bookmarkClassify.id)
          .then(response => {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.resetTypeDialog()
            this.getBookmarkClassifyList()
          })
          .catch(error => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '删除书签类型失败'
            })
            this.btnDisabled = false
          })
      },
      deleteBookmarkClassify(id, title) {
        this.deleteTypeDialog = true
        this.bookmarkClassify.id = id
        this.bookmarkClassify.title = title
      },
      updateBookmarkClassify(id, title) {
        this.updateOrSave = true
        this.updateTypeDialog = true
        this.bookmarkClassify.id = id
        this.bookmarkClassify.title = title
      },
      search(num) {
        if (num === 1) {
          window.open('https://www.baidu.com/s?&wd=' + this.input, '_blank')
        } else if (num === 2) {
          window.open('https://cn.bing.com/search?q=' + this.input, '_blank')
        } else if (num === 3) {
          window.open('https://mijisou.com/?q=' + this.input, '_blank')
        } else if (num === 0) {
          window.open('https://www.google.com.hk/search?&q=' + this.input, '_blank')
        }
      },
      deleteAllBookmark() {
        this.deleteAllDialog = true
      },
      resetDeleteAllDialog() {
        this.deleteAllDialog = false
        this.btnDisabled = false
      },
      deleteAllBookmarkConfirm() {
        this.btnDisabled = true
        bookmarkClassify
          .deleteAllBookmarkClassify()
          .then(response => {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.resetDeleteAllDialog()
            this.getBookmarkClassifyList()
          }).catch(error => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '删除所有书签失败'
          })
          this.btnDisabled = false
        })
      },
      onUploading() {
        this.btnDisabled = true
      },
      onSuccess() {
        this.getBookmarkClassifyList()
        this.btnDisabled = false
      },
      showChart() {
        const myChart = echarts.init(document.getElementById('chartId'), 'light')
        const data = this.genData()
        const option = {
          title: {
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '书签类型',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: data.seriesData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        myChart.on('click', (param) => {
          this.activeTab = param.data.id
          this.searchObj.classifyId = param.data.id
          this.bookmarkClassify.id = param.data.id
          this.bookmarkClassify.title = param.data.name
          // 根据id获取历史记录或书签列表
          this.bookmarkBarOrGetBookmarkList()
        })
      },
      genData() {
        const legendData = []
        const seriesData = []
        const selected = {}
        for (let i = 0; i < this.bookmarkClassifyList.length; i++) {
          legendData.push(this.bookmarkClassifyList[i].title)
          seriesData.push({
            name: this.bookmarkClassifyList[i].title,
            value: this.bookmarkClassifyList[i].count,
            id: this.bookmarkClassifyList[i].id
          })
        }
        selected[name] = true
        return {
          legendData: legendData,
          seriesData: seriesData,
          selected: selected
        }
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 10px;
  }

  /* 未访问的链接 */
  /* a:link {color: #FF0000}  */
  /* 已访问的链接 */
  /* a:visited {color: #00FF00}  */
  /* 鼠标移动到链接上 */
  a:hover {
    color: #ff00ff;
  }

  /* 选定的链接 */
  a:active {
    color: #0000ff;
  }

  .hr {
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 10%,
      rgba(100, 0, 255, 0.3) 20%,
      rgba(100, 0, 255, 0.4) 30%,
      rgba(100, 0, 255, 0.5) 40%,
      rgba(100, 0, 255, 0.8) 50%,
      rgba(100, 0, 255, 0.5) 60%,
      rgba(100, 0, 255, 0.4) 70%,
      rgba(100, 0, 255, 0.3) 80%,
      rgba(0, 0, 0, 0) 90%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  /* 设置网页的背景图片 */
  /* #search-index {
    background: url("../../assets/search.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%;
  } */
  /* 设置组件透明度 */
  /* #el-pagination {
    filter: alpha(Opacity=0);
    -moz-opacity: 1;
    opacity: 1;
  } */
</style>
