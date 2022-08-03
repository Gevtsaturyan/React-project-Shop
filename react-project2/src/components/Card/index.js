import './Card.Modul.scss'
import React, { useState } from 'react'
import ContentLoader from "react-content-loader"

function Card({ id, onFavorite, name, imageUrl, price, onPlus,favorited=false,added=false,lodaing} ){
  const [isAdded,setIsAdded]=useState({added})
  const [isFavorite,setIsFavorite]=useState({favorited})

  const onClickFavorite=()=>{
    {isFavorite && onFavorite({ id,name, imageUrl, price})}
    setIsFavorite(!isFavorite) 

  }

  const onClickPlus=()=>{
    setIsAdded(!isAdded);
    onPlus({ id,name, imageUrl, price})
    
  }

    return(
<div className="card">
  {
   lodaing ? (
      <ContentLoader
        speed={2}
        width={155}
        height={250}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
        <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
      </ContentLoader>
  ):(
    <>
    <div  className="favorite" onClick={onClickFavorite} >
<img src={isFavorite ? '/img/unliked.svg':'/img/liked.svg' } alt="Unliked"/>
</div> 
  <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
  <h5>{name}</h5>
  <div className="d-flex justify-between align-center" >
  
    <div className="d-flex flex-column ">
      <span>Cena:</span> 
      <b>{price} dr.</b>
    </div>
    
      <img className='plus' onClick={onClickPlus} src={isAdded ? "/img/btn-plus.svg":"/img/btn-checked.svg"}alt="plus"/>
    
  </div>
    </>
  )}

</div>
    )
}
export default Card
