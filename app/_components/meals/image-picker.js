'use client'

import { useRef, useState } from 'react'
import styles from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState(null);
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setPickedImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className={styles.picker}>
            <label htmlFor={name}>
                {label}
            </label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {pickedImage && <Image src={pickedImage} alt="Picked Image" fill />}
                    {!pickedImage && <p>No image picked</p>}
                </div>
                <input
                    className={styles.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
            </div>
            <button className={styles.button} type="button" onClick={handlePickClick}>
                Pick an Image
            </button>
        </div>
    )
}
