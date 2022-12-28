import axios from "axios";
import { createContext,useEffect, useState } from "react";
import { newsURL } from "../variables/variables";


export const StoreContext=createContext({
    idPost: [],
    url: '',
    setUrl: undefined,
    loading: false,
    setLoading: undefined,
    checked:true, 
    setChecked:undefined
})


const StoreComponent=({children})=>{
    const [idPost, setIdPost] = useState([]);
    const [url,setUrl]=useState(newsURL);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);
    
    async function fetchIdPost(url){
        await axios.get(url).then((response) => {
            setIdPost(response.data);
        });
    }

    useEffect(() => {
        setLoading(true);
        fetchIdPost(url);
        const timerId =setInterval(()=>{
            fetchIdPost(url);
        }, 60000);
        return () => {
            clearInterval(timerId);
        } 
    }, [url]);

    if (!idPost) return null;

    return (
        <StoreContext.Provider value={{idPost,url,setUrl,loading,setLoading,checked,setChecked}}>
            {children}
        </StoreContext.Provider>
  )
}
export default StoreComponent;