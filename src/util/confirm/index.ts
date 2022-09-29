import Modal from './ModalDialog.vue'
import openModal from '../openModal'

const confirm = (config: Record<string, any>) => {
	return new Promise((resolve, reject) => {
		openModal(Modal, {
			...config,
			onOk: () => {
				if (config.onOk) {
					config.onOk()
				}
				resolve(true)
			},
			onCancel: () => {
				if (config.onCancel) {
					config.onCancel()
				}
				reject(new Error(''))
			}
		})
	})
}

export default confirm
