import { Link } from "react-router-dom"
import logo from "../imgs/logo.png"
import AnimationWrapper from "../common/page-animation"
import defaultBanner from '../imgs/blog-banner.png'
import { uploadImg } from "../common/aws"
import { useRef } from "react"
import {Toaster, toast} from 'react-hot-toast'

const BlogEditor = () => {

    let blogBannerRef = useRef()

    const handleBannerUpload = async (e) => {

        const img = e.target.files[0]

        // console.log(img)

        if(img){
            let loadingToast = toast.loading("Uploading ...")
            try{
                const url = await uploadImg(img)
                if(url){
                    toast.dismiss(loadingToast)
                    toast.success("Uploaded 👍🏻")
                    blogBannerRef.current.src = url
                }
            } catch(err){
                toast.dismiss(loadingToast)
                return toast.error(err)
            }
        }
    }

    const handleTitleKeyDown = (e) => {
        // console.log(e);
        if(e.keyCode == 13){
            e.preventDefault()
        }
        
    }

    return(
        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-10">
                    <img src={logo}/>
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    New blog
                </p>
                <div className=" flex gap-4 ml-auto">
                    <button className="btn-dark py-2">
                        Publish
                    </button>
                    <button className="btn-light py-2">
                        Save Draft
                    </button>
                </div>
            </nav>

            {/* Notification toast */}
            <Toaster />

            <AnimationWrapper>
                <section>
                    <div className="mx-auto max-width-[900px] w-full">

                        <div className="relative aspect-video rounded-md bg-white border-4 border-grey hover:opacity-80">

                            <label htmlFor="uploadBanner">
                                <img 
                                    ref={blogBannerRef}
                                    src={defaultBanner} 
                                    alt="default blog banner"
                                    className="z-20"
                                />
                                <input 
                                    id="uploadBanner"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    hidden
                                    onChange={handleBannerUpload}
                                />
                            </label>

                        </div>

                        <textarea
                            placeholder="Blog Title"
                            className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                            onKeyDown={handleTitleKeyDown}
                        >

                        </textarea>

                        
                    </div>
                </section>
            </AnimationWrapper>   
        </>
    )
}

export default BlogEditor