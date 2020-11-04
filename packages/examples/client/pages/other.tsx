import Link from 'next/link';
import dynamic from 'next/dynamic';

const RemoteTitle = dynamic(import('next1/exposedTitle'), {ssr: false});
const OtherPage = () => (
    <div>
        <h1>Other Page</h1>
        <p>this is module federation , the module come from nextjs project of module-federation-examples </p>
        <RemoteTitle/>
        <Link href="/">
            <a>Get back to "/"</a>
        </Link>
    </div>
);

export default OtherPage;
