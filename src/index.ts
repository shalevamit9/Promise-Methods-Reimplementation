/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  all,
  delay,
  delayTest,
  echo,
  mapParallel,
  mapSeries,
  props,
  filterParallel,
  filterSeries,
  reduce,
  race,
  some,
} from './async-lib/index.js';

function random(max: number, min = 0) {
  return Math.round(Math.random() * max + (max - min));
}

(async () => {
  // delay
  // await delayTest();
  // const promise1 = echo('1 first resolved value', 3000);
  // const promise2 = echo('2 second resolved value', 3000);
  // const promise3 = echo('3 third resolved value', 3000);
  // all
  // console.log(await all([promise1, promise2, promise3]));
  // props
  // console.log(await props({ promise1, promise2, promise3 }));
  // mapParallel
  // const promise1 = echo('1 first', 1000);
  // const promise2 = echo('2 second', 100);
  // const promise3 = echo('3 third', 2000);
  // await mapParallel([promise1, promise2, promise3], async (p) => {
  //   const char = (await p) as string;
  //   await delay(random(2000, 500));
  //   console.log(char);
  //   return char.toUpperCase();
  // });
  // mapSeries
  // await mapSeries('Geronimo', async (char) => {
  //   await delay(random(2000, 500));
  //   console.log(char);
  //   return (char as string).toUpperCase();
  // });
  // filterParallel
  // const word = await filterParallel('G<4!e3ro0ni1mo', async (char) => {
  //   const c = char as string;
  //   await delay(random(2000, 500));
  //   console.log(c);
  //   return /^[A-Za-z]+$/.test(c);
  // });
  // console.log(word);
  // filterSeries
  // await filterSeries('G<4!e3ro0ni1mo', async (char) => {
  //   const c = char as string;
  //   await delay(random(1000, 100));
  //   console.log(c);
  //   return /^[A-Za-z]+$/.test(c); // test for alphabetic characters
  // });
  // reduce
  // const sum = await reduce(
  //   [51, 64, 25, 12, 93],
  //   async (total, num) => {
  //     await delay(random(1000, 100));
  //     console.log(num);
  //     return (total as number) + (num as number);
  //   },
  //   0
  // );
  // console.log(sum);
  // race
  // const result = await race([
  //   echo('first', 4000),
  //   echo('second', 1000),
  //   echo('third', 3000),
  // ]);
  // console.log(result);
  // some
  // const result = await some(
  //   [
  //     echo('first', 4000),
  //     echo('second', 400),
  //     echo('third', 3000),
  //     echo('forth', 3000),
  //     echo('fifth', 500),
  //   ],
  //   2
  // );
  // console.log(result);
})();
