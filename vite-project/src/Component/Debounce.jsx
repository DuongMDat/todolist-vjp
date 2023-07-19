import axios from "axios"
import { useEffect, useState } from "react"

export default function Debounce() {

    let [filter, setFilter] = useState("")

    useEffect(() => {
        let getData = setTimeout(() => {
            let config = {
                method: "get",
                url: `https://api.postalpincode.in/pincode/${filter}`
            }
            axios(config)
                .then(res => {
                    console.log(`${filter}`);
                })
        }, 1);
        return () => clearTimeout(getData)
    }, [filter])
    
    return(
        <div className="app">
      <input
        placeholder="Search Input.."
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
    )
}