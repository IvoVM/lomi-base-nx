//For future purpouses it will be better to store this in firebase

export const configuration = {
    ROOT_CATEGORY_ID: 2891,
    STORE_TAXONOMY_ID: 223,

    STORE_SHIPPING_CATEGORY_ID: 2,

    inventoryConfiguration: {
        //Reglas de lectura del excel

        product: {
            name: "Producto",
            price: "Price",
            description: "Desc",
            ean: "EAN",
            master_sku: "Sku",
            producer: "Productor",
        },
        
        variant: {
            sku: "Sku",
            ean: "EAN",
        },

        imageCdns: [
            "Imagen"
        ],

        taxonsHierarchy: [
            "Level 1",
            "Level 2",
        ]
    }
}