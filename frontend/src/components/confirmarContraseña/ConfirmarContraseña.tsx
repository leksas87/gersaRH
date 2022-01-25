
import './ConfirmarContraseña.css';

export const ConfirmarContraseña = () => {
    return (
        <div className="containerProject custm-body d-flex justify-content-center align-items-center">
            <div >
                <div style={{ width: '100%', height:'17vh',}}
                    className="d-flex"
                >
                    <img style={{ 
                              margin: '3vh 0 0 4vw',
                              padding: '0',
                              width: '5vw',
                              height:'8vh',

                            }} src='assets\gersaLogo-icon.svg' alt='gersaLogo' />
                    <div 
                        style ={{margin: '24vh 8vw 0 0',height: '30vh',}}
                        className="d-flex justify-content-center flex-column align-items-center"
                    >
                        <h1 
                            className='textColorSecondary fs-3 custm-title' 
                        >
                            ESTABLECE TU CONTRASEÑA
                        </h1>
                        <h3
                            className='textColorError fs-2' 
                            style={{ margin: '1vh 0 3vh 0'}}
                        >
                            tu@correo.com
                        </h3>
                        <div className='d-flex flex-column custm-input2'
                            style={{ 
                                    width: '100%',

                             }}
                        >
						    <label 
                                style={{ 
                                    margin: '1vh 0 1vh 0',
                                    }}
                                className='textColorSecondary'
                            >
									Contraseña
							</label>
							<input
                                className='custm-input '
								type='text'
								placeholder='6 caracteres minimos'
								aria-describedby='registerName'
								autoComplete='off'
							/>
						</div>
                        <div className='d-flex flex-column custm-input2'
                            style={{ 
                                    width: '100%',
                                    margin: '5vh 0 0 0',
                                    padding: '0 1vw 0 1vw',
                                    
                             }}
                        >
						    <label 
                                style={{ margin: '1vh 0 1vh 0'}}
                                className='textColorSecondary'
                            >
									Confirma tu contraseña
							</label>
							<input
                                className='custm-input '
								type='text'
								placeholder='Las contraseñas deben coincidir'
								aria-describedby='registerName'
								autoComplete='off'
							/>
						</div>
                        <button className='custm-btnFormSubmit inputSubmit'>
                            Continuar.
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
