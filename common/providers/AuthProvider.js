import React, { useEffect, useState, useCallback, createContext } from 'react';
import { ANONYMOUS_PATHS, ADMIN_PATHS } from '../../constants/App.constants';
import SessionExpired from '../components/SessionExpired';
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter';
import Loading from '../components/Loading';
import Unauthorised from '../components/Unauthorised';

export const AuthContext = createContext({
    authState: null,
    addAuth: () => { },
    removeAuth: () => { }
});

export default function AuthProvider({ children }) {
    const router = useRouter();
    const [authState, setAuthState] = useState({ status: 'pending', error: null, user: null });
    // console.log(router.pathname);
    useEffect(() => {
        // Run only if not an anonymous path
        if (ANONYMOUS_PATHS.indexOf(router.pathname) === -1) {
            // axios.get('/api/authenticate')
            //     .then((response) => {
            //         setAuthState({ status: 'success', error: null, user: response.data });
            //     }).catch((error) => {
            //         axios.get('/api/logout')
            //             .then((response) => {
            //                 setAuthState({ status: 'error', error: { message: 'Invalid user session' }, user: null });
            //             }).catch((error) => {
            //                 setAuthState({ status: 'error', error: { message: 'Invalid user session' }, user: null });
            //             });
            //     });
            if (cookieCutter.get("auth_token")) {
                setAuthState({ status: 'success', error: null, user: cookieCutter.get("auth_token") });
            } else {
                setAuthState({ status: 'error', error: { message: 'Invalid user session' }, user: null });
            }
        } else {
            //TODO based on role
            if (cookieCutter.get("auth_token")) {
                router.replace('/supplier-home');
            }
        }
    }, [router.pathname]);

    const addAuth = ({ error, user, status }) => {
        setAuthState({ error, user, status });
    };

    const removeAuth = () => {
        setAuthState({ status: 'error', error: { message: 'Invalid user session' }, user: null })
    };

    const contextValue = {
        authState,
        addAuth: useCallback(({ error, user, status }) => addAuth({ error, user, status }), []),
        removeAuth: useCallback(() => removeAuth(), [])
    };

    const getComponent = () => {
        //Check if anonymous path
        if (ANONYMOUS_PATHS.indexOf(router.pathname) !== -1) {
            return children;
        } else {
            // Check status
            if (authState.status === 'pending') {
                return <Loading />
            }
            if (authState.status === 'error') {
                return (<SessionExpired />);
            }
            if (authState.status === 'success' && authState.user) {
                // Check role access
                // switch (authState.user.role) {
                //     case 'Customer':
                //         if (ADMIN_PATHS.indexOf(router.pathname) === -1) {
                //             return children;
                //         } else {
                //             return <Unauthorised />;
                //         }
                //     case 'Influencer':
                //         if (ADMIN_PATHS.indexOf(router.pathname) !== -1) {
                //             return children;
                //         } else {
                //             return <Unauthorised />;
                //         }
                //     default:
                //         return <Unauthorised />;
                // }
                return children;
            } else {
                return (<SessionExpired />);
            }
        }
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {getComponent()}
        </AuthContext.Provider>
    )
}