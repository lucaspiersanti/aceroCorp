import { useState } from 'react';
import swal from 'sweetalert';
//Iconos

const SeccionConsultanos = () => {
	// Declaracion constates
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [email, setEmail] = useState('');
	const [codigoArea, setCodigoArea] = useState('');
	const [telefono, setTelefono] = useState('');
	const [mensaje, setMensaje] = useState(
		'Estoy interesado en la propuesta',
	);

	const [nombreObligatorioError, setNombreObligatorioError] = useState('');
	const [apellidoObligatorioError, setApellidoObligatorioError] = useState('');
	const [codigoAreaError, setCodigoAreaError] = useState('');
	const [telefonoError, setTelefonoError] = useState('');
	const [setTelefonoObligatorioError] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [emailError, setEmailError] = useState('');

	const preFijoTelefono = '549';
	// Fin declaracion de constantes
	
	const resetFormulario = () => {
		setNombre('');
		setApellido('');
		setCodigoArea('');
		setTelefono('');
		setEmail('');

		//Limpiando errores
		setNombreObligatorioError('');
		setApellidoObligatorioError('');
		setCodigoAreaError('');
		setTelefonoError('');
		setTelefonoObligatorioError('');
		setInputValue('');
		setEmailError('');
	};

	const armarTelefono = () => {
		let codigoAreaSinCero = codigoArea;
		let telefonoSin15 = telefono;

		if (codigoArea !== '' && telefono !== '') {
			if (
				codigoArea.charAt(0) === '0' ||
				(telefono.charAt(0) === '1' && telefono.charAt(1) === '5')
			) {
				if (codigoArea.charAt(0) === '0') {
					codigoAreaSinCero = codigoArea.substring(1);
				}
				if (telefono.charAt(0) === '1' && telefono.charAt(1) === '5') {
					telefonoSin15 = telefono.substring(2);
				}
			}
			return `${preFijoTelefono}${codigoAreaSinCero}${telefonoSin15}`;
		}
	};

	const telefonoValidator = (inputValue, setInputValue) => {
		const numericPattern = /^[0-9]*$/;

		if (!numericPattern.test(inputValue)) {
			swal('Solo números', 'Verifique el número de teléfono', 'info');
			setInputValue('');
		}
		setCodigoAreaError('');
		setTelefonoError('');
		if (codigoArea !== '' || telefono !== '') {
			if (codigoArea === '') {
				setCodigoAreaError('Debe completar el codigo de area');
			}
			if (telefono === '') {
				setTelefonoError('Debe completar el número de telefono');
			}
		}
	};

	const emailValidator = () => {
		if (email.length < 3 || !email.includes('') || !email.includes('@')) {
			setEmailError('Verifique el correo electrónico');
		} else {
			setEmailError('');
		}
	};

	const campoNombreObligatorio = () => {
		setNombreObligatorioError('');
	};

	const campoApellidoObligatorio = () => {
		setApellidoObligatorioError('');
	};

	const hamdleSubmit = async () => {
		const _telefono = armarTelefono();

		if (
			nombre === '' ||
			apellido === '' ||
			emailError !== '' ||
			email === '' ||
			_telefono === undefined
		) {
			if (nombre === '') {
				setNombreObligatorioError('Debe completar el nombre');
				swal('Favor de verificar', 'Debe completar el nombre', 'warning');
			}
			if (apellido === '') {
				setApellidoObligatorioError('Debe completar el apellido');
				swal('Favor de verificar', 'Debe completar el apellido', 'warning');
			}
			if (emailError !== '' || email === '') {
				setEmailError('Verifique el correo electrónico');
				swal(
					'Favor de verificar',
					'Debe completar el correo electrónico',
					'warning',
				);
			}
			if (_telefono === undefined) {
				setTelefonoObligatorioError('Debe completar el numero de telefono');
				swal(
					'Favor de verificar',
					'Debe completar el numero de telefono',
					'warning',
				);
			}
		} else {
			enviarFormulario(_telefono);

			swal('Consulta enviada con exito', 'Un asesor lo contactará', 'success');

			resetFormulario();
		}
	};

	const enviarFormulario = (_telefono) => {
		const formularioCompleto = {
			nombre,
			apellido,
			telefono: _telefono,
			email,
			mensaje,
		};
		return formularioCompleto;
	};

	return (
		<section className="h-full w-full">
			<div className="container px-4 py-16 mx-auto">
				<div className="flex flex-col lg:flex-row xl:flex-row">
					<div
						className='border-2 border-grey-900 rounded-lg overflow-hidden xs:flex-wrap sm:mr-10 sm:flex-wrap md:flex-wrap lg:flex-wrap lg:w-1/2 flex items-end justify-center relative '>
						<iframe
							width='100%'
							height='100%'
							loading='lazy'
							className='justify-center w-full absolute inset-0 back'
							title='map'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.860254785051!2d-58.56005678923424!3d-34.68347627281279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc78957ba1d45%3A0xc880980ebc55ef98!2sAcerocorp%20srl!5e0!3m2!1ses-419!2sar!4v1711993541103!5m2!1ses-419!2sar'></iframe>

						<div className='opacity-0 relative flex xs:flex-wrap sm:flex-wrap  md:flex-wrap lg:flex-wrap py-6 rounded shadow-md'>
							<div className='xl:w-1/2 px-2 '>
								<h2 className='title-font font-semibold text-white-900 tracking-widest text-xs'>
									UBICACIÓN
								</h2>
								<p className='my-2'>
									Podrás encontrarnos en nuestras oficinas comerciales dentro del
									barrio, ubicado en ruta provincial 16, entre ruta 6 y 58 - San
									Vicente{' '}
								</p>
								<a
									target='_blank'
									href='https://earth.google.com/earth/d/125jDGICSy6Wsf_2dJc3C2PrXeB29xUnC?usp=sharing'
									rel='noreferrer'
									className='relative inline-block group'>
									Nuestro Barrio desde{' '}
									<span>
										<b>Google Earth</b>
									</span>
									<span className='absolute w-full h-0.5 bg-yellow-500 bottom-0 left-0 origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100'></span>
								</a>
							</div>
							<div className='xl:w-1/2 px-2  mt-4 lg:mt-0'>
								<h2 className='title-font font-semibold text-gray-900 tracking-widest text-xs'>
									HORARIOS
								</h2>
								<a className='text-yellow-500 leading-relaxed'>
									Lunes a Viernes de 09:00 a 18:00hs{' '}
								</a>
								<h2 className='title-font font-semibold text-gray-900 tracking-widest text-xs mt-4'>
									TELÉFONO
								</h2>
								<a
									href='https://wa.link/8zprj5'
									className='relative inline-block text-gray-500 hover:cursor-pointer group'>
									{' '}
									+54 9 11 5970-7620
									<span className='absolute inset-x-0 bottom-0 h-0.5 bg-yellow-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
								</a>
							</div>
						</div>
					</div>
					{/* Formulario */}
					<div className='border-2 border-grey-900 sm:mr-1 px-2 xs:flex-wrap sm:flex-wrap md:flex-wrap md:py-8 lg:flex-wrap xl:w-1/2 flex flex-col md:ml-auto rounded items-end justify-center relative h-full w-full bg-clip-padding backdrop-filter backdrop-blur bg-opacity-20 bg-gray-300 '>
						<h2 className='title-font font-semibold text-AceroCorp text-md mb-3 w-full'>
							CONSULTANOS
						</h2>
						<div className='relative mb-3 flex flex-wrap flex-grow w-full'>
							<label
								htmlFor='nombre'
								className='w-1/2 text-lef leading-7 text-sm text-black mb-1'>
								Nombre
							</label>
							<label
								htmlFor='apellido'
								className='w-1/2 text-lef leading-7 text-sm text-black mb-1'>
								Apellido
							</label>
							<input
								value={nombre}
								onChange={(ev) => setNombre(ev.target.value)}
								onBlur={() => campoNombreObligatorio()}
								placeholder='Juan Jose'
								type='text'
								id='nombre'
								name='nombre'
								className='w-1/2 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
							/>

							<input
								value={apellido}
								onChange={(ev) => setApellido(ev.target.value)}
								onBlur={() => campoApellidoObligatorio()}
								placeholder='Gonzalez'
								type='text'
								id='apellido'
								name='apellido'
								className='w-1/2 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
							/>

							<p className='w-1/2 text-left text-danger text-sm '>{nombreObligatorioError}</p>
							<p className='w-1/2 text-left text-danger text-sm '>{apellidoObligatorioError}</p>

						</div>
						<div className='relative mb-4 flex flex-wrap flex-grow w-full'>
							<label
								htmlFor='codigo-area'
								className='w-1/4 text-lef leading-7 text-sm text-black mb-1'>
								Cod. área{' '}
							</label>
							<label
								htmlFor='telefono'
								className='w-1/4 text-lef leading-7 text-sm text-black mb-1'>
								{' '}
								Celular{' '}
							</label>
							<label
								htmlFor='email'
								className='w-2/4 text-lef leading-7 text-sm text-black mb-1'>
								{' '}
								Email{' '}
							</label>
							<input
								onBlur={() => {
									telefonoValidator(codigoArea, setCodigoArea);
								}}
								value={codigoArea}
								onChange={(ev) => setCodigoArea(ev.target.value)}
								placeholder='11'
								maxLength={5}
								pattern='[0-9]*'
								type='text'
								id='codigo-area'
								name='codigo-area'
								className='w-1/4 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
							/>

							<input
								onBlur={() => {
									telefonoValidator(telefono, setTelefono);
								}}
								value={telefono}
								onChange={(ev) => setTelefono(ev.target.value)}
								placeholder='5365544'
								maxLength={8}
								pattern='[0-9]*'
								type='text'
								id='telefono'
								name='telefono'
								className='w-1/4 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
							/>

							<input
								onBlur={() => {
									emailValidator();
								}}
								value={email}
								onChange={(ev) => setEmail(ev.target.value)}
								placeholder='micorreo@email.com'
								type='email'
								id='email'
								name='email'
								className='w-1/2 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-2  leading-8 transition-colors duration-200 ease-in-out'
							/>
							<p className='w-1/8 text-left text-danger text-sm'>{codigoAreaError}</p>
							<p className='w-1/4 text-left text-danger text-sm'>{telefonoError}</p>
							<p className='w-1/4 text-left text-danger text-sm'>{inputValue}</p>
							<p className='w-1/2 text-left text-danger text-sm'>{emailError}</p>
						</div>

						<div className='relative mb-2 flex flex-wrap flex-grow w-full'>
							<label
								htmlFor='mensaje'
								className='leading-7 text-sm text-black mb-1'>
								Mensaje
							</label>
							<textarea
								value={mensaje}
								onChange={(ev) => setMensaje(ev.target.value)}
								id='mensaje'
								name='mensaje'
								className='w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-10 text-base outline-none text-gray-700 py-1 px-2  resize-none leading-6 transition-colors duration-200 ease-in-out'></textarea>
						</div>
						<button
							onClick={() => hamdleSubmit()}
							className='text-white bg-AceroCorp border-0 py-1 px-2 focus:outline-none hover:bg-blue-600 rounded text-lg'>
							Enviar consulta
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SeccionConsultanos;
