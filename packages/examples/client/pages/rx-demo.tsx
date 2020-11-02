import React, {useState, useEffect} from 'react';
import {Observable,of} from 'rxjs';
import Link from 'next/link';

export default function Example() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);

    const observer = {
        next(x) {
            console.log('got value ' + x);
        },
        error(err) {
            console.error('something wrong occurred: ' + err);
        },
        complete() {
            console.log('done');
        }
    };

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
        const observable = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
            let tid = setTimeout(() => {
                subscriber.next(4);
                subscriber.complete();
            }, 1000);
            return function unsubscribe() {
                console.log('clearTimeout:' + tid);
                clearTimeout(tid);
            };
        });

        console.log('just before subscribe');
        let subscription = observable.subscribe(observer);
        console.log('just after subscribe');
        // subscription.unsubscribe(); //Subscription 主要用于 立即终止 Observable 的执行
    });

    function fastCreate() {
        of(10, 20, 30)
            .subscribe(observer);
    }

    return (
        <div>
            <h3>Observable (可观察对象) - observer(观察者)</h3>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>

            <p>案例1</p>
            <button onClick={() => {
                fastCreate()
            }}>
                test1
            </button>
            <p>总结: observable.subscribe() 相比普通方法，可以返回多个值</p>
            <Link href="/rx-demo2">
                <a>Next</a>
            </Link>
        </div>
    );
}
