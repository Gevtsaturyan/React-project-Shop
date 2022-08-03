import Card from "../components/Card"
import React from "react"
import '../index.scss'

function Favorites({items,onAddToFavorite}){

    return(
        <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
         <h1>Moi Krosovki</h1>

       </div>
       <div className="d-flex flex-wrap">
       { 
        items.map((item,i)=>(
                <Card 
                 key={i}
                //  id={items.id}
                //  title={item.name}
                //  price={item.price}
                //  imageUrl={item.imageUrl}
                 favorited={true}
                 onFavorite={onAddToFavorite} 
                 {...item}
                />
        
                )        )         
         }
           </div>
          </div>
    )
}

export default Favorites