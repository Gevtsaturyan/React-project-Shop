import { useEffect, useState } from "react";
import {  Route , Routes} from "react-router-dom";
import axios from 'axios';
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";




function App() {
  const [items,setItems]=useState([])
  const [cartItems,setCartItems]=useState([])
  const [favorite,setFavorite]=useState([])
  const [searchValue,setSearchValue]=useState('')
  const [cartOpened,setCartOpened]=useState(false)
  const [isLoading, setIsLoading] = useState();


  useEffect(()=>{
    // setIsLoading(true)
    async function fetchData() {
      
      try {
        
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/cart'),
          axios.get('https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/Favorites'),
          axios.get('https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorite(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
      
    }
    fetchData();
    
  },[])

  const onAddToCart=(obj)=>{
    console.log(obj);
  if(cartItems.find((item)=>Number(item.id) === Number(obj.id))){
    axios.delete(`https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/cart/${obj.id}`)
    setCartItems(prev=>prev.filter(item=>Number(item.id) !== Number(obj.id)))
  }else{
    axios.post("https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/cart",obj)
    setCartItems(prev => [...prev,obj])
  }
  }
  const onAddToFavorite=async(obj)=>{
    try{
    if(favorite.find(favObj => Number(favObj.id) === Number(obj.id))){
      axios.delete(`https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/Favorites/${obj.id}`)
      setFavorite((prev)=>prev.filter(item=>Number(item.id) !== Number(obj.id)))
    }else{
      const {data}=await axios.post("https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/Favorites",obj)
      setFavorite(prev => [...prev,data])
    }
  }catch (error){
    alert('Не удалось добавить в фавориты');
    console.error(error);
  }

  }
  // const onAddToFavorite = async (obj) => {
  //   try {
  //     if (favorite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
  //       axios.delete(`https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/Favorites/${obj.id}`);
  //       setFavorite((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
  //     } else {
  //       const { data } = await axios.post(
  //         'https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/Favorites',
  //         obj,
  //       );
  //       setFavorite((prev) => [...prev, data]);
  //     }
  //   } catch (error) {
  //     alert('Не удалось добавить в фавориты');
  //     console.error(error);
  //   }
  // };

  const onRemoveItem = (id)=>{
    axios.delete(`https://62d9553f5d893b27b2e3b3be.mockapi.io/pofig/cart/${id}`)

    setCartItems((prev)=>prev.filter(item=>item.id !== id))
  }

 
  const onChangeSearchInput =(event)=>{
    setSearchValue(event.target.value);
  }


  return (
    <div className="wrapper clear">
      {cartOpened?<Drawer items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveItem}/>:null}
      

      <Header onClickCart={()=>setCartOpened(true)}/>

    
      <Routes>
        <Route path="/"element={
          <Home 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          cartItems={cartItems}
          onChangeSearchInput={onChangeSearchInput}
          items={items}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
          isLoading={isLoading}
          />
         }/>

     <Route path="/favorites"element={
      <Favorites 
      items={favorite} 
      onAddToFavorite={onAddToFavorite}
      />
     }/>
      </Routes>

     </div>
  );
}

export default App;
