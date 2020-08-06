import React, {useState, useEffect} from 'react';
import { Observable } from 'rxjs';

export default function Example() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);


    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
        const observable = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
            setTimeout(() => {
                subscriber.next(4);
                subscriber.complete();
            }, 1000);
        });

        console.log('just before subscribe');
        observable.subscribe({
            next(x) { console.log('got value ' + x); },
            error(err) { console.error('something wrong occurred: ' + err); },
            complete() { console.log('done'); }
        });
        console.log('just after subscribe');
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
