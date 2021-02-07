import Link from 'next/link';
import {Button} from "@ewl/core"

const OtherPage = () => (
    <div>
        <h1>Other Page</h1>

        <Link href="/">
            <a>Get back to "/"</a>
        </Link>
        <Button>hello ~</Button>
    </div>
);

export default OtherPage;
