import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";



const InfiniteQueries = () => {
    
    const fetchColors = async({pageParam = 1})=>{
        const response = await axios.get(`http://localhost:4000/colors?_page=${pageParam}&_per_page=2`);
        return response.data
    }


   const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
   } = useInfiniteQuery({
    queryKey:['colors'],
    queryFn:fetchColors,
    getNextPageParam:(lastPage, pages) => {
        if(pages.length < 4) {
    
            return pages.length + 1
        } else {
            return undefined
        }
    }
   })


    if (isLoading) {
        return <h2>Loading...</h2>
      }
    
      if (isError) {
        return <h2>{error.message}</h2>
      }
    
      console.log(data.pages);

    return (
      <>
      <div>
        {data?.pages.map((group,i)=>{
            return (
                <Fragment key={i}>
                    {group?.data.map(color => (
                        <h2 key={color.id}>{color.id}. {color.label}</h2>
                    ))}
                </Fragment>
            )
        })}
      </div> <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>

      </>
    );
}

export default InfiniteQueries;
