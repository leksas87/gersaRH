import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import entire SDK
import AWS from 'aws-sdk';

const S3_BUCKET = 'gersarhfiles';
const REGION = 'us-east-1';

AWS.config.update({
	accessKeyId: 'AKIAWP4FZSCKXIZDV3CN',
	secretAccessKey: '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',
});

const myBucket = new AWS.S3({
	params: { Bucket: S3_BUCKET },
	region: REGION,
});

const UploadImageToS3WithNativeSdk = () => {
	const [progress, setProgress] = useState(0);
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileInput = (e: any) => {
		setProgress(0);
		// setSelectedFile(e.target.files[0]);
		const file = e.target.files[0];
		const keyName = `${uuidv4()}.${file.name.split('.').pop()}`;

		const params = {
			Body: file,
			Bucket: S3_BUCKET,
			Key: keyName,
		};

		myBucket
			.putObject(params)
			.on('httpUploadProgress', (evt) => {
				setProgress(Math.round((evt.loaded / evt.total) * 100));
			})
			.send((err) => {
				if (err) console.log(err);
			});
	};

	// const uploadFile = async (file: any) => {
	// 	const params = {
	// 		Body: file,
	// 		Bucket: S3_BUCKET,
	// 		// Key: file.name,
	// 		Key: `${uuidv4()}.${file.name.split('.').pop()}`,
	// 	};

	// 	myBucket
	// 		.putObject(params)
	// 		.on('httpUploadProgress', (evt) => {
	// 			setProgress(Math.round((evt.loaded / evt.total) * 100));
	// 		})
	// 		.send((err) => {
	// 			if (err) console.log(err);
	// 		});
	// };
	return (
		<div>
			<input
				className='form-control custm-InputFile'
				type='file'
				onChange={handleFileInput}
			/>
			<div>El progreso de la carga del archivo es del {progress}%</div>
			{/* <button onClick={() => uploadFile(selectedFile)}> Subir a S3</button> */}
		</div>
	);
};

export default UploadImageToS3WithNativeSdk;
