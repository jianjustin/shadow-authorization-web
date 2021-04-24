import React from 'react';
import {
    Link
} from 'react-router-dom';

function Sidebar(){
    return (
    <div>
        <ul>
            <li><Link to="/login">登录页面</Link></li>
        </ul>
    </div>
    );
}

export default Sidebar;