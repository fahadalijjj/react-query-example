import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const ParellelQueries = () => {
    
    const fetchSuperHeroes = async() => {
        return await axios.get('http://localhost:4000/superheroes')
      }
      
    const fetchFriends = async() => {
        return await axios.get('http://localhost:4000/friends')
      }

    const { data: heros } = useQuery({queryKey:['heros'],queryFn:fetchSuperHeroes});
    const { data: friends} = useQuery({queryKey:['friends'], queryFn:fetchFriends});
   


    console.log(heros?.data,friends?.data)
    return (
        <div>
           Parellel
        </div>
    );
}

export default ParellelQueries;
