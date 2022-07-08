import React, {useEffect, useState} from 'react';
import './login.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SendEmail = () => {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [reciept, setRecipient] = useState('')
    const [messages, setMessages] = useState([])

    function getMessage() {
        axios.get("http://localhost:8082/api/message/get-all").then(res =>{
            console.log(res)
            setMessages(res.data.data)
        }).catch((err=>{
            console.log(err)
        }))
    }

    useEffect(() => {
        getMessage()
        console.log(messages)
    }, [])


    function send() {
        axios.post("http://localhost:8082/api/message/send", {
            'recipient': reciept,
            'tittle': title,
            'messageBody' : message
        }).then(res =>{
            console.log(res)
            toast.success("email send")
            getMessage()
        }).catch((err=>{
            console.log(err)
            toast.error("Recipient not found")
        }))

    }

    return (
        <div className={"container"}>
            <div className=" mt-1">
                <div className="row">
                    <div className="col-4">
                        <div className="card" style={{background: '#d6dee1'}}>
                            <div className="card-body">
                                {/*<select className={"form-select"}*/}
                                {/*        onChange={(event => setRecipient(event.target.value))}>*/}
                                {/*    <option value="Bekjon">Bekjon</option>*/}
                                {/*    <option value="Abror">Abror</option>*/}
                                {/*    <option value="Dima">Dima</option>*/}
                                {/*</select>*/}
                                <input type="text" placeholder={"Recipient"}
                                       onChange={(event => setRecipient(event.target.value))} className={"form-text"}/>
                                <input type="text" placeholder={"Tittle"}
                                       onChange={(event => setTitle(event.target.value))} className={"form-text"}/>
                                <input type="text" placeholder={"Message body"}
                                       onChange={(event => setMessage(event.target.value))} className={"form-text"}/>
                                <div className={"d-flex align-items-center justify-content-end mt-2"}>
                                    <button className={"btn btn-success"} onClick={send}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className={"table"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Messages</th>
                </tr>
                </thead>
                <tbody>
                {messages.map(((value, index) => {
                    return <tr>
                        <td>{index+1}</td>
                        <td>{value.messageBody}</td>
                    </tr>
                }))}
                </tbody>
            </table>
        </div>
    );
};

export default SendEmail;