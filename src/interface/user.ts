

export default interface IUser {
  _id: string,
  firstName: string,
  lastName: string,
  address: string,
  avatar: string,
  email: string,
  uid: string,
  createdAt: string,
  updatedAt: string,
}


export const DUser: IUser = {
  _id: '',
  firstName: '',
  lastName: '',
  address: '',
  avatar: '',
  email: '',
  uid: '',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString()
}

