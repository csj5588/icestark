
const bite2Mega = n => parseInt(n / 1024 / 1024)

// 判断文件类型
export const checkFileAcceptType = extArr => file => {
  if (extArr) {
    return new Promise((resolve, reject) => {
      const lowerFileType = file.type.toLowerCase()
      if (extArr.find(ext => lowerFileType.indexOf(ext) > -1)) {
        resolve(file)
      } else {
        reject(new Error(`请上传正确格式文件: [${extArr.toString()}]`))
      }
    })
  } else {
    return file
  }
}

// 判断文件大小
export const checkFileSize = limitSize => file => {
  if (limitSize) {
    return new Promise((resolve, reject) => {
      if ((file.size / limitSize) < 1) {
        resolve(file)
      } else {
        reject(new Error(`文件大小不能超过: ${bite2Mega(limitSize)} M`))
      }
    })
  } else {
    return file
  }
}

// 判断文件尺寸
export const checkFileDimension = validator => file => {
  if (validator && typeof validator === 'function') {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = fileDataUrl => {
        let image = new Image()
        image.src = fileDataUrl.target.result
        image.onload = function () {
          resolve(image)
        }
      }
    }).then(image => {
      return validator({ width: image.width, height: image.height }).then(() => file)
    })
  } else {
    return file
  }
}
