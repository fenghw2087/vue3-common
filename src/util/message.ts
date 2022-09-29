import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import confirm from './confirm'

export async function confirm2(
	content: string,
	title: string = '提示',
	options: Record<string, any> = {}
) {
	await confirm({
		content,
		title,
		...options
	})
}

export async function alert(
	content: string,
	title: string = '提示',
	options: Record<string, any> = {}
) {
	confirm({
		content,
		title,
		okCancel: false,
		...options
	}).catch(() => {})
}

export async function prompt(message: string, title: string, options: Record<string, any> = {}) {
	const defaultOptions = {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		lockScroll: false
	}
	return await ElMessageBox.prompt(message, title, {
		...defaultOptions,
		...options
	}).then((r) => r.value)
}

let loadingInstance: {
	setText: (text: string) => void
	removeElLoadingChild: () => void
	close: () => void
	handleAfterLeave: () => void
	vm: import('vue').ComponentPublicInstance<
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		false,
		import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>
	>
	$el: HTMLElement
	originalPosition: import('vue').Ref<string>
	originalOverflow: import('vue').Ref<string>
	visible: import('vue').Ref<boolean>
	parent: any
	background: import('vue').Ref<string>
	svg: import('vue').Ref<string>
	svgViewBox: import('vue').Ref<string>
	spinner: import('vue').Ref<string | boolean>
	text: import('vue').Ref<string>
	fullscreen: import('vue').Ref<boolean>
	lock: import('vue').Ref<boolean>
	customClass: import('vue').Ref<string>
	target: import('vue').Ref<HTMLElement>
	beforeClose?: import('vue').Ref<(() => boolean) | undefined> | undefined
	closed?: import('vue').Ref<(() => void) | undefined> | undefined
} | null = null

const message = {
	confirm: confirm2,
	alert,
	prompt,
	success: ElMessage.success,
	warning: ElMessage.warning,
	info: ElMessage.info,
	error: (...args: any[]) => {
		if (!args[0]) return
		ElMessage.error(...args)
	},
	loading: function (text = '保存中') {
		loadingInstance = ElLoading.service({
			fullscreen: true,
			text,
			background: 'rgba(0, 0, 0, 0.5)',
			customClass: 'my-loading'
		})
	},
	hideLoading: function () {
		if (loadingInstance) {
			loadingInstance.close()
		}
	}
}

export default message
