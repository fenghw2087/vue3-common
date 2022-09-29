import { toClipboard } from '@soerenmartius/vue3-clipboard'

async function copy(text: string) {
	await toClipboard(text)
}

export default copy
