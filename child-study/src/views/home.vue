<template>
  <div class="vue-app">
    <div class="header">
      <el-button v-show="currentComponent !== 'home'" class="left" :icon="HomeFilled" circle
                 @click="showComponent('home')"/>
      <span class="title" :class="{buttonShow : currentComponent === 'home'}">{{ homeName }}同学</span>
      <el-icon @click="showConnection" class="right">
        <Message/>
      </el-icon>
    </div>
    <div class="content">
      <all_compontent :component="currentComponent"/>

      <div v-if="currentComponent === 'home'">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in content_list" :key="index" class="studyCom">
            <el-card shadow="hover" @click="showComponent(item.component)" v-if="isShowElement(item)">
              {{ item.name }}
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

  <el-dialog v-model="mailVisible" title="信息" width="80%">
    <div>
      <span><strong>E-Mail: </strong>tungsword_cn@qq.com</span>
    </div>
    <el-divider/>
    <h3 style="text-align: center; margin-bottom: 20px">感谢捐赠</h3>
    <el-row style="text-align: center">
      <el-col :span="12">
        <p>支付宝</p>
        <el-image class="payment_code" :src="paymentCodeUrl" fit="fill"/>
      </el-col>
      <el-col :span="12">
        <p>微信</p>
        <el-image class="payment_code" :src="paymentCodeUrl2" fit="fill"/>
      </el-col>
    </el-row>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="mailVisible = false">
          OK
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from 'vue-router'
import {HomeFilled, Message} from '@element-plus/icons-vue'
import {content_list} from '@/constant/content_constant'
import paymentCodeUrl from "@/assets/img/payment_code.jpg";
import paymentCodeUrl2 from "@/assets/img/payment_code_2.jpg";

const route = useRoute();
const homeName = ref("小於")
const mailVisible = ref(false);

function isShowElement(item) {
  if (item.owner) {
    return item.show || item.owner.indexOf(homeName.value) > -1;
  }
  return item.show;
}

onMounted(() => {
  const name = route.query.name;
  if (name) {
    homeName.value = name;
  }
})

const currentComponent = ref('home')

function showComponent(component) {
  currentComponent.value = component;
}

function showConnection() {
  mailVisible.value = true;
}
</script>

<style lang="less" scoped>
.vue-app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    text-align: center;
    height: 48px;
    line-height: 48px;
    background-color: black;
    color: white;
    font-size: 24px;
    display: flex;
    align-items: center;

    .title {
      width: 100%;
      align-self: center;
    }

    .buttonShow {
      margin-left: 39.6px;
    }

    .left {
      margin-left: 8px;
    }

    .right {
      margin-left: 8px;
      margin-right: 16px;
      font-size: 16px;
    }
  }

  .content {
    padding: 20px;
    overflow: auto;
    flex-grow: 1;
  }

  .studyCom {
    margin-bottom: 20px;
    text-align: center;
  }
}

.payment_code {
  width: 100%;
}

</style>
