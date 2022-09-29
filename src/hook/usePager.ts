import { Ref, ref } from 'vue'
import message from '../util/message'

interface Params {
	getListApi?: (
		pageNo: number,
		pageSize: number,
		query: Record<string, string | number>
	) => Promise<{ list: any[]; total: number }>
	apiKey?: string
	dealList: (list: any[]) => any[]
	defaultPageSize?: number
	defaultSearchParams?: Record<string, string>
	order?: Ref<string>
	dealSearchParams?: <T>(arg: T) => T
}

const methods = {
	getDataByApiKey: (apiKey: string, params: Record<string, string | number>) => {}
}

export function setApiKeyMethod(r: () => Promise<{ list: any[]; total: number }>) {
	methods.getDataByApiKey = r
}

function usePager({
	getListApi,
	apiKey,
	dealList,
	defaultPageSize = 20,
	defaultSearchParams = {},
	order,
	dealSearchParams
}: Params) {
	const list: Ref<any[]> = ref([])
	const pageNo = ref(1)
	const pageSize = ref(defaultPageSize)
	const total = ref(0)
	const searchParams = ref({ ...defaultSearchParams })
	const loading = ref(true)
	async function getList(ps = 1, sp: Record<string, string>) {
		pageNo.value = ps
		if (sp) {
			searchParams.value = sp
		}
		let params
		if (dealSearchParams) {
			params = dealSearchParams(searchParams.value)
		} else {
			params = {
				...searchParams.value
			}
		}
		if (order?.value) {
			const [orderby, sortord] = order?.value.split(' ')
			params.orderBy = orderby
			params.sortord = sortord
		}
		let res
		if (!apiKey && !getListApi) {
			list.value = []
			total.value = 0
			loading.value = false
			return
		}
		try {
			if (apiKey) {
				res = await methods.getDataByApiKey(apiKey, {
					...params,
					page: pageNo.value,
					size: pageSize.value
				})
			} else if (getListApi) {
				res = await getListApi(pageNo.value, pageSize.value, params)
			}
			list.value = dealList ? dealList(res?.list || []) : res?.list || []
			total.value = res?.total || 0
			loading.value = false
		} catch (error: any) {
			message.error(error?.message)
			loading.value = false
		}
	}
	async function reset() {
		return getList(1, { ...defaultSearchParams })
	}

	function resetSearchParams() {
		searchParams.value = { ...defaultSearchParams }
	}
	return {
		pageNo,
		pageSize,
		list,
		total,
		reset,
		getList,
		searchParams,
		loading,
		resetSearchParams
	}
}

export default usePager
