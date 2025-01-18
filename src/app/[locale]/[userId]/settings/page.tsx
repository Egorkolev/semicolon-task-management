import { Progress } from '@radix-ui/react-progress';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ContainerView = dynamic(() => import('./containerView'));
const Settings = () => {
    return (
        <div>
            <Suspense fallback={<Progress className="bg-blue/40" value={10} />}>
                <ContainerView />  
            </Suspense>
        </div>
    );
};

export default Settings;