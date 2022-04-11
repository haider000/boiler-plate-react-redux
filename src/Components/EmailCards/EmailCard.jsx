import cx from "classnames";
import { useMemo } from "react";
import { useDispatch } from 'react-redux';
import ProfilePic from '../ProfilePic/ProfilePic';
import "./email-card.css";

import { addToRead, getEmailBody } from "../../redux/slice/emailSlice";
import { formatDate, formatTime } from '../../utils';


function EmailCard({emailDetails,setShowEmailBody,readEmails,favorites,activeEmailId,setActiveEmailId}) {
   
    const dispatch = useDispatch();

    const handleCardClicked = (id) => {
        setShowEmailBody(true);
        setActiveEmailId(id)
        dispatch(addToRead({ id:id }));
        dispatch(getEmailBody(id));
    };
   
    const formattedDate = useMemo(() => formatDate(emailDetails.date), [emailDetails.date])
    const formattedTime = useMemo(() => formatTime(emailDetails.date) , [emailDetails.date])
   
  return (
    <div className={cx(readEmails.includes(emailDetails.id)? 'read-bg':'unread-bg',activeEmailId===emailDetails.id && "active-border",'card-wrapper')}>
        <div className="card-container" onClick={()=>{handleCardClicked(emailDetails.id)}}>
            <div>
                <ProfilePic name={emailDetails.from.name}/>
            </div>
            <div className='email-details'>
                <div >From: <span> {`${emailDetails.from.name}  <${emailDetails.from.email}>`}</span> </div>
                <div>Subject: <span>{emailDetails.subject}</span></div>
                <div className='email-details-body'>{emailDetails.short_description}</div>
                <div className='email-date-time'>
                    <div>{formattedDate}</div>
                    <div className='email-time'>{formattedTime}</div>
                   {favorites.includes(emailDetails.id) && <div className='email-tags'>Favorite</div> }
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmailCard