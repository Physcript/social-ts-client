
interface IRequest_nobody{
  url: string,
  method: string
}

interface IRequest_withbody extends IRequest_nobody {
  body: any
}

type IRequest = IRequest_withbody | IRequest_nobody 

const request = (props: IRequest) => {
    let request: any

    if('body' in props) 
      {
        request = new Request(`http://localhost:1337/api${props.url}`, 
          {
            method: props.method,
            headers: { 'Content-Type': 'application/json' },
            body: props.body
          })
      }
    else
      {
        request = new Request(`http://localhost:1337/api${props.url}`, 
          {
            method: props.method,
            headers: { 'Content-Type': 'application/json', 'token': `${localStorage.getItem('token')}` }
          })
      }
  
  return request 
}

export default request
