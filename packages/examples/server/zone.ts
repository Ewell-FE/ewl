import {ContinuationLocalStorage} from 'asyncctx';

class MyLocalStorage {
    [key: string]: any;
}

let cls = new ContinuationLocalStorage<MyLocalStorage>();
cls.setRootContext({});
export default cls;
