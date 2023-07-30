import {Reference} from "@/app/demo/types";


export default function References({references}:{references?:Reference[]}){
    if(!references) return null
    const title = references.length>1?"Sources":"Source"
    const links = references.map((el,i)=>(
        <a key={i} target={"_blank"} href={el.url} >{el.title}</a>
    ))
    return (
        <p className={"mb-2"}>
            <b>{title}:</b> {links}
        </p>
    )
}