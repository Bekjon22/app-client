import React, {useEffect, useState} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import PrimarySearchAppBar from "../component/Navbar";
import {API_PATH, CONFIG, TOKEN} from "../component/Constants";
import {CSVLink, CSVDownload} from "react-csv";
import {FormControl, FormHelperText, Input, InputLabel, MenuItem, TextField} from '@mui/material';
import {toast} from "react-toastify";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';


const MyCollections = () => {
    const [client, setClient] = useState([])
    const [disable, setDisable] = useState(false)
    const [photo, setPhoto] = useState()
    const [currentClient, setCurrentClient] = useState(undefined)

    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();
    const [topic, setTopic] = React.useState();

    const navigate = useNavigate()


    // const config = {
    //     headers: {Authorization: `Bearer ` + localStorage.getItem(TOKEN)}
    // };

    const getMyCollections = () => {

        axios.get(API_PATH + '/collection/get-all-by-user', CONFIG).then(res => {
            console.log(res.data.data)
            setClient(res.data.data)
        }).catch((error) => {
            navigate('/')
            toast.dark("You don't have permission!")
        })
    }


    useEffect(() => {

        getMyCollections()


    }, [])


    const openModal = () => {
        setDisable(!disable)

    }


    const saveCollection = (event, values) => {
        window.location.href = "/myAccount"

        const material = {
            name: name,
            description: description,
            topic: topic,
            photoId: photo

        }

        if (!currentClient) {

            axios.post(API_PATH + "/collection/add", material, CONFIG).then(res => {
                console.log(res)
                toast.success(res.data.message)
                // getProduct()

            }).catch((err) => {
                if (err?.response?.data?.errors?.length) {
                    err.response.data.errors.forEach(er => {

                        toast.error(er?.errorMsg || 'Error', {toastId: 'error' + Math.random()})
                    })
                } else {
                    toast.error('Error', {toastId: 'error' + Math.random()})
                }

            })

            openModal()
        }

    }


    function clickCollection() {
        setDisable(true)
    }


    function handlePhoto(event: any) {

        let file = event.target.files[0];

        let forFormData = new FormData();
        forFormData.append("file", file)


        axios.post(API_PATH + "/attachment/upload", forFormData, CONFIG).then(res => {
            console.log(res.data)
            setPhoto(res.data.data)
            // toast.success(res.data.message)


        }).catch((err) => {
            console.log(err.response.data.message)
            // toast.error(err.response.data.message)
        })

    }
    const handleClickRow = (value) => {
        navigate(`/collection/${value.id}`)
    }

    return (

        <div className={"body"}>
            <div className={"navbar"}>
                <PrimarySearchAppBar/>
            </div>
            <div className={"container collection bg-white bg-opacity-50 shadow"}>
                <h1> My collections</h1>

                <Table id={"csv-table"}
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



                        return  <tr style={{cursor: 'pointer'}} onClick={() => handleClickRow(value)}>
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
                    filename={"My Collections.csv"}
                    target="_blank"
                >
                    Download csv
                </CSVLink>


    <Box className={'mt-2'} textAlign={'right'}>
                <Button variant={'contained'}  onClick={clickCollection} style={{
                    borderRadius: 25,
                    backgroundColor: "#42d5e0",
                    padding: "14px 25px",
                    margin: "18px 36px",
                    fontSize: "18px"
                }}>ADD</Button>
            </Box>
            </div>
            <div>
                <Modal isOpen={disable}>
                    <ModalHeader toggle={() => {
                        openModal()
                    }}>
                        Add Collection
                    </ModalHeader>
                    <ModalBody className={"modal-body"}>
                        <FormControl>


                            <TextField className={'mb-3'} value={name} onChange={(e) => setName(e.target.value)}
                                       label={'Name'}

                            />

                            <TextField className={'mb-3'} value={description} onChange={(e) => setDescription(e.target.value)}
                                       label={'Description'}

                            />

                            <TextField className={'mb-3'} value={topic} onChange={(e) => setTopic(e.target.value)}
                                       label={'Select Topic'}
                                       select
                            >
                                <MenuItem value={'BOOKS'}>BOOKS </MenuItem>
                                <MenuItem value={'SIGNS'}> SIGNS</MenuItem>
                                <MenuItem value={'MUSIC'}> MUSIC</MenuItem>
                                <MenuItem value={'WHISKY'}> WHISKY</MenuItem>
                                <MenuItem value={'PHOTO'}> PHOTO</MenuItem>
                            </TextField>

                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={handlePhoto}
                                />
                            </Button>

                            <Button className={'mt-4'} onClick={saveCollection}> Submit</Button>

                        </FormControl>
                    </ModalBody>
                </Modal>
            </div>
        </div>


    );
};

export default MyCollections;