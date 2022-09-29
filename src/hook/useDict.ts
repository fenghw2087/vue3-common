function useDict(list: Record<string, string>[], labelStr = 'label', valueStr = 'value') {
	function getLabelByValue(v: string, placeholder = '') {
		const r = getItemByValue(v)
		return r ? r[labelStr] : placeholder
	}
	function getItemByValue(v: string) {
		return list.find((item) => item[valueStr] === v)
	}
	const obj = list.reduce((o, v) => {
		o[v[valueStr]] = v[labelStr]
		return o
	}, {})
	return [list, getLabelByValue, getItemByValue, obj]
}

export default useDict
