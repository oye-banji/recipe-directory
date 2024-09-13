import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
//styles
import './Recipe.css'

export default function Recipe() {
   const {id} = useParams()// gets the id from the route
   const url = 'http://localhost:3000/recipes/' + id
   const {data: recipe, error, isPending} = useFetch(url)
  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {recipe && <h1>{recipe.title}</h1>
      }
    </div>
  )
}
