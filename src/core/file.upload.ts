import { extname } from 'path'
import { HttpException, HttpStatus } from '@nestjs/common'

//Validation by format
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(
            new HttpException(
                'Only images allowed',
                HttpStatus.BAD_REQUEST,
            ),
            false,            
        )
    }
    callback(null, true)
}

export const editFileName = (req, file, callback) => {
    callback(null, new Date().toISOString() + '-' + file.originalname)
}