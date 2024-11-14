import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';


function AuthenticatedView() {
    const { instance, accounts } = useMsal();
    const account = accounts[0];
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                // Get the access token
                const tokenResponse = await instance.acquireTokenSilent({
                    scopes: [
                        'api://{client_id}/User.Read',
                        'api://{client_id}/User.Write',
                        'api://{client_id}/User.Delete',
                    ],
                    account: account,
                });

                setAccessToken(tokenResponse.accessToken); // Store the access token in state
            } catch (error) {
                console.error('Failed to acquire token silently:', error);
            }
        };

        if (account) {
            fetchAccessToken();
        }
    }, [account, instance]);


    return <div>Welcome to the Authenticated App!</div>;
};


export default AuthenticatedView;