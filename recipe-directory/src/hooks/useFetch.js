import { useState, useEffect, useRef} from "react"

export const useFetch = (url) => {
    const[data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    // use useRef to wrap an object/array argument
    // which is a useEffect dependency]

    //const options = useRef(_options).current
    
    useEffect(() => {
        //console.log(options)
        const controller = new AbortController()
        const fetchData = async () => {
            setIsPending(true)

            try{
            const res = await fetch(url, {signal: controller.signal})
            if(!res.ok){
                throw new Error(res.statusText )
            }
            const json = await res.json()
            setIsPending(false)
            setData(json)
            setError(null) // if we previously had an error now that we get dont get an error we want to set the error value back to null
            }catch(err){
                if(err.name === 'AbortError'){
                    console.log('the fetch was aborted')
                }else{
                    setIsPending(false)
                    setError('Could not fetch the data')// only networking error not anything that have to do with a faulty url
                    console.log(err.message)
                }
            }
            

            
        }
        fetchData()
        return () => {
            //clean up function fires whenever the componeent that we are using the useEffects in unmounts(abort before the async function finishes fetching the response)
            controller.abort()
        }
    }, [url])

    return { data, isPending, error }

}
