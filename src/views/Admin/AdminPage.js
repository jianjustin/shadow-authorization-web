import React from 'react';
import {
    Link
} from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

function Admin(){
    return (
    <div>
        <h2>后台管理系统</h2>
        <Sidebar></Sidebar>
    </div>
    );
}

export default Admin;