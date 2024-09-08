import { useRouter } from "next/router"

export default function Users(){

    const routre = useRouter();
    const {id} = routre.query;
    return (
        <>
        <h1>
            user            
            <p>{id}</p>
        </h1>
        </>
    )
}