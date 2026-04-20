import { Link, useNavigate } from "react-router-dom"
import logo from "../imgs/logo.png"
import AnimationWrapper from "../common/page-animation"
import defaultBanner from '../imgs/blog-banner.png'
import { uploadImg } from "../common/aws"
import { useContext, useEffect} from "react"
import {Toaster, toast} from 'react-hot-toast'
import { EditorContext } from "../pages/editor.page"
import EditorJS from "@editorjs/editorjs"
import { tools } from "./tools.component"
import axios from "axios"
import { UserContext } from "../App"

const BlogEditor = () => {

    // let blogBannerRef = useRef()
    let {blog, blog:{title, banner, content, tags, des}, setBlog, textEditor, setTextEditor, editorState, setEditorState } = useContext(EditorContext)

    let { userAuth: { accessToken } } = useContext(UserContext)

    let navigate = useNavigate()

    // console.log(blog);

    // useEffect hook from react
    useEffect(() => {
        if(!textEditor.isReady){
            setTextEditor(
                new EditorJS({
                    holder: "textEditor",
                    data: content,
                    tools: tools,
                    placeholder: "Let's start sharing"
                })
            )
        }
    }, [])
    


    const handleBannerUpload = async (e) => {
        const img = e.target.files[0]

        if(img){
            let loadingToast = toast.loading("Uploading ...")
            try{
                const url = await uploadImg(img)
                if(url){
                    toast.dismiss(loadingToast)
                    toast.success("Uploaded 👍🏻")
                    // blogBannerRef.current.src = url
                    setBlog({ ...blog, banner: url})
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


    const handleTitleChange = (e) => {

        let input = e.target

        // console.log(input.scrollHeight);
        input.style.height = 'auto'
        input.style.height = input.scrollHeight + "px"

        setBlog({ ...blog, title: input.value})
    }

    const handleError = (e) => {

        // default banner to handle refersh empty field
        let img = e.target
        img.src = defaultBanner
    }

    // handelling publish button for publish functionality
    const handlePublishEvent = () => {

        // if(!banner){
        //     return toast.error("Uplaod a blog banner to publish")
        // }
        if(!title.length){
            return toast.error("Write blog title to publish!")
        }
        if(textEditor.isReady){

            textEditor.save().then(data => {
                if(data.blocks.length){
                    setBlog({...blog, content: data})
                    setEditorState("publish")
                }
                else{
                    return toast.error("Blog content can't be empty")
                }
            })
            .catch((err) => {
                return toast.error("Blog content can't be empty")
            }) 
        }

    }

    const handleSaveDraft = (e) => {
        
        if(e.target.className.includes("disable")){
            return
        }

        if(!title.length){
            return toast.error("Write blog title before before saving it to draft")
        }

        let loadingToast = toast.loading("Saving Draft...")

        e.target.classList.add('disable')


        if(textEditor.isReady){
            textEditor.save().then(content => {
                let blogObj = { title, des, banner, tags, content, draft: true }
                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj, {
                    headers : {
                        "Authorization" : `Bearer ${accessToken}`
                }
                })
                .then(() => {
                
                e.target.classList.remove('disable')
        
                toast.dismiss(loadingToast)
                toast.success("Saved 👍🏻")
        
                setTimeout(() => {
                    navigate("/")
                }, 500)
        
                })
                .catch(( { response } ) => {
                e.target.classList.remove('disable')
                toast.dismiss(loadingToast)
        
                return toast.error(response.data.error)
                })
                    

                
            })
        }

    }

    return(
        <>

            {/* Navigation bar for the editor page */}
            <nav className="navbar">

                <Link to="/" className="flex-none w-10">
                    <img src={logo}/>
                </Link>

                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    {title.length ? title : "New Blog"}
                </p>
                {/* button division seperate from logo and title */}
                <div className=" flex gap-4 ml-auto">

                    <button
                        className="btn-dark py-2"
                        onClick={handlePublishEvent}
                    >
                        Publish
                    </button>

                    <button
                        className="btn-light py-2"
                        onClick={handleSaveDraft}
                        >
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

                            {/* Banner section */}
                            <label htmlFor="uploadBanner">
                                <img 
                                    // ref={blogBannerRef}
                                    src={banner} 
                                    alt="Blog Banner"
                                    className="z-20"
                                    onError={handleError}
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

                        {/* text area for blog title */}
                        <textarea
                            defaultValue={title}
                            placeholder="Blog Title"
                            className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-30"

                            onKeyDown={handleTitleKeyDown}
                            onChange={handleTitleChange}

                        ></textarea>
                        <hr className="w-full opacity-10 my-5" />

                        {/* text editor */}
                        <div id="textEditor" className="font-gelasio"></div>

                        
                    </div>
                </section>
            </AnimationWrapper>   
        </>
    )
}

export default BlogEditor