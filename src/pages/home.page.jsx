import { useEffect, useState } from "react"
import AnimationWrapper from "../common/page-animation"
import InpageNavigation from "../components/inpage-navigation.component"
import axios from "axios"
import Loader from "../components/loader.component"
import BlogPostCard from "../components/blog-post.component"

const HomePage = () => {


    let [blogs, setBlog] = useState(null)

    const fetchlatestBlog = () => {

        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
        .then( ({data}) => {
            setBlog(data.blogs)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchlatestBlog()
    }, [])

    return(
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">

                    <InpageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>

                        <>
                            {
                                blogs == null ? <Loader /> : 
                                blogs.map((blog, i ) => {
                                    return <AnimationWrapper 
                                        keyValue="i"
                                        transition={{duration: 1, delay: i*.1}}
                                    >
                                        <BlogPostCard 
                                            content={blog}
                                            author={blog.author.personal_info}
                                        />
                                    </AnimationWrapper>
                                })
                            }
                        </>
                        <h1>Trending blogs</h1>

                    </InpageNavigation>
                </div>

                {/* filters and trending blogs */}
                <div className="w-full">

                </div>
            </section>
        </AnimationWrapper>
    )
}

export default HomePage