import { useQueries } from "@tanstack/react-query";
import axios from "axios";


const DynamicParellel = () => {
    

    const fetchFriends = async(name) => {
            const response = await axios.get(`http://localhost:4000/friends/?name=${name}`);
            // console.log(response.data)
            return response.data;
    }

    //const ids = [1,2,3];

    const names = ["Chandler Bing","Joey Tribbiani","Rachel Green"]

    const queryResults = useQueries({
        queries: names.map((name)=>{
            return {
                queryKey:['friends',name],
                queryFn: ()=> fetchFriends(name)
            }
        })}
    )
    
    const results = queryResults.map((query)=>query.data)
    console.log(results);

    return (
        <div>
            Dynamic Parellel
        </div>
    );
}

export default DynamicParellel;
