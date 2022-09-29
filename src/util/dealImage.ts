import convertBase64UrlToBlob from './convertBase64UrlToBlob'

interface Params {
	width: number
	height: number
	quality: number
}
/**
 * 图片压缩处理函数
 * @param file 图片file数据
 * @param obj 图片参数 width height quality
 * @param callback 完成回掉，传出blob数据
 */
const dealImage = (file: File, obj: Params, callback: Function) => {
	const path = window.URL.createObjectURL(file)
	const img = new Image()
	img.src = path
	img.onload = function () {
		const that = this as CanvasImageSource
		// 默认按比例压缩
		let w = that.width as number
		let h = that.height as number
		const scale = w / h
		obj.width = obj.width > w ? w : obj.width
		w = obj.width || w
		h = obj.height || w / scale
		let quality = 0.7 // 默认图片质量为0.7
		// 生成canvas
		let canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		// 创建属性节点
		const anw = document.createAttribute('width')
		anw.nodeValue = w.toString()
		const anh = document.createAttribute('height')
		anh.nodeValue = h.toString()
		canvas.setAttributeNode(anw)
		canvas.setAttributeNode(anh)
		if (ctx) {
			ctx.drawImage(that, 0, 0, w, h)
		}
		// 图像质量
		if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality - 0
		}
		// quality值越小，所绘制出的图像越模糊
		const base64 = canvas.toDataURL('image/jpeg', quality)
		// 回调函数返回base64的值
		callback(convertBase64UrlToBlob(base64))
	}
}

export default dealImage
