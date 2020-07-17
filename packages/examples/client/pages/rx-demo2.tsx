import React, {useState, useEffect} from 'react';
import {Observable, fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';

export default function Example() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);


    useEffect(() => {
        function delay(delayInMillis) {
            return (observable) => {
                return new Observable(observer => {
                    // this function will called each time this
                    // Observable is subscribed to.
                    const allTimerIDs = new Set();
                    const subscription = observable.subscribe({
                        next(value) {
                            const timerID = setTimeout(() => {
                                observer.next(value);
                                allTimerIDs.delete(timerID);
                            }, delayInMillis);
                            allTimerIDs.add(timerID);
                        },
                        error(err) {
                            observer.error(err);
                        },
                        complete() {
                            observer.complete();
                        }
                    });
                    // the return value is the teardown function,
                    // which will be invoked when the new
                    // Observable is unsubscribed from.
                    return () => {
                        subscription.unsubscribe();
                        allTimerIDs.forEach((timerID: number) => {
                            clearTimeout(timerID);
                        });
                    };
                });
            };
        }

        // const clicks = fromEvent(document, 'click');
        const observable = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
        });
        const delayedClicks = delay(3000)(observable);
        // const delayedClicks = clicks.pipe(); // each click emitted after 1 second
        delayedClicks.subscribe(x => console.log(x));

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
