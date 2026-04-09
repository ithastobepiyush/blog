import { useEffect, useState } from "react"
import AnimationWrapper from "../common/page-animation"
import InpageNavigation from "../components/inpage-navigation.component"
import axios from "axios"

const HomePage = () => {

    const fetchlatestBlog = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blog")
        .then(({ blogs }) => {
            console.log(blogs)
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
                        <h1>Latest blogs</h1>
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