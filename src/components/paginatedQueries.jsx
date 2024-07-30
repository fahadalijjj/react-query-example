import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";




const PaginatedQueries = () => {
    
    const fetchColors = async(pageNumber)=>{
        const response = await axios.get(`http://localhost:4000/colors?_page=${pageNumber}&_per_page=2`);
        return response.data
    }
    const [pageNumber, setPageNumber] = useState(1);

    const {data, isError, isLoading, error, isFetching} = useQuery({
        queryKey:['colors',pageNumber],
        queryFn: ()=>fetchColors(pageNumber),
        placeholderData: keepPreviousData
    },
    
)


    if (isLoading) {
        return <h2>Loading...</h2>
      }
    
      if (isError) {
        return <h2>{error.message}</h2>
      }
    

    return (
        <div>
            <div>
        {data?.data.map(color => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          )
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber(page => page - 1)}
          disabled={pageNumber === 1}>
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber(page => page + 1)}
          disabled={pageNumber === 4}>
          Next Page
        </button>
      </div>
      {isFetching && 'Loading'}
    <div/>
        </div>
    );
}

export default PaginatedQueries;
