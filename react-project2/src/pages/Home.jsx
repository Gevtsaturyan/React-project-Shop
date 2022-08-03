import Card from "../components/Card"

function Home({
    searchValue,
    setSearchValue,
    cartItems,
    onChangeSearchInput,
    items,
    onAddToCart,
    onAddToFavorite,
    isLoading
}){
    // {
        const renderItems = () => {
          const filtredItems = items.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          );
          return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              added={cartItems.some(obj=>Number(obj.id) === Number(item.id) ) }
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              {...item}
            />
          ));
        };
      

    // const renderItems=()=>{
    //     return(
    //     items.filter((item)=>item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item,i)=>(
    //         <Card 
    //          key={i}
    //          onPlus={(obj)=>onAddToCart(obj)}
    //          added={cartItems.some(obj=>Number(obj.id) === Number(item.id) ) }
    //          onFavorite={(obj)=>onAddToFavorite(obj)}
    //          {...item}
    //          lodaing={true}/>
             
    //       )) 
    // )}

    return(
        <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
         <h1>{searchValue ? `Поиск по запросу: ${searchValue}`: 'Vse кроссовки:'}</h1>
         <div className="search-block d-flex">
         <img src="/img/search.svg" alt="Search"/>
          {searchValue
          && <img className="clear removebtn"
         src="/img/btn-remove.svg" alt="Remove"
          onClick={()=>setSearchValue('')} />}
          <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue}/>
        </div>
       </div>
       <div className="d-flex flex-wrap">
        { renderItems() }
           </div>
          </div>
    )
}

export default Home;