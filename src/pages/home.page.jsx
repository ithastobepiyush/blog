import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InpageNavigation from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/minimal-blogpost.component";

const HomePage = () => {
  let [blogs, setBlog] = useState(null);
  let [trendingBlogs, setTrendingBlog] = useState(null);
  let [pageState, setPageState] = useState("home")

  let categories = [
    "programming",
    "hollywood",
    "social media",
    "finances",
    "tech",
    "travel",
    "ai",
    "technology",
    "ml",
    "innovation",
    "future"
  ];

  const fetchlatestBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
      .then(({ data }) => {
        setBlog(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchtrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlog(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadBlogByCategory = (e) => {

    let category = e.target.innerText.toLowerCase()

    setBlog(null)
    if(pageState == category){
        setPageState("home")
        return;
    }
    setPageState(category)
  }

  useEffect(() => {
    fetchlatestBlogs();
    fetchtrendingBlogs();
  }, []);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* latest blogs */}
        <div className="w-full">

          <InpageNavigation
            routes={["home", "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >

            <>
              {blogs == null ? (
                <Loader />
              ) : (
                blogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                    transition={{ 
                        duration: 1, 
                        delay: i * 0.1 
                    }}
                    key={i}
                    >
                      <BlogPostCard
                        content={blog}
                        author={
                            blog.author.personal_info
                        }
                      />
                    </AnimationWrapper>
                  );
                })
              )}
            </>

            {trendingBlogs == null ? (
              <Loader />
            ) : (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: 1 * 0.1 }}
                    key={i}
                  >
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            )}
          </InpageNavigation>
        </div>

        {/* filters and trending blogs */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">

            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="font-medium text-xl mb-8">
                        Stories from all intrest
                    </h1>

                    <div className="flex gap-3 flex-wrap">

                        {categories.map((category, i) => {
                        return (
                            <button 
                                key={i}
                                onClick={loadBlogByCategory} className={"tag " + (pageState == category ? " bg-black text-white " : " ")} 
                            >
                                {category}

                            </button>
                        );
                        })}
                    </div>
                </div>

                <div>
                    <h1 className="font-medium text-xl mb-8">
                        Trending
                        <i className="fi fi-rr-arrow-trend-up"></i>
                    </h1>
                    {trendingBlogs == null ? (
                        <Loader />
                    ) : (
                        trendingBlogs.map((blog, i) => {
                        return (
                            <AnimationWrapper
                            transition={{ duration: 1, delay: i * 0.1 }}
                            key={i}
                            >
                            <MinimalBlogPost blog={blog} index={i} />
                            </AnimationWrapper>
                        );
                        })
                    )}
                </div>
            </div>

        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
