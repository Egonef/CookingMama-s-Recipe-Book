
import '@fontsource/italiana';

export default function CuadroInicio() {
    return (
        <div id="CuadroTitulo" className=" relative flex flex-col justify-center items-center h-[28rem] w-[28rem] border-4 rounded-xl border-dashed border-[#6B8574] font-[italiana]">
            <h1 className="text-4xl text-center font-italiana">Cooking Mama's Recipe Book</h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-[#6B8574] to-transparent my-4 w-[65%]"></div>
            <img src="/resources/chibicm.png" alt="cm1" className="absolute h-32 w-22 top-0 right-0 translate-x-6 -translate-y-10 origin-top-right "></img>
            <img src="/resources/chibcm2.png" alt="cm2" className="absolute h-36 w-36 bottom-0 left-0 -translate-x-12 translate-y-10"></img>
        </div>
    )
}