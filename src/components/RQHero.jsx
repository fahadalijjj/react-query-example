import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom"


const RQHero = () => {

  const {heroId} = useParams();

  const fetchById = async () => {
    const response = await axios.get(`http://localhost:4000/superheroes/?id=${heroId}`);
    return response.data;
  }

  const {data, isLoading, error} = useQuery({queryKey:['heros',heroId],queryFn:fetchById})


  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  const hero = data[0];
  return (
    <>
     <h2>Super Hero Page</h2>
     <p>{hero.name}</p>
    </>
  )
}

export default RQHero
