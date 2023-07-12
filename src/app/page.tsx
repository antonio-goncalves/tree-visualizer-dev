import Image from 'next/image'
import Tree, {TreeElement, TreeElementType} from "@/app/demo/components/Tree";
import {useRef} from "react";
import Index from "@/app/demo";
import {getTree} from "@/app/elements/tree/route";

const tree:TreeElement ={
    "id": "felidae",
    "name": "Felidae",
    "children": [
    {
        "id": "pantherinae",
        "name": "Pantherinae",
        type:"pantheraLineage",
        "children": [
            {
                "id": "panthera",
                "name": "Panthera",
                type:"pantheraLineage",
                "children": [
                    {
                        "id": "leopard",
                        "name": "Leopard", type:"pantheraLineage"
                    },
                    {
                        "id": "lion",
                        "name": "Lion", type:"pantheraLineage"
                    },
                    {
                        "id": "jaguar",
                        "name": "Jaguar", type:"pantheraLineage"
                    },
                    {
                        "id": "snowLeopard",
                        "name": "Snow leopard", type:"pantheraLineage"
                    },
                    {
                        "id": "tiger",
                        "name": "Tiger", type:"pantheraLineage"
                    }
                ]
            },
            {
                "id": "neofelis",
                "name": "Neofelis", type:"pantheraLineage",
                "children": [
                    {
                        "id": "cloudedLeopard",
                        "name": "Clouded leopard", type:"pantheraLineage"
                    },
                    {
                        "id": "sundaCloudedLeopard",
                        "name": "Sunda clouded leopard", type:"pantheraLineage"
                    }
                ]
            }
        ]
    },
    {
        "id": "felinae",
        "name": "Felinae",
        "children": [
            {
                "id": "caracalGenus",
                "name": "Caracal (genus)",
                "children": [
                    {
                        "id": "caracal",
                        "name": "Caracal"
                    },
                    {
                        "id": "africanGoldenCat",
                        "name": "African golden cat"
                    }
                ]
            },
            {
                "id": "leptailurus",
                "name": "Serval",
                "children": [
                    {
                        "id": "serval",
                        "name": "Serval"
                    }
                ]
            },
            {
                "id": "leopardus",
                "name": "Leopardus",
                "children": [
                    {
                        "id": "geoffroysCat",
                        "name": "Geoffroy's cat"
                    },
                    {
                        "id": "kodkod",
                        "name": "Kodkod"
                    },
                    {
                        "id": "leopardusGuttulus",
                        "name": "Leopardus guttulus"
                    },
                    {
                        "id": "oncilla",
                        "name": "Oncilla"
                    },
                    {
                        "id": "pampasCat",
                        "name": "Pampas cat"
                    },
                    {
                        "id": "andeanMountainCat",
                        "name": "Andean mountain cat"
                    },
                    {
                        "id": "ocelot",
                        "name": "Ocelot"
                    },
                    {
                        "id": "margay",
                        "name": "Margay"
                    }
                ]
            },
            {
                "id": "catopuma",
                "name": "Catopuma",
                "children": [
                    {
                        "id": "bayCat",
                        "name": "Bay cat"
                    },
                    {
                        "id": "asianGoldenCat",
                        "name": "Asian golden cat"
                    }
                ]
            },
            {
                "id": "pardofelis",
                "name": "Pardofelis",
                "children": [
                    {
                        "id": "marbledCat",
                        "name": "Marbled cat"
                    }
                ]
            },
            {
                "id": "lynx",
                "name": "Lynx",
                "children": [
                    {
                        "id": "eurasianLynx",
                        "name": "Eurasian lynx"
                    },
                    {
                        "id": "iberianLynx",
                        "name": "Iberian lynx"
                    },
                    {
                        "id": "canadaLynx",
                        "name": "Canada lynx"
                    },
                    {
                        "id": "bobcat",
                        "name": "Bobcat"
                    }
                ]
            },
            {
                "id": "pumaGenus",
                "name": "Puma (genus)",
                "children": [
                    {
                        "id": "cougar",
                        "name": "Cougar"
                    }
                ]
            },
            {
                "id": "herpailurus",
                "name": "Jaguarundi",
                "children": [
                    {
                        "id": "jaguarundi",
                        "name": "Jaguarundi"
                    }
                ]
            },
            {
                "id": "acinonyx",
                "name": "Acinonyx",
                "children": [
                    {
                        "id": "cheetah",
                        "name": "Cheetah"
                    }
                ]
            },
            {
                "id": "prionailurus",
                "name": "Prionailurus",
                "children": [
                    {
                        "id": "sundaLeopardCat",
                        "name": "Sunda leopard cat"
                    },
                    {
                        "id": "leopardCat",
                        "name": "Leopard cat"
                    },
                    {
                        "id": "fishingCat",
                        "name": "Fishing cat"
                    },
                    {
                        "id": "flatHeadedCat",
                        "name": "Flat-headed cat"
                    },
                    {
                        "id": "rustySpottedCat",
                        "name": "Rusty-spotted cat"
                    }
                ]
            },
            {
                "id": "otocolobus",
                "name": "Pallas's cat",
                "children": [
                    {
                        "id": "pallassCat",
                        "name": "Pallas's cat"
                    }
                ]
            },
            {
                "id": "felis",
                "name": "Felis",
                "children": [
                    {
                        "id": "jungleCat",
                        "name": "Jungle cat"
                    },
                    {
                        "id": "blackFootedCat",
                        "name": "Black-footed cat"
                    },
                    {
                        "id": "sandCat",
                        "name": "Sand cat"
                    },
                    {
                        "id": "chineseMountainCat",
                        "name": "Chinese mountain cat"
                    },
                    {
                        "id": "africanWildcat",
                        "name": "African wildcat"
                    },
                    {
                        "id": "europeanWildcat",
                        "name": "European wildcat"
                    },
                    {
                        "id": "cat",
                        "name": "Cat"
                    }
                ]
            }
        ]
    }
]
}

const treeElementTypes:TreeElementType[] = [
    {
        id:"panthera",
        color:"#c670c6",
        title:"Panthera lineage"
    },
    {
        id:"carcal",
        color:"#008b8b",
        title:"Carcal lineage"
    },
    {
        id:"ocelot",
        color:"#006400",
        title:"Ocelot lineage"
    },
    {
        id:"bayCat",
        color:"#0000ff",
        title:"Bay cat lineage"
    },
    {
        id:"lynx",
        color:"#ff8c00",
        title:"Lynx lineage"
    },
    {
        id:"puma",
        color:"#dd4400",
        title:"Puma lineage"
    },
    {
        id:"leopard",
        color:"#aa3322",
        title:"Leopard lineage"
    }
]

export default async function Home() {
    const treeData = await getTree()

    if(!treeData){
        return (    <main>

           Data missing
        </main>)
    }

  return (
    <main>

      <Index treeElementTypes={treeElementTypes} treeData={treeData}/>
    </main>
  )
}
