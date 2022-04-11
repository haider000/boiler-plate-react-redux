
import ProfilePic from '../ProfilePic/ProfilePic';

import { useMemo } from 'react';
import { addToFavorites, useEmailState } from "../../redux/slice/emailSlice";
import { formatDate, formatTime } from '../../utils';

import { useDispatch } from 'react-redux';
import "./email-body.css";

function EmailBody() {

  const dispatch = useDispatch()

  const { emails, currentEmailBody, isEmailBodyLoading } = useEmailState()

  const currentEmail = useMemo(() =>{
    let filteredEmail =  emails?.find((email)=>email.id===currentEmailBody.id)
    if(filteredEmail){
      return {
        id:filteredEmail.id,
        name:filteredEmail.from.name,
        subject:filteredEmail.subject,
        date:formatDate(filteredEmail.date),
        time:formatTime(filteredEmail.date),
      }
    }
  else{
    return {}
  }
  }, [currentEmailBody.id, emails])

 
if(isEmailBodyLoading || Object.keys(currentEmail).length === 0 ){
  return <div style={{fontSize:"1.5rem",fontWeight:"bold",textAlign:"center"}}>Loading...</div>
}


  return (
    <div className='email-body-wrapper'>
      <div>
        <ProfilePic name={currentEmail.name}/>
      </div>
      
      <div className='email-details'>
        
        <div>
          <div className='flex-div'>
            <div> {currentEmail.subject}</div> 
            <button className='fav-button' onClick={()=>{dispatch(addToFavorites({id:currentEmail.id}))}}>Mark as Favorite</button>
          </div>
          
          <div className='email-body-date-time'>
            <div>{currentEmail.date}</div>
            <div className='email-time'>{currentEmail.time}</div>
          </div>
        </div>

        <div className="email-body" dangerouslySetInnerHTML={{ __html: currentEmailBody.body }}>
          
        </div>
      </div> 
    </div>
  )
}

export default EmailBody