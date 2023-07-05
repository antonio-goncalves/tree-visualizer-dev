
import classnames from 'classnames'
import './index.scss'

import styles from './index.module.scss'
import Image from "next/image";
import {ElementPreview} from "@/app/demo/types";
interface  PopoverProps {
    data?:ElementPreview,
    isLoading?:boolean,
    failed?:boolean
}



export default function Preview({data,isLoading,failed}:PopoverProps){

    function renderPlaceholders(){
        return (
            <div className="ph-item">

                <div className="ph-col-12">
                    <div className="ph-row">
                        <div className="ph-col-10 title"></div>
                    </div>
                    <div className="ph-picture"></div>
                    <div className="ph-row">

                        <div className="ph-col-12 paragraph"></div>
                        <div className="ph-col-12 paragraph"></div>
                        <div className="ph-col-12 paragraph"></div>
                        <div className="ph-col-12 paragraph"></div>
                        <div className="ph-col-12 paragraph"></div>
                    </div>
                </div>
            </div>
        )
    }

    function renderInfo(){
        if(failed){
            return (
                <p className={"mb-0 text-danger text-center"}>Failed while loading the data</p>
            )
        }
        if(isLoading){
            return renderPlaceholders()
        }
        if(!data) return null
        const {description,title,image} = data
        const paragraphs = description.split("\n")
        return (
            <>
                <h1>{title}</h1>
                <div className={classnames("image-container","mb-2")}>
                    <Image
                        style={{objectFit:"cover"}}

                        fill={true}
                        alt={image.alt}
                        src={image.src}
                    />
                </div>
                <div className={styles.description}>
                    {
                        paragraphs.map((d,i)=>(
                            <p key={i} className={classnames({"mb-0":i===paragraphs.length-1})}>
                                {d}
                            </p>
                        ))
                    }
                </div>


            </>
        )
    }





    return (
        <section className={classnames("preview","p-3 shadow rounded")}>
            {renderInfo()}
        </section>
    )
}