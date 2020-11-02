import React, {useState, useEffect} from 'react';
import {Observable, of, interval} from 'rxjs';
import {map,take} from 'rxjs/operators';
import Link from 'next/link';

export default function Example() {


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
            <h3>Operators (操作符)</h3>
            <p>案例1</p>
            <button onClick={() => {
                map((x: number) => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
            }}>
                test1
            </button>
            <p>案例2</p>
            <p>op4()(op3()(op2()(op1()(obs)))) => obs.pipe(
                op1(),
                op2(),
                op3(),
                op3(),
                )</p>
            <button onClick={() => {
                map((x: number) => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
            }}>
                test2
            </button>

            <p>案例3</p>
            <p>一个案例</p>
            <button onClick={() => {
                const numbers = interval(1000);
                console.log(take(4))
                const takeFourNumbers = numbers.pipe(take(4));

                takeFourNumbers.subscribe(x => console.log('Next: ', x));
            }}>
                test3
            </button>

            <Link href="/rx-demo3">
                <a>Next</a>
            </Link>
        </div>
    );
}
