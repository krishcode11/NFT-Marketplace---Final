"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Style from "./uploadNFT.module.css";
import { Button } from "../../components/componentsindex";
import { nftAPI } from '@/services/api';

const UploadNFT = () => {
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Upload image to IPFS
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      setError("");
      const url = await uploadToIPFS(file);
      if (url) {
        setFileUrl(url);
        setImage(file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Create NFT
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description || !price || !fileUrl) {
      setError("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // First create NFT on blockchain
      const transaction = await createNFT(name, description, price, fileUrl);
      
      // Then save NFT metadata to backend
      const nftData = {
        name,
        description,
        price,
        image: fileUrl,
        tokenId: transaction.tokenId, // Assuming createNFT returns tokenId
        contractAddress: transaction.contractAddress,
        creator: transaction.creator
      };
      
      await nftAPI.createNFT(nftData);

      router.push("/nft-details/" + transaction.tokenId);
    } catch (error) {
      console.error("Error creating NFT:", error);
      setError("Error creating NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.upload}>
      <div className={Style.upload_box}>
        <h1>Create New NFT</h1>
        <p className={Style.upload_box_input_para}>
          Upload your NFT art and set its details
        </p>

        {error && (
          <p className={Style.error}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className={Style.upload_box_input}>
            <label htmlFor="nft">Upload File</label>
            <input
              type="file"
              id="nft"
              accept="image/*"
              onChange={handleImageUpload}
              className={Style.upload_box_input_file}
            />
          </div>
          {fileUrl && (
            <div className={Style.upload_box_preview}>
              <Image
                src={fileUrl}
                alt="NFT preview"
                width={200}
                height={200}
                className={Style.upload_box_preview_img}
              />
            </div>
          )}

          <div className={Style.upload_box_input}>
            <label htmlFor="name">NFT Name</label>
            <input
              type="text"
              id="name"
              placeholder="NFT Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={Style.upload_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="NFT Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className={Style.upload_box_input}>
            <label htmlFor="price">Price (ETH)</label>
            <input
              type="number"
              id="price"
              placeholder="NFT Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>

          <button
            type="submit"
            className={Style.upload_box_btn}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create NFT"}
          </button>
        </form>
      </div>
    </div>
  );
};  

export default UploadNFT;