<template>
  <div class="app-container" id="search-index">
    <!-- 搜索引擎集合 -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <h1 style="text-align: center;font-family: Comic Sans MS">SEARCH</h1>
          <div align-center style="text-align: center;">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable
              class="searchInput"
              @keyup.enter.native="search(1)"
            >
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
          <el-tabs
            :tab-position="tabPosition"
            align-center
            style="height: 375px"
            type="border-card"
            @tab-click="tabClick"
            v-model="activeTab"
          >
            <el-tab-pane label="书签栏">
              <!-- <div>this is echarts</div> -->
              <div style="float: left">
                <el-button v-if="editMode" type="text" @click="saveBookMarkType">添加书签类型&nbsp;&nbsp;</el-button>
                <br>
                <el-button v-if="editMode" type="text" @click="deleteAllBookMark">删除所有书签&nbsp;&nbsp;</el-button>
                <br>
                <!-- <el-button v-if="editMode" type="text" @click="showChart">显示书签图标&nbsp;&nbsp;</el-button>
                <br>-->
                <el-upload
                  class="upload-demo"
                  action="http://39.108.87.253:8002/tools/net-book-mark/importBookMarkFile"
                  :limit="1"
                  :on-success="onSuccess"
                  :on-progress="onUploading"
                  :disabled="btnDisabled"
                >
                  <el-button v-if="editMode" type="text">导入书签列表&nbsp;&nbsp;</el-button>
                </el-upload>
              </div>
              <div class="chart-container" style="height:345px;width:80%;float: right;">
                <div id="chartId" class="chart" style="height:333px;width:80%;"/>
              </div>
            </el-tab-pane>
            <el-tab-pane
              :label="bookMarkType.type"
              v-for="bookMarkType in bookMarkTypeList"
              :key="bookMarkType.id"
              :name="bookMarkType.id"
            >
              <div v-for="bookMark in bookMarkList" :key="bookMark.id">
                <div>
                  <a
                    :href="bookMark.netUrl"
                    target="_blank"
                    style="position: relative;top: 11px;"
                  >{{bookMark.netName}}</a>
                  <el-button
                    type="text"
                    style="position: absolute;right: 8%;"
                    v-if="editMode"
                    @click="updateBookMark(bookMark.netName,bookMark.netUrl,bookMark.id,bookMarkType.id)"
                  >编辑</el-button>
                  <el-button
                    type="text"
                    style="position: absolute;right: 2%;"
                    v-if="editMode"
                    @click="deleteBookMark(bookMark.netName,bookMark.id)"
                  >删除</el-button>
                </div>
                <hr class="hr">
                <!-- <el-divider></el-divider> -->
              </div>
            </el-tab-pane>
          </el-tabs>
          <div style="position: absolute;top: 333px;right: 10.5%" v-if="bookMarkType.id">
            <el-button
              v-if="editMode"
              type="text"
              @click="updateBookMarkType(bookMarkType.id,bookMarkType.type)"
            >编辑书签类型&nbsp;&nbsp;</el-button>
            <el-button
              v-if="editMode"
              type="text"
              @click="deleteBookMarkType(bookMarkType.id,bookMarkType.type)"
            >删除书签类型&nbsp;&nbsp;</el-button>
            <el-button v-if="editMode" type="text" @click="saveBookMark(bookMarkType.id)">添加新书签</el-button>
          </div>
          <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            background
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="bookMarkBarOrGetBookMarkByPage"
            id="el-pagination"
            v-if="bookMarkType.id"
          />
        </div>
      </el-col>
    </el-row>
    <!-- 删除所有书签 -->
    <el-dialog :visible.sync="deleteAllDialog" width="30%" center>
      <span style="color:red">确认删除所有书签吗？该操作不可恢复！！！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetdeleteAllDialog">取 消</el-button>
        <el-button type="primary" @click="deleteAllBookMarkConfirm" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除书签弹框 -->
    <el-dialog :visible.sync="deleteDialog" width="30%" center>
      确认删除
      <span style="color: red">{{bookMarkName}}</span>吗？
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetdeleteDialog">取 消</el-button>
        <el-button type="primary" @click="deleteBookMarkConfirm" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加或修改书签弹框 -->
    <el-dialog :title="updateOrSave?'修改书签':'添加书签'" :visible.sync="updateDialog">
      <el-form :model="bookMark">
        <el-form-item label="书签名称" :label-width="formLabelWidth">
          <el-input v-model="bookMark.netName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书签URL" :label-width="formLabelWidth">
          <el-input v-model="bookMark.netUrl" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetupdateDialog">取 消</el-button>
        <el-button type="primary" @click="updateBookMarkConfirm" :disabled="btnDisabled">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除书签类型弹框 -->
    <el-dialog :visible.sync="deleteTypeDialog" width="30%" center>
      确认删除
      <span style="color: red">{{bookMarkType.type}}</span>吗？
      <br>此操作将会删除该书签类型下所有的书签！！！
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetTypeDialog">取 消</el-button>
        <el-button type="primary" @click="deleteBookMarkTypeConfirm" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加或修改书签类型弹框 -->
    <el-dialog :title="updateOrSave?'修改书签类型':'添加书签类型'" :visible.sync="updateTypeDialog">
      <el-form :model="bookMarkType">
        <el-form-item label="书签类型名称" :label-width="formLabelWidth">
          <el-input v-model="bookMarkType.type" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetTypeDialog">取 消</el-button>
        <el-button type="primary" @click="updateBookMarkTypeConfirm" :disabled="btnDisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts'
