
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'


const RQHeros = () => {


  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')
  
  const queryClient = useQueryClient();

  const fetchHeros = async() => {
      const response = await axios.get("http://localhost:4000/superheroes");
      console.log(response.data);
      return response.data;
  }



  const addHeros = async(newHero) => {
    const response = await axios.post("http://localhost:4000/superheroes",newHero);   
    return response.data;
}
  

  const {data,error,isLoading,refetch} = useQuery(
    {
      queryKey:["heros"],
      queryFn:fetchHeros,  
    },
    )

  const {mutate} = useMutation(
    {
      mutationFn: addHeros,
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({queryKey:["heros"]})
    // },
    
    //invalidate --> invalidate previous data --> refetch
    onSuccess:(newHero)=>{
        queryClient.setQueryData(['heros'],(oldHeros)=>[...oldHeros,newHero])
    },
    onError: (error) => {
      console.log("Mutation Error: "+error)
    }
      })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }


  const items = Array.isArray(data) ? data : [];

  
  return (
    <>
     <h2>Super Heroes Page</h2>
      <div>
        <h4>Add New Hero</h4>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />

        <button onClick={()=>mutate({
          id:Date.now(),
          name,
          alterEgo
        })}>Add Hero</button>      
      </div>

      {items.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>
      })}
      <button onClick={()=>refetch()}>Fetch</button>
    </>
  )
}

export default RQHeros
