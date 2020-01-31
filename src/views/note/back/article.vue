<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple" style="background: green;height: 800px;">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                java 基础
                <i class="header-icon el-icon-info"></i>
              </template>
              <div>
                <el-collapse>
                  <el-collapse-item title="Java 基本数据类型">
                    <div>Java 基本数据类型1</div>
                    <div>Java 基本数据类型2</div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <div>
                <el-collapse>
                  <el-collapse-item title="Java 基本数据类型">
                    <div>Java 基本数据类型3</div>
                    <div>Java 基本数据类型4</div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
            <el-collapse-item title="Java 面向对象">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="Java 集合">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="Java 多线程">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple" style="background: red;height: 800px;"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

</script>