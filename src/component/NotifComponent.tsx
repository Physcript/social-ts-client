import React , { useState,useEffect }from 'react'

export interface INotifComponent {
  show: boolean
}
const NotifComponent: React.FC<INotifComponent> = (props) => {
 
  const [ showNotif, setShowNotif ] = useState<boolean>(false)

  useEffect(() => {
    
    if(props.show === true)
      {
        setShowNotif(true)
      }
    if(props.show === false)
      {
        setShowNotif(false)
      }

  },[props,showNotif])
   
  return (
    
    <div>
      {
        showNotif === true ? (<div>
          <div className = 'popup'>
            <h2>Notification</h2>
            <p>Someone Like your post</p>
          </div>
        </div>):(<div></div>)
      }
    </div>

  )
}

export default NotifComponent



