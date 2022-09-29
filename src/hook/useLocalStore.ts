import { watch, reactive } from 'vue'
import storage from '../util/storage'

function useLocalStore(data: object, name: string) {
	const r = reactive(getDataFromStorage(name, data))
	watch(
		() => r,
		(val) => {
			updateStorageData(val, name)
		},
		{ deep: true, immediate: true }
	)
	return r
}

function updateStorageData(r: any, name: string) {
	const result = JSON.parse(storage.getItem('store') || '{}')
	result[name] = r
	storage.setItem('store', JSON.stringify(result))
}

function getDataFromStorage(name: string, data: any) {
	const result = JSON.parse(storage.getItem('store') || '{}')
	return result[name] || data
}

export default useLocalStore
