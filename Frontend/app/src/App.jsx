import { useMsal } from '@azure/msal-react';
import UnauthenticatedView from './unauthenticated-app/UnauthenticatedView'
import AuthenticatedApp from './authenticated-app/AuthenticatedView';

function App() {
    const { accounts, inProgress } = useMsal();
    // accounts: array of user accounts available after authentication
    // inProgress: current state of the authentication process

    const request = {
        scopes: [
            'api://{client_id}/User.Read',
            'api://{client_id}/User.Write',
            'api://{client_id}/User.Delete',
        ],
    };

    if (accounts.length > 0) {
        return <AuthenticatedApp />;
    } else if (inProgress === 'login') {
        return (
            <div>
                <p>Login is currently in progress!</p>
            </div>
        );
    } else {
        return <UnauthenticatedView redirectRequest={request} />;
    }
};

export default App;