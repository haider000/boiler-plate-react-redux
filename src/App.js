import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import './App.css';
import EmailBody from './Components/EmailBody/EmailBody';
import EmailCard from './Components/EmailCards/EmailCard';

import { useDispatch } from "react-redux";

import { getAllEmailList, useEmailState } from "./redux/slice/emailSlice";


function App() {
 
  const [showEmailBody, setShowEmailBody] = useState(false)
  const [activeEmailId, setActiveEmailId] = useState(-1)
  const [currentTab, setCurrentTab] = useState("All")
  
  const dispatch = useDispatch()

  const {
    emails,
    readEmails,
    favorites,
    isEmailListLoading,
  } = useEmailState()

  


  useEffect(() => {
    dispatch(getAllEmailList())
  }, [])

  const data = useMemo(() => {

    switch (currentTab) {
      case "All":
        return emails

      case "Read":
        return emails.filter((email)=>readEmails.includes(email.id))

      case "Favorites":
        return emails.filter((email)=>favorites.includes(email.id)) 

      case "Unread":
        return emails.filter((email)=>!readEmails.includes(email.id)) 
        
      default:
        return emails
    }

  }, [currentTab, emails, favorites, readEmails])


  
  
  if(isEmailListLoading){
    return <div style={{minWidth:"50%",fontSize:"1.5rem",fontWeight:"bold",textAlign:"center"}}>Loading...</div>
  }

  return (
    <div className="main-container">
      <div className='filter-tags-wrapper'>
        <div>Filter By:</div>
        <div className='filter-tags'>
          <span  className={cx(currentTab==="Unread" && 'filter-tags-selected')} onClick={()=>setCurrentTab((prevState)=>prevState==="Unread"?"All":"Unread")}>Unread</span>
          <span className={cx(currentTab==="Read" && 'filter-tags-selected')} onClick={()=>setCurrentTab((prevState)=>prevState==="Read"?"All":"Read")}>Read</span>
          <span  className={cx(currentTab==="Favorites" && 'filter-tags-selected')} onClick={()=>setCurrentTab((prevState)=>prevState==="Favorites"?"All":"Favorites")}>Favorites</span>
        </div>
      </div>
      
      <div className="email-list-container">
          <section className='main-wrapper'>
          {
            data && data.length > 0 ? data.map((emailDetails)=> (
              <EmailCard 
              key={emailDetails.id} 
              emailDetails={emailDetails} 
              setShowEmailBody={setShowEmailBody}
              readEmails={readEmails}
              favorites={favorites}
              activeEmailId={activeEmailId}
              setActiveEmailId={setActiveEmailId}
              />
            )) :
            <div>No Email</div>
          }
            
          </section>
        {showEmailBody && <section className="email-body-container">
          <EmailBody />
          </section>
        }
      </div>
    </div>
  );
}

export default App;
