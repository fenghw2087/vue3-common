class Storage {
	namespace = ''

	setNamespace(namespace: string) {
		if (!this.namespace || namespace.indexOf('_NS_') > -1) {
			throw new Error('storage namespace can not includes string "_NS_"')
		}
		this.namespace = namespace
	}

	getKey = (key: string) => {
		if (!this.namespace) return key
		return `${this.namespace}_NS_${key}`
	}

	getItem = (key: string): any => localStorage.getItem(this.getKey(key))

	setItem = (key: string, data: string) => localStorage.setItem(this.getKey(key), data)

	removeItem = (key: string) => localStorage.removeItem(this.getKey(key))

	get = this.getItem

	set = this.setItem

	remove = this.removeItem

	clear = () => {
		if (!this.namespace) return
		let i = 0
		let k = localStorage.key(i)
		while (k) {
			if (k.startsWith(`${this.namespace}_NS_`)) {
				localStorage.removeItem(k)
			} else {
				i += 1
			}
			k = localStorage.key(i)
		}
	}
}

const storage = new Storage()

export default storage
