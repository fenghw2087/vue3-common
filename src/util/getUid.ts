/**
 * 随机id生成器，可反算生成时间
 * @returns string
 */
function getUid(): String {
	return Math.ceil(Math.random() * 100000 + 100000).toString(32) + Date.now().toString(32)
}

export default getUid