import bookMark from '@/api/bookmark/bookmark'
import bookMarkType from '@/api/bookmark/bookmarktype'
export default {
  data() {
    return {
      activeTab: '',
      page: 1,
      limit: 8,
      total: 0,
      input: '',
      tabPosition: 'left',
      bookMarkList: [],
      historyRecordList: [],
      bookMarkName: '',
      bookMarkId: '',
      bookMarkTypeList: [],
      bookMarkTypeId: '',
      searchObj: {
        name: '',
        typeId: '0'
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
      bookMark: {
        id: '',
        netName: '',
        netUrl: '',
        typeId: '',
      },
      formLabelWidth: '120px',
      bookMarkType: {
        id: '',
        type: ''
      },
      btnDisabled: false
    }
  },
  watch: {
    bookMarkTypeList: function() {
      this.$nextTick(function() {
        this.showChart()
      })
    }
  },
  created() {
    this.getNetBookMarkTypeList()
  },
  // mounted (){
  //   this.showChart()
  // },

  methods: {
    // 输入密码，根据密码产生不同事件
    changeSecretCode() {
      if (this.input == 'edit') {
        this.editMode = true
      } else if (this.input == "surprise") {
        alert('我爱爱萍')
      } else {
        this.editMode = false
      }
    },
    // 分页时判断是书签栏还是书签列表
    bookMarkBarOrGetBookMarkByPage(page = 1) {
      this.page = page
      if (this.searchObj.typeId == 0) {
        this.getNetBookMarkTypeList()
      } else {
        this.getNetBookMarkByPage(page)
      }
    },
    // 获取书签分页列表
    getNetBookMarkByPage(page = 1) {
      this.listLoading = true
      this.page = page
      bookMark
        .getNetBookMarkByPage(this.page, this.limit, this.searchObj)
        .then(response => {
          this.bookMarkList = response.data.rows
          this.total = response.data.total
          this.listLoading = false
        })
        .catch(response => {
          this.$message({
            type: 'failed',
            message: '获取书签列表失败'
          })
        })
    },
    // 获取书签类型列表
    getNetBookMarkTypeList() {
      bookMarkType
        .getNetBookMarkTypeList()
        .then(response => {
          this.bookMarkTypeList = response.data.bookMarkTypeList
        })
        .catch(response => {
          this.$message({
            type: 'failed',
            message: '添加书签类型列表失败'
          })
        })
    },
    // 切换标签页时设置书签类型的id
    tabClick(tab) {
      this.searchObj.typeId = tab.paneName
      this.bookMarkType.id = tab.name
      this.bookMarkType.type = tab.label
      // 根据id获取历史记录或书签列表
      this.bookMarkBarOrGetBookMarkByPage()
    },
    // 打开删除书签对话框
    deleteBookMark(name, id) {
      this.deleteDialog = true
      this.bookMarkName = name
      this.bookMarkId = id
    },
    // 确认删除书签
    deleteBookMarkConfirm(id) {
      this.btnDisabled = true
      // 删除书签时如果总书签数对每页书签数取余为一，则跳转到前一页
      if (this.total % this.limit == 1) {
        this.page = this.page - 1
      }
      bookMark
        .deleteBookMarkById(this.bookMarkId)
        .then(response => {
          this.deleteDialog = false
          this.getNetBookMarkByPage(this.page)
          this.$message({
            type: 'succcess',
            message: '删除书签成功'
          })
          this.btnDisabled = false
        })
        .catch(response => {
          this.deleteDialog = false
          this.$message({
            type: 'error',
            message: '删除书签失败'
          })
          this.btnDisabled = false
        })
    },
    // 点击删除书签弹框取消按钮初始化弹框条件
    resetdeleteDialog() {
      this.deleteDialog = false
      this.bookMarkName = ''
      this.bookMarkId = ''
    },
    updateBookMark(name, url, id, typeId) {
      this.updateDialog = true
      this.bookMark.netName = name
      this.bookMark.netUrl = url
      this.bookMark.id = id
      this.bookMark.typeId = typeId
      this.updateOrSave = true
    },
    updateBookMarkConfirm() {
      // updateOrSave为true表示是修改书签操作，为false表示是添加书签操作
      if (this.updateOrSave) {
        if (this.bookMark.netName.length > 50) {
          this.$message({
            type: 'error',
            message: '修改后书签名称长度不能超过50个字母'
          })
        } else {
          this.btnDisabled = true
          bookMark
            .updateBookMarkById(this.bookMark)
            .then(response => {
              this.getNetBookMarkByPage(this.page)
              this.$message({
                type: 'succcess',
                message: '修改书签成功'
              })
              this.resetupdateDialog()
            })
            .catch(response => {
              this.$message({
                type: 'error',
                message: '修改书签失败'
              })
              this.btnDisabled = false
            })
        }
      } else {
        if (this.bookMark.netName.length > 50) {
          this.$message({
            type: 'error',
            message: '添加书签名称长度不能超过50个字母'
          })
        } else {
          this.btnDisabled = true
          console.log(this.total)
          // 如果添加书签时总数刚好是每页书签个数的整数倍，则跳转到下一页
          if (this.total % this.limit == 0) {
            this.page = this.page + 1
            console.log(this.page)
          }
          bookMark
            .saveBookMark(this.bookMark)
            .then(response => {
              this.getNetBookMarkByPage(this.page)
              this.$message({
                type: 'succcess',
                message: '添加书签成功'
              })
              this.resetupdateDialog()
            })
            .catch(response => {
              this.$message({
                type: 'error',
                message: '添加书签失败'
              })
              this.btnDisabled = false
            })
        }
      }
    },
    saveBookMark(id) {
      this.bookMark.typeId = id
      this.updateDialog = true
      this.$notify.info({
        title: '添加书签提示',
        dangerouslyUseHTMLString: true,
        message: '可在【书签名称】中输入如下格式数据来直接添加书签<br/><span style="color: red;">###书签名称###书签URL</span>'
      });
    },
    resetupdateDialog() {
      this.updateDialog = false
      this.bookMark.netName = ''
      this.bookMark.netUrl = ''
      this.bookMark.id = ''
      this.bookMark.typeId = ''
      this.updateOrSave = false
      this.btnDisabled = false
    },
    saveBookMarkType() {
      this.updateTypeDialog = true
      this.bookMarkType.type = ''
    },
    resetTypeDialog() {
      this.updateOrSave = false
      this.updateTypeDialog = false
      this.deleteTypeDialog = false
      // this.bookMarkType.id = ''
      // this.bookMarkType.type = ''
      this.btnDisabled = false
    },
    updateBookMarkTypeConfirm() {
      if (this.updateOrSave) {
        // 修改书签类型
        if (this.bookMarkType.type.length > 15) {
          this.$message({
            type: 'error',
            message: '修改后书签类型名称长度不能超过15个字母'
          })
        } else {
          this.btnDisabled = true
          bookMarkType
            .updateBookMarkTypeById(this.bookMarkType)
            .then(response => {
              this.$message({
                type: 'succcess',
                message: '修改书签类型成功'
              })
              this.resetTypeDialog()
              this.getNetBookMarkTypeList()
            })
            .catch(response => {
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
        if (this.bookMarkType.type.length > 15) {
          this.$message({
            type: 'error',
            message: '添加书签类型名称长度不能超过15个字母'
          })
        } else {
          this.btnDisabled = true
          bookMarkType
            .saveBookMarkType(this.bookMarkType)
            .then(response => {
              this.$message({
                type: 'succcess',
                message: '添加书签类型成功'
              })
              this.resetTypeDialog()
              this.getNetBookMarkTypeList()
            })
            .catch(response => {
              this.$message({
                type: 'error',
                message: '添加书签类型失败'
              })
              this.btnDisabled = false
            })
        }
      }
    },
    deleteBookMarkTypeConfirm() {
      this.btnDisabled = true
      // 删除书签类型
      bookMarkType
        .deleteBookMarkTypeById(this.bookMarkType.id)
        .then(response => {
          this.$message({
            type: 'succcess',
            message: '删除书签类型成功'
          })
          this.resetTypeDialog()
          this.getNetBookMarkTypeList()
        })
        .catch(response => {
          this.$message({
            type: 'error',
            message: '删除书签类型失败'
          })
          this.btnDisabled = false
        })
    },
    deleteBookMarkType(id, type) {
      this.deleteTypeDialog = true
      this.bookMarkType.id = id
      this.bookMarkType.type = type
    },
    updateBookMarkType(id, type) {
      this.updateOrSave = true
      this.updateTypeDialog = true
      this.bookMarkType.id = id
      this.bookMarkType.type = type
    },
    search(num, input) {
      if (num == 1) {
        window.open("https://www.baidu.com/s?&wd=" + this.input, "_blank")
      } else if (num == 2) {
        window.open("https://cn.bing.com/search?q=" + this.input, "_blank")
      } else if (num == 3) {
        window.open("https://mijisou.com/?q=" + this.input, "_blank")
      } else if (num == 0) {
        window.open("https://www.google.com.hk/search?&q=" + this.input, "_blank")
      }
    },
    deleteAllBookMark() {
      this.deleteAllDialog = true
    },
    resetdeleteAllDialog() {
      this.deleteAllDialog = false
      this.btnDisabled = false
    },
    deleteAllBookMarkConfirm() {
      this.btnDisabled = true
      bookMarkType
        .deleteAllBookMarkType()
        .then(response => {

          this.$message({
            type: 'succcess',
            message: '删除所有书签成功'
          })
          this.resetdeleteAllDialog()
          this.getNetBookMarkTypeList()
        }).catch(response => {
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
      this.getNetBookMarkTypeList()
      this.btnDisabled = false
    },
    showChart() {
      var myChart = echarts.init(document.getElementById('chartId'), "light")
      var data = this.genData();
      var option = {
        title: {
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   type: 'scroll',
        //   orient: 'vertical',
        //   right: 10,
        //   top: 20,
        //   bottom: 20,
        //   data: data.legendData,
        //   selected: data.selected
        // },
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
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart.on('click', (param) => {
        this.activeTab = param.data.id
        this.searchObj.typeId = param.data.id
        this.bookMarkType.id = param.data.id
        this.bookMarkType.type = param.data.name
        // 根据id获取历史记录或书签列表
        this.bookMarkBarOrGetBookMarkByPage()
      });
    },
    genData() {
      var legendData = [];
      var seriesData = [];
      var selected = {};
      for (var i = 0; i < this.bookMarkTypeList.length; i++) {
        legendData.push(this.bookMarkTypeList[i].type);
        seriesData.push({
          name: this.bookMarkTypeList[i].type,
          value: this.bookMarkTypeList[i].amount,
          id: this.bookMarkTypeList[i].id
        });
      }
      selected[name] = true;
      return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
      };
    },
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
