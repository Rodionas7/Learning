import { useMsal } from '@azure/msal-react';
import Button from './authenticated-app/components/shared/Button';

function UnauthenticatedView(redirectRequest) {
    const { instance } = useMsal();
    return (
        <div className={'w-full h-full flex justify-center items-center'}>
            <div className={'flex flex-col gap-2'}>
                <p className={'text-lg'}>You don't seem to be logged in!</p>
                <p className={'text-md'}>By pressing log-in below, you will be logged in using your GHD Microsoft Account.</p>
                <Button onClick={() => instance.loginRedirect(redirectRequest)}>Log in!</Button>
            </div>
        </div>
    );
}

export default UnauthenticatedView;
