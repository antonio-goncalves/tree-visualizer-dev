import {TreeElement} from "@/Tree";

const treeData:TreeElement ={
    name:"Felidae",
    id:"felidae",
    children:[
        {
            "name": "Pantherinae",
            "children": [
                {
                    "name": "Panthera",
                    "children": [
                        {
                            "id": "leopard",
                            "name": "Leopard"
                        },
                        {
                            "id": "lion",
                            "name": "Lion"
                        },
                        {
                            "id": "jaguar",
                            "name": "Jaguar"
                        },
                        {
                            "id": "snowLeopard",
                            "name": "Snow Leopard"
                        },
                        {
                            "id": "tiger",
                            "name": "Tiger"
                        }
                    ],
                    "id": "panthera"
                },
                {
                    "id": "neofelis",
                    "name": "Neofelis",
                    "children": [
                        {
                            "id": "cloudedLeopard",
                            "name": "Clouded leopard"
                        },
                        {
                            "id": "sundaCloudedLeopard",
                            "name": "Sunda clouded leopard"
                        }
                    ]
                }
            ],
            "id": "pantherinae"
        },
        {
            "id": "felinae",
            "name": "Felinae",
            "children": [
                {
                    "id": "caracal",
                    "name": "Caracal",
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
                    "name": "Leptailurus",
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
                            "id": "geoffroy'SCat",
                            "name": "Geoffroy's cat"
                        },
                        {
                            "id": "kodkod",
                            "name": "Kodkod"
                        },
                        {
                            "id": "southernTigerCat",
                            "name": "Southern tiger cat"
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
                            "name": "Margay",
                            "id": "margay"
                        }
                    ]
                },
                {
                    "name": "Catopuma",
                    "children": [
                        {
                            "name": "Bay cat",
                            "id": "bayCat"
                        },
                        {
                            "name": "Asian golden cat",
                            "id": "asianGoldenCat"
                        }
                    ],
                    "id": "catopuma"
                },
                {
                    "name": "Pardofelis",
                    "children": [
                        {
                            "name": "Marbled cat",
                            "id": "marbledCat"
                        }
                    ],
                    "id": "pardofelis"
                },
                {
                    "name": "Lynx",
                    "children": [
                        {
                            "name": "Eurasian lynx ",
                            "id": "eurasianLynx"
                        },
                        {
                            "name": "Iberian lynx",
                            "id": "iberianLynx"
                        },
                        {
                            "name": "Canada lynx",
                            "id": "canadaLynx"
                        },
                        {
                            "name": "Bobcat",
                            "id": "bobcat"
                        }
                    ],
                    "id": "lynx"
                },
                {
                    "name": "Puma",
                    "children": [
                        {
                            "name": "Cougar",
                            "id": "cougar"
                        }
                    ],
                    "id": "puma"
                },
                {
                    "name": "Herpailurus",
                    "children": [
                        {
                            "name": "Jaguarundi",
                            "id": "jaguarundi"
                        }
                    ],
                    "id": "herpailurus"
                },
                {
                    "name": "Acinonyx",
                    "children": [
                        {
                            "name": "Cheetah",
                            "id": "cheetah"
                        }
                    ],
                    "id": "acinonyx"
                },
                {
                    "name": "Prionailurus",
                    "children": [
                        {
                            "name": "Sunda leopard cat",
                            "id": "sundaLeopardCat"
                        },
                        {
                            "name": "Leopard cat",
                            "id": "leopardCat"
                        },
                        {
                            "name": "Fishing cat",
                            "id": "fishingCat"
                        },
                        {
                            "name": "Flat-headed cat",
                            "id": "flat-HeadedCat"
                        },
                        {
                            "name": "Rusty-spotted cat",
                            "id": "rusty-SpottedCat"
                        }
                    ],
                    "id": "prionailurus"
                },
                {
                    "name": "Otocolobus",
                    "children": [
                        {
                            "name": "Pallas's cat ",
                            "id": "pallas'SCat"
                        }
                    ],
                    "id": "otocolobus"
                },
                {
                    "name": "Felis",
                    "children": [
                        {
                            "name": "Jungle cat",
                            "id": "jungleCat"
                        },
                        {
                            "name": "Black-footed cat",
                            "id": "black-FootedCat"
                        },
                        {
                            "name": "Sand cat",
                            "id": "sandCat"
                        },
                        {
                            "name": "Chinese mountain cat",
                            "id": "chineseMountainCat"
                        },
                        {
                            "name": "African wildcat",
                            "id": "africanWildcat"
                        },
                        {
                            "name": "European wildcat",
                            "id": "europeanWildcat"
                        },
                        {
                            "name": "Domestic cat",
                            "id": "domesticCat"
                        }
                    ],
                    "id": "felis"
                }
            ]
        }
    ]
}

export default treeData
