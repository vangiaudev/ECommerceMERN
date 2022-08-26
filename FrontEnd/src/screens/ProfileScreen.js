import FormProfile from 'components/FormProfile';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getUserDetails } from 'redux/Actions/UserActions';


const ProfileScreen = props => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUserDetails("profile"));
      }, [dispatch]);

  return (
   <>
   
    <FormProfile/>
   </>
  )
}


export default ProfileScreen