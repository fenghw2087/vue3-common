function loadScript(src: string): Promise<any> {
	return new Promise((resolve, reject) => {
		const scripts = document.querySelectorAll('script')
		if (
			Array.prototype.some.call(scripts, function (s) {
				return s.src === src
			})
		) {
			resolve(true)
			return
		}
		const script = document.createElement('script')
		script.type = 'text/javascript'
		script.async = true
		script.src = src
		document.body.appendChild(script)
		script.onload = resolve
		script.onerror = reject
	})
}

export default loadScript
