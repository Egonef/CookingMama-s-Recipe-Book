import Navbar from "./../components/Navbar";
import RecipeCard from "../components/RecipeCard";
export default function RecipesHome() {
    return (
        <div className="bg-[#C3B9AB] h-dvh ">
            <div className=" animate-fade-in">
                <Navbar />
                <div className="flex flex-row items-center justify-center mx-16 mt-32">
                    <div className="flex flex-col items-center justify-center border-2 border-[#242925] w-1/3 h-[40rem] mx-2">
                        <h1 className="text-4xl font-[italiana] text-[#242925] translate-y-[-12.2rem] bg-[#C3B9AB] px-10">Buscar Recetas</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center border-2 border-[#242925] w-2/3 h-auto mx-2 px-5">
                        <h1 className="text-4xl font-[italiana] text-[#242925] translate-y-[-2rem] bg-[#C3B9AB] px-10">Recetas Populares</h1>
                        <div className="flex flex-col items-center justify-center w-full">
                            <RecipeCard />
                            <RecipeCard />
                            <RecipeCard />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}