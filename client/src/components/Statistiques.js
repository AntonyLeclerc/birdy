import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from './Utils';

const Statistiques = () => {
    const posts = useSelector((state) => state.messagesReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!isEmpty(posts)) {
            const social = usersData ? usersData.reduce((total, user) => total + user.following.length, 0) : 0;
            const likes = posts ? posts.reduce((total, post) => total + post.likers.length, 0) : 0;
            const shares = posts ? posts.reduce((total, post) => total + (post.sharers.length > 0 ? 1 : 0), 0) : 0;
            const shared = posts ? posts.reduce((total, post) => total + post.sharers.length, 0) : 0;
            const comments = posts ? posts.reduce((total, post) => total + post.comments.length, 0) : 0;
            setStats({ social, likes, shares, shared, comments });
        }
    }, [posts, usersData]);

    if (!stats) return null;

    return (
        <div id="stats">
            <p>Nombre de messages : {posts ? posts.length : 0}</p>
            <p>Nombre d'utilisateurs : {usersData ? usersData.length : 0}</p>
            <p>Nombre de liens sociaux (followers / following) : {stats.social}</p>
            <p>Nombre de mention "J'aime" : {stats.likes}</p>
            <p>Nombre de mention "messages partagés" : {stats.shares}</p>
            <p>Nombre de partages total : {stats.shared}</p>
            <p>Nombre de commentaires total : {stats.comments}</p>
        </div>
    );
};

export default Statistiques;
