import React, { useState } from 'react';
import  '../ProductInfrom/productInfrom.css'
import upcyledTable from "../ProductInfrom/image/upcyledMetalTable.svg";
import  metalTeble1 from "../ProductInfrom/image/meralTable1.svg"
import metalTable from "../ProductInfrom/image/metalTable.svg"
import metal  from "../ProductInfrom/image/metal.svg"
import table from "../ProductInfrom/image/table.svg"
import home from "../ProductInfrom/image/home.svg"
import BtnAddToCart from "../BtnAddToCart/BtnAddToCart"
import { useParams } from 'react-router';
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../Firebase/Firebase'


function ProductInfo() {
    // const [quantity, setQuantity] = useState(1);
    // const handleIncrease = () => {
    //    
           setQuantity(quantity + 1);
    //   };
    
    //   const handleDecrease = () => {
    //     if (quantity > 1) {
    //       setQuantity(quantity - 1);
    //     }
    //   };

  
    const {productId}= useParams()


    const [allItemProducts,setAllItemProducts]= useState([]);

    const productsCollectionRef = collection(
      db,
      `products`
    );
  
    const q = query(productsCollectionRef);
    const allProducts = onSnapshot(q, async (querySnapshot) => {
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push(doc.data());
      });
  
      console.log("Products array",productsArray)
  
      const filteredItems = productsArray.find((item) => {
        return item.uuid === productId;
      });
  
  
      setAllItemProducts(filteredItems)
  
  
    })
  
  


  


  return (
    <>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            <div>
              <img style={{width:"400px"}} src={allItemProducts?.url} />
            </div>
          </div>

          <div className="col-lg-6 col-sm-6">
            <p className="upcycledText">{allItemProducts?.productTitle} </p>
            <p className="upcycled-Money">${allItemProducts?.price}</p>
            <BtnAddToCart/>
            {/* <button className="quantity">
              <span onClick={handleIncrease}>+</span>
              <span>{quantity}</span>
              <span onClick={handleDecrease} >-</span>
            </button> */}
            <p className="composition-text mt-4">Description</p>
            <p className="item-text">
            {allItemProducts?.description}
            </p>
            <p className="item-text">
            Cursus consequat nec nunc vestibulum eget egestas auctor aliquam vitae.
              Risus id tempus vitae ligula varius nullam adipiscing purus
              faucibus. Amet purus semper diam egestas suspendisse ut nibh amet.
              Est enim sed nisl non urna eget urna. Amet pretium interdum eget
              non vitae.
            </p>
            <div>
                <button className='addCart-Button'>Add Cart</button>
            </div>
          </div>

        </div>
      </div>
      <div className='container'>
        <div className='row'>
            <div className='col-md-5'>
              <div>
                <img src={metalTeble1} className='metalTable1'/>
              </div>
            </div>
            <div className='col-md-6'>
              <div>
              <img src={metalTable} className='metalTable2'/>
              </div>
            </div>
        </div>
      </div>
      <div className='container mt-5 py-5'>
      
      <div className='teax-box'>
      <p className='products-teax'>
        Similar Products
        </p>
      </div>
        <div className='row'>
          <div className='col-lg-3'>
            <img src={metal}/>
          </div>
          <div className='col-lg-2 tableImage'>
            <img src={table}/>
          </div>
          <div className='col-lg-3 homeImage'>
            <img src={home}   className='home-image'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
