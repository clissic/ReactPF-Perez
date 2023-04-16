import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList'
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const ItemListContainer = ({greeting}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const {categoryId} = useParams()

    useEffect(() => {
        const productsRef = categoryId ? query(collection(db, 'products'), where('category', '==', categoryId)) : collection(db, 'products')
        getDocs(productsRef)
            .then(snapshot => {
                const productsAdapted = snapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data}
                })
                setProducts(productsAdapted)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [categoryId])

    if(loading) {
        return <h2 className='altTitle'>Cargando...</h2>
    }

    if(error) {
        return <h2 className='altTitle'>Cargar nuevamente la web.</h2>
    }

    if(products && products.length === 0) {
        return <h2 className='altTitle'>No hay productos.</h2>
    }

    return (
        <div className="ItemListContainer">
            <h2>{greeting}</h2>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer;