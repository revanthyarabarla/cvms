import React from 'react'
import './home.css'
import logouticon from './images/logout.png'
import { callApi, errorResponse, getSession, setSession } from './main';
import menuicon from './images/menu.png'

const logoutstyle = {"float" : "right", "padding-right" : "5px", "cursor" : "pointer"};
const titlestyle = {"padding-left" : "5px", "font-weight" : "bold"};
const userlabelstyle = {"float" : "right", "padding-right" : "20px"};

export function loadUname(res)
{
   var data = JSON.parse(res);
   var HL1 = document.getElementById("HL1");
   HL1.innerText = `${data[0].firstname} ${data[0].lastname}`;
}

export function loadMenu(res)
{
    var data=JSON.parse(res);
    var list="";
    for(var x in data) //returning so many records so use loop
    {
        list +=`<li>
                    <label id='${data[x].mid}L'>${data[x].mtitle}</label>
                    <div id='${data[x].mid}'class='smenu'></div> 
                </li>`;    //here we use class because it is normal js not react js
    }
    var mlist=document.getElementById('mlist');
    mlist.innerHTML=list;
    
    for( x in data)
    {
        var surl='http://localhost:5000/home/menus';
        var ipdata=JSON.stringify({
            mid:data[x].mid
        });
        callApi("POST",surl,ipdata,loadSMenu,errorResponse);
        document.getElementById(`${data[x].mid}L`).addEventListener("click",showSMenu.bind(null,data[x].mid))//it shows the click symbol

    }
}

export function showSMenu(mid){
    var smenu=document.getElementById(mid);
    if(smenu.style.display==='block'){
        smenu.style.display='none';
    }
    else{
        smenu.style.display='block';
    }
}
   
export function loadSMenu(res)
{
    var data = JSON.parse(res);
    var slist = "";
    for(var x in data)
    {
        slist += `<label>${data[x].smtitle}</label>`;
    }
    var smenu = document.getElementById(`${data[0].mid}`);
    smenu.innerHTML = slist;
}

class Home extends React.Component
{
    constructor()
    {
        super();
        this.sid = getSession("sid");
        //alert(this.sid);
        if(this.sid === "")
            window.location.replace("/");

        var url = "http://localhost:5000/home/uname";
        var data = JSON.stringify({
            emailid : this.sid
        });
        callApi("POST", url, data, loadUname, errorResponse);

        url = "http://localhost:5000/home/menu";
        callApi("POST", url, "", loadMenu, errorResponse);
    }

    logout()
    {
        setSession("sid", "", -1);
        window.location.replace("/");
    }

    render()
    {
        return(
            <div className='fullheight'>
                <div className='header'>
                    <label style={titlestyle}>KL University | Counselling and Visitors Management System</label>
                    <label style={logoutstyle} onClick={this.logout}>Logout</label>
                    <img src={logouticon} alt='' className='logouticon' onClick={this.logout} />
                    <label id='HL1' style={userlabelstyle}></label>
                </div>
                <div className='content'>
                    <div className='menubar'>
                        <div className='menuheader'>
                            <img src={menuicon} alt='' />
                            <label>Menu</label>
                        </div>
                        <div className='menu'>
                            <nav><ul id='mlist' className='mlist'></ul></nav>
                        </div>
                    </div>
                    <div className='outlet'>Outlet</div>
                </div>
                <div className='footer'>Copyright @ KL University. All rights reserved.</div>
            </div>
        );
    }
}

export default Home;