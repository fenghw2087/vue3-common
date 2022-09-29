const convertBase64UrlToBlob = (urlData: string): Blob => {
	const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
	// 处理异常,将ascii码小于0的转换为大于0
	const ab = new ArrayBuffer(bytes.length)
	const ia = new Uint8Array(ab)
	for (let i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i)
	}
	return new Blob([ab], { type: 'image/jpeg' })
}

export default convertBase64UrlToBlob
