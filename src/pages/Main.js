import React, {useEffect, useState} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from "reactstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import PrimarySearchAppBar from "../component/Navbar";
import {API_PATH, USER_KEY} from "../component/Constants";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";
import s from "../component/dataGrid.css"
import {Link} from "@mui/material";
import data from "bootstrap/js/src/dom/data";
// import {AvField, AvForm} from "availity-reactstrap-validation";

const Main = () => {
    const [client, setClient] = useState([])
    const [item, setItems] = useState([])
    // const [customFieldTypeEnums, setCustomFieldTypeEnums] = useState([])
    // const [clientCusField, setClientCusField] = useState([])
    // const [disable, setDisable] = useState(false)
    // const [disableCustField, setDisableCustField] = useState(false)
    // const [disableDropdown, setDisableDropdown] = useState(false)
    // const [deleteModal, setdeleteModal] = useState(false)
    // const [currentClient, setcurrentClient] = useState(undefined)
    // const [currentCustomField, setcurrentCustomField] = useState(undefined)


    const getTopCollections = () => {
        axios.get(API_PATH+'/collection/get-top').then(res => {
            // console.log(res.data.data)
            setClient(res.data.data)
        })
    }

    const getLastItems = () => {
        axios.get(API_PATH + '/item/last-items').then(res => {
            // console.log(res.data)
            setItems(res.data.data)
        })
    }

    // const getClientCusField = () => {
    //   axios.get(API_PATH + "client/cusFieldTableName",tokenHeader).then(res => {
    //       console.log(res.data.object)
    //       setClientCusField(res.data.object)
    //   })
    // }

    useEffect(() => {
        getLastItems()
        getTopCollections()
        localStorage.setItem('ok', 'hello');
        console.log(localStorage.getItem('ok'))
    }, [])




    return (
        <div className={"body"}>
            <div className={"navbar"}>
<PrimarySearchAppBar/>
            </div>
            <div className={"container collection bg-white bg-opacity-50 shadow"}>
                <h1> Top 5 largest collections</h1>

                <Table id={"excel-table"}
                >
                    <thead className={'fw-bolder text-black'}>
                    <tr>
                        <th>
                            #№
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Topic
                        </th>
                        <th>
                            Description
                        </th>

                    </tr>
                    </thead>
                    <tbody className={'fw-bold text-dark'}>
                    {client.map((value, index) => {
                        console.log(value)

                        function rowClick() {
                            console.log("click-row")
                        }

                        return  <tr style={{cursor: 'pointer'}} onClick={rowClick}>
                            <td>{index + 1}</td>
                            <td>{value.name}</td>
                            <td>{value.topic}</td>
                            <td>{value.description}</td>
                    </tr>

                    })}
                    </tbody>
                </Table>

            </div>
            <div className={"mx-lg-1"}>
                <CSVLink
                    className="item-btn btn btn-info mx-auto d-block"
                    data={client}
                    filename={"5-longest-collection.csv"}
                    target="_blank"
                >
                    Download csv
                </CSVLink>
            </div>

            <div>
                <div className={"container items-last bg-white bg-opacity-50 shadow"}>
                    <h1> Last added 5 items</h1>

                    <Table id={"excel-table-items"}
                    >
                        <thead className={'fw-bolder text-black'}>
                        <tr>
                            <th>
                                #№
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Collection Name
                            </th>
                            <th>
                                Author
                            </th>
                            <th>
                                Created Time
                            </th>

                        </tr>
                        </thead>
                        <tbody className={'fw-bold text-dark'}>
                        {item.map((value, index) => {
                            console.log(value)
                            return <tr style={{cursor: 'pointer'}}>
                                <td>{index + 1}</td>
                                <td>{value.itemName}</td>
                                <td>{value.collectionName}</td>
                                <td>{value.author}</td>
                                <td>{moment(value.createdTime).format("LLL")}</td>


                            </tr>
                        })}
                        </tbody>
                    </Table>

                </div>
                <div className={"mx-lg-1 mb-5"}>
                    <CSVLink
                        className="item-btn btn btn-info mx-auto d-block"
                        data={item}
                        filename={"last-items.csv"}
                        target="_blank"
                    >
                        Download csv
                    </CSVLink>
                </div>

            </div>

        </div>
    );
};

export default Main;