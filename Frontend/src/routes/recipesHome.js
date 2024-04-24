import Navbar from "./../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import Searchbar from "../components/Searchbar";
import RecipeCardTest from "../components/RecipeCardTest";
export default function RecipesHome() {
    return (
        <div>
            <div className="bg-[#C3B9AB] animate-fade-in">
                <Navbar />
                <div className="flex flex-row items-center justify-left mx-16">
                    <Searchbar />
                </div>
                <div className="flex flex-row justify-evenly items-center flex-wrap mt-10 mx-16">
                    <RecipeCard />
                    <RecipeCardTest />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </div>
            </div>
        </div>
    );
}