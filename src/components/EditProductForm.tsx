import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import type { ProductInput } from '../types/types';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebaseConfig';
import { useParams } from 'react-router-dom';
import NavBar from './Navbar/NavBar';




const UpdateProduct = () => {

    const { id: productId } = useParams();

    if (!productId) {
        return <div>Missing Product ID</div>;
    }

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

    const [updatedTitle, setUpdatedTitle] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            if(!productId) return;

            const docRef = doc(db, 'products', productId);
            const docSnap = await getDoc(docRef);
            

            if (docSnap.exists()) {
               const data = docSnap.data();

                setFormData({
                    title: data.title ?? '',
                    price: data.price ?? '',
                    description: data.description ?? '',
                    category: data.category ?? '',
                    image: data.image ?? '',
                })
            }
        };

        fetchProduct();
    }, [productId])
 
    const uploadImage = async (file: File) => {
        const storageRef = ref(
            storage,
            `products/${Date.now()}-${file.name}`
        );

        const snapshot = await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            
            setSubmitted(false);
            setError(null);

            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
        };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            let imageUrl = formData.image;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const productToSave = {
                ...formData,
                price: Number(formData.price),
                image: imageUrl
            };

            const title = formData.title;

            // const docRef = 
            // await updateDoc(collection(db, 'products'), productToSave);
            // console.log('Updated product with ID: ', docRef.id)
            

            const docRef = doc(db, 'products', productId);

            await updateDoc(docRef, productToSave);

            setUpdatedTitle(title);
            setSubmitted(true);
            setError(null);
            setImageFile(null);

            setFormData({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                price: formData.price,
                image: formData.image,
            })
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <Container>
                <h2>Update Product</h2>
                {submitted && <Alert variant='success' dismissible>{updatedTitle} updated successfully</Alert>}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files?.[0]) {
                                setImageFile(e.target.files[0])
                            }
                        }}
                        />
                        {formData.image && (
                            <div style={{ marginTop: '10px'}}>
                                <p>Current Image:</p>
                                <img
                                    src={formData.image}
                                    alt='Product'
                                    style={{ width: '150px', borderRadius: '8px'}}
                                    />
                            </div>
                            
                        )}
                    </Form.Group>
                    <Button type='submit'>Update Product</Button>
                </Form>
            </Container>
        </div>
    )
}

export default UpdateProduct;