const Notification = ({message}) => {
    const greenNotificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20',
        borderStyle: 'solid',
        borderRadius: '5',
        padding: '10',
        marginBottom: '10'
    }
    const redNotificationStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20',
        borderStyle: 'solid',
        borderRadius: '5',
        padding: '10',
        marginBottom: '10'
    }
  
  if (message === null) {
    return null
  }
  if(message.color === 'g'){
      return (
        <div style={greenNotificationStyle} >
          {message.text}
        </div>
    )
  }
  else{
      return (
    <div style={redNotificationStyle} >
      {message.text}
    </div>
  )
  }

}

export default Notification
