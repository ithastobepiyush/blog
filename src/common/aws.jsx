import axios from "axios"

export const uploadImg = async (img) => {
    try {
        
        let imgUrl = null
        // get upload image
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_DOMAIN}/get-upload-url`
        )
        const {uploadUrl} = response.data

        // upload image to s3
        await axios.put(uploadUrl, img, {
            headers: {
                "Content-Type": "image/jpeg"
            }
        })
        // extracting the useful url only
        imgUrl = uploadUrl.split("?")[0]
        return imgUrl

    } catch (error) {
        console.log(error);
        return null
        
    }

}