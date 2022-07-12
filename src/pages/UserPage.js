import React, {useEffect, useState} from "react";
import axios from "axios";
import DataGridDemo from "./UserPanel";
import {GridColDef, gridDateFormatter, GridValueGetterParams} from "@mui/x-data-grid";
import {API_PATH, CONFIG, TOKEN, USER_KEY} from "../component/Constants";
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import dataGrid from '../component/dataGrid.css';
import {toast} from "react-toastify";
import {IconButton} from "@mui/material";
import moment from "moment";
import data from "bootstrap/js/src/dom/data";
import {CSVLink} from "react-csv";


const UserPage = () => {
    const [user, setUser] = useState([])

    const [selectedIDS, setSelectedIDS] = useState([])
    const navigate = useNavigate()

    const getUserList = async () => {
        await axios.get(API_PATH + '/user/get-all', CONFIG)
            .then(res => {
                setUser(res.data.data.content)
                console.log(res.data.data)
            })
            .catch(err => {
                console.log(err)
                navigate('/')
                toast.dark("You don't have permission!")
            })

    }

    useEffect(() => {
        (async () => {
            await getUserList()
        })()
    }, [])

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 50},
        {
            field: 'firstName',
            headerName: 'firstName',
            width: 250,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: false,
        },
        {
            field: 'registerAt',
            headerName: 'Registration Time',
            type: 'dateTime',
            width: 250,
            editable: false,
            valueFormatter: params => moment(data.registerAt).format("LLL")
        },
        {
            field: 'roleName',
            headerName: 'Role',
            sortable: true,
            width: 200,

        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'boolean',
            sortable: true,
            width: 200,

        }


    ];

    const handleDelete = async () => {
        if (!selectedIDS.length) {
            toast.dark("Not selected any user!!!")
            return
        }

        try {
            await axios.delete(API_PATH + `/user/delete`, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem(TOKEN)
                },
                data: {
                    ids: selectedIDS
                }

            })

            let remainingUsers = {}

            selectedIDS.forEach(id => {
                user.forEach(u => {
                    if (id !== u.id) {
                        remainingUsers = {
                            ...remainingUsers,
                            [u.id]: u
                        }
                    }
                })
            })
            setUser(Object.values(remainingUsers))
        } catch (err) {
            // navigate('/')
            if (err?.response?.data?.errors?.length) {
                err.response.data.errors.forEach(er => {


                    toast.error(er?.errorMsg || 'Error', {toastId: 'error' + Math.random()})
                })
            } else {
                console.log(localStorage.getItem(TOKEN))
                toast.error('Error', {toastId: 'error' + Math.random()})
            }

        }
    }

    const handleBlock = async () => {

        if (!selectedIDS.length) {
            toast.dark("Not selected any user!!!")
            return
        }

        try {
            await axios.put(API_PATH + `/user/block`, {ids: selectedIDS}, CONFIG)

            let remainingUsers = {}

            selectedIDS.forEach(id => {
                user.forEach(u => {
                    if (id === u.id) {
                        remainingUsers = {
                            ...remainingUsers,
                            [u.id]: {...u, status: false}
                        }
                    } else {
                        if (!remainingUsers[u.id]) {
                            remainingUsers = {
                                ...remainingUsers,
                                [u.id]: {...u}
                            }
                        }
                    }
                })
            })
            setUser(Object.values(remainingUsers))

        } catch (err) {
            // navigate('/')
            if (err?.response?.data?.errors?.length) {
                err.response.data.errors.forEach(er => {

                    toast.error(er?.errorMsg || 'Error', {toastId: 'error' + Math.random()})
                })
            } else {
                toast.error('Error', {toastId: 'error' + Math.random()})
            }


        }
    }

    // setUser(Object.values(remainingUsers))


    const handleUnBlock = async () => {
        const currentId = 1

        if (!selectedIDS.length) {
            toast.dark("Not selected any user!!!")
            return
        }

        try {
            await axios.put(API_PATH + `/user/unblock`, {ids: selectedIDS}, CONFIG)
            let remainingUsers = {}

            selectedIDS.forEach(id => {
                user.forEach(u => {
                    if (id === u.id) {
                        remainingUsers = {
                            ...remainingUsers,
                            [u.id]: {...u, status: true}
                        }
                    } else {
                        if (!remainingUsers[u.id]) {
                            remainingUsers = {
                                ...remainingUsers,
                                [u.id]: {...u}
                            }
                        }
                    }
                })
            })


            setUser(Object.values(remainingUsers))

        } catch (error) {
            // navigate('/')
            toast.dark("Your account blocked or deleted")
            console.log(error.data)

        }
    }


    const handleAddAdmin = async () => {

        if (!selectedIDS.length) {
            toast.dark("Not selected any user!!!")
            return
        }

        try {
            await axios.put(API_PATH + `/user/add-admin`, {ids: selectedIDS}, CONFIG)
            let remainingUsers = {}

            selectedIDS.forEach(id => {
                user.forEach(u => {
                    if (id === u.id) {
                        remainingUsers = {
                            ...remainingUsers,
                            [u.id]: {...u, status: true}
                        }
                    } else {
                        if (!remainingUsers[u.id]) {
                            remainingUsers = {
                                ...remainingUsers,
                                [u.id]: {...u}
                            }
                        }
                    }
                })
                window.location.href='/user'
            })


            setUser(Object.values(remainingUsers))

        } catch (error) {
            // navigate('/')
            toast.dark("Your account blocked or deleted")
            console.log(error.data)

        }
    }


    const handleRemoveAdmin = async () => {
        if (!selectedIDS.length) {
            toast.dark("Not selected any user!!!")
            return
        }

        try {
            await axios.put(API_PATH + `/user/remove-admin`, {ids: selectedIDS}, CONFIG)
            let remainingUsers = {}

            selectedIDS.forEach(id => {
                user.forEach(u => {
                    if (id === u.id) {
                        remainingUsers = {
                            ...remainingUsers,
                            [u.id]: {...u, status: true}
                        }
                    } else {
                        if (!remainingUsers[u.id]) {
                            remainingUsers = {
                                ...remainingUsers,
                                [u.id]: {...u}
                            }
                        }
                    }
                })
                window.location.href='/user'
            })


            setUser(Object.values(remainingUsers))

        } catch (err) {
            if (err?.response?.data?.errors?.length) {
                err.response.data.errors.forEach(er => {


                    toast.error(er?.errorMsg || 'Error', {toastId: 'error' + Math.random()})
                })
            } else {
                console.log(localStorage.getItem(TOKEN))
                toast.error('Error', {toastId: 'error' + Math.random()})
            }


        }
    }

    return (
        <div className={'container mt-2 shadow-lg'}>
            <DataGridDemo
                rows={user}
                columns={columns}
                pageSize={20}
                setSelectedIDS={setSelectedIDS}
            />

            <div className={'d-flex mt-2 delete'}>
                <div className={"delete"}>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>

                </div>
                <div className={"lock"}>
                    <IconButton onClick={handleUnBlock}>
                        <LockOpenIcon/>
                    </IconButton>
                </div>

                <div className={"block"}>
                    <button onClick={handleBlock} className={'btn btn-danger'}>
                        Block
                    </button>
                </div>

                <div className={"add-admin"}>
                    <button onClick={handleAddAdmin} className={'btn btn-success'}>
                        Add Admin
                    </button>
                </div>

                <div className={"remove-admin"}>
                    <button onClick={handleRemoveAdmin} className={'btn btn-secondary'}>
                        Remove Admin
                    </button>
                </div>

                    <CSVLink
                        className="item-btn btn btn-info mx-auto d-block"
                        data={user}
                        filename={"User list.csv"}
                        target="_blank"
                    >
                        Download csv
                    </CSVLink>


            </div>

        </div>
    )

}
export default UserPage;