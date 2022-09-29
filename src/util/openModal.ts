import { createVNode, render as vueRender, VNode, VueElementConstructor } from 'vue'

let container = document.body

export function setModalContainer(c: HTMLElement) {
	container = c
}

const showModal = (modal: VueElementConstructor, config = {}) => {
	let currentConfig = {
		visible: true,
		close, // eslint-disable-line
		...config
	}
	let instance: VNode | null

	function update(configUpdate: Function | Record<string, any>) {
		if (typeof configUpdate === 'function') {
			currentConfig = configUpdate(currentConfig)
		} else {
			currentConfig = {
				...currentConfig,
				...configUpdate
			}
		}
		if (instance?.component) {
			Object.assign(instance.component.props, currentConfig)
			instance.component.update()
		}
	}

	function destroy() {
		if (instance?.component) {
			vueRender(null, container)
			instance.component.update()
			instance = null
		}
	}

	function close() {
		currentConfig = {
			...currentConfig,
			visible: false
		}
		update(currentConfig)
		setTimeout(() => {
			destroy()
		}, 200)
	}

	function render(props: Record<string, any>) {
		const vm = createVNode(modal, props)
		vueRender(vm, container)
		return vm
	}

	instance = render(currentConfig)
}

export default showModal
