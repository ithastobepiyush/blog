// importing tools

import Embed from "@editorjs/embed"
import List from '@editorjs/list'
import Link from '@editorjs/link'
import Image from '@editorjs/image'
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from '@editorjs/marker'
import InlineCode from "@editorjs/inline-code"

// uploadImg() --> make request to the server for the aws link or url
import { uploadImg } from "../common/aws"

// for local files to upload 
const uploadImgByFile = (e) => {
    
    return uploadImg(e).then(url => {
        if(url){
            return {
                success: 1,
                file: { url }
            }
        }
    })
}
// upload by url .... refrence from editorjs doc
const uploadImgByUrl = (e) => {
    let link = new Promise((resolve, reject) => {
        try{
            resolve(e)
        }
        catch(err) {
            reject(err)
        }
    })
    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}



export const tools = {
    
    embed : Embed,
    list : {
        class: List,
        inlineToolbar: true
    },
    link : Link,
    image : {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImgByUrl,
                uploadByFile: uploadImgByFile
            }
        }
    },
    header : {
        class: Header,
        config: {
            placeholder: "Type Heading...",
            levels: [2, 3],
            defaultlevel: 2
        }
    },
    quote : {
        class: Quote,
        inlineToolbar: true
    },
    marker : Marker,
    inlineCode: InlineCode
}