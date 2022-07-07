import React from 'react';
import './SidebarOptions.css'
import {Add} from "@material-ui/icons";
function SidebarOptions() {
    return (
        <div className="sidebarOptions">
            <div className="sidebarOption">
                <img src="https://image.scoopwhoop.com/w620/s3.scoopwhoop.com/anj/st_anger/289113779.jpg.webp" alt=""/>
                <p>Suit</p>
            </div>
            <div className="sidebarOption">
                <img src="https://www.sisain.co.kr/news/photo/200801/1009_1870_5615.jpg" alt=""/>
                <p> UFC </p>
            </div>

            <div className="sidebarOption">
                <img src="https://img.hankyung.com/photo/202009/01.23683388.1.jpg" alt=""/>
                <p> Automobile </p>
            </div>


            <div className="sidebarOption">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Wrigley_field_720.jpg" alt=""/>
                <p> Baseball </p>
            </div>

            <div className="sidebarOption">
                <img
                    src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F214E863354FD32AC23"
                    alt=""/>
                <p> Cook </p>
            </div>

            <div className="sidebarOption">
                <img src="https://image.chosun.com/sitedata/image/202007/13/2020071300343_0.jpg" alt=""/>
                <p> Football </p>
            </div>
            <div className="sidebarOption">
                <Add/>
                <p className="text">Add</p>
            </div>

        </div>
    );
}

export default SidebarOptions;