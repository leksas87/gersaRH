import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {changecheckIsUserActiveFalse, changeEmployeePhotoUuid} from '../../actions/eventsActions/eventsActions';
import { RootSote } from '../../store/Store';
import Webcam from 'react-webcam';
import { useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import { dataURLtoFile } from '../../helpers/dataUrlToFile';
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID_S3AWS;
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY_S3AWS;


const S3_BUCKET = 'gersarhfotoschecador';
const REGION = 'us-east-1';

AWS.config.update({
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
});

const myBucket = new AWS.S3({
	params: { Bucket: S3_BUCKET },
	region: REGION,
});
const newRequest = {
    nombreArchivo: '',
    url: '',
};


const ChecadorFotoPage = () => {
    //dispatch para ejecutar las Actions
	const dispatch = useDispatch();
    const navigate = useNavigate();
    	//Senecesita el state que indica  el checkState
	const { userConfirmation } = useSelector(
		(state: RootSote) => state.events
	);

    //Webcam Methods
    const [inputFile, setInputFile] = useState(newRequest);
    const [imageShot, setImageShot] = useState(null);
    const webcamRef:any = useRef(null);
    const capture = useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageShot(imageSrc)
        },
        [webcamRef]
    );

    //Metodo para repetir photoshoot
    const repeate = ():any =>{
        setImageShot(null)
    }

    //Metodo para enviar al inicio
	const navigateCheck = ():any => {
		dispatch(changecheckIsUserActiveFalse());
	};
    const navigateSelect = ():any =>{
        navigate('/checador/select');
    }
   

    const saveImageToAWSBucket = () =>{

        const file:any = dataURLtoFile(imageShot,'captura.jpeg');

        const keyName = `${uuidv4()}.${'file.jpeg'.split('.').pop()}`;
        console.log(file.name);
        const type = 'image/jpeg';


        setInputFile({
			nombreArchivo: file.name,
			url: keyName,
		});

        const params = {
			Body: file,
			Bucket: S3_BUCKET,
			Key: keyName,
			ContentType: type,
		};

        if (params) {
            myBucket
                .putObject(params)
                .on('httpUploadProgress', (evt) => {
                    console.log(Math.round((evt.loaded / evt.total) * 100));
                    dispatch(changeEmployeePhotoUuid(keyName));
                    navigate('/checador/select');
                })
                .send((err) => {
                    if (err) console.log(err);
                });
        }
    }

  return (
    <>
        <div className='container containerProject d-flex flex-column justify-content-center align-items-center'>
			<button className=' btn custm-arrowLeft' onClick={navigateCheck}>
				<i className='bi bi-arrow-left' />
			</button>
			<div className='d-flex mb-4'>
				<img
					className='custm-imgLogo'
					src='\assets\gersaLogo.svg'
					alt='gersa-logo'
				/>
			</div>
			<div className='d-flex flex-column align-items-center lh-sm'>
				<div className='fs-2 fw-bold textColorSecondary'>¡Bienvenido!</div>
				<div className='fs-2 fw-bold textColorSecondary text-capitalize'>
					{userConfirmation.firstName}
				</div>
				<div className='fs-4 fw-light textColorLight mt-2'>Captura tú foto de registro</div>
			</div>


			<div className='loadingContainerPicture mt-2' style={{backgroundColor:'#14536e',width:'348px', height:'260px', position:'relative',borderRadius:'10px'}}>
                {imageShot&&<img width={350}  src={imageShot} style={{position:'absolute', height:'260px',zIndex:'900',borderRadius:'10px'}} />}
				<Webcam audio={false} height={350} ref={webcamRef} screenshotFormat='image/jpeg'  width={350}  style={{position:'absolute', height:'260px',zIndex:'800',borderRadius:'10px'}} />
                <div style={{position:'absolute',color:'#fff',zIndex:'500'}}>Cargando...</div>
			</div>


            <div className='d-flex custm-Width100 justify-content-center align-items-center' style={{marginTop:'10px' ,maxWidth:'400px',position:'relative'}}>
                <div style={{position:'absolute',left:'0px'}} className='d-flex flex-column align-items-center'>
                    <button
                        className='btn custm-btnRound'
                        type='button'
                        onClick={repeate}
                        // disabled={code.length < 4 ? true : false}
                    >
                        <i className='bi bi-arrow-repeat' />
                    </button>
                    <span className='textColorSecondary'>Repetir</span>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <button
                        className='btn custm-btnRound'
                        style={{backgroundColor:'#d6004e53', color:'#FF0000',border:'2px solid #FF0000', width:'60px',height:'60px'}}
                        type='button'
                        onClick={capture}
                        disabled={imageShot?true:false}
                    >
                        <i className='bi bi-camera-fill' />
                    </button>
                    <span style={{color:'#FF0000'}}>Capturar</span>
                </div>
            </div>
            
            <button
                className='btn custm-Width100 custm-btnCheckSubmit mt-4 custm-btnCheckSubmitPic'
                style={{maxWidth:'300px'}}
                type='button'
                onClick={saveImageToAWSBucket}
                disabled={!imageShot ? true : false}
            >
                CONTINUAR
            </button>
		</div>
    </>
  )
}

export default ChecadorFotoPage