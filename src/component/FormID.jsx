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
        // const div2 = document.getElementById('backID');
        await new Promise(resolve => setTimeout(resolve, 100));
        html2canvas(div1).then(canvas1 => {
            const imgData1 = canvas1.toDataURL('image/png');
            downloadImage(imgData1, 'Front-ID.png');
        });

        // html2canvas(div2).then(canvas2 => {
        //     const imgData2 = canvas2.toDataURL('image/png');
        //     downloadImage(imgData2, 'Back-ID.png');
        // });
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
                    <div className="absolute z-5 left-0 m-2! text-black text-left">
                        <table className="table-auto border-separate border-spacing-x-2">
                            <tbody>
                                <tr>
                                    <td className="text-[12px] font-bold align-top">SSS No.:</td>
                                    <td className="text-[11px] font-normal align-top">
                                        <input type="text" placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-[12px] font-bold align-top">TIN No.:</td>
                                    <td className="text-[11px] font-normal align-top">
                                        <input type="text" placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-[12px] font-bold align-top">Birth Date:</td>
                                    <td className="text-[11px] ont-normal align-top">
                                        <input type="text" placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-[12px] font-bold align-top">Address:</td>
                                    <td className="text-[11px] font-normal align-top">
                                        <textarea className="resize-none min-h-[55px]" placeholder="|"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-[12px] italic text-center py-3!" colSpan={2}>Incase of emergency, please notify:</td>
                                </tr>
                                <tr>
                                    <td className="text-[12px] font-bold align-top">Name:</td>
                                    <td className="text-[12px] font-bold align-top">
                                        <input type="text" placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-[12px] font-bold align-top">Relationship:</td>
                                    <td className="text-[12px] font-bold align-top">
                                        <input type="text" placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-[12px] font-bold align-top">Contact No.:</td>
                                    <td className="text-[12px] font-bold align-top">
                                        <input type="text" placeholder="|"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-[12px] italic text-center pt-2!" colSpan={2}>
                                        This is to certify that the person whose picture and signature appear hereon is an employee of SalesMed Pharmacy. In case of loss, please return to the Tanza Office address below.
                                        <div className="border border-x-0 border-b-0 border-2 w-[75%] mx-auto! mt-[50px]! mb-3!">
                                            <p className="text-[12px] font-bold not-italic">
                                                <input type="text" className="text-center" placeholder="NAME"/>
                                            </p>
                                            <p className="text-[10px] font-bold not-italic">
                                                <input type="text" className="text-center" placeholder="JOB TITLE"/>
                                            </p>
                                        </div>
                                        <p className="text-[10px] not-italic">
                                            <textarea className="resize-none min-h-[35px] text-center" placeholder="Business Location"></textarea>
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
                            src="./public/img.png"
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
                            src="./public/logo.png"
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