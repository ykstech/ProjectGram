import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { PencilSquareIcon,TrashIcon } from '@heroicons/react/24/solid'

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    
    const isAuthor = post && userData ? post.userid == userData.$id : false;
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex border rounded-xl bg-gray-200">
                <div className="w-1/2 flex  relative justify-center bg-gray-100  border rounded-xl p-2">
                    <img  
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />  <br/>
                

                    {isAuthor && (
                        <div className="absolute right-6 top-6 ">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-gray-400" className="mr-3 hover:bg-gray-500">
                                <PencilSquareIcon className="w-6 h-6"/>
                                </Button>
                            </Link>
                            <Button bgColor="bg-gray-400" className="hover:bg-gray-500" onClick={deletePost}>
                            <TrashIcon className="w-6 h-6"/>
                               
                            </Button>
                        </div>
                 )}
                </div>
                <div className="w-1/2 mb-6 p-4">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
                    </div>
                    </div>
            </Container>
        </div>
    ) : null;
}
