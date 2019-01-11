import React from 'react';
import { Marker, InfoWindow } from "react-google-maps";

export class AroundMarker extends React.Component {
    state = {
        isOpen: false,
    }
    toggleOpen = () => {
        this.setState(
            prevState => ({
                isOpen : !prevState.isOpen
            })
        )
    }
    render() {
        const { user, location, message, url } = this.props.post;

        return (
            <Marker
                position={{ lat: location.lat, lng: location.lon }}
                onMouseOver = {this.toggleOpen}
                onMouseOut = {this.toggleOpen}
            >
                {
                    this.state.isOpen ?
                        (<InfoWindow onClick = {this.toggleOpen}>
                            <div>
                                <img
                                    alt={message}
                                    src={url}
                                    className='around-marker-image'
                                />
                                <p>{`${user} : ${message}`}</p>
                            </div>
                        </InfoWindow>) : (null)
                }
            </Marker>
        )
    }
}
