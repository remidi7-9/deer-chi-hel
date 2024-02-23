import React from "react";
import './CreateChannel.css'
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import image from '../../Navbar/Hypatia.png'
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ElementMsg from '../../Messages/ElementMsg/ElementMsg'
// import { useQuery,useMutation, QueryClient,QueryClientProvider } from 'react-query';
import io from 'socket.io-client';
import { useSocket } from "../../SocketContext";


const ProtectedChannel = (props) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { name, img, user, type, desc, password } = props;
    const { socket } = useSocket();




    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://10.14.56.6:3000/SchoolOfAthensApi/rooms'; // Replace with your API endpoint

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        roomName: name,
                        type: type,
                        password: password,
                        avatar: 'fkhdkfh',
                        admin: [user],
                        users: [user],
                        description: desc,
                        conversation: {
                            type: 'room',
                            chat: [

                                {
                                    timeSent: new Date().toISOString(),
                                    message: 'Created By ' + user.username,
                                    sender: user,
                                }
                            ]
                        }
                    }),
                });
                console.log('Response Status:', response.status);
                const result = await response.json();
                socket.emit('create-room', { socketId: socket.id });
                console.log('issssssssss creeeaaaaaated');
            } catch (error) {

                setError(error.message);
            }
        };

        fetchData();
        return () => {
            socket.off('create-room');
        }

    }, []);
    return (
        <div>

            {/* <h1><ElementMsg name={name} img={img} user={user}/></h1> */}
        </div>
    )
}
const CreateChannel = (props) => {
    const location = useLocation();
    const { user } = useSocket();
    const [showForm, setShowForm] = useState(true);
    const [inputValue, setValues] = useState([{ name: '', img: '', desc: '', type: '', password: '' }]);
    const [file, setFile] = useState(null);
    const [showPasswordInput, setShowPasswordInput] = useState(false);



    const toggleContent = () => {
        setShowForm(!showForm);

    }
    const ChangeElement = (event) => {
        const chosedfile = event.target.files[0];
        if (chosedfile) {
            const reader = new FileReader();
            reader.addEventListener('load', function () {
                const imageElement = document.getElementById('photo');
                if (imageElement)
                    imageElement.setAttribute('src', reader.result);
                setFile(reader.result);
            })
            reader.readAsDataURL(chosedfile);
        }
    }

    const handleSubmit = (e, channelType) => {
        e.preventDefault();
        const newDataRow = {
            name: inputValue.name,
            img: file, // You need to replace file with the actual value
            desc: inputValue.desc,
            type: inputValue.type,
            password: inputValue.password,
        };
        console.log('type ==', inputValue.type);
        setValues(newDataRow);
        setShowPasswordInput(false);
        toggleContent(); // Toggle content after submission
    };

    return (
        <div className="body">
            {console.log('im in the create channel')}
            {showForm ? (
                <div className="box-chat">
                    <span className="borderLine"></span>
                    <form onSubmit={handleSubmit}>
                        <h1>{user.username}</h1>
                        <div className="kamal-kitkhibra">
                            <div id="hello" className="user-image">
                                <input type="file" id="file" onChange={ChangeElement} />
                                <img src={image} id="photo" />
                                <label htmlFor="file" id="uploadbtn">
                                    <FontAwesomeIcon icon={faCamera} className="fa-camera" />
                                </label>
                            </div>
                            <div>
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        value={inputValue.name}
                                        onChange={(e) => setValues({ ...inputValue, name: e.target.value })}
                                        required
                                    />
                                    <span>Name Of The Room</span>
                                    <li></li>
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        value={inputValue.desc}
                                        onChange={(e) => setValues({ ...inputValue, desc: e.target.value })}
                                        required
                                    />
                                    <span>Description</span>
                                    <li></li>
                                </div>
                                {showPasswordInput && (
                                    <div className="inputBox">
                                        <input
                                            type="password"
                                            value={inputValue.password}
                                            onChange={(e) => setValues({ ...inputValue, password: e.target.value })}
                                            onClick={(e) => {
                                                e.preventDefault();

                                            }}
                                            required
                                        />
                                        <span>Password of the Room</span>
                                        <li></li>
                                    </div>
                                )}
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="kikia-chat">
                            <div className="span-div">
                                <input
                                    type="submit"
                                    value={"protected"}
                                    onClick={
                                        () => {
                                            setShowPasswordInput(true); setValues({ ...inputValue, type: "protected" });
                                        }}
                                />
                            </div>
                            <div className="span-div">
                                <input type="submit" value={"Public"} onClick={() => setValues({ ...inputValue, type: "public" })} />
                            </div>
                            <div className="span-div">
                                <input type="submit" value={"Private"} onClick={() => setValues({ ...inputValue, type: "private" })} />
                            </div>
                        </div>
                    </form>
                </div>
            ) : <ProtectedChannel name={inputValue.name} img={file} user={user} type={inputValue.type} desc={inputValue.desc} password={inputValue.password} />}</div>)
}

export default CreateChannel;