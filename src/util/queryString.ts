function toObject(string: string | Record<string, string>) {
	const q = new window.URLSearchParams(string)
	const r = {} as Record<string, string>
	for (const [key, value] of q) {
		r[key] = value
	}
	return r
}

function assign(qs1: string | Record<string, string>, qs2: string | Record<string, string>) {
	const r = {
		...toObject(qs1),
		...toObject(qs2)
	}
	return new window.URLSearchParams(r).toString()
}

function toString(ob: Record<string, string>) {
	return new window.URLSearchParams(ob).toString()
}

const Qs = {
	toObject,
	assign,
	toString
}

export default Qs
