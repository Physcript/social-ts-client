


export interface ISinglePost {
  body: string
  avatar: string
  firstName: string
  lastName: string
  uid: string
  createdAt: string
  updatedAt: string
}

const SinglePost: React.FC<ISinglePost> = (post) => {
  return (
    <div style = {{ margin: '10px 0', padding: '5px', border: '1px solid black', width: '50%' }}>
      <section style = {{ display: 'flex' }}>
        <img src = { post.avatar } style = {{ width: '25px' }} />
        <label><a href = { `/user/${post.uid}` }>{ post.firstName } { post.lastName }</a></label>
      </section>
      <section>
        Single Post { post.body }
      </section>
      <section>
        like dislike button 
      </section>
  </div>
  )
}

export default SinglePost
