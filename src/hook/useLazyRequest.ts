import storage from '../util/storage.js'

/**
 * 请求本地缓存加载，先加载本地数据，紧跟加载远超数据
 * 因此回调函数success最多可能会执行两次，调用方需确认会产生副作用
 * @param {Promise} request 被包装的请求
 * @param {String} key 标识该请求的不变字符串
 * @param {Promise} success 成功回调函数，使用promise包装，保证后续的执行顺序
 */
async function useLazyRequest(request: Function, key: string, success: Function) {
	try {
		const res = await getStorageData(key)
		request().then((newRes: Object) => {
			if (JSON.stringify(newRes) !== res) {
				success(newRes)
				storageNewData(key, newRes)
			}
		})
		await success(JSON.parse(res))
	} catch (error) {
		const newRes = await request()
		await success(newRes)
		storageNewData(key, newRes)
	}
}

async function getStorageData(key: string): Promise<string> {
	const storageData = storage.getItem(`lazy_request_${key}`)
	if (storageData) return storageData
	throw new Error('no storage data')
}

function storageNewData(key: string, data: Object) {
	const str = JSON.stringify(data)
	if (str.length > 200 * 1024) return
	storage.setItem(`lazy_request_${key}`, JSON.stringify(data))
}

export default useLazyRequest
