<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <el-calendar v-model="date"></el-calendar>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-radio-group v-model="radio" size="mini">
            <el-radio-button label="开销记录"></el-radio-button>
            <el-radio-button label="日记"></el-radio-button>
          </el-radio-group>
          <h3>请选择月份</h3>
          <el-date-picker v-model="date" type="month" placeholder="请选择月份" @focus="changeMonth"></el-date-picker>
          <br>
          <!-- <h3>请选择日期范围</h3>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: new Date(),
      value2: '',
      radio: '开销记录',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      isFromMonth: false
    }
  },
  created() {

  },
  watch: {
    date: 'changeDate'
  },
  methods: {
    changeDate() {
      if(this.isFromMonth){
        this.isFromMonth = false
      }else{
        console.log(this.date + "xxx")
      }
    },
    changeMonth() {
      this.isFromMonth = true
    }
  }
}
</script>