import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

function useAuthState() {
    const { authState, addAuth, removeAuth } = useContext(AuthContext);
    return { authState, addAuth, removeAuth };
}

export default useAuthState;