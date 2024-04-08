
//import './App.css';
import { useState } from 'react';
import Navbar from "./components/Navbar";
import CuadroInicio from "./components/CuadroInicio";
import Librov4 from "./components/Librov4";
import { Canvas } from "@react-three/fiber";
import '@fontsource/italiana';


function App() {
	const [showCuadroInicio, setShowCuadroInicio] = useState(true);


	const hideCuadroInicio = () => {
		//setShowCuadroInicio(false);
		const cuadroInicio = document.getElementById('CuadroTitulo');
		const divLibro = document.getElementById('divLibro');

		cuadroInicio.style.transition = 'all 1s ease-out';
		cuadroInicio.style.transform = 'translateX(-100%)';
		cuadroInicio.style.opacity = '0';

		divLibro.style.transition = 'all 1s ease-out';
		divLibro.style.transform = 'translateX(-20%)';

		setTimeout(() => {
			divLibro.style.scale = '2.7';
		}, 500);

		setTimeout(() => {
			divLibro.style.scale = '15';
		}, 1500);

		setTimeout(() => {
			setShowCuadroInicio(false);
			document.getElementById('main').style.backgroundColor = '#C3B9AB';
			divLibro.style.display = 'none';
		}, 2000);
	}

	return (
		<div id='main' className=" h-dvh bg-[#FCF8E8] ">
			<Navbar />
			<div id='ContenedorMain' className=" flex flex-row justify-evenly items-center mt-10">
				{showCuadroInicio && <CuadroInicio />}
				<div id='divLibro' className='h-[45rem] w-[45rem] '>
					<Canvas className=" bg-[#FCF8E8]" camera={{ fov: 20, position: [0, 200, 100] }}>
					<ambientLight intensity={2} />
					<Librov4  hideCuadroInicio={hideCuadroInicio} />
					</Canvas>
				</div>
			</div>
		</div>
	);
}

export default App;



