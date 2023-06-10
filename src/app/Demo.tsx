"use client"

import Tree, {TreeElement} from "@/Tree";
import {useEffect, useState} from "react";
const _treeElement:TreeElement = {
    id:"root",
    name:"Felidae",
    color:"#FF00FF",
    children:[
        {
            id:1,
            name:"Pantherinae",

            children:[
                {
                    id:2,
                    name:"Panthera",
                    children: [
                        {
                            name:"Leopard"
                        },
                        {
                            name:"Lion"
                        },
                        {
                          name: "Jaguar"
                        },
                        {
                            name:"Snow leopard"
                        },
                        {
                            name:"Tiger"
                        }
                    ]
                },
                {
                    id:3,
                    name:"Neofelis",
                    children: [
                        {
                            name: "Clouded leopard"
                        },
                        {
                            name:"Sunda clouded leopard"
                        }
                    ]
                }
            ]
        },
        {
            id:4,
            name:"Felinae",
            color:"#FF8000",
            children:[
                {
                    id:5,
                    name:"Catopuma",
                    children: [
                        {
                            name:"Bay cat (C. badia)"
                        },
                        {
                            name:"Asian golden cat"
                        }
                    ]
                },
                {
                    id:6,
                    name:"Pardofelis",
                    children:[
                        {
                            id:7,
                            name:"Marbled cat"
                        }
                    ]
                },
                {
                    name: "Caracal",
                    children: [
                        {
                            name: "Caracal"
                        },
                        {
                            name:"African golden cat"
                        }
                    ]

                },
                {
                    name:"Leptailurus",
                    children: [
                        {
                            name: "Serval"
                        }
                    ]
                },
                {
                    name:"Leopardus",
                    children: [
                        {
                            name:"Geoffroy's cat"
                        },
                        {
                            name:"Kodkod"
                        },
                        {
                            name:"Oncilla"
                        },
                        {
                            name:"Andean mountain cat"
                        },
                        {
                            name:"Pampas cat"
                        },
                        {
                            name:"Ocelot"
                        },
                        {
                            name:"Margay"
                        }
                    ]
                },
                {
                    name: "Lynx",
                    children:[
                        {
                            name:"Eurasian lynx"
                        },
                        {
                            name:"Iberian lynx"
                        },
                        {
                            name:"Canada lynx"
                        },
                        {
                            name:"Bobcat"
                        },
                        {
                            name:"Puma",
                            children:[
                                {
                                    name:"Cougar"
                                }
                            ]
                        },
                        {
                            name:"Herpailurus",
                            children:[
                                {
                                    name:"Jaguarundi"
                                }
                            ]
                        },
                        {
                            name:"Acinonyx",
                            children:[
                                {
                                    name:"Cheetah"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

}

const treeElement:TreeElement = {
    name:"Felidae",
    children:[
        {
            name:"Pantherinae",
            children:[
                {
                    name:"Panthera",
                    children:[
                        {
                            name:"Leopard"
                        },
                        {
                            name:"Lion"
                        },
                        {
                            name:"Jaguar"
                        },
                        {
                            name:"Snow Leopard"
                        },
                        {
                            name:"Tiger"
                        }
                    ]
                },
                {
                    name:"Neofelis",
                    children:[
                        {
                            name:"Clouded leopard"
                        },
                        {
                            name:"Sunda clouded leopard"
                        }
                    ]
                }
            ]
        },
        {
            name:"Felinae",
            children:[
                {
                    name:"Caracal",
                    children: [
                        {
                            name:"Caracal"
                        },
                        {
                            name:"African golden cat"
                        }
                    ]
                },
                {
                    name:"Leptailurus",
                    children: [
                        {
                            name:"Serval"
                        }
                    ]
                },
                {
                    name:"Leopardus",
                    children: [
                        {
                            name:"Geoffroy's cat"
                        },
                        {
                            name:"Kodkod"
                        },
                        {
                            name:"Southern tiger cat"
                        },
                        {
                            name:"Oncilla"
                        },
                        {
                            name:"Pampas cat"
                        },
                        {
                            name:"Andean mountain cat"
                        },
                        {
                            name:"Ocelot"
                        },
                        {
                            name:"Margay"
                        }
                    ]
                },
                {
                    name:"Catopuma",
                    children: [
                        {
                            name:"Bay cat"
                        },
                        {
                            name:"Asian golden cat"
                        }
                    ]
                },
                {
                    name:"Pardofelis",
                    children: [
                        {
                            name:"Marbled cat"
                        }
                    ]
                },
                {
                    name:"Lynx",
                    children: [
                        {
                            name:"Eurasian lynx "
                        },
                        {
                            name:"Iberian lynx"
                        },
                        {
                            name:"Canada lynx"
                        },
                        {
                            name:"Bobcat"
                        }
                    ]
                },
                {
                    name:"Puma",
                    children: [
                        {
                            name:"Cougar"
                        }
                    ]
                },
                {
                    name:"Herpailurus",
                    children: [
                        {
                            name:"Jaguarundi"
                        }
                    ]
                },
                {
                    name:"Acinonyx",
                    children: [
                        {
                            name:"Cheetah"
                        }
                    ]
                },
                {
                    name: "Prionailurus",
                    children: [
                        {
                            name: "Sunda leopard cat"
                        },
                        {
                            name: "Leopard cat"
                        },
                        {
                            name: "Fishing cat"
                        },
                        {
                            name: "Flat-headed cat"
                        },
                        {
                            name: "Rusty-spotted cat"
                        }
                    ]
                },
                {
                    name:"Otocolobus",
                    children: [
                        {
                            name: "Pallas's cat "
                        }
                    ]
                },
                {
                    name: "Felis",
                    children: [
                        {
                            name: "Jungle cat"
                        },
                        {
                            name: "Black-footed cat"
                        },
                        {
                            name: "Sand cat"
                        },
                        {
                            name: "Chinese mountain cat"
                        },
                        {
                            name: "African wildcat"
                        },
                        {
                            name: "European wildcat"
                        },
                        {
                            name: "Domestic cat"
                        }
                    ]
                }
            ]
        }
    ]
}

export default function Demo(){

    const [h,setH] = useState<string>("")



    return (
        <div>
            <h1>Hover: {h}</h1>
            <Tree

                leftPadding={52}
                rightPadding={151}
                onNodeClick={(e)=>{
                    alert(e.data.name)
                }}
                onNodeMouseOver={(e)=>{
                    console.log("over",e)
                    setH(e.data.name)
                }}
                onNodeMouseEnter={(e)=>{
                    console.log("enter",e)
                }}
                onNodeMouseLeave={(e)=>{
                    console.log("leave",e)
                    setH("")
                }}
                treeElement={treeElement}/>
        </div>

    )
}