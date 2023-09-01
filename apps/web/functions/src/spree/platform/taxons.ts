import axios from 'axios'
import { getAccessToken } from './auth'
import { configuration } from '../../store'

export async function searchIfTaxonExist(name:string):Promise<TaxonAttributes>{
    //https://lomi.cl/api/v1/taxons?q[name_cont]=${name}&token=8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3
    const res = await axios.get(`https://lomi.cl/api/v1/taxons?q[name_cont]=${name}&token=8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3`).then(
        res => {
            if(res.data.taxons.length > 0){
                return res.data.taxons[0]
            } else {
                return {}
            }
        }
    ).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res
}

export async function createNewTaxon(name:string, taxonomy_id:number, parent_id:number){
    //http://localhost:3000/api/v2/platform/taxons?taxon[name]=pruebaRukafe&taxon[taxonomy_id]=223&taxon[parent_id]=2891
    console.log("[createNewTaxon] name: ", name, "taxonomy_id: ", taxonomy_id, "parent_id: ", parent_id)
    const res = await axios.post(`https://lomi.cl/api/v2/platform/taxons?taxon[name]=${name}&taxon[taxonomy_id]=${taxonomy_id}&taxon[parent_id]=${parent_id}`, {}, {
        headers: {
            'Authorization': 'Bearer ' + (await getAccessToken())
        }
    })
    .then(res => {
        return res.data
    }).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data
}

export async function createIfDoesntExistByName(taxonName:string, parent_id = configuration.ROOT_CATEGORY_ID){
    const res = await searchIfTaxonExist(taxonName)
    if(res.id){
        return res
    } else {
        const res = await createNewTaxon(taxonName, configuration.STORE_TAXONOMY_ID, parent_id)
        return res
    }
}

export type TaxonAttributes = {
    id: number,
    name: string,
    pretty_name: string,
    permalink: string,
    parent_id: number,
    taxonomy_id: number,
    meta_title: string,
    meta_description: string,
    taxons: Array<TaxonAttributes>,
}