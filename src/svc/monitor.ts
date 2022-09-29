import corona from '@music/corona-web-sdk'

type Env = 'dev' | 'test' | 'prod' | ''

interface Props {
	id: number
	env: Env
}

interface Props2 {
	maxBreadcrumbs: number
	sampleRate: number
	ignoreErrors: string[]
}

function samplePass(sample: number) {
	return Math.random() < sample
}

export default class Monitor {
	constructor(props: Props, props2: Props2 = {} as Props2) {
		const defaultProps2 = {
			// 携带面包屑的最大数量
			maxBreadcrumbs: 20,
			// 错误采样率
			sampleRate: 1,
			// 全局忽略的错误
			ignoreErrors: []
		}
		this.monitor = corona(props, {
			...defaultProps2,
			...props2
		})
	}

	monitor

	setUser = (userId: string) => {
		this.monitor.setUser(userId)
	}

	addBreadcrumb = (message: string) => {
		if (!message) return
		this.monitor.addBreadcrumb({ category: 'ui.click', message })
	}

	errorSample = (e: any, tags: object, sample = 1) => {
		if (typeof e !== 'string' && e.type === 'request') {
			return
		}
		if (e || e?.message) {
			//
		} else {
			return
		}
		console.log(e)
		if (samplePass(sample)) {
			if (typeof e === 'string') {
				this.monitor.error(e, tags)
			} else if (e instanceof Error) {
				this.monitor.error(e.message, tags)
			} else {
				try {
					this.monitor.error(JSON.stringify(e), tags)
				} catch (error) {}
			}
		}
	}

	warnSample = (message: string, tags: object, sample = 1) => {
		if (samplePass(sample)) {
			this.monitor.warn(message, tags)
		}
	}

	infoSample = (message: string, tags: object, sample = 1) => {
		if (samplePass(sample)) {
			this.monitor.info(message, tags)
		}
	}
}
