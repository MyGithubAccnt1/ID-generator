import { useState, useRef } from "react";
import html2canvas from 'html2canvas';
import Wrapper from "./component/Wrapper";
import ButtonWrapper from "./component/Button";
import Info from "./component/Info";
import IDWrapper from "./component/IDWrapper";
import IDHole from "./component/IDHole";
import IDBody from "./component/IDBody";


function FormID() {
    const [rotationY, setRotationY] = useState(0);
    const dragging = useRef(false);
    const lastX = useRef(0);

    const handlePointerDown = (clientX) => {
        dragging.current = true;
        lastX.current = clientX;
    };

    const handlePointerMove = (clientX) => {
        if (!dragging.current) return;
        let deltaX = clientX - lastX.current;
        lastX.current = clientX;
        setRotationY((prev) => {
            let newRotation = prev + deltaX * 0.5;
            newRotation = ((newRotation % 360) + 360) % 360;
            if (newRotation > 160 && newRotation < 200) {
                newRotation += deltaX > 0 ? 20 : -20;
            } else if (newRotation > 350 || newRotation < 20) {
                newRotation += deltaX > 0 ? 20 : -20;
            }
            return newRotation;
        });
    };

    const handlePointerUp = () => {
        dragging.current = false;
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY;
        setRotationY((prev) => {
            let newRotation = prev + delta * 0.2;
            newRotation = ((newRotation % 360) + 360) % 360;
            return newRotation;
        });
    };

    const onMouseDown = (e) => handlePointerDown(e.clientX);
    const onMouseMove = (e) => handlePointerMove(e.clientX);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e) => {
        if (e.touches.length === 1) handlePointerDown(e.touches[0].clientX);
    };
    const onTouchMove = (e) => {
        if (e.touches.length === 1) handlePointerMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handlePointerUp();
    const onTouchCancel = () => handlePointerUp();

    const style1 = {
        transform: `rotateY(${rotationY + 180}deg)`,
        transformOrigin: 'center',
        backfaceVisibility: 'hidden',
        userSelect: 'none',
        touchAction: "none",
        cursor: "grab",
        transition: dragging.current ? "none" : "transform 0.2s ease",
    };

    const style2 = {
        transform: `rotateY(${rotationY}deg)`,
        transformOrigin: 'center',
        backfaceVisibility: 'hidden',
        userSelect: 'none',
        touchAction: "none",
        cursor: "grab",
        transition: dragging.current ? "none" : "transform 0.2s ease",
    };

    const img = {
        WebkitUserSelect: 'none',   // Chrome, Safari, Opera
        MozUserSelect: 'none',      // Firefox
        msUserSelect: 'none',       // IE 10+
        userSelect: 'none',         // Standard
        WebkitUserDrag: 'none',     // Prevent dragging in WebKit browsers
        userDrag: 'none',           // Standard (limited support)
        pointerEvents: 'auto',      // Ensure image still receives pointer events
    }

    const [previewLogo, setPreviewLogo] = useState(null);
    const [previewPicture, setPreviewPicture] = useState(null);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "image/png") {
        alert("Please select a PNG image.");
        e.target.value = null;
        return;
        }

        const imageUrl = URL.createObjectURL(file);
        setPreviewLogo(imageUrl);
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "image/png") {
        alert("Please select a PNG image.");
        e.target.value = null;
        return;
        }

        const imageUrl = URL.createObjectURL(file);
        setPreviewPicture(imageUrl);
    };

    const [downloading, setDownloading] = useState(false);

    const captureDivsSeparately = async () => {
        setDownloading(true);
        
        const div1 = document.getElementById('frontID');
        const div2 = document.getElementById('backID');
        const saveRotation = setRotationY;

        setRotationY(0);
        await new Promise(resolve => setTimeout(resolve, 100));
        html2canvas(div1).then(canvas1 => {
            const imgData1 = canvas1.toDataURL('image/png');
            downloadImage(imgData1, 'Front-ID.png');
        });

        setRotationY(180);
        await new Promise(resolve => setTimeout(resolve, 100));
        html2canvas(div2).then(canvas2 => {
            const imgData2 = canvas2.toDataURL('image/png');
            downloadImage(imgData2, 'Back-ID.png');
        });

        setRotationY(saveRotation);
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    function downloadImage(dataUrl, filename) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        link.click();
        setDownloading(false);
    }

    return (
    <>
        <Wrapper
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
            onWheel={handleWheel}
            >

            <ButtonWrapper captureDivsSeparately={captureDivsSeparately}>
                DOWNLOAD
            </ButtonWrapper>

            <Info/>

            <IDWrapper style={style1}>
                <IDHole/>
                <IDBody id="backID">
                    <div style={{ position: 'absolute', zIndex: 5, left: '0', margin: '10px', color: '#000', textAlign: 'left' }}>
                        <table style={{ tableLayout: 'auto' }}>
                            <tbody>
                                <tr>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>SSS No.:</td>
                                    <td style={{ fontSize: '11px', fontWeight: '400', verticalAlign: 'center' }}>
                                        <input type="text" style={{ height: '25px' }} placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>TIN No.:</td>
                                    <td style={{ fontSize: '11px', fontWeight: '400', verticalAlign: 'center' }}>
                                        <input type="text" style={{ height: '25px' }} placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>Birth Date:</td>
                                    <td style={{ fontSize: '11px', fontWeight: '400', verticalAlign: 'center' }}>
                                        <input type="text" style={{ height: '25px' }} placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'top' }}>Address:</td>
                                    <td style={{ fontSize: '11px', fontWeight: '400', verticalAlign: 'top' }}>
                                        <textarea style={{ resize: 'none', height: '35px' }} placeholder="|"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}
                                    style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'center', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                                    >
                                        Incase of emergency, please notify:
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>Name:</td>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>
                                        <input type="text" style={{ height: '25px' }} placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>Relationship:</td>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>
                                        <input type="text" style={{ height: '25px' }} placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>Contact No.:</td>
                                    <td style={{ fontSize: '12px', fontWeight: '700', verticalAlign: 'center' }}>
                                        <input type="text" style={{ height: '25px' }} placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '10px', fontStyle: 'italic', textAlign: 'center', paddingTop: '0.5rem' }} colSpan={2}>
                                        This is to certify that the person whose picture and signature appear hereon is an employee of SalesMed Pharmacy. In case of loss, please return to the Tanza Office address below.
                                        <div style={{ borderStyle: 'solid', borderTopWidth: '2px', borderLeftWidth: '0', borderRightWidth: '0', borderBottomWidth: '0', width: '75%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }}>
                                            <p style={{ fontSize: '11px', fontWeight: '700', fontStyle: 'normal' }}>
                                                <input type="text" style={{ textAlign: 'center', height: '25px' }} placeholder="NAME"/>
                                            </p>
                                            <p style={{ fontSize: '10px', fontWeight: '700', fontStyle: 'normal' }}>
                                                <input type="text" style={{ textAlign: 'center', height: '25px' }} placeholder="JOB TITLE"/>
                                            </p>
                                        </div>
                                        <p style={{ fontSize: '10px', fontStyle: 'normal' }}>
                                            <textarea style={{ resize: 'none', height: '30px', textAlign: 'center', width: '100%' }} placeholder="Business Location"></textarea>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </IDBody>
            </IDWrapper>

            <IDWrapper style={style2}>
                <IDHole/>
                <IDBody id="frontID">

                    {downloading ? (
                        <div style={{ position: 'absolute', zIndex: 5, bottom: '2.5rem', right: '15px', textAlign: 'right', }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: 0, }}>
                                ID No,: {' '}
                                <input type="text" placeholder="0001" style={{ width: '35px', textAlign: 'right', height: '30px', position: 'relative', top: '3px', }}/>
                            </p>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0 0 0', height: '30px', }}>
                                <input type="text" placeholder="MV" style={{ width: '175px', textAlign: 'right', margin: 0, }} />
                            </p>
                            <p style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: 0, }}>
                                <input type="text" placeholder="BERNABE, MHEL VOI" style={{ width: '175px', textAlign: 'right', height: '30px', margin: 0, }} />
                                <br/>
                                <input type="text" placeholder="WEB DEVELOPER" style={{ width: '155px', textAlign: 'right', height: '30px', margin: 0, }} />
                            </p>
                        </div>
                    ) : (
                        <div style={{ position: 'absolute', zIndex: 5, bottom: '2.5rem', right: '15px', textAlign: 'right', }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: 0, }}>
                            ID No,: {' '}
                                <input type="text" placeholder="0001" style={{ width: '35px', textAlign: 'right', }}/>
                            </p>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, }}>
                                <input type="text" placeholder="MV" style={{ width: '175px', textAlign: 'right', }} />
                            </p>
                            <p style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: 0,}}>
                                <input type="text" placeholder="BERNABE, MHEL VOI" style={{ width: '175px', textAlign: 'right', }} />
                                <br/>
                                <input type="text" placeholder="WEB DEVELOPER" style={{ width: '155px', textAlign: 'right', }} />
                            </p>
                        </div>
                    )}
                    
                    <div style={{ position: 'absolute', zIndex: 4, bottom: 0, width: '370px', height: '150px', backgroundColor: '#1c1f1c', transform: 'rotate(45deg)', left: '-200px', }}></div>
                    <div style={{ position: 'absolute', zIndex: 3, bottom: 0, width: '470px', height: '300px', backgroundColor: '#db1111', transform: 'rotate(-45deg)', right: '-292px', }}></div>
                    
                    <input
                        type="file"
                        id="picture-upload"
                        accept="image/png"
                        onChange={handlePictureChange}
                    />
                    {previewPicture ? (
                        <img
                            src={previewPicture}
                            style={img}
                            className="absolute z-2 min-h-[375px] w-60 cursor-pointer"
                            onClick={() => document.getElementById('picture-upload').click()}
                        />
                    ) : (
                        <img
                            src="img.png"
                            className="absolute z-2 min-h-[375px] w-60 cursor-pointer"
                            onClick={() => document.getElementById('picture-upload').click()}
                        />
                    )}

                    <div style={{ position: 'absolute', zIndex: 1, bottom: '166px', width: '250px', height: '75px', backgroundColor: '#ff1616', transform: 'rotate(45deg)', left: '-111px', }}></div>
                    <div style={{ position: 'absolute', zIndex: 1, bottom: '227px', width: '420px', height: '75px', backgroundColor: '#ff1616', transform: 'rotate(-45deg)', right: '-119px', }}></div>
                    
                    <input
                        type="file"
                        id="logo-upload"
                        accept="image/png"
                        onChange={handleLogoChange}
                    />
                    {previewLogo ? (
                        <img
                            src={previewLogo}
                            style={img}
                            className="absolute z-5 left-0 m-2! max-h-[45px] cursor-pointer"
                            onClick={() => document.getElementById('logo-upload').click()}
                        />
                    ) : (
                        <img
                            src="logo.png"
                            className="absolute z-5 left-0 m-2! max-h-[45px] cursor-pointer"
                            onClick={() => document.getElementById('logo-upload').click()}
                        />
                    )}
                </IDBody>
            </IDWrapper>
        </Wrapper>
    </>
    )
}

export default FormID