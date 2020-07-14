import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, error }) => {
    return (
        <div className="center">
            <div className="absolute mt2">
                { error 
                    ? <p className="f2">{error}</p> 
                    : <div>
                        <img id='imageInput' src={imageUrl} alt="" width="500px" height="auto"/>
                        {
                            box.map(({ topRow, rightCol, bottomRow, leftCol }) => (
                                <div className="bounding-box" style={{ top: topRow, right: rightCol, bottom: bottomRow, left: leftCol }}></div>
                            ))
                        }
                      </div>
                }
            </div>
        </div>
    );
}

export default FaceRecognition;