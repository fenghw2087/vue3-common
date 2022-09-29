<template>
	<el-dialog
		:custom-class="`common-dialog ${customClass || ''}`"
		:model-value="visible"
		title="Tips"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		:lock-scroll="false"
		@closed="handleCancel"
	>
		<template #header>
			<div class="title">{{ title }}</div>
		</template>
		<div class="modal-content">
			<div class="modal-text" v-html="content"></div>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button plain @click="handleCancel" v-if="okCancel">{{
					cancelButtonText
				}}</el-button>
				<el-button type="primary" @click="handleOk" :loading="loading">{{
					confirmButtonText
				}}</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'

const props = defineProps({
	customClass: String,
	visible: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		default: '提示'
	},
	content: String,
	cancelButtonText: {
		type: String,
		default: '取消'
	},
	confirmButtonText: {
		type: String,
		default: '确认'
	},
	onCancel: {
		type: Function,
		default: () => {}
	},
	onOk: {
		type: Function,
		default: () => {}
	},
	close: Function,
	okCancel: {
		type: Boolean,
		default: true
	}
})

const loading = ref(false)

const handleCancel = () => {
	props.onCancel()
	if (props.close) {
		props.close()
	}
}

const handleOk = () => {
	const res = props.onOk()
	if (res && res.then) {
		loading.value = true
		res.then(() => {
			loading.value = false
			if (props.close) {
				props.close()
			}
		}).catch(() => {
			loading.value = false
		})
	} else {
		if (props.close) {
			props.close()
		}
	}
}
</script>
<style scoped lang="scss">
.modal-content {
	min-height: 100px;
	.modal-text {
		font-size: 14px;
		color: rgba(0, 0, 0, 0.85);
		font-weight: 400;
		margin-bottom: 30px;
		line-height: 32px;
	}
}
</style>
