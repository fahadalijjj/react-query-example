import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const DependentQueries = ({email}) => {
    
    const fetchUserByEmail = async(email)=>{
        const response = await axios.get(`http://localhost:4000/users/${email}`);
        return response.data;
    }

    const fetchCoursesByChannelId = async(channelId) => {
        const response =  await axios.get(`http://localhost:4000/channels/${channelId}`);
        console.log(response.data)
        return response.data;
      }

    const {data:user} = useQuery({
        queryKey:['user',email],
        queryFn: ()=>fetchUserByEmail(email)
    })

    // const channelId = undefined;

    // value --> true
    // undefined --> false
    const channelId = user?.channelId;

    useQuery({queryKey:['courses',channelId],
        queryFn:()=>fetchCoursesByChannelId(channelId),
        enabled: !!channelId,
    } )

    

    return (
        <div>
            Dependent
        </div>
    );
}

export default DependentQueries;
