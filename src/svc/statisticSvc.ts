type Env = 'dev' | 'test' | 'prod' | ''

class XiaoHan {
	appid: string = ''

	env: Env = ''

	init = (appid: string, env: Env = 'dev') => {
		this.appid = appid
		this.env = env
	}

	upload = (cat: 'num' | 'key', type: string, key: string, value: string) => {
		if (this.env === 'dev') return
		if (!this.appid) throw new Error('XiaoHan does not init')
		let params = {}
		let uri = ''
		switch (cat) {
			case 'num': {
				uri = 'up/num'
				params = {
					type,
					key,
					value,
					appid: this.appid,
					env: this.env
				}
				break
			}
			case 'key': {
				uri = 'up/key'
				params = {
					type,
					key,
					appid: this.appid,
					env: this.env
				}
				break
			}
			default:
		}
		const str = Object.entries(params)
			.map((v: [string, unknown]) => `${v[0]}=${v[1]}`)
			.join('&')
		const src = `https://hetong.ai.163.com/statistic/${uri}?${str}`
		const img = new Image()
		img.src = src
	}

	uploadNum = (type: string, key: string, value: string) => {
		this.upload('num', type, key, value)
	}

	ploadKey = (type: string, key: string) => {
		this.upload('key', type, key, '')
	}
}

const xiaohan = new XiaoHan()

export default xiaohan
