import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
//import { useDispatch } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../lib/firebaseConfig';
import type { ProductInput } from "../types/types";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebaseConfig';

const AddProduct = () => {

    //const dispatch = useDispatch();

    //const [product, setProduct] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<ProductInput>({
        title: '',
        description: '',
        category: '',
        price: '',
        image: '',
    });

    const [createdTitle, setCreatedTitle] = useState('');

    const uploadImage = async (file: File) => {
        const storageRef = ref(
            storage,
            `products/${Date.now()}-${file.name}`
        );
        
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;

    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
        setSubmitted(false);
        setError(null);

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            let imageUrl = '';
            
            if (imageFile) {await uploadImage(imageFile);

            } 
            const productToSave = {
                ...formData,
                price: Number(formData.price),
                image: imageUrl,
            };

            const title = formData.title;

            const docRef = 
            await addDoc(collection(db, 'products'), productToSave);
            console.log('Created prodict with ID: ', docRef.id);
            
            setCreatedTitle(title);
            setSubmitted(true);
            setError(null);
            setImageFile(null);

            setFormData({
                title: '',
                description: '',
                category: '',
                price: '',
                image: '',
            })

            } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div>
            <Container>
                <h2>Add Product</h2>
                {submitted && <Alert variant='success' dismissible>{createdTitle} created successfully!</Alert>}
                {error && <Alert variant='danger'>{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                        name='image'
                        type='file'
                        accept='image/*'
                        value={formData.image}
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setImageFile(e.target.files[0]);
                                }
                            }}   
                        />
                    </Form.Group>
            
                    <Button type='submit'>Add Product</Button>

                </Form>
            </Container> 
        </div>
    )
}

export default AddProduct;