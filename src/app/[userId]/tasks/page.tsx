import { Progress } from '@/components/ui/progress';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Layout = dynamic(() => import('./layout'));
const Tasks = () => {
    return (
        <div>
            <Suspense fallback={<Progress className="bg-blue/40" value={10} />}>
                <Layout />  
            </Suspense>
        </div>
    );
};

export default Tasks;