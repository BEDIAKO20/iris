import { useState,useEffect } from "react";
import {uuidv4} from  "@firebase/util"
// import { v4 as uuidv4 } from "uuid";
// import  { db} from "./FireBaseSetUp/Firebase"
import { db, storage } from "../Firebase/Firebase";
import { doc,setDoc } from "firebase/firestore";




import "../PostAdd/PostAdd.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
function PostAdd() {

    const [categories, setCategories] = useState("")
    const [price, setPrice] = useState("")
    const [productTitle,setProductTitle] = useState("")
    const [quantity,setQuantity] =useState("")
    const [oldPrice, setOldPrice] = useState("")
    const [description,setDescription] =useState("")
    const [upload,setUpload] =useState("")

    const [imageObject, setImageObject] = useState({});
    const [imageUrl, setImageUrl] = useState("" );
  

    const handleFileSelect = (event) => {
      const selectedFiles = event.target.files;

      console.log(selectedFiles)
  
      if (selectedFiles.length > 0) {
        // Assuming you want to handle each selected file
        const file = selectedFiles[0]; // Take the first file
  
        const imageBlob = URL.createObjectURL(selectedFiles[0]);
  
        if (file.type.startsWith("image/")) {
          const maxSizeInBytes = 0.5 * 1024 * 1024; // 15 MB
  
          if (file.size <= maxSizeInBytes) {
            console.log("File accepted:", file);
            setImageObject(selectedFiles[0]); // Store the file itself
 
            setImageUrl(imageBlob);// 

        
            // alert(imageBlob);
            console.log(imageBlob);
  
            // Reset the value of the file input element
            event.target.value = [];
          } else {
            alert("File size exceeds the limit (500 KB).");
          }
        } else {
          alert("Please select an image file.");
        }
      }
    };

    // useEffect(() => {
      
    //   });
    const handleDatabaseInection =async (e) =>{
      e.preventDefault();
      const uuid=uuidv4()
    
      try{

    



        const productImageRef = ref(
          storage,
          `productImage/${categories}/${
            imageObject?.name + "-" + uuid
          }`
        );


        // Upload the image
        await uploadBytes(productImageRef, imageObject);

        // Get the download URL
        const url = await getDownloadURL(productImageRef);


        await setDoc(doc(db, "products", uuid), {   categories,
          price,
          productTitle,
          quantity,
          oldPrice,
          description,
          upload,
          uuid:uuid,
          url});


        // Clear the form fields after submission
        setCategories("");
        setPrice("");
        setProductTitle("");
        setQuantity("");
        setOldPrice("");
        setDescription("");
        setUpload("");
        setImageObject({})
        setImageUrl("")
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("errir")
      }
    }



  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 box py-5">
            <div className="add-post pt-4">
              <h5>Post Product</h5>
            </div>
          </div>
        </div>
        <div className="card-box">
          <form  onSubmit={handleDatabaseInection}>
            <select
              class="form-select form-select-lg mb-3 w-50 inputS-box"
              aria-label="Large select example"
              required
              value={categories}
              onChange={(e) => {
                setCategories(e.target.value);
              }}
            >
              <option selected> select Categories</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Arts">Arts</option>
              <option value="Furniture">Furniture</option>
            </select>
            <div className="row">
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="price"
                    required
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
        
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Product Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=" Product Title"
                    required
                    value={productTitle}
                    onChange={(e) => {
                      setProductTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" className="form-label" >
                    Quantity
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Quantity"
                    required
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
        
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Old Price
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=" Old Price"
                         value={oldPrice}
                         onChange={(e) => {
                          setOldPrice(e.target.value);
                        }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-12">
    
<div class="mb-3 w-50 inputS-box">
  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" value={description} onChange= {(e) => {
                setDescription(e.target.value);
              }} rows="3"></textarea>
</div>
                </div>
                <div className="col-6">
                <p>Click on the "Choose File" button to upload a file:</p>
                <label htmlFor="myFile" className="file-label">Choose File</label>
        <input type="file" id="myFile" name="filename" className="file-input" 
         accept="image/*" onChange={handleFileSelect}
     />
        
<img src={imageUrl} />

                </div>
            </div>
            <input type="submit" className="submit-button" />
          </form>
        </div>
      </div>
    </>
  );
}

export default PostAdd;
