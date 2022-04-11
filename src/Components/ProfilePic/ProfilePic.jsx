import "./profile-pic.css"

function ProfilePic({name}) {

  return (
    <div className='profile-wrapper'>
        <div className='profile-container'>
          <div className="profile-img-alter">
              {`${name && name[0].toUpperCase()}`}
          </div>
        </div>
    </div>
  )
}

export default ProfilePic