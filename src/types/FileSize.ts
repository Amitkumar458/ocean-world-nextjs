type FileSize = {
    [key: string]: number
}

const fileSizeDefine : FileSize = {
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024
}

const fileSize : FileSize = {
    billUploadSize: 5*fileSizeDefine.MB,
}

export default fileSize;