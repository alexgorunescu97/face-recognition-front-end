import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, urlInput, onPictureSubmit }) => {
    return (
        <div>
            <p className="f3">
                {'This will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center">
                <div className="br3 pa4 shadow-5 form grow">
                    <input className="f4 pa2 w-75 radius-input" value={urlInput} onChange={onInputChange} type="text"/>
                    <button className="w-25 grow f4 link ph3 pv2 dib white bg-light-purple pointer radius-button" onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;