import React, {useState, useEffect} from 'react';
import {of, Observable,fromEvent} from 'rxjs';
import {map,scan, mapTo } from 'rxjs/operators';
import Link from 'next/link';

export default function Example() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);


    useEffect(() => {
        const observable = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
        });
        of({name: '阿黄'}).pipe(
            map((x) => x.name + '--')
        ).subscribe((v) => console.log(`value: ${v}`));

        const clicks = fromEvent(document, 'click');
        const ones = clicks.pipe(mapTo(1));
        const seed = 10;
        const count = ones.pipe(scan((acc, one) => acc + one, seed));
        count.subscribe(x => console.log(x));
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <Link href="/rx-demo4">
                <a>Next</a>
            </Link>
        </div>
    );
}
