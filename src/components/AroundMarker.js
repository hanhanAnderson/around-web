import React from 'react';
import { Marker, InfoWindow } from "react-google-maps";
import blueMarker from '../assets/images/blue-marker.svg'

export class AroundMarker extends React.Component {
    state = {
        isOpen: false,
    }
    toggleOpen = () => {
        this.setState(
            prevState => ({
                isOpen: !prevState.isOpen
            })
        )
    }
    render() {
        const { user, location, message, url, type } = this.props.post;
        const isImagePost = type ==="image";
        const icon = isImagePost ? undefined : {
            url : blueMarker, 
            scaledSize: new window.google.maps.Size(26, 41),
        }
        return (
            <Marker
                position={{ lat: location.lat, lng: location.lon }}
                onMouseOver={isImagePost ? this.toggleOpen : undefined}
                onMouseOut={isImagePost ? this.toggleOpen : undefined}
                onClick = {isImagePost ? undefined : this.toggleOpen}
                icon = {icon}
            >
                {
                    this.state.isOpen ?
                        (<InfoWindow onClick={this.toggleOpen}>
                            <div>
                                {
                                    type === "image" ? (
                                        <img
                                            alt={message}
                                            src={url}
                                            className='around-marker-image'
                                        />
                                        
                                    ) : (
                                    <video src = {url} controls className = "around-marker-video" />
                                        )
                                }
                                <p>{`${user} : ${message}`}</p>
                            </div>
                        </InfoWindow>) : (null)
                }
            </Marker>
        )
    }
}
