import {Reference} from "@/app/demo/types";


interface ReferencesProps {
    references?:Reference[] | Reference | undefined,
    className?:string
}

export default function References({references,className}:ReferencesProps){
    if(!references) return null
    const _references = Array.isArray(references)?references:[references]
    const title = _references.length>1?"Sources":"Source"
    const links = _references.map((el,i)=>(
        <a key={i} target={"_blank"} href={el.url} >{el.title}</a>
    ))
    return (
        <p className={className}>
            <b>{title}:</b> {links}
        </p>
    )
}