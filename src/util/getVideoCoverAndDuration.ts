import convertBase64UrlToBlob from './convertBase64UrlToBlob'

interface VideoSource {
	videoWidth: number
	videoHeight: number
	duration: number
}

function getVideoCoverAndDuration(
	video: string & Blob,
	options: { cover: boolean } = { cover: true }
) {
	return new Promise((resolve, reject) => {
		try {
			let url
			if (typeof video === 'string') {
				url = video
			} else {
				url = window.URL.createObjectURL(video)
			}

			const video1 = document.createElement('video')
			video1.src = url

			video1.onloadeddata = function () {
				const that = this as unknown
				const currentWidth = (that as VideoSource).videoWidth
				const currentHeight = (that as VideoSource).videoHeight
				video1.addEventListener('timeupdate', function () {
					if (options.cover) {
						let canvas = document.createElement('canvas')
						try {
							const area = canvas.getContext('2d')
							const quality = 0.95
							canvas.width = currentWidth
							canvas.height = currentHeight
							if (area) {
								area.drawImage(
									that as CanvasImageSource,
									0,
									0,
									currentWidth,
									currentHeight
								)
							}
							const base64 = canvas.toDataURL('image/jpeg', quality)
							resolve({
								coverBlob: convertBase64UrlToBlob(base64),
								duration: (that as VideoSource).duration
							})
						} catch (e) {
							reject(new Error('视频封面截取失败'))
						}
					} else {
						resolve({
							duration: (that as VideoSource).duration
						})
					}
				})
				video1.currentTime = 0.1
			}

			video1.onerror = function () {
				reject(new Error('视频解析失败，请核对URL'))
			}
		} catch (e) {
			reject(e)
		}
	})
}

export default getVideoCoverAndDuration
