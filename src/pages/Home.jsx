import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { getCachedData, saveDataToCache } from '../appwrite/caching';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const cachedData = getCachedData();

        if (cachedData) {
            setPosts(cachedData);
        }


        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                saveDataToCache(posts.documents);

            }
        })
    }, [])


    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home