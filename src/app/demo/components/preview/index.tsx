
import classnames from 'classnames'
import './index.scss'

import styles from './index.module.scss'
import Image from "next/image";
import {ElementPreview} from "@/app/demo/types";
import {image} from "d3";
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
    function renderImage(){
        const image = data?.image
        if(!image) return null
        console.log("aspectRatio",image.aspectRatio)
        return (
            <div style={{aspectRatio:image.aspectRatio}} className={classnames("image-container","mb-2","rounded","overflow-hidden")}>

                <Image
                    style={{objectFit: "cover"}}
                    sizes={"328px"}
                    fill={true}
                    alt={image.alt}

                    src={image.src}
                />
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
        const {description,title} = data
        const paragraphs = description.split("\n")

        //@ts-ignore
        const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        let descriptionStyle,paragraphClassName
        if(isSafari){
            descriptionStyle = {WebkitLineClamp:Math.round(8/paragraphs.length)}
            paragraphClassName = "overflow-hidden"
        }
        return (
            <>
                <h1>{title}</h1>
                {renderImage()}
                <div style={descriptionStyle} className={styles.description}>
                    {
                        paragraphs.map((d,i)=>(
                            <p key={i} className={classnames(paragraphClassName,{"mb-0":i===paragraphs.length-1})}>
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