import toast, { Toaster } from "react-hot-toast"
import AnimationWrapper from "../common/page-animation"
import { useContext } from "react"
import { EditorContext } from "../pages/editor.page"
import Tag from "./tags.component"
import axios from "axios"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom"


const PublishForm = () => {
  
  let characterlLimit = 200
  let tagLimit = 10
  
  // destructuring of context
  let {blog, blog:{banner, title, tags, des, content}, setEditorState, setBlog} = useContext(EditorContext)z
  
  let {userAuth: {accessToken} } = useContext(UserContext)
  
  let navigate = useNavigate()

  const handleCloseEvent = () =>{
    setEditorState("editor")
  }


  const handleBlogTitleChange = (e) => {
    let input = e.target

    setBlog({...blog, title: input.value})
  }

  const handleBlogDesChange = (e) => {
    let input = e.target

    setBlog({ ...blog, des: input.value })
  }

  const handleDesKeyDown = (e) => {
    // console.log(e);
    if(e.keyCode == 13){
        e.preventDefault()
      }        
    }

  const handleTagKeyDown = (e) => {
    if(e.keyCode == 13 || e.keyCode == 188){
      e.preventDefault()

      let tag = e.target.value

      if(tags.length < tagLimit){
        if(!tags.includes(tag) && tag.length){
          setBlog({...blog, tags: [ ...tags, tag ] })
        }
      } else{
        toast.error(`You can add max ${tagLimit} tags`)
      }
      // for the tag input it will create inbox empty again
      e.target.value = ""
    }  
  }



  const publishBlog = (e) => {

    if(e.target.className.includes("disable")){
      return
    }

    if(!title.length){
      return toast.error("Write blog title before publishing")
    }
    if(!des.length || !des.length > characterlLimit ){
      return toast.error(`Description is necessary, Write within ${characterlLimit} characters to publish`)
    }
    if(!tags.length){
      return toast.error("Enter at least 1 tag to help us rank your blog")
    }

    let loadingToast = toast.loading("Publishing.. .")

    e.target.classList.add('disable')

    let blogObj = {
      title, des, banner, tags, content, draft: false
    }
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj, {
      headers : {
        "Authorization" : `Bearer ${accessToken}`
      }
    })
    .then(() => {
      
      e.target.classList.remove('disable')

      toast.dismiss(loadingToast)
      toast.success("Published 👍🏻")

      setTimeout(() => {
        navigate("/")
      }, 500)

    })
    .catch(( { response } ) => {
      e.target.classList.remove('disable')
      toast.dismiss(loadingToast)

      return toast.error(response.data.error)
    })
  }

  return (

    <AnimationWrapper>

      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">

        {/* <h1>PublishForm</h1> */}
        <Toaster />

        <button 
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%] "
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="max-w-[550px] center">

          <p className="text-dark-grey mb-1">Preview</p>

          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="" />

          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">{title}</h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8 ">

          {/* Blog title input box */}
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            className="input-box pl-4" 
            type="text" 
            placeholder="Blog Title" 
            defaultValue={title}
            onChange={handleBlogTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">Short Description about your Blog</p>
          {/* description */}
          <textarea
            defaultValue={des}
            maxLength={characterlLimit}  
            className="h-40 resize-none leading-7 input-box"
            onChange={handleBlogDesChange}
            onKeyDown={handleDesKeyDown}
          >
          </textarea>

          <p className="mt-1 text-dark-grey text-sm text-right">{characterlLimit - des.length  } characters left</p>


          {/* tags section */}
          <p className="text-dark-grey mb-2 mt-9">Topics- Helps in searching and ranking your blog post</p>

          {/* input for the tags */}
          <div className="relative input-box pl-2 py-2 pb-4">

            <input 
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              
              type="text"
              placeholder="Topics" 
              onKeyDown={handleTagKeyDown}
            />

            { 
              tags.map((tag, i) => {
                return <Tag tag={tag} tagIndex={i} key={i} />
              })
            }
          </div>
          
          <p className="mt-1 text-dark-grey text-sm text-right">{tagLimit - tags.length  } tags left</p>

          <button 
            className="btn-dark px-8"
            onClick={publishBlog}
          >
            Publish
          </button>

        </div>

      </section>

    </AnimationWrapper>
  )
}

export default PublishForm