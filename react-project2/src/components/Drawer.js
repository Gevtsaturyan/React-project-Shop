

function Drawer({ onClose,onRemove, items=[]}){

    return(
        <div className="overLay">
        

       
        <div className="drawer">
        <h3 className="mb-30 d-flex justify-between ">Karzina
        <img className="removebtn cu-p"src="/img/btn-remove.svg" alt="Remove"
         onClick={onClose} onRemove={onRemove}/>
         </h3>

         {
          items.length >0 ?   
          <>
          
          <div className="items">
          {
            items.map((obj)=>(
              
              
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
              <div
               style={ {backgroundImage:`url(${obj.imageUrl})`}} 
               className='cartItemImg'>
               </div>
              <div className="mr-20">
                <p className="mb-5">{obj.name}</p>
                <b>{obj.price} dr.</b>
              </div>
              <img onClick={()=>onRemove(obj.id)} 
              className="removebtn"
              src="/img/btn-remove.svg"
              alt="Remove" />
            </div>
          
            )
            )
            }

        </div>
        
        <div className="cartTotalBlock">
        <ul>
            <li className="d-flex">
              <span>Itog:</span>
              <div></div>
              <b>21 498 dr.</b>
            </li>
            <li className="d-flex">
              <span>Nalog:</span>
              <div></div>
              <b>1074 dr.</b>
            </li>
           </ul>
           <button className="greenButton">Zakazat <img src="/img/arrow.svg" alt="Arrow"/></button>
        </div>
        </>

        
        : 
        

        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
          <img className='mb-20' width='120px'height='120px' src='/img/empty-cart.jpg' alt='Korzina'/>
          <h2>Korzina pustaya</h2>
          <p className='opancity-6'>
            Dobavte xotya by odnu krasovku,
            chtoby sdelat Zakaz
          </p>
          <button className='greenButton' onClick={onClose}>
            <img src='/img/arrow.svg' alt='Arrow'/>
            Vernutca nazad
          </button>

          </div>
          

         }
         


           
        </div>
        </div>
    )
}

export default Drawer