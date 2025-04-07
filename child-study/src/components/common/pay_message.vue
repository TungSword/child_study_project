<template>
  <el-dialog v-model="mailVisible" title="信息" width="80%" @close="hiddenInfo">
    <div>
      <span><strong>E-Mail: </strong>tungsword_cn@qq.com</span>
    </div>
    <el-divider/>
    <h3 style="text-align: center; margin-bottom: 20px">感谢捐赠</h3>
    <el-row style="text-align: center">
      <el-col :span="12">
        <p>支付宝</p>
        <el-image class="payment_code" :src="paymentCodeZfbUrl" fit="fill"/>
      </el-col>
      <el-col :span="12">
        <p>微信</p>
        <el-image class="payment_code" :src="paymentCodeWechatUrl" fit="fill"/>
      </el-col>
    </el-row>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="hiddenInfo">
          OK
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {defineEmits, onMounted, ref, watchEffect} from "vue";
import {getPaymentCodeWechatUrl, getPaymentCodeZfbUrl} from "@/util/resource.js";

const paymentCodeWechatUrl = ref();
const paymentCodeZfbUrl = ref();
const mailVisible = ref();
const props = defineProps(['visible'])
const emits = defineEmits(['visible'])

watchEffect(() => {
  mailVisible.value = props.visible
})

onMounted(async () => {
  // 获取图片url
  paymentCodeWechatUrl.value = await getPaymentCodeWechatUrl();
  paymentCodeZfbUrl.value = await getPaymentCodeZfbUrl();
})

function hiddenInfo(){
  mailVisible.value = false
  emits("visible", false)
}
</script>

<style lang="less" scoped>
.payment_code {
  width: 100%;
}

</style>
