import React, {useState, useEffect} from "react"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Axios from "axios";
import '../App.css'



const postdata = () => {
    const url = 'http://localhost:3001/api';
    Axios.post(url, {
        name: "hello",
    })
    .then((res) => {
        console.log(res)
    })
}

const getdata = () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    Axios.get(url)
    .then((data) => {
        console.log(data)
    })
}


const GoogleMap = (props) => {
    

    const [employeelist, setEmployeelist] = useState([])
    const [markerOne, setMarkerOne] = useState([])
    const [users, setUsers] = useState([])
    const [post, setPost] = useState(null);


    const containerStyle = {
        width: '1350px',
        height: '750px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }

    const coordinates = {lat: 38.544216, lng: -121.73921}

    const [infoWindow, setInfoWindow] = useState(false)
    const [activeMarker, setActiveMarker] = useState({})
    const [selectedPlace, setSelectedPlace] = useState ({})
    
    Axios.defaults.withCredentials = true;

    let onMarkerClick = ((props, marker, e) => {
        setSelectedPlace(props) //props passes the details of the entire marker function
        setActiveMarker(marker) //marker has the details of ths specific marker you clicked on
        setInfoWindow(true)
        console.log({props})
        console.log({marker})
        setMarkerOne(props.title)
        console.log(markerOne)
        Axios.post("http://localhost:3001/random", {
            marker: markerOne
        })
        .catch((e) => {
            console.log(e);
         }).then(res => {
            //  console.log(res.data.result[1].username);
            //  console.log(res.data.result);
            console.log(res.data.result)
             setUsers(res.data.result);

         }) 
    })
//    const social = () =>{ 
//         Axios.post("http://localhost:3001/social",{
//             username2: user.username
//         }).catch((e)=>{
//             console.log(e);
//         }).then(res=>{
//             console.log(res);
//         })
//     }
    

    let onMapClick = ((props) => {
        if(infoWindow) {
            setInfoWindow(false)
            setActiveMarker(null)
        }
    })


   
    return (
        <div>
            <Map
                google = {props.google}
                onClick = {onMapClick}
                zoom = {15}
                // style = {style}
                containerStyle = {containerStyle}
                initialCenter = {coordinates}>
                
                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.544216, lng: -121.73921}}
                            name = {'meet here'}
                            title = {"Woodstock's Pizza"}
                            /> 
                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.54139, lng: -121.74097}}
                            name = {'meet here'}
                            title = {'Mikuni'}
                            /> 
                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.5425, lng: -121.7411}}
                            name = {'meet here'}
                            title = {'Thai Canteen'}
                            />
                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.5427, lng: -121.7411}}
                            name = {'meet here'}
                            title = {'Dumpling House'}
                            />
                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.54279, lng: -121.74467}}
                            name = {'meet here'}
                            title = {'Black Bear Diner Davis'}
                            />
                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.54447, lng: -121.74595}}
                            name = {'meet here'}
                            title = {'Guads Tacos & Beer'}
                            />
                
                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.54469, lng: -121.74441}}
                            name = {'meet here'}
                            title = {'Pizza & Pints'}
                            />

                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.54428, lng: -121.75813}}
                            name = {'meet here'}
                            title = {'Segundo Dining Commons'}
                            />

                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.53699, lng: -121.75742}}
                            name = {'meet here'}
                            title = {'Tercero Dining Commons'}
                            />      
                <Marker
                            onClick = {onMarkerClick}
                            position={{ lat: 38.54796, lng: -121.76312}}
                            name = {'meet here'}
                            title = {'Cuarto Dining Commons'}
                            />
                <InfoWindow
                    marker = {activeMarker} //this tells InfoWindow which specific marker we are talking about,
                    //because the details of the marker are stored in 'marker'
                    visible = {infoWindow}
                >
                    <p className = "background">{markerOne}</p>
                    {users.map((user, index) => (
                        <div className = "background">
                        <h6 key = {index}>
                        <a target="_blank" href={`https://www.instagram.com/${user.username}`}><button>{user.username}</button></a>
                        </h6>
                        </div>
            ))}
                </InfoWindow>
            </Map>
            </div>
    )
}

export default GoogleApiWrapper({apiKey: 'AIzaSyBpAVyeJmzfhWhyoK8AUISGYu-YqG7On3Y'})(GoogleMap)