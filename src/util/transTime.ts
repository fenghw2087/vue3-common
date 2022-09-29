/**
 * 将秒数转化为 hh:mm:ss的形式
 * @param {number} sec 秒数
 * @param {boolean} hideHour 小时数为0时是否隐藏
 * @returns {string}
 */
function transTime(sec: number, hideHour: Boolean = true): String {
	const h = Math.floor(sec / 3600)
	const m = Math.floor((sec % 3600) / 60)
	const s = Math.floor(sec % 60)
	const result = [m, s]
	if (h > 0 || !hideHour) {
		result.unshift(h)
	}
	return result
		.map((v) => {
			if (v < 10) return '0' + v
			return v
		})
		.join(':')
}

export default transTime
