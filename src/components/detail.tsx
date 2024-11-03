
"use client"

import { useParams } from "next/navigation";

const DetailPage = () =>{
    const params = useParams();
    console.log("params", params);


    return <div>hi you selected</div>;
}

export default DetailPage