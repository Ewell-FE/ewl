import React, {useState, useEffect} from 'react';
import {of, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
