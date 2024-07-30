import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import RQHeros from './components/RQHeros'
import RQHero from './components/RQHero'
import ParellelQueries from './components/parellelQueries'
import PaginatedQueries from './components/paginatedQueries'
import InfiniteQueries from './components/infiniteQueries'
import DynamicParellel from './components/DynamicParellel'
import DependentQueries from './components/DependentQueries'


function App() {

  return (
    <>
     <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link to='/heroes/1'>RQ Super Hero</Link>
              </li>
              <li>
                <Link to='/parallel'>Parellel</Link>
              </li>
              <li>
                <Link to='/dynamic-parallel'>Dynamic Parellel</Link>
              </li>
              <li>
                <Link to='/dependent'>Dependent</Link>
              </li>

              <li>
                <Link to='/paginated'>Paginated</Link>
              </li>
              <li>
                <Link to='/infinite'>Infinite</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/heroes' element={<RQHeros/>}/>
           
            <Route path='/heroes/:heroId' element={<RQHero/>}/>
            
            <Route path='/parallel' element={<ParellelQueries/>}/>
      
            <Route path='/dynamic-parallel' element={<DynamicParellel heroIds={[1, 3]}/>}/>
            
            <Route path='/dependent' element={<DependentQueries email='vishwas@example.com'/>}/> 
        
            <Route path='/paginated' element={<PaginatedQueries/>}/>
         
            <Route path='/infinite' element={<InfiniteQueries/>}/>
          
            <Route path='/' element={<Home/>}/>
            
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
