import './ItemDetailContainer.css';
import { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const {itemId} = useParams()

    useEffect(() => {
        const productRef = doc(db, 'products', itemId)

        getDoc(productRef)
        .then(snapshot => {
            const data = snapshot.data()
            const productAdapted = { id: snapshot.id, ...data }
            setProduct(productAdapted)
        })
        .catch(error => {
            console.log(error)
            setError(true)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [itemId])

    if(loading) {
        return <h2 className='altTitle'>Cargando...</h2>
    }

    if(error) {
        return <h2 className='altTitle'>Cargar nuevamente la web.</h2>
    }

    return (
        <div className='ItemDetailContainer'>
            <h2 className='greetingTitle'>Detalles del producto:</h2>
            <ItemDetail {...product}/>
        </div>
    )
}

export default ItemDetailContainer