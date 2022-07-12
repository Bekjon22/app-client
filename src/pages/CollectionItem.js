import axios from "axios"
import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {API_PATH, CONFIG} from "../component/Constants";
import {toast} from "react-toastify";

export const CollectionItem = () => {

    const [collection, setCollection] = useState(null)

    const {id} = useParams()

    const getCollectionById = async () => {


        try {
            const response = await axios.get(API_PATH + '/item/get-all-by-collection/' + id, CONFIG)
            setCollection(response.data)
            console.log(response.data)

        } catch (err) {
            if (err?.response?.data?.errors?.length) {
                err.response.data.errors.forEach(er => {

                    toast.error(er?.errorMsg || 'Error', {toastId: 'error' + Math.random()})
                })
            } else {
                toast.error('Error', {toastId: 'error' + Math.random()})
            }
        }
    }

    // setCollection(response.data)


    useEffect(() => {

            if (id) {
                (async () => {
                    await getCollectionById()
                })()
            }
        }, [id]
    )

    return (
        <>
            Collection item
            {
                collection &&
                <div>
                    {collection.map((value) => {
                        console.log(value.name)


                    })}
                </div>


            }
        </>



    )
}