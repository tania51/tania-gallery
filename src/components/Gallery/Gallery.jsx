import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const searchApi = 'https://api.unsplash.com/search/photos';
const imgPerPage = 12;

const Gallery = () => {

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        imgFetch();
    }, [page])

    const imgFetch = async () => {
        try {
            if (searchInputField.current.value) {
                const { data } = await axios.get(`${searchApi}?query=${searchInputField.current.value}&page=${page}&per_page=${imgPerPage}&client_id=${import.meta.env.VITE_API_KEY}`);
                setImages(data.results);
                setTotalPages(data.total_pages);
            }


        } catch (error) {
            console.log(error);
        }

    }


    const searchInputField = useRef(null);

    const searchHandaler = (event) => {
        event.preventDefault();
        imgFetch();
    }

    const handleImage = (select) => {
        searchInputField.current.value = select;
        imgFetch();
    }
    console.log(page);
    return (
        <div>
            <form onSubmit={searchHandaler}>
                <input type="search" placeholder="Type here..." className="input input-bordered input-accent w-full max-w-xs" ref={searchInputField} />
            </form>
            <div className="search-btn w-1/2 mx-auto flex gap-3 mt-5">
                <div onClick={() => handleImage('nature')} className='text-white bg-accent px-8 py-2 rounded justify-center cursor-pointer'>Nature</div>
                <div onClick={() => handleImage('cat')} className='text-white bg-accent px-8 py-2 rounded justify-center cursor-pointer'>Cat</div>
                <div onClick={() => handleImage('panda')} className='text-white bg-accent px-8 py-2 rounded justify-center cursor-pointer'>Panda</div>
                <div onClick={() => handleImage('lion')} className='text-white bg-accent px-8 py-2 rounded justify-center cursor-pointer'>Lion</div>
            </div>
            {/* showing images */}
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 mx-auto'>
                {
                    images.map(image => (
                        <div key={image.id} className="avatar justify-center">
                            <div className="rounded">
                                <img src={image.urls.small} alt={image.alt_description} />
                            </div>
                        </div>


                    ))
                }
            </div>

            {/* pagination */}
            <div className='py-4'>
                {page > 1 && <button onClick={() => setPage(page - 1)} className='text-white bg-accent px-8 py-2 rounded justify-center cursor-pointer mr-3'>Previous</button>}
                {page < totalPages && <button onClick={() => setPage(page + 1)} className='text-white bg-accent px-8 py-2 rounded justify-center cursor-pointer'>Next</button>}
            </div>

        </div>
    );
};

export default Gallery;