import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import styles from './CreateNFT.module.css';

const CreateNFT = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        royalties: '',
        category: '',
        collection: '',
        properties: [{ trait_type: '', value: '' }]
    });
    const [previewFile, setPreviewFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setPreviewFile(Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
            'video/*': ['.mp4', '.webm'],
            'audio/*': ['.mp3', '.wav']
        },
        maxFiles: 1
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addProperty = () => {
        setFormData(prev => ({
            ...prev,
            properties: [...prev.properties, { trait_type: '', value: '' }]
        }));
    };

    const removeProperty = (index) => {
        setFormData(prev => ({
            ...prev,
            properties: prev.properties.filter((_, i) => i !== index)
        }));
    };

    const handlePropertyChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            properties: prev.properties.map((prop, i) => 
                i === index ? { ...prop, [field]: value } : prop
            )
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', { ...formData, file: previewFile });
    };

    return (
        <div className={styles.create_nft}>
            <motion.div 
                className={styles.content_wrapper}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={styles.title}>Create New NFT</h1>
                <p className={styles.subtitle}>
                    Create and sell your unique digital creations
                </p>

                <div className={styles.form_container}>
                    {/* Left Column - Form Fields */}
                    <div className={styles.form_section}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.upload_section} {...getRootProps()}>
                                <input {...getInputProps()} />
                                {previewFile ? (
                                    <div className={styles.preview_container}>
                                        <Image
                                            src={previewFile.preview}
                                            alt="Preview"
                                            layout="fill"
                                            objectFit="cover"
                                            className={styles.preview_image}
                                        />
                                        <button 
                                            type="button"
                                            className={styles.remove_btn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewFile(null);
                                            }}
                                        >
                                            <FiX />
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.upload_placeholder}>
                                        <FiUpload className={styles.upload_icon} />
                                        <p>Drag and drop your file here, or click to browse</p>
                                        <span>Supported formats: JPG, PNG, GIF, MP4, MP3 (Max 100MB)</span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.form_group}>
                                <label>NFT Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter NFT name"
                                    required
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Provide a detailed description of your NFT"
                                    rows="4"
                                />
                            </div>

                            <div className={styles.form_row}>
                                <div className={styles.form_group}>
                                    <label>Price</label>
                                    <div className={styles.input_with_icon}>
                                        <FaEthereum className={styles.input_icon} />
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className={styles.form_group}>
                                    <label>Royalties %</label>
                                    <input
                                        type="number"
                                        name="royalties"
                                        value={formData.royalties}
                                        onChange={handleInputChange}
                                        placeholder="0-10%"
                                        min="0"
                                        max="10"
                                    />
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <div className={styles.form_group}>
                                    <label>Category</label>
                                    <div className={styles.input_with_icon}>
                                        <BiCategory className={styles.input_icon} />
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="art">Art</option>
                                            <option value="music">Music</option>
                                            <option value="virtual-worlds">Virtual Worlds</option>
                                            <option value="trading-cards">Trading Cards</option>
                                            <option value="collectibles">Collectibles</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.form_group}>
                                    <label>Collection</label>
                                    <select
                                        name="collection"
                                        value={formData.collection}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Collection</option>
                                        <option value="create-new">+ Create New Collection</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.properties_section}>
                                <div className={styles.properties_header}>
                                    <h3>Properties</h3>
                                    <button 
                                        type="button" 
                                        className={styles.add_property_btn}
                                        onClick={addProperty}
                                    >
                                        Add Property
                                    </button>
                                </div>
                                
                                {formData.properties.map((prop, index) => (
                                    <div key={index} className={styles.property_row}>
                                        <input
                                            type="text"
                                            placeholder="Property name"
                                            value={prop.trait_type}
                                            onChange={(e) => handlePropertyChange(index, 'trait_type', e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Value"
                                            value={prop.value}
                                            onChange={(e) => handlePropertyChange(index, 'value', e.target.value)}
                                        />
                                        {index > 0 && (
                                            <button 
                                                type="button"
                                                className={styles.remove_property_btn}
                                                onClick={() => removeProperty(index)}
                                            >
                                                <FiX />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button type="submit" className={styles.create_btn}>
                                Create NFT
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Preview */}
                    <div className={styles.preview_section}>
                        <h3>Preview</h3>
                        <div className={styles.preview_card}>
                            <div className={styles.preview_image_container}>
                                {previewFile ? (
                                    <Image
                                        src={previewFile.preview}
                                        alt="NFT Preview"
                                        layout="fill"
                                        objectFit="cover"
                                        className={styles.preview_image}
                                    />
                                ) : (
                                    <div className={styles.preview_placeholder}>
                                        <span>No media selected</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.preview_info}>
                                <h4>{formData.name || 'Untitled NFT'}</h4>
                                <p className={styles.preview_description}>
                                    {formData.description || 'No description provided'}
                                </p>
                                {formData.price && (
                                    <div className={styles.preview_price}>
                                        <FaEthereum />
                                        <span>{formData.price} ETH</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateNFT; 