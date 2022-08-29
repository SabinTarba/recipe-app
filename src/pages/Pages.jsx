import Home from './Home'
import { Route, Routes, useLocation } from 'react-router-dom';
import Cuisine from './Cuisine';
import Searched from './Searched';
import RecipeInfo from './RecipeInfo';
import { AnimatePresence } from 'framer-motion';

function Pages() {

    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/cuisine/:type" element={<Cuisine />} />
                <Route path="/search/:search" element={<Searched />} />
                <Route path="/recipe/:name" element={<RecipeInfo />} />
            </Routes>
        </AnimatePresence>

    )
}

export default Pages